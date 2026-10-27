"""Normalise raw firm icons into square logo tiles.

Input: the logo-raw/ folder produced by scripts/fetch-logos.ts (via the
"Fetch firm logos (raw)" workflow).
Output: public/logos/<slug>.png (192x192) and app/lib/firmLogos.ts.

Rules
- Best candidate wins: SVG first, then the largest raster.
- Rejected: rasters smaller than MIN_PX (blurry when shown at 76px),
  and any image that more than one firm returns (a host or CMS default icon,
  or the favicon service's generic globe).
- Transparent marks are padded onto a white tile, or a dark tile when the
  mark itself is light (white logos made for dark headers).
- Rejected: firms whose site redirects to another domain (the icon belongs
  to someone else).
- Safari "mask" icons are monochrome silhouettes: used only when no raster of
  at least 120px exists.
- Slugs listed in EXCLUDE were rejected by hand after visual review.

Usage: python3 -I scripts/normalize-logos.py <logo-raw-dir> [--sheet out.png]
"""
import hashlib
import io
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

SIZE = 192
MIN_PX = 96
PAD = 0.16
DARK_TILE = (11, 17, 26, 255)
EXCLUDE: set[str] = set()
# Header logo images (<img>) are often platform or payment logos: only the
# ones below were checked by hand and are allowed (slug -> URL fragment).
LOGO_IMG_OK = {"hantec-trader": "rzrfunded.com/logo.svg"}
# Redirects to another domain of the same brand, checked by hand on 2026-10-27.
ALLOW_REDIRECT = {"fundyourfx", "sabiotrade", "sure-leverage", "the-concept-trading", "uprofit-trader", "qt-funded"}

ROOT = Path(__file__).resolve().parent.parent


def registrable(host):
    host = (host or "").lower().split(":")[0]
    if host.startswith("www."):
        host = host[4:]
    parts = host.split(".")
    if len(parts) >= 3 and parts[-2] in {"co", "com", "org", "net"} and len(parts[-1]) == 2:
        return ".".join(parts[-3:])
    return ".".join(parts[-2:])


def is_mask(saved):
    return "safari-pinned-tab" in saved["url"] or "mask" in saved["url"].lower()


def rasterize_svgs(paths):
    """Render SVG files to transparent PNG bytes with headless Chromium (JS off)."""
    if not paths:
        return {}
    from playwright.sync_api import sync_playwright
    import base64

    out = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1243/chrome-linux64/chrome")
        context = browser.new_context(java_script_enabled=False, viewport={"width": 512, "height": 512})
        page = context.new_page()
        for path in paths:
            data = base64.b64encode(path.read_bytes()).decode()
            page.set_content(
                f'<html><body style="margin:0;background:transparent">'
                f'<img id="i" src="data:image/svg+xml;base64,{data}" '
                f'style="width:512px;height:512px;object-fit:contain;display:block"></body></html>'
            )
            page.wait_for_timeout(150)
            try:
                out[path] = page.locator("#i").screenshot(omit_background=True)
            except Exception:
                pass
        browser.close()
    return out


def open_raster(path, svg_png):
    if path in svg_png:
        return Image.open(io.BytesIO(svg_png[path])).convert("RGBA")
    image = Image.open(path)
    if image.format == "ICO":
        sizes = sorted(image.ico.sizes(), key=lambda s: s[0] * s[1])
        if sizes:
            image.size = sizes[-1]
    return image.convert("RGBA")


def content_box(image):
    alpha = image.getchannel("A")
    return alpha.point(lambda v: 255 if v > 12 else 0).getbbox()


def has_transparency(image):
    alpha = image.getchannel("A")
    w, h = image.size
    corners = [alpha.getpixel((0, 0)), alpha.getpixel((w - 1, 0)), alpha.getpixel((0, h - 1)), alpha.getpixel((w - 1, h - 1))]
    return min(corners) < 200


def mark_is_light(image):
    pixels = [p for p in list(image.resize((64, 64)).getdata()) if p[3] > 128]
    if not pixels:
        return False
    luminance = sum(0.2126 * r + 0.7152 * g + 0.0722 * b for r, g, b, _ in pixels) / len(pixels)
    return luminance > 205


def tile(image):
    if has_transparency(image):
        box = content_box(image)
        if box:
            image = image.crop(box)
        bg = DARK_TILE if mark_is_light(image) else (255, 255, 255, 255)
        canvas = Image.new("RGBA", (SIZE, SIZE), bg)
        inner = int(SIZE * (1 - 2 * PAD))
        image.thumbnail((inner, inner), Image.LANCZOS)
        canvas.alpha_composite(image, ((SIZE - image.width) // 2, (SIZE - image.height) // 2))
        return canvas.convert("RGB")
    # Opaque icon: it is already a tile. Centre-crop to square and resize.
    w, h = image.size
    side = min(w, h)
    image = image.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
    return image.resize((SIZE, SIZE), Image.LANCZOS).convert("RGB")


def fingerprint(image):
    small = image.convert("RGBA").resize((24, 24))
    return hashlib.md5(small.tobytes()).hexdigest()


def main():
    raw = Path(sys.argv[1])
    sheet_path = sys.argv[sys.argv.index("--sheet") + 1] if "--sheet" in sys.argv else None
    index = json.loads((raw / "index.json").read_text())
    results = index["results"]

    svg_paths = [raw / s["file"] for r in results for s in r["saved"] if s["file"].endswith(".svg")]
    svg_png = rasterize_svgs(svg_paths)

    chosen = {}
    offsite = []
    for result in results:
        final = result.get("finalUrl")
        if final:
            from urllib.parse import urlparse
            if registrable(urlparse(final).hostname) != registrable(result["domain"]) and result["slug"] not in ALLOW_REDIRECT:
                offsite.append(result["slug"])
                continue
        best = None
        for saved in result["saved"]:
            if saved["kind"] == "logo-img" and LOGO_IMG_OK.get(result["slug"], "\0") not in saved["url"]:
                continue
            path = raw / saved["file"]
            try:
                image = open_raster(path, svg_png)
            except Exception:
                continue
            is_svg = path.suffix == ".svg"
            px = min(image.size)
            if not is_svg and px < MIN_PX:
                continue
            if content_box(image) is None:
                continue
            mask = is_svg and is_mask(saved)
            if is_svg and not mask:
                rank = (3, 0)
            elif not is_svg and px >= 120:
                rank = (2, px)
            elif mask:
                rank = (1, 0)
            else:
                rank = (0, px)
            if best is None or rank > best[0]:
                best = (rank, image, saved)
        if best:
            chosen[result["slug"]] = {"image": best[1], "saved": best[2], "domain": result["domain"]}

    # Reject icons shared by several firms (host defaults, generic globe).
    counts = {}
    for slug, item in chosen.items():
        item["fp"] = fingerprint(item["image"])
        counts[item["fp"]] = counts.get(item["fp"], 0) + 1
    shared = {slug for slug, item in chosen.items() if counts[item["fp"]] > 1}
    for slug in sorted(shared | EXCLUDE):
        chosen.pop(slug, None)

    out_dir = ROOT / "public" / "logos"
    out_dir.mkdir(parents=True, exist_ok=True)
    for old in out_dir.glob("*.png"):
        old.unlink()

    entries = []
    tiles = []
    for slug in sorted(chosen):
        item = chosen[slug]
        tiled = tile(item["image"])
        tiled.save(out_dir / f"{slug}.png", optimize=True)
        tiles.append((slug, tiled))
        source = item["saved"]["url"]
        if item["saved"]["kind"] == "gstatic":
            source = f"favicon service for {item['domain']}"
        entries.append((item["domain"], slug, source))

    lines = [
        "// Generated by scripts/normalize-logos.py. Do not edit by hand: re-run the",
        '// "Fetch firm logos (raw)" workflow, then the normalisation script.',
        "//",
        "// Keyed by the firm's official logo domain (PropFirm.logoDomain), so every",
        "// existing <FirmLogo logoDomain=...> call picks up the local file.",
        "",
        "export type FirmLogoEntry = {",
        "  /** File in public/logos. */",
        "  file: string;",
        "  /** Where the icon was published by the firm (or the favicon service used). */",
        "  source: string;",
        "};",
        "",
        f"export const FIRM_LOGO_SIZE = {SIZE};",
        "",
        f"// {len(entries)} logos, fetched {index['fetchedAt'][:10]}.",
        "export const firmLogos: Record<string, FirmLogoEntry> = {",
    ]
    for domain, slug, source in sorted(entries):
        lines.append(f"  {json.dumps(domain)}: {{ file: {json.dumps(slug + '.png')}, source: {json.dumps(source)} }},")
    lines += [
        "};",
        "",
        "export function firmLogoFor(domain?: string) {",
        "  const entry = domain ? firmLogos[domain] : undefined;",
        "  return entry ? { src: `/logos/${entry.file}`, size: FIRM_LOGO_SIZE, ...entry } : undefined;",
        "}",
        "",
    ]
    (ROOT / "app" / "lib" / "firmLogos.ts").write_text("\n".join(lines))

    print(f"{len(entries)} logos written; offsite redirects: {sorted(offsite)}; rejected as shared: {sorted(shared)}; excluded by hand: {sorted(EXCLUDE)}")

    if sheet_path:
        cols, cell = 10, 150
        rows = (len(tiles) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * cell, rows * cell), (40, 48, 60))
        draw = ImageDraw.Draw(sheet)
        font = ImageFont.load_default()
        for n, (slug, tiled) in enumerate(tiles):
            x, y = (n % cols) * cell, (n // cols) * cell
            sheet.paste(tiled.resize((100, 100)), (x + 25, y + 8))
            draw.text((x + 6, y + 116), slug[:22], fill=(230, 235, 240), font=font)
        sheet.save(sheet_path)


if __name__ == "__main__":
    main()

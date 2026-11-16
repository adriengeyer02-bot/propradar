/** Pointer samples use the event clock; angular velocities are radians per second. */
export type GlobeMotionSample = { time: number; yaw: number; pitch: number };
export type GlobeVelocity = { yaw: number; pitch: number };

const SAMPLE_WINDOW_MS = 100;
const MAX_RELEASE_GAP_MS = 90;
const MAX_SPEED = 8;
const MIN_SPEED = 0.02;
const FRICTION = 2.2;

/** Recent movement sets throw strength; holding the globe still releases it without a throw. */
export function globeReleaseVelocity(samples: readonly GlobeMotionSample[], releasedAt: number): GlobeVelocity {
  const last = samples[samples.length - 1];
  if (!last || releasedAt - last.time > MAX_RELEASE_GAP_MS) return { yaw: 0, pitch: 0 };
  const first = samples.find((sample) => sample.time >= releasedAt - SAMPLE_WINDOW_MS) ?? last;
  const elapsed = (releasedAt - first.time) / 1000;
  if (first === last || elapsed <= 0) return { yaw: 0, pitch: 0 };
  const yaw = (last.yaw - first.yaw) / elapsed;
  const pitch = (last.pitch - first.pitch) / elapsed;
  const speed = Math.hypot(yaw, pitch);
  if (speed < MIN_SPEED) return { yaw: 0, pitch: 0 };
  const scale = Math.min(1, MAX_SPEED / speed);
  return { yaw: yaw * scale, pitch: pitch * scale };
}

/** Analytic damping keeps the same coast distance at 30, 60 or 144 frames per second. */
export function globeCoastStep(velocity: number, seconds: number) {
  if (Math.abs(velocity) < MIN_SPEED) return { distance: 0, velocity: 0 };
  const decay = Math.exp(-FRICTION * seconds);
  return { distance: velocity * (1 - decay) / FRICTION, velocity: velocity * decay };
}

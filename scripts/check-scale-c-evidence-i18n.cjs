const assert = require('node:assert/strict');
const source = require('../app/data/scale-c.json').firms;
const translated = require('../app/lib/dataI18n/scaleCEvidence.json');
const key = (slug, code, text) => JSON.stringify([slug,code,text]);
const rows = Object.entries(source).flatMap(([slug, firm]) => firm.penalties.filter(p => p.text).map(p => key(slug,p.code,p.text)));
const data = new Map(translated.map(r=>[key(r.slug,r.code,r.source),r.translations]));
assert.equal(data.size,translated.length,'duplicate source entry');
for(const [id, locales] of data){assert.ok(rows.includes(id),'stale source: '+id);for(const [l,text] of Object.entries(locales))assert.ok(typeof text==='string'&&text.trim(),'empty: '+l+' '+id);}
for(const l of ['en','fr','de','it','es','pt','zh','ja','hi','tr','ar','ko','sw','ha','am']){
  const count=rows.filter(k=>l==='en'||data.get(k)?.[l]).length;
  console.log(l+': '+count+'/'+rows.length);
  if(l==='fr'||process.argv.includes('--strict'))assert.equal(count,rows.length,'Missing '+l+' translations');
}

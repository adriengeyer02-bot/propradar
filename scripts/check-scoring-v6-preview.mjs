import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('../app/lib/scoringV6Preview.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {v6Preview,v6Penalty}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const data=JSON.parse(fs.readFileSync(new URL('../audits/v6-program-scoring-pilot-20-2026-11-24.json',import.meta.url),'utf8'));
assert.equal(data.firms.length,20);
for(const firm of data.firms){
 const a=v6Preview(firm);
 assert.equal(a.commonScore,firm.commonScore,firm.slug);
 assert.equal(a.medianSample,firm.medianSample,firm.slug);
 assert.equal(a.trustpilotPenalty,firm.trustpilotPenalty,firm.slug);
 assert.equal(a.publicationAllowed,false);
 assert.deepEqual(a.programs.map(p=>p.score),firm.programs.map(p=>p.score),firm.slug);
 assert.equal(v6Preview({...firm,commonRules:[...firm.commonRules,...firm.commonRules]}).commonScore,a.commonScore);
}
const f=data.firms.find(f=>f.slug==='ftmo');
assert.deepEqual(v6Preview(f).programs.map(p=>p.score),[89,87,85]);
assert.equal(v6Preview({...f,payoutBonus:5}).commonScore-v6Preview(f).commonScore,5);
assert.equal(v6Preview({...f,trustpilotDomain:'example.com'}).commonScore,v6Preview(f).commonScore-8);
assert.equal(v6Penalty(Array.from({length:6},(_,i)=>({family:'x'+i,points:12,label:'test',source:'https://example.com'}))).points,40);
console.log('V6 pilot checks passed: 20 firms, program arithmetic, proof bonus, unique TP and risk families, publication disabled');

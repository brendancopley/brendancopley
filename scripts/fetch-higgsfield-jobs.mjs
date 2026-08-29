// Polls a jobs.tsv (slug<TAB>jobId) until every job resolves, then downloads results.
// Usage: node scripts/fetch-higgsfield-jobs.mjs <jobs.tsv> <outDir> <ext>
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
const [tsv, outDir, ext = 'jpg'] = process.argv.slice(2)
mkdirSync(outDir, { recursive: true })
const rows = readFileSync(tsv, 'utf8').trim().split('\n').filter(Boolean)
  .map(l => { const [slug, id] = l.split('\t'); return { slug, id } })
const meta = {}
const sleep = ms => new Promise(r => setTimeout(r, ms))
for (let round = 1; round <= 80; round++) {
  let pending = 0
  for (const r of rows) {
    const out = `${outDir}/${r.slug}.${ext}`
    if (existsSync(out) && statSync(out).size > 0) continue
    let job
    try { job = JSON.parse(execFileSync('higgsfield', ['generate','get',r.id,'--json'],
      { encoding:'utf8', stdio:['ignore','pipe','ignore'] })) } catch { pending++; continue }
    if (job.status === 'completed' && job.result_url) {
      execFileSync('curl', ['-sL', job.result_url, '-o', out])
      meta[r.slug] = { jobId: r.id, status: job.status, resultUrl: job.result_url,
                       prompt: job.params?.prompt, model: job.job_type,
                       aspectRatio: job.params?.aspect_ratio, file: out }
      console.log('  downloaded', r.slug)
    } else if (['failed','canceled'].includes(job.status)) {
      meta[r.slug] = { jobId: r.id, status: job.status }
      console.log('  FAILED', r.slug)
    } else pending++
  }
  if (!pending) break
  console.log(`  round ${round}: ${pending} pending`)
  await sleep(12000)
}
writeFileSync(tsv.replace(/\.tsv$/, '-metadata.json'), JSON.stringify(meta, null, 2) + '\n')
console.log('resolved:', Object.keys(meta).length, '/', rows.length)

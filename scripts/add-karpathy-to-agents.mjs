import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const AGENT_DIRS = [
  path.join(ROOT, 'agents'),
  path.join(ROOT, 'domains', 'analytics', 'agents'),
  path.join(ROOT, 'domains', 'content', 'agents'),
  path.join(ROOT, 'domains', 'development', 'agents'),
  path.join(ROOT, 'domains', 'product', 'agents'),
];

const KARPATHY_LINE = '- **$karpathy-guidelines** — обязательное правило качества (думай, упрощай, хирургически, цель)';

let updated = 0;
let skipped = 0;

for (const dir of AGENT_DIRS) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('karpathy-guidelines')) {
      console.log(`skip (already present): ${path.relative(ROOT, filePath)}`);
      skipped++;
      continue;
    }

    const lines = content.split('\n');
    let insertIdx = -1;
    let hasObazatelnye = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Find the skills section header
      if (/^## Используемые skills/.test(line)) {
        // Look ahead for ### Обязательные within next 5 lines
        for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
          if (/^### Обязательные/.test(lines[j])) {
            hasObazatelnye = true;
            // Insert after the ### Обязательные line
            insertIdx = j + 1;
            break;
          }
          // Stop looking if we hit another ## section
          if (/^##/.test(lines[j])) break;
        }

        if (!hasObazatelnye) {
          // No ### Обязательные — insert right after the ## header
          insertIdx = i + 1;
        }
        break;
      }
    }

    if (insertIdx === -1) {
      console.log(`WARN: no skills section found in ${path.relative(ROOT, filePath)}`);
      continue;
    }

    // Insert the karpathy line (with blank line if needed)
    const before = lines[insertIdx - 1];
    const after = lines[insertIdx];

    const toInsert = [];
    // If line before is the header (## or ###), add blank line after if not present
    if (/^#{2,3}/.test(before) && after !== '') {
      // Don't add extra blank line — just insert the item
    }
    toInsert.push(KARPATHY_LINE);

    lines.splice(insertIdx, 0, ...toInsert);

    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`updated: ${path.relative(ROOT, filePath)}`);
    updated++;
  }
}

console.log(`\nDone. Updated: ${updated}, Skipped (already present): ${skipped}`);

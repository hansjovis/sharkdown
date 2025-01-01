import { readFile, writeFile } from 'fs/promises';
import parse from './dist/sharkdown.js';
import toHTML from './dist/html/toHTML.js';

const text = await readFile('test.md', 'utf8');

const document = parse(text);

console.log('Document:');
console.log(JSON.stringify(document, null, 2));

const html = toHTML(document);
console.log('HTML:');
console.log(html);

await writeFile('test.html', html);
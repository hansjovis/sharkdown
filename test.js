import { readFile } from 'fs/promises';
import parse from './dist/sharkdown.js';

const text = await readFile('test.md', 'utf8');

const document = parse(text);

console.log(JSON.stringify(document, null, 2));
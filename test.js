#!/usr/bin/env node

/*
 * Simple and dirty script to test the parser and the HTML generator.
*/

import { readFile, writeFile } from 'fs/promises';
import parse from './dist/sharkdown.js';
import toHTML from './dist/html/toHTML.js';

const COLORS = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    pink: '\x1b[35m',
    cyan: '\x1b[36m',
    orange: '\x1b[38;5;208m',
    gray: '\x1b[38;5;240m',
    reset: '\x1b[0m'
};

function highlight(text, color) {
  return `${color}${text}\x1b[0m`;
}

function highlightJSON(json) {
  return json.replace(/"([^"]+)":/g, highlight('$1:', COLORS.green));
}

function highlightHTML(html) {
  return html.replace(/<.+?>/g, highlight('$&', COLORS.yellow));
}

const text = await readFile('test.md', 'utf8');

const document = parse(text);
const json = JSON.stringify(document, (key, value) => key !== "parent" ? value : undefined, 2);

console.log('Document:');
console.log(highlightJSON(json));

const html = toHTML(document, { prettyPrint: true });
console.log('HTML:');
console.log(highlightHTML(html));

await writeFile('test.html', html);
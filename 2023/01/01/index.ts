import { readFileSync } from 'fs';
import * as path from 'path';

// const data = readFileSync(path.resolve(__dirname, 'test.txt'), { encoding: 'utf8'})
const data = readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8'})
const lines = data.split('\n');
let sum = 0;
for (const line of lines) {
	let numbers = '';
	for (const c of line) {
		if (isCharNumber(c)) {
			numbers += c;
		}
	}
	if (numbers.length > 0) {
		const first = numbers.at(0) || '0';
		const last = numbers.at(numbers.length - 1) || '0';
		sum += (+first) * 10 + (+last);
	}
}
console.log('SUM:', sum);

function isCharNumber(c: string) {
  return c >= '0' && c <= '9';
}
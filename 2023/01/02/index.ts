import { readFileSync } from 'fs';
import * as path from 'path';

const txtNumbers = [
	{txt: 'one', number: '1'},
	{txt: 'two', number: '2'},
	{txt: 'three', number: '3'},
	{txt: 'four', number: '4'},
	{txt: 'five', number: '5'},
	{txt: 'six', number: '6'},
	{txt: 'seven', number: '7'},
	{txt: 'eight', number: '8'},
	{txt: 'nine', number: '9'},
];

main();

function main() {
	// const data = readFileSync(path.resolve(__dirname, 'test.txt'), { encoding: 'utf8'})
	const data = readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf8'})
	const lines = data.split('\n');
	let sum = 0;
	for (const line of lines) {
		const txt = replaceTextNumber(line);
		let numbers = stringToNumbers(txt);
		sum += sumFirstLast(numbers);
	}
	console.log('SUM:', sum);
}


function sumFirstLast(str: string) {
	let sum = 0;
	if (str.length > 0) {
		const first = str.at(0);
		const last = str.at(str.length - 1);
		sum += (+first!) * 10 + (+last!);
	}
	return sum;
}

/**
 * The right calibration values for string "eighthree" is 83 and for "sevenine" is 79.
 */
function replaceTextNumber(str: string): string {
	let result = '';
	let i = 0;
	while (i < str.length) {
		const match = txtNumbers.find(el => str.startsWith(el.txt, i));
		if (match) {
			result += match.number;
		}
		result += str.charAt(i);
		i++;
	}
	console.log(result);
	return result;
}

function stringToNumbers(str: string): string {
	let numbers = '';
	for (const c of str) {
		if (isCharNumber(c)) {
			numbers += c;
		}
	}
	return numbers;
}

function isCharNumber(c: string) {
  return c >= '0' && c <= '9';
}

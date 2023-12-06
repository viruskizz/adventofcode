import { readFileSync } from 'fs';
import * as path from 'path';

const file = 'input.txt';

main();

async function main() {
	const data = readFileSync(path.resolve(__dirname, file), { encoding: 'utf8'})
	const lines = data.split('\n');
	for (const line of lines) {
    console.log(line);
	}
}

/**

seed-to-soil map
50 98 2  >> soil-50-51 seed-98-99
not in map is same map
52 50 48 >> 52 - 99 
 */
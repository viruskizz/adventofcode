import { readFileSync } from 'fs';
import * as path from 'path';

const file = 'input.txt';

main();

async function main() {
	const data = readFileSync(path.resolve(__dirname, file), { encoding: 'utf8'})
	const lines = data.split('\n');
	const {seeds, gardens} = setFarm(lines);
	const farming: any[] = [];
	const results: number[] = [];
	for (const seed of seeds) {
		let seeding = seed;
		let steps: number[] = [seeding];
		gardens.forEach(g => {
			seeding = mapSrcDest(seeding, g);
			steps.push(seeding);
		})
		results.push(seeding);
		farming.push({seed, steps});
	}
	console.log(farming);
	console.log(results);
	console.log(Math.min(...results));
}

function mapSrcDest(seeding: number, mapper: number[][]): number {
	for(let i = 0; i < mapper.length; i++) {
		const minSrc = mapper[i][1];
		const maxSrc = mapper[i][1] + mapper[i][2] - 1;
		if (minSrc <= seeding && seeding <= maxSrc) {
			const minDest = mapper[i][0];
			return minDest + (seeding - minSrc);
		}
	}
	return seeding;
}

function setFarm(lines: string[]) {
	let seeds: number[] = [];
	let gardens: any[] = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (!line.trim()) {
			continue;
		}
		if (line.startsWith('seeds:')) {
			seeds = line.substring('seeds:'.length).split(' ').filter(el => !!el).map(el => +el);
		}
		if (line.startsWith('seed-to-soil')
				|| line.startsWith('soil-to-fertilizer')
				|| line.startsWith('fertilizer-to-water')
				|| line.startsWith('water-to-light')
				|| line.startsWith('light-to-temperature')
				|| line.startsWith('temperature-to-humidity')
				|| line.startsWith('humidity-to-location')
			) {
			let mapper: number[][] = [];
			while(lines[++i].trim()) {
				mapper.push(lines[i].split(' ').map(el => +el.trim()));
			}
			gardens.push(mapper);
		}
	}
	return {seeds, gardens};
}

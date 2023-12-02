import { readFileSync } from 'fs';
import * as path from 'path';

interface Game {
	id: number,
	sets: GameSet[]
}

interface GameSet {
	blue: number,
	red: number,
	green: number,
}

const baseGameSet: GameSet = {
	red: 12,
	green: 13,
	blue: 14
}

// const file = 'test.txt';
const file = 'input.txt';

main();

async function main() {
	const data = readFileSync(path.resolve(__dirname, file), { encoding: 'utf8'})
	const lines = data.split('\n');
	let sum = 0;
	for (const line of lines) {
		const game = lineToGame(line);
		const maxSet = getMaxSet(game.sets);
		const power = Object.values(maxSet).reduce((prev, cur) => prev * cur, 1);
		console.log(maxSet, power);
		sum += power;
	}
	console.log('SUM:', sum);
}

function lineToGame(line: string) {
	const datas = line.split(':');
	const gameId = +datas[0].split(' ')[1];
	const sets = datas[1].split(';');
	const game: Game = {
		id: gameId,
		sets: [],
	}
	sets.forEach(s => {
		const colors = s.trim().split(',');
		let set: GameSet = {
			blue: 0,
			red: 0,
			green: 0
		};
		colors.forEach(c => {
			const cs = c.trim().split(' ');
			if (cs[1] === 'blue') {
				set.blue = +cs[0];
			} else if (cs[1] === 'red') {
				set.red = +cs[0];
			} else if (cs[1] === 'green') {
				set.green = +cs[0];
			}
		});
		game.sets.push(set);
	});
	return game;
}

function isValidGameSet(gameSets: GameSet[], baseSet: GameSet): boolean {
	for(const set of gameSets) {
		if (set.blue > baseSet.blue) {
			return false;
		}
		if (set.red > baseSet.red) {
			return false;
		}
		if (set.green > baseSet.green) {
			return false;
		}
	}
	return true;
}

function getMaxSet(gameSets: GameSet[]) {
	const maxSet = {
		red: 0,
		green: 0,
		blue: 0,
	}
	for (const set of gameSets) {
		if (set.blue > maxSet.blue) {
			maxSet.blue = set.blue;
		}
		if (set.red > maxSet.red) {
			maxSet.red = set.red;
		}
		if (set.green > maxSet.green) {
			maxSet.green = set.green;
		}
	}
	return maxSet;
}
import { readFileSync } from 'fs';
import * as path from 'path';

// const file = 'input.txt';
const file = 'test.txt';

type Card = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

export enum KIND {
	HIGH_CARD,
	PAIR_1,
	PAIR_2,
	KIND_3,
	FULL_HOUSE,
	KIND_4,
	KIND_5,
}

export interface Hand {
	cards: Card[];
	kindType: KIND;
	kindCard: Card[]
}

main();

async function main() {
	const data = readFileSync(path.resolve(__dirname, file), { encoding: 'utf8'})
	const lines = data.split('\n');
}

import { readFileSync } from 'fs';
import * as path from 'path';

// const file = 'test.txt';
const file = 'input.txt';

interface Match {
  wins: number[];
  owns: number[];
}

main();

async function main() {
	const data = readFileSync(path.resolve(__dirname, file), { encoding: 'utf8'})
	const lines = data.split('\n');
  const matchs = setMatchs(lines);
  let sum = 0;
  for(const match of matchs) {
    const cards = getWinCards(match);
    const point = getWinPoint(cards);
    sum += point;
  }
  console.log(sum);
}

function getWinPoint(cards: number[]) {
  if (cards.length === 0) {
    return 0;
  }
  let point = 1;
  for (let i = 1; i < cards.length; i++) {
    point = point * 2;
  }
  return point;
}

function getWinCards(match: Match) {
  return match.owns.filter(own => match.wins.findIndex(win => own === win) > -1);
}

function setMatchs(lines: string[]) {
  const match: Match[] = [];
  for(const line of lines) {
    const data = line.substring(line.search(':') + 1).trim();
    const cards = data.split('|').map(el => el.trim());
    match.push({
      wins: cards[0].split(' ').map(el => el.trim()).filter(el => !!el).map(el => +el),
      owns: cards[1].split(' ').map(el => el.trim()).filter(el => !!el).map(el => +el),
    })
  }
  return match;
}

import { time } from 'console';
import { readFileSync } from 'fs';
import * as path from 'path';

const file = 'input.txt';
// const file = 'test.txt';

interface Race {
  hold?: number;
  time: number;
  distance: number;
}

main();

async function main() {
	const data = readFileSync(path.resolve(__dirname, file), { encoding: 'utf8'})
	const lines = data.split('\n');
  const races = inputToRaces(lines);
  let result = 1;
  races.forEach(race => {
    result *= findPossible(race).length;
  });
  console.log('Result:', result)
}

function findPossible(race: Race) {
  const poss: Race[] = [];
  for (let t = 1; t < race.time; t++) {
    const d = (race.time - t) * t;
    if (d > race.distance) {
      poss.push({hold: t, distance: d, time: race.time});
    }
  }
  return poss;
}

function inputToRaces(lines: string[]): any[] {
  let times = lines[0].substring('Time:'.length).split(' ').map(el => el.trim()).filter(el => !!el).map(el => +el)
  let distances = lines[1].substring('Distance:'.length).split(' ').map(el => +el.trim()).filter(el => !!el).map(el => +el)
  let races: any[] = [];
  times.forEach((el, idx) => {
    races.push({
      time: times[idx],
      distance: distances[idx],
    })
  })
  return races;
}
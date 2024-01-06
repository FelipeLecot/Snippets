const main = (throws) => {
  let sets = {
    escalera: 0,
    full: 0,
    poker: 0,
    generala: 0,
  }
  for (let i = 0; i < throws; i++) {
    let dice = [];
    for (let j = 0; j < 5; j++) {
      dice.push(Math.floor(Math.random() * 6) + 1)
    }
    dice.sort()
    let counts = {};
    dice.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    let values = Object.values(counts)
    let isEscalera = dice.every((num, i) => i === dice.length - 1 || num === dice[i + 1] -1 )
    let isPoker = values[1] == 4 || values[0] == 4;
    let isFull = (values[1] == 3 && values[0] == 2) || values[1] == 2 && values[0] == 3
    let isGenerala = Math.max(values) == 5;
    if (isEscalera) {
      sets.escalera++
    }
    if (isEscalera) {
      sets.escalera++
    }
    if (isPoker) {
      sets.poker++
    }
    if (isFull) {
      sets.full++
    }
    if (isGenerala) {
      sets.generala++
    }
  }
  return sets;
}

let tiros = 1000000
let results = main(tiros)
console.log(
  "Tiros: " + tiros,
  `\n\nEscaleras: ${results.escalera} (${Math.round(results.escalera / tiros * 100 * 100) / 100}%)`,
  `\n\nFull: ${results.full} (${Math.round(results.full / tiros * 100 * 100) / 100}%)`,
  `\n\nPoker: ${results.poker} (${Math.round(results.poker / tiros * 100 * 100) / 100}%)`,
  `\n\nGenerala: ${results.generala} (${Math.round(results.generala / tiros * 100 * 100) / 100}%)`
)
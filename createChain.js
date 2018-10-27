let data = require('./freqTable.json');


// get frequencies
let totalUniques = data.length;

let currentWord = "__START__";
let string = "";
endReached = false;

while (getNextWord(currentWord) != undefined) {

  currentWord = getNextWord(currentWord);
  string = string + " " + currentWord;
}

console.log(string);


function getNextWord(prevWord) {

  let startData = data[prevWord];
  let totalOccurances = 0;
  let currentOccurances = 1;

  for (word in startData) {
    totalOccurances = totalOccurances + startData[word];
  }
  let rand = Math.floor((Math.random() * totalOccurances) + 1);

  for (word in startData) {
    currentOccurances = currentOccurances + startData[word];
    if (currentOccurances >= rand) {
      // word chosen!
      return word;
    }
    // 1, 2, 10, ....
    // rand = 5
  }
}


// load data

let text = (function() {

  let data = require('./data.json'); //(with path)
  let personNr = 1;
  let name = data[personNr].name;
  let messages = data[personNr].message;

  function cleanMessages(message) {
    let newMessage = message;
    // let newMessage = message.replace("\r\n", '');
    // message = message.replace("\r", "");
    return newMessage;
  }

  return messages.map(cleanMessages);
})();

// get unique words and count them
let uniqueWordDict = (function() {

  let uniqueWords = {};
  let words = text.join(" ").split(/[\b\s(?:,| )+]/);

  for (var i = 0; i < words.length; i++) {
      uniqueWords[words[i].toLowerCase()] = (uniqueWords[words[i].toLowerCase()] || 0) + 1;
  }
  return uniqueWords;

})();


// what words follow that word and with which frequency.
// Build a frequency table. This is a data structure where for every word in your body of text, you have an entry (key).
// This key is mapped to another data structure that is basically a list of all the words that follow this word (the key) along with its frequency.


let freqTable = {"__START__": {} };

// design { word: {succeeder: freq} }
for (const word in uniqueWordDict) {
  let followerObj = {};
  // word : count

  for (var i = 0; i < text.length ;i++) {
    let message = text[i];
    let index = message.indexOf(String(word) + " ");

    if (index >= 0 && (message.substring(index-1,index) == " " || index == 0)) {
      // message contains word
      // get word after that words
      let followingWord = message.substring(index+word.length,message.length).split(" ")[1].toLowerCase();

      // console.log(message);
      // console.log(String(word));
      // console.log(followingWord);
      // console.log("----");

      followerObj[followingWord] = (followerObj[followingWord]+1) || 1 ;
    }
    // start position!
    if (index == 0) {
      freqTable["__START__"][word] = (freqTable["__START__"][word]+1) || 1 ;
    }
  }
  freqTable[word] = followerObj;
  // container.push(word);
  // container.push(uniqueWordDict[word]);
  // container.push(freqTable);
  // freqTableArray.push(container);
}


jsonData = JSON.stringify(freqTable);

var fs = require('fs');
fs.writeFile("freqTable.json", jsonData, function(err) {
    if (err) {
        console.log(err);
    }
});

//console.log(freqTable);

//  we'll roll a die and decide which next node to move to accordingly.

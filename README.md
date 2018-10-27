# markov_chain_js

markov chain for use for my chatanalyzer project. Markov chain for whatts app data.

# Data generation

get your data via https://chatanalyzer.moritzwolf.com/ 

1. open dev console in browser, add breakpount to line 672 
1. choose your whatts app txt file
1. run "JSON.stringify(userStruct)"
1. copy data in data.json file
1. run "node generateFreqTable.js"
1. run "node createChain.js"

# Mastree assignmment <> Mrinal

### Table of content

    |- functions |- flip-the-bits.js
    |            |- staircase.js
    |            |- uriParser.js
    |
    |- test |- flip-the-bits.test.js
    |       |- staircase.test.js
    |       |- uriParser.test.js
    |
    |- package.json
    |- .prettierrc
    |- README.md

## Scripts

1. `npm run parser <uri>` - Replace the `<uri>` with the test uri to get the output
2. `npm run flip` - start flip-the-bits game in the console
3. `npm run climb 4 1 2` - to run the staircase climb problem, here the input 4 is the size of the staircase and 1,2 is the combination of climbing

## test scripts

> please run `npm install` or `yarn install` before running the test scripts, as the jest is required for running the tests

1. `npm run test:1` - Runs the provided test cases for uri parser
2. `npm run test:2` - Runs the provided test case for the functions used in flip the bits (output on the terminal, tell what is teste)
3. `npm run test:3` - Runs test for staircase climb problem

## functions

This folder contains three files each for the given problems

## test

This folder contains the test cases for each of the problems with some test data, feel free to replace the test data

## structure of test data

Each test data is an array of arrays, each outer array denotes of the test case in the format of `[...inputs, output]`

\*More info in each test files

`Mrinal Raj <raj.mrnl@gmail.com>`

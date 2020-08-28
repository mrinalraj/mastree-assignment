const { stairsClimber } = require('../functions/staircase')

// here [4 , [1,2], 5] has 4 as the size [1,2 ] as the combination and 5 as the ouput
const testData = [
	[4, [1, 2], 5],
	[4, [1, 2, 3], 7],
	[24, [4, 6, 8], 36],
]

test.each(testData)('for %s steps and %s combination -> ways of climbing is %s ', (steps, combinations, output) => {
	const result = stairsClimber(steps, combinations)
	expect(result).toEqual(output)
})

// function to take input from command line and display result
const climbStaircase = () => {
	const [_, steps, ...combinations] = process.argv
	const stepsCombination = combinations.map(number => parseInt(number))

	console.log(`Number of steps : ${steps}`)
	console.log(`Combinations of climbing steps : ${stepsCombination}`)
	const waysToClimb = stairsClimber(parseInt(steps), stepsCombination)
	return `${waysToClimb} ways to climb`
}

// takes in input and runs inner function, the inner function is wrapped so that the value of the counter is reset for every test case
const stairsClimber = (n, combinations) => {
	let count = 0
	// function that when reaches steps === 0 evertime increases the counter
	function counter(steps = n, stepsCombination = combinations) {
		if (steps === 0) {
			return count++
		}
		for (const step of stepsCombination) {
			if (steps - step >= 0) {
				counter(steps - step)
			}
		}
	}
	counter()
	return count
}

module.exports = {
	climbStaircase,
	stairsClimber,
}

// readline to read user inputs from command line
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
})

// generate random target of N x N
const generateRandomTarget = n => {
	return new Array(n).fill([]).map(() => new Array(n).fill(0).map(() => Math.round(Math.random())))
}

// functions that takes in matrix and number and return a new matrix after flipping column
const flipColumn = (matrix, col) => {
	return matrix.map(row => {
		return row.map((bits, index) => {
			if (col - 1 === index) return bits ? 0 : 1
			else return bits
		})
	})
}

// function that takes in matrix and number and returns a new matrix after flipping row
const flipRow = (matrix, row) => {
	const m = matrix
	m[row - 1] = m[row - 1].map(bits => {
		return bits ? 0 : 1
	})
	return m
}

// utility function to print a board
const printMatrix = (mat, board) => {
	console.log(`----${board}----`)
	console.log(
		' ',
		new Array(mat.length)
			.fill(0)
			.map((e, i) => String.fromCharCode(i + 65))
			.join(' '),
	)
	mat.forEach((row, index) => {
		const colName = index + 1
		console.log(colName, row.join(' '))
	})
	console.log('\n')
}

// to shuffle and generate a board from a target
const generateSourceFromTarget = target => {
	const flips = Math.random().toFixed(1) * 10

	const rounds = new Array(flips).fill(0).map(() => Math.round(Math.random()))

	let init = target
	rounds.forEach(flipType => {
		const number = Math.floor(Math.random() * target.length) + 1
		if (flipType === 0) {
			init = flipRow(init, number)
		} else {
			init = flipColumn(init, number)
		}
	})
	if (init.toString() === target.toString()) {
		return generateSourceFromTarget(target)
	}
	return init
}

// main function which handles user ipnuts and the game logic
const play = async () => {
	let target,
		board,
		moves = 0
	// read user ipunt for size of board limited max to 20
	readline.question('Enter size of the board (max 20) : \t', size => {
		// create target and board until they are different

		target = generateRandomTarget(parseInt(size))
		board = generateSourceFromTarget(target)

		// print game initial state and instructions
		printMatrix(board, 'Board')
		printMatrix(target, 'Target')
		console.log('You can flip  a whole numbered rows or whole lettered columns at once, as one move.')
		console.log('Number denotes rows, alphabets denotes column')
		console.log("Let's start")
		console.log('You can press q to quit anytime')
	})

	// loop that acts as a listener for the line property of the readline object
	// iterates over each line everytime a new line is entered on the stdin
	for await (const line of readline) {
		// Each line in the readline input will be successively available here as

		// quits the game on pressing q
		if (line === 'q') {
			readline.close()
			console.log('Thanks for playing')
			return
		}

		// as the max was 20, check if input between 1 to 20 and flip the row
		if (parseInt(line) < 21) {
			sboard = flipRow(board, parseInt(line))
		}
		// flip column if the user iput was from A to T (uppercase)
		else if (/[a-zA-z]/.test(line) && line.charCodeAt(0) > 64 && line.charCodeAt(0) < 84) {
			board = flipColumn(board, line.charCodeAt(0) - 64)
		}
		// flip column if the user iput was from a to t (lowercase)
		else if (/[a-zA-z]/.test(line) && line.charCodeAt(0) > 96 && line.charCodeAt(0) < 116) {
			board = flipColumn(board, line.charCodeAt(0) - 96)
		}
		// on unsupported input inform user
		else {
			console.log('input error')
		}
		// increase count for moves, print moves and current game state
		moves++
		console.log(`Moves : ${moves}`)
		printMatrix(board, 'Board')
		printMatrix(target, 'Target')

		// check winning condition, toString() function converts any dimensional array to a linear comma seperated value
		// and equality of the liner string is then compared
		if (board.toString() === target.toString()) {
			readline.close()
			console.log('Thanks for playing')
			console.log(`Won in ${moves} moves`)
			return
		}
	}
}

module.exports = { generateRandomTarget, generateSourceFromTarget, flipRow, flipColumn, play }

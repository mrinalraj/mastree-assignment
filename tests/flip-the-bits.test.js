const { generateRandomTarget, generateSourceFromTarget, flipRow, flipColumn } = require('../functions/flip-the-bits')

test('should generate a matrix of size NxN', () => {
	const size = 4
	const matrix = generateRandomTarget(size)
	expect(matrix.length).toBe(size)
	expect(matrix.every(row => row.length === size)).toBe(true)
})

test('should have only binary elements', () => {
	const size = 4
	const matrix = generateRandomTarget(size)
	expect(matrix.flat().every(element => element === 1 || element === 0)).toBe(true)
})

test.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])('should not generate similar board and target %s', () => {
	const size = Math.round(Math.random() * 10) + 1
	const target = generateRandomTarget(size)
	const board = generateSourceFromTarget(target)
	expect(target.toString()).not.toEqual(board.toString())
})

test('should flip column', () => {
	const input = [
		[0, 1, 0, 1],
		[1, 1, 1, 1],
		[0, 0, 1, 0],
		[1, 0, 1, 1],
	]
	const output = [
		[0, 0, 0, 1],
		[1, 0, 1, 1],
		[0, 1, 1, 0],
		[1, 1, 1, 1],
	]

	const rowFlipped = flipColumn(input, 2)
	expect(rowFlipped).toEqual(output)
})

test('should flip row', () => {
	const input = [
		[0, 1, 0, 1],
		[1, 1, 1, 1],
		[0, 0, 1, 0],
		[1, 0, 1, 1],
	]
	const output = [
		[0, 1, 0, 1],
		[1, 1, 1, 1],
		[1, 1, 0, 1],
		[1, 0, 1, 1],
	]

	const rowFlipped = flipRow(input, 3)
	expect(rowFlipped).toEqual(output)
})

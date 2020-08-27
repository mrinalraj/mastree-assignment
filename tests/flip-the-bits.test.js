const { flipRow, flipColumn } = require('../functions/flip-the-bits')

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

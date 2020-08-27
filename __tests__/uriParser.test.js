const { parser, parseWithRegex } = require('../functions/uriParser')

const testCases = [
	[
		'foo://example.com:8042/over/there?name=ferret#nose',
		{
			scheme: 'foo',
			domain: 'example.com',
			port: '8042',
			path: '/over/there',
			query: [{ name: 'ferret' }],
			fragment: 'nose',
			authority: 'example.com:8042/over/there',
		},
	],
	[
		'urn:example.com:8042/over/there?name=ferret',
		{
			scheme: 'urn',
			path: 'example.com:8042/over/there',
			query: [{ name: 'ferret' }],
		},
	],
	[
		'tel:1234567890',
		{
			scheme: 'tel',
			path: '1234567890',
		},
	],
	[
		'jdbc:mysql://test_user:ouupppssss@localhost:3306/sakila?profileSQL=true',
		{
			scheme: 'jdbc',
			path: 'mysql://test_user:ouupppssss@localhost:3306/sakila',
			query: [{ profileSQL: 'true' }],
		},
	],
	[
		'ftp://ftp.is.co.za/rfc/rfc1808.txt',
		{
			scheme: 'ftp',
			domain: 'ftp.is.co.za',
			path: '/rfc/rfc1808.txt',
			authority: 'ftp.is.co.za/rfc/rfc1808.txt',
		},
	],
	[
		'http://www.ietf.org/rfc/rfc2396.txt#header1',
		{
			scheme: 'http',
			domain: 'www.ietf.org',
			authority: 'www.ietf.org/rfc/rfc2396.txt',
			path: '/rfc/rfc2396.txt',
			fragment: 'header1',
		},
	],
	[
		'ldap://[2001:db8::7]/c=GB?objectClass=one&objectClass=two',
		{
			scheme: 'ldap',
			path: '[2001:db8::7]/c=GB',
			authority: '[2001:db8::7]/c=GB',
			query: [{ objectClass: 'one' }, { objectClass: 'two' }],
		},
	],
	[
		'mailto:John.Doe@example.com',
		{
			scheme: 'mailto',
			path: 'John.Doe@example.com',
		},
	],
	[
		'news:comp.infosystems.www.servers.unix',
		{
			scheme: 'news',
			path: 'comp.infosystems.www.servers.unix',
		},
	],
	[
		'tel:+1-816-555-1212',
		{
			scheme: 'tel',
			path: '+1-816-555-1212',
		},
	],
	[
		'telnet://192.0.2.16:80/',
		{
			scheme: 'telnet',
			domain: '192.0.2.16',
			port: '80',
			path: '/',
			authority: '192.0.2.16:80/',
		},
	],
	[
		'urn:oasis:names:specification:docbook:dtd:xml:4.1.2',
		{
			scheme: 'urn',
			path: 'oasis:names:specification:docbook:dtd:xml:4.1.2',
		},
	],
]

describe('uri parser', () => {
	const result = []

	afterAll(() => {
		return console.table(result)
	})

	test.each(testCases)('should parse uri -> %s', (input, output) => {
		const parsed = parser(input)
		console.log(expect(parsed).toEqual(output))
		result.push({ input, output: JSON.stringify(parsed) })
	})
})

test.each(testCases)('should parse with the regex parser', (input, output) => {
	const parsed = parseWithRegex(input)
	expect(parsed).toEqual(output)
})

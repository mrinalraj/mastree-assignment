// own parser on basis of the syntax
const parser = input => {
	const output = {}

	// get fragment
	const [uri, fragment] = input.split('#')
	// fragment is optional
	fragment && (output.fragment = encodeURI(fragment))

	// get query string
	const [uri2, queryString] = uri.split('?')
	// query is optional
	queryString && (output.query = encodeURI(queryString).split('&'))

	// get scheme
	// match first : and replace matching part with empty string to get the remaining string
	const remaining = uri2.replace(/[^:]+/, match => {
		// scheme is optional
		output.scheme = match
		return ''
	})

	// check string has authority info or not
	const hasAuthority = remaining.substr(0, 3) === '://'

	// start index of path/authority
	const startIndexOfPath = hasAuthority ? 3 : 1

	const path = remaining.substr(startIndexOfPath)
	if (!hasAuthority) {
		// if no authority remaining is path
		// path is mandatory
		output.path = path
	} else {
		// if authority extract domain, port and path

		const authority = path.replace(/[/^](.*)/, match => {
			output.path = match
			return ''
		})

		const [domain, port] = authority.split(':')

		output.authority = authority
		output.domain = domain
		output.port = port
	}

	return output
}

// parsing using the regex found at https://tools.ietf.org/html/rfc3986#appendix-B
const parseWithRegex = input => {
	let output = {}
	const re_rfc3986_parse_generic_uri = /^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?$/

	input.replace(re_rfc3986_parse_generic_uri, (uri, scheme, authority, path, queryString, fragment) => {
		/* scheme = $2
		authority = $4
		path = $5
		query = $7
		fragment = $9 */
		// above is the output defined in the documents, similar to which we can groups being matched here in this function as well

		output = { scheme, path, fragment, authority }

		queryString && (output.query = queryString.split('&'))

		if (authority) {
			const [domain, port] = authority.split(':')
			output.domain = domain
			output.port = port
		}
		return
	})

	return output
}

module.exports = { parser, parseWithRegex }

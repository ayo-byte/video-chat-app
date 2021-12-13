import React from 'react'

export default function JWTest() {
	const encode = obj => {
		const encoded = btoa(
			JSON.stringify(obj)
		)
		return encoded
	}
	const header = {
		"typ": "JWT",
		"alg": "HS256"
	}
	return (
		<div>
			<p>Header</p>
			<pre>
				<code>{encode(header)}</code>
			</pre>
		</div>
	)
}
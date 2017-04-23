// login

export function login(credentials) {
	return {
		type: 'LOGIN',
		credentials,
	}
}

export const url = process.env.NEXT_PUBLIC_BASE_URL

export const configToken = (token) => ({
	headers: {
		Authorization: `Bearer ${token}`,
	},
})


export const read = (url, { token }) => {
  const config = {
		headers: {
			'Authorization': `Bearer ${token}`
	}}

  const request = axios.get(url, config);
  return request.then(response => response.data);
}

export const create = (url, data, { token }) => {
  const config = {
		headers: {
			'Authorization': `Bearer ${token}`
	}}

  const request = axios.post(url, data, config);
  return request.then(response => response.data);
}

export const update = (url, data, { token }) => {
  const config = {
		headers: {
			'Authorization': `Bearer ${token}`
	}}

  const request = axios.put(url, data, config);
  return request.then(response => response.data);
}

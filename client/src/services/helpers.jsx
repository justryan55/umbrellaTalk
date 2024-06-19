
export const fetchUsers = async () => {
	const params = {
		method: 'GET',
		headers: new Headers({
			"Content-Type": "application/json"
		}),
		body: null,
	};
  
	const res = await fetch("http://localhost:5000/api/users", params) 

	if (res.status !== 200) {
		return [];
	}
	
	const usersResponse = await res.json();

	console.log(usersResponse.user)


	return usersResponse.user;
}
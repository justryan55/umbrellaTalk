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


	// const userListExcludingCurrentUserArray = userListArray.map((existingUser) => {
	// 	if (existingUser.email === user.email){
	// 		console.log(user.email)
	// 		//find out how to remove this from the array
	// 	} else {
	// 		console.log(existingUser.email)
	// 	}
	// }) 
	return usersResponse.user;
}
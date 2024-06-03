
export default function CreateNewMessageButton() {

    const fetchUsers = async () => {
        const params = {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: null,
          };
      
        const res = await fetch("http://localhost:5000/api/users", params) 
        const users = await res.json()
        console.log(users)
    }

  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        onClick={fetchUsers}
        className="header-new-message-icon">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  )
}

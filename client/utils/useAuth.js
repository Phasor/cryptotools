// const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

// checks to see if the loggedin user is an admin
const useAuth = async () => {
    try{
        if(!localStorage.getItem('token')) {
            return false
        }
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.API_BASE_URL}/auth/authcheck`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
                "Authorization": token,
            },
        })
        const data = await response.json()
        if(data.success) {
            // console.log(`data.user: ${data.user}`)
            return true
        }
        // console.log(data.message)
        return false
    } catch(err){
        // console.log(err)
        return false
    }
}

export default useAuth;
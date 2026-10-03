
export function Header(){
    return(
        <div className="headercontainer">
            <div className="con">
            <img className="icon" src="document-svgrepo-com.svg" alt="icon" />
            <h1>to do</h1>
            </div>
            <div className="buttons">
            <button id="log">Log in</button>
            <button>Create Account</button>
            </div>
        </div>
    )
}

async function register(){
    async function handlesubmit(e) {
        e.preventDefault()
    const response = await fetch("http://localhost:3000/createaccount");
    if(!response.ok){
        return console.log("Error");
    }
        return await response.json()
    }
    return (
        <form onSubmit={handlesubmit}>
            <input type="text" />
            <input type="email" />
            <input type="password" />
            <button type="submit">
                Create account
            </button>
        </form>
    )
}
register


import { useState } from "react";

async function login(e,onlogin, seterror) {
    e.preventDefault();
    const form = e.target;

    const data = {
        name: form.name.value,
        mdps: form.password.value 
    };

    try {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if(!res.ok){
            seterror("Invalid password or username");
            return (seterror && console.log("Error:", result.message)); 
        }
      localStorage.setItem("token",result.token)
      console.log(result.message);
      onlogin(result.token)
    } catch (error) {
      console.log("An Error occured", error);
    }
}

export function Login({ onback , onlogin }){
    const [error1, seterror1] = useState("");
    return (
        <form className="formcreateaccount" onSubmit={(e) => login(e,onlogin,seterror1)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input name="name" type="text" placeholder="user_name"/>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input name="password" type="password" placeholder="password" minLength={8}/>
          </div>
          <p>{error1}</p>
          <div className="buttonsform">
            <button type="submit">Submit</button>
            <button type="button" onClick={onback}>Back</button>
          </div>
        </form>
    )
}
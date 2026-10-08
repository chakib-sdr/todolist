import { useState } from 'react'
import { Header, Register } from './header.jsx'
import { Login } from './login.jsx'
import { Home } from './content.jsx'
import { Main } from './todo.jsx'

import './App.css'

export function App() {
    const [page, setPage] = useState("home")  
    const [token, setToken] = useState(localStorage.getItem("token"))

    function handleLogout() {
        localStorage.removeItem("token")
        setToken(null)
        setPage("home")
    }

    if (token) {
        return (
            <div>
                <Main></Main>
                <button onClick={handleLogout}>Log out</button>
            </div>
        )
    }

    if (page === "register") {
        return <Register onback={() => setPage("home")} />
    }

    if (page === "login") {
        return (
        <div>
        <Login onback={() => setPage("home")} onlogin={(t) => setToken(t)} />
        </div>
)
    }

    return (
        <div>
            <Header
                oncreate={() => setPage("register")}
                onlogin={() => setPage("login")}
            />
            <Home />
        </div>
    )
}
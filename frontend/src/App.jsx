import { useState } from 'react'
import { Header, Register } from './header.jsx'
import { Login } from './login.jsx'
import { Home } from './content.jsx'
import './App.css'

export function App() {
    const [page, setPage] = useState("home")   // "home" | "register" | "login"
    const [token, setToken] = useState(localStorage.getItem("token"))

    function handleLogout() {
        localStorage.removeItem("token")
        setToken(null)
        setPage("home")
    }

    if (token) {
        return (
            <div>
                <button onClick={handleLogout}>Log out</button>
            </div>
        )
    }

    if (page === "register") {
        return <Register onback={() => setPage("home")} />
    }

    if (page === "login") {
        return <Login onback={() => setPage("home")} onLogin={(t) => setToken(t)} />
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
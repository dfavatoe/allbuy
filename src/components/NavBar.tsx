import React from 'react'
import { Link } from 'react-router'

function NavBar() {
    return (
        <nav>
            <Link to={"/"}>Home</Link> | <Link to={"/searchproduct"}>Search</Link> | <Link to={"/register"}>Register</Link>
        </nav>
    )
}

export default NavBar
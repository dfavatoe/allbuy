import React from 'react'
import { Link } from 'react-router'


function LogInOrSignUp() {
    return (
        <>
            <h1>Log In</h1>
            <div>Still not registered?</div>
            <Link to={"/register/signup"}>Sign Up</Link>
        </>

    )
}

export default LogInOrSignUp
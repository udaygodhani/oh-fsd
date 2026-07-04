import React, { useState } from 'react'

function Auth() {
    const [formType, setFormType] = useState("signup")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
    }

    const handleSignup = async (e) => {
        e.preventDefault();
    }
    return (
        <form onSubmit={formType === "login" ? handleLogin : handleSignup} className="">
            {!formType === "login" && (
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={name}
                    className=""
                    required
                />
            )}
            <input
                type="email"
                placeholder="Enter Email"
                className=""
                required
            />
            <input
                type="password"
                placeholder={`${showPassword?"text":"password"}`}
            />
        </form>
    )
}

export default Auth
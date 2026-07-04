import React, { useContext, useEffect, useState } from 'react'
import api from '../../api/api';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/data/UserDataProvider';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();
    const [formType, setFormType] = useState("signup")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)    
        localStorage.setItem("formtype","login")
        try {
            const response = await api.post("/api/auth/login",{email,password});
            
            const user = response.data.user;
            setUser(user);
            localStorage.setItem("user",JSON.stringify(user));
            toast.success(response.data.message)
            navigate("/")
        } catch (error) {
            setLoading(false)
            toast.error(error.message || "Something Went Wrong.")
        }
        finally{
            setLoading(false)
        }
    }
    
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true)
        localStorage.setItem("formtype","signup")
        try {
            const response = await api.post("/api/auth/register", { name, email, password })
            toast.success(response.data.message)
            setFormType("otpverify")
        } catch (error) {
            toast.error(error.message || "Something Went Wrong.")
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        setLoading(true)
        localStorage.setItem("formtype","otpverify")
        try {
            const response = await api.post("/api/auth/verifyemail",{email,otp});
            console.log(response)
            const user = response.data.user;
            setUser(user)
            localStorage.setItem("user",JSON.stringify(user));
            toast.success(response.data.message)
            localStorage.removeItem("formtype")
            setFormType("login")
        } catch (error) {
            console.log(error)
            toast.error(error.message || "Something Went Wrong.")
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        const formtype = localStorage.getItem("formtype");
        setFormType(formtype)
    },[])
    return (
        <div className="min-h-screen w-full flex justify-center items-center relative">
            <div className="w-[90%] relative overflow-hidden flex justify-center items-center rounded-2xl sm:w-[60vh]">{/* Border Animation */}
                <form onSubmit={formType === "login" ? handleLogin : formType === "signup" ? handleSignup : handleOtpVerify} className="relative flex flex-col items-center justify-start gap-3 p-1 rounded-2xl w-full h-full">
                    <div className="movingdiv absolute top-[50%] left-[50%] -translate-[50%] w-100 h-200 -z-1 flex flex-col justify-center items-center ">
                        <div className="w-full h-1/2 upper bg-[#892467]"></div>
                        <div className="w-full h-1/2 lower bg-[#117193]"></div>
                    </div>

                    <div className="w-full h-auto flex flex-col items-center justify-start relative bg-[#0B081E] rounded-2xl text-white !z-5 p-3 ">
                        <h1 className="text-2xl font-semibold my-3">{formType === "login" ? "Login" : formType === "signup" ? "Sign Up" : "Verify Email"}</h1>
                        {formType === "signup" && (
                            <input
                                type="text"
                                placeholder="Enter Username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-b border-[#892467] outline-4 outline-transparent focus:outline-[#892467] focus:border-transparent transition-all 
    -b             focus:rounded-lg                duration-200 w-[90%] p-[8px_15px] mt-3 placeholder:text-[#117193] text-white text-xl"
                                required
                            />
                        )}
                        {(formType === "signup" || formType === "login") && (
                            <>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    className="border-b border-[#892467] outline-4 outline-transparent focus:outline-[#892467] focus:border-b-transparent focus:rounded-lg transition-all duration-200 w-[90%] p-[8px_15px] mt-3 placeholder:text-[#117193] text-white text-xl"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    placeholder="Enter Password"
                                    type={`${showPassword ? "text" : "password"}`}
                                    className="border-b border-[#892467] outline-4 outline-transparent focus:outline-[#892467] focus:border-b-transparent focus:rounded-lg transition-all duration-200 w-[90%] p-[8px_15px] mt-3 placeholder:text-[#117193] text-white text-xl"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </>)}
                        {formType === "otpverify" && (
                            <input
                                type="text"
                                placeholder="Enter Otp"
                                className="border-b border-[#892467] outline-4 outline-transparent focus:outline-[#892467] focus:border-b-transparent focus:rounded-lg transition-all duration-200 w-[90%] p-[8px_15px] mt-3 placeholder:text-[#117193] text-white text-xl"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        )}
                        <button disabled={loading} className="w-[90%] my-3 rounded-lg text-xl py-1 bg-[#117193] disabled:bg-[#0c516a] relative">{formType === "login" ? loading ? <div className="w-full h-full flex items-center justify-center gap-3 py-1"><div className="w-7 h-7 border-3 border-[#cacaca] border-t-transparent rounded-full animate-spin" /><span className="text-[#cacaca]">Submiting....</span></div> : "Login" : formType === "signup" ? loading ? <div className="w-full h-full flex items-center justify-center gap-3 py-1"><div className="w-7 h-7 border-3 border-[#cacaca] border-t-transparent rounded-full animate-spin" /><span className="text-[#cacaca]">Submiting....</span></div> : "Submit" : loading ? <div className="w-full h-full flex items-center justify-center gap-3 py-1"><div className="w-7 h-7 border-3 border-[#cacaca] border-t-transparent rounded-full animate-spin" /><span className="text-[#cacaca]">Submiting....</span></div> : "Verify"}</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Auth
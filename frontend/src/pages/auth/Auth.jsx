import React, { useContext, useEffect, useState } from 'react'
import api from '../../api/api';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/data/UserDataProvider';
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import { FiEye } from "react-icons/fi"; // <FiEye />
import { FiEyeOff } from "react-icons/fi"; // <FiEyeOff />

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
    const [finishCountDown, setFinishCountDown] = useState(true)
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [eyeOpen, setEyeOpen] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Loging....");
        setLoading(true)
        localStorage.setItem("formtype", "login")
        try {
            const response = await api.post("/api/auth/login", { email, password });
            const user = response.data.user;
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success(response.data.message)
            navigate("/")
        } catch (error) {
            toast.dismiss(loadingToast)
            setLoading(false)
            toast.error(error.message || "Something Went Wrong.")
        }
        finally {
            toast.dismiss(loadingToast)
            setLoading(false)
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Account Creating...");
        setLoading(true)
        localStorage.setItem("formtype", "signup")
        try {
            const response = await api.post("/api/auth/register", { name, email, password })
            toast.success(response.data.message)
            setShowEmailInput(false);
            setFormType("otpverify");
        } catch (error) {
            toast.dismiss(loadingToast)
            toast.error(error.message || "Something Went Wrong.")
            setLoading(false)
        } finally {
            toast.dismiss(loadingToast)
            setLoading(false)
        }
    }

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        setLoading(true)
        localStorage.setItem("formtype", "otpverify")
        const loadingToast = toast.loading("Sending OTP...");
        try {
            const response = await api.post("/api/auth/verifyemail", { email, otp });
            console.log(response)
            const user = response.data.user;
            setUser(user)
            localStorage.setItem("user", JSON.stringify(user));
            toast.success(response.data.message)
            localStorage.removeItem("formtype")
            setFormType("login")
        } catch (error) {
            toast.dismiss(loadingToast)
            console.log(error)
            toast.error(error.message || "Something Went Wrong.")
        } finally {
            toast.dismiss(loadingToast)
            setLoading(false)
        }
    }
    const handleResendOtp = async () => {
        // If email is empty, first ask the user to enter it.
        if (!email) {
            setShowEmailInput(true);
            return;
        }
        const loadingToast = toast.loading("Sending OTP...");
        try {
            const response = await api.post("/api/auth/resendOtp", {
                email,
            });
            toast.success(response.data.message, {
                id: loadingToast,
            });

            setShowEmailInput(false);
        } catch (error) {
            toast.dismiss(loadingToast)

            toast.error(
                error.response?.data?.message || "Something went wrong!",
                {
                    id: loadingToast,
                }
            );
        } finally {
            toast.dismiss(loadingToast)

        }
    };
    useEffect(() => {
        const formtype = localStorage.getItem("formtype");
        if (formtype) {
            setFormType(formtype)
        } else {
            setFormType("signup")
        }
    }, [])
    useEffect(() => {
        if (password.length > 0)
            setEyeOpen(true)
    }, [password])
    useEffect(() => {
        if (user) {
            navigate("/")
        } else {
            return
        }
    })
    return (

        <div id='loginbg' className='min-w-screen min-h-screen flex justify-center items-center 
        
        bg-[url("/m.png")]'>
            <div className="min-h-screen w-full flex justify-center items-center relative z-15">
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

                            {(formType === "signup" ||
                                formType === "login" ||
                                (formType === "otpverify" && showEmailInput)) && (
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        className="border-b border-[#892467]
                                            outline-4
                                            outline-transparent
                                            focus:outline-[#892467]
                                            focus:border-b-transparent
                                            focus:rounded-lg
                                            transition-all
                                            duration-200
                                            w-[90%]
                                            p-[8px_15px]
                                            mt-3
                                            placeholder:text-[#117193]
                                            text-white
                                            text-xl"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                )}
                            {(formType === "login" || formType === "signup") && (
                                <div className="flex items-center relative w-[90%]">
                                    <input
                                        placeholder="Enter Password"
                                        type={`${showPassword ? "text" : "password"}`}
                                        className="border-b border-[#892467] outline-4 outline-transparent focus:outline-[#892467] focus:border-b-transparent focus:rounded-lg transition-all duration-200 w-[100%] p-[8px_15px] mt-3 placeholder:text-[#117193] text-white text-xl"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {eyeOpen &&
                                        <h1 onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-2 text-2xl">
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </h1>
                                    }
                                </div>
                            )}

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
                            {formType === "login" ? <p>Don't have account? <span onClick={() => setFormType("signup")} className="text-[#892467] font-semibold cursor-pointer">Click</span></p> : formType === "signup" ? <p>Already have account? <span onClick={() => setFormType("login")} className="text-[#892467] font-semibold cursor-pointer">Click</span></p> : <div>
                                {finishCountDown ? (
                                    <Countdown
                                        onComplete={() => setFinishCountDown(false)}
                                        date={Date.now() + 20000}
                                    />
                                ) : (
                                    <div className="flex gap-2">
                                        <span>Didn't receive OTP?</span>

                                        <span
                                            onClick={() => setShowEmailInput(true)}
                                            className="text-[#892467] font-semibold cursor-pointer"
                                        >
                                            Change Email
                                        </span>

                                        <span>|</span>

                                        <span
                                            onClick={handleResendOtp}
                                            className="text-[#117193] font-semibold cursor-pointer"
                                        >
                                            Resend OTP
                                        </span>
                                    </div>
                                )}
                            </div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth
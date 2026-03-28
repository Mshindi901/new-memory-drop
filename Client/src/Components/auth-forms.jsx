import { useState } from "react"
import axios from "axios";
import {ToastContainer, toast, Bounce} from 'react-toastify'

export default function AuthForms() {
    const [isSignUp, setIsSignUp] = useState(true);
    const [registrationData, setRegistrationData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', registrationData);
            if(!response.data.success) {
                console.error('Registration failed:', response.data.message);
                toast.error(response.data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                return;
            };
            if(response.data.success) {
                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            };
        } catch (error) {
            console.error('Registration failed:', error);
            return;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signin', loginData);
            if(!response.data.success) {
                console.error('Login failed:', response.data.message);
                toast.error(response.data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            };
            if(response.data.success) {
                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                return
            };
                return;
        } catch (error) {
            console.error('Login failed:', error);
            return;
        }
    };
    return(
        <div className="md:w-1/4 w-full h-fit p-3 flex flex-col gap-3 rounded-3xl border bg-white text-black">
            {
                isSignUp && (
                <>
                    <h1 className="md:text-2xl text-xl font-bold">Welcome!</h1>
                    <p className="text-sm text-slate-600">Create an account to start sharing your memories with the world</p>
                    <span className="flex flex-row gap-2 text-sm text-slate-600">Already have an account? <button className="underline hover:no-underline text-blue-800" onClick={toggleForm}>Login</button></span>
                    <form action="" method="post" className="w-full flex flex-col gap-3" onSubmit={handleRegistration}>
                        <input type="text" name="" id="" value={registrationData.name} onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}  placeholder="Enter Your Name" className="px-2 py-4 rounded-3xl border border-slate-700 focus:ring-1 focus:ring-black"/>
                        <input type="email" name="" id="" value={registrationData.email} onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})} placeholder="Enter Your Email" className="px-2 py-4 rounded-3xl border border-slate-700 focus:ring-1 focus:ring-black"/>
                        <input type="password" name="" id="" value={registrationData.password} onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})} placeholder="Create a Password" className="px-2 py-4 rounded-3xl border border-slate-700 focus:ring-1 focus:ring-black"/>
                        <button type="submit" className="w-full py-4 rounded-3xl bg-black text-white text-sm">Sign Up</button>
                    </form>
                </>
                )
            }
            {
                !isSignUp && (
                    <>
                        <h1 className="md:text-2xl text-xl font-bold">Welcome Back!</h1>
                        <p className="text-sm text-slate-600">Login to your account to start sharing your memories with the world</p>
                        <span className="flex flex-row gap-2 text-sm text-slate-600">Don't have an account? <button className="underline hover:no-underline text-blue-800" onClick={toggleForm}>Sign Up</button></span>

                        <form action="" method="post" className="w-full flex flex-col gap-3" onSubmit={handleLogin}>
                            <input type="email" name="" id="" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} placeholder="Enter Your Email" className="px-2 py-4 rounded-3xl border border-slate-700 focus:ring-1 focus:ring-black"/>
                            <input type="password" name="" id="" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} placeholder="Enter Your Password" className="px-2 py-4 rounded-3xl border border-slate-700 focus:ring-1 focus:ring-black"/>
                            <button type="submit" className="w-full py-4 rounded-3xl bg-black text-white text-sm">Login</button>
                        </form>
                    </>
                )
            }
        </div>
    )
}
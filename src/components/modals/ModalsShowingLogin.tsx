import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import { IoClose, IoPerson } from 'react-icons/io5'
import { RiLockPasswordLine } from 'react-icons/ri'
import { ModalsShowingLoginTypes } from '../../types/ModalsShowingLoginTYpes';

import LOGOPNG from "../../imgs/nft.png";
import { isEmail } from '../../utilities';
import { RootUserTokenContext } from '../../contexts';
import { AuthAPI } from '../../APIs/AuthApi';
const ModalsShowingLogin = ({ isShownModalsSignIn, toggleShowSigninModal, responseGoogle, errorFuncOnLogIn, navSignin }:
    ModalsShowingLoginTypes) => {

    const userTokenContext = React.useContext(RootUserTokenContext)

    const [mail, setMail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorOnLogin, setErrorOnLogin] = useState<string>("")

    const submitForLogin = () => {
        if (isEmail(mail)) {
            let respAuth = new AuthAPI()
            let data = { email: mail, password: password }
            respAuth
                .login_account(data)
                .then((res) => {
                    if (!res.token) {
                        setErrorOnLogin(res.error[0])
                    }
                    else {
                        console.log("res", res.token)
                        userTokenContext?.setToken(JSON.stringify(res.token))
                        localStorage.setItem('userToken', JSON.stringify(res.token));
                        setTimeout(() => {
                            document.location.reload()
                        }, 1000)
                        setMail("")
                        setPassword("")
                        // setErrorOnLogin("")
                        //   localStorage.setItem('dataUser', JSON.stringify(dataStructured));
                    }
                })
        }

    }
    return (
        <>
            {
                isShownModalsSignIn && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container">
                                <button
                                    onClick={toggleShowSigninModal} className="cModals-container-close">
                                    <IoClose
                                        color="white"
                                        size={18}
                                    />
                                </button>
                                <img src={LOGOPNG} className="" alt="Imgs" />
                                <h2 className="text-lg font-MontSemiBold text-white mt-5 mb-3">Sign In</h2>
                                <h2 className="text-sm font-Regular text-center text-slate-200 mt-1">Please login to your account</h2>

                                <div className="mt-5" style={{ textAlign: "center", width: "90%" }}>
                                    <p className="text-sxl font-MontBold text-white underline underline-offset-1">Enter your mail</p>

                                    <div className="control-container-S mt-3 mb-2" id='cPar'>
                                        <IoPerson
                                            color="white"
                                            size={18}
                                        />
                                        <input
                                            value={mail}
                                            onChange={(next) => setMail(next.target.value)}
                                            placeholder='Your mail'
                                            type="text"
                                            className="control-input-S" />
                                    </div>
                                </div>

                                <div className="mt-3" style={{ textAlign: "center", width: "90%", }}>
                                    <p className="text-sxl font-MontBold text-white underline underline-offset-1">Enter your password</p>

                                    <div className="control-container-S mt-3 mb-2" id='cPar'>
                                        <RiLockPasswordLine
                                            color="white"
                                            size={18}
                                        />
                                        <input
                                            value={password}
                                            onChange={(next) => setPassword(next.target.value)}
                                            placeholder='Your password'
                                            type="password"
                                            className="control-input-S" />
                                    </div>
                                </div>
                                {errorOnLogin.length > 0 &&
                                    (<h2 className="text-sxl2 font-Regular text-red-400 mt-5">{errorOnLogin}</h2>)}

                                <div style={{ width: "90%", marginBottom: 5 }}>
                                    <button
                                        onClick={submitForLogin}
                                        className="bg-violet-500
                                        hover:bg-violet-600
                                        active:bg-violet-700 
                                        focus:outline-none w-full
                                        focus:ring-2 text-sm
                                        focus:ring-violet-300
                                            py-2 text-white px-5
                                            rounded-2xl mt-5">
                                        Submit
                                    </button>
                                </div>

                                <h2 className="text-sm text-center font-Regular text-slate-200 mt-3">You have not an account yet /
                                    <button
                                        onClick={navSignin}
                                        className="font-MontSemiBold"
                                        style={{ textDecoration: "underline", marginLeft: ".5rem" }}>Sign Up</button></h2>


                                <div className="mt-4">
                                    <GoogleLogin
                                        onSuccess={responseGoogle}
                                        onError={errorFuncOnLogIn}

                                    />
                                </div>
                            </div>
                        </div>
                    </>

                )
            }
        </>
    )
}

export default ModalsShowingLogin
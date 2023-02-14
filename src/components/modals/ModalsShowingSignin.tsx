import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import { IoClose, IoPerson } from 'react-icons/io5'
import { RiLockPasswordLine } from 'react-icons/ri'
import LOGOPNG from "../../imgs/nft.png";
import { ModalsShowingSigninTypes } from '../../types/ModalsShowingLoginTYpes copy';
const ModalsShowingSignin = ({ isShownModalsFirstSignIn, toggleShowSignUpModal, responseGoogle, errorFuncOnLogIn, navLogin }:
    ModalsShowingSigninTypes) => {
    return (
        <>
            {
                isShownModalsFirstSignIn && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container">
                                <button
                                    onClick={toggleShowSignUpModal} className="cModals-container-close">
                                    <IoClose
                                        color="white"
                                        size={18}
                                    />
                                </button>
                                <img src={LOGOPNG} className="" alt="Imgs" />
                                <h2 className="text-lg font-MontSemiBold text-white mt-5 mb-3">Sign Up</h2>
                                <h2 className="text-sm font-Regular text-slate-200 mt-1">Create an account with your informations</h2>

                                <div className="mt-5" style={{ textAlign: "center", width: "90%" }}>
                                    <p className="text-sxl font-MontBold text-white underline underline-offset-1">Enter your pseudo</p>

                                    <div className="control-container-S mt-3 mb-2" id='cPar'>
                                        <IoPerson
                                            color="white"
                                            size={18}
                                        />
                                        <input
                                            placeholder='Your pseudo'
                                            type="text"
                                            className="control-input-S" />
                                    </div>
                                </div>

                                <div className="mt-5" style={{ textAlign: "center", width: "90%" }}>
                                    <p className="text-sxl font-MontBold text-white underline underline-offset-1">Enter your mail</p>

                                    <div className="control-container-S mt-3 mb-2" id='cPar'>
                                        <IoPerson
                                            color="white"
                                            size={18}
                                        />
                                        <input
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

                                            placeholder='Your password'
                                            type="password"
                                            className="control-input-S" />
                                    </div>
                                </div>

                                <div className="mt-3" style={{ textAlign: "center", width: "90%", }}>
                                    <p className="text-sxl font-MontBold text-white underline underline-offset-1">Confirm your password</p>

                                    <div className="control-container-S mt-3 mb-2" id='cPar'>
                                        <RiLockPasswordLine
                                            color="white"
                                            size={18}
                                        />
                                        <input

                                            placeholder='Confirm password'
                                            type="password"
                                            className="control-input-S" />
                                    </div>
                                </div>

                                <div style={{ width: "90%", marginBottom: 5 }}>
                                    <button className="bg-violet-500
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

                                <h2 className="text-sm text-center font-Regular text-slate-200 mt-3">You have an account
                                    <button
                                        onClick={navLogin}
                                        className="font-MontSemiBold"

                                        style={{ textDecoration: "underline", marginLeft: ".5rem" }}>Sign In</button></h2>
                            </div>
                        </div>
                    </>

                )
            }
        </>
    )
}

export default ModalsShowingSignin
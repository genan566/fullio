import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoClose, IoPerson } from 'react-icons/io5'
import { RiLockPasswordLine } from 'react-icons/ri'
import { UsersAPI } from '../../APIs/UsersAPi';
import { RootUserContext } from '../../contexts';
import { useAppDispatch, useAppSelector } from '../../hooks/modalsHooks';
import LOGOPNG from "../../imgs/nft.png";
import { TOGGLE_MODAL_FOR_LOGIN, TOGGLE_MODAL_FOR_SIGNUP } from '../../redux/constants/ModalsConstants';
import { RootState } from '../../redux/store';
import { ModalsShowingSigninTypes } from '../../types/ModalsShowingLoginTYpes copy';
import { notify } from '../../utilities/Toaster';
import ErrorText from '../ErrorText';

type Inputs = {
    pseudo: string,
    email: string,
    password: string,
    name: string,
};

const ModalsShowingSignin = ({ isShownModalsFirstSignIn, toggleShowSignUpModal, responseGoogle, errorFuncOnLogIn, navLogin }:
    ModalsShowingSigninTypes) => {
    const dispatch = useAppDispatch();
    const userContext = React.useContext(RootUserContext)
    const { showModalForSignUp } = useAppSelector((state: RootState) => state.modalsReducer)


    const { register, handleSubmit, setValue,
        resetField, formState: { errors } } = useForm<Inputs>();

    const handleSuscribeToSale = (gettedData: Inputs) => {

        let user_api = new UsersAPI()
            .create_user(gettedData)
            .then(res => {
                dispatch({ type: TOGGLE_MODAL_FOR_LOGIN, payload: true })
                notify("Création de compte avec succès")
            })
    }

    const onSubmit: SubmitHandler<Inputs> = data => {
        handleSuscribeToSale(data)
    };
    return (
        <>
            {
                showModalForSignUp && !userContext.user.id && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container">
                                <button
                                    onClick={() => dispatch({ type: TOGGLE_MODAL_FOR_SIGNUP, payload: false })} className="cModals-container-close">
                                    <IoClose
                                        color="white"
                                        size={18}
                                    />
                                </button>
                                <img src={LOGOPNG} className="" alt="Imgs" />
                                <h2 className="text-lg font-MontSemiBold text-white mt-5 mb-3">Sign Up</h2>
                                <h2 className="text-sm font-Regular text-slate-200 mt-1">Create an account with your informations</h2>

                                <form action="" className='w-full mx-auto' onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mt-5 w-full">
                                        <p className="text-sxl font-MontBold text-white underline underline-offset-1 text-center">Enter your pseudo</p>

                                        <div className="control-container-S mt-3 mb-2" id='cPar'>
                                            <IoPerson
                                                color="white"
                                                size={18}
                                            />
                                            <input
                                                {...register("pseudo", { required: true })}
                                                placeholder='Your pseudo'
                                                type="text"
                                                className="control-input-S" />
                                        </div>

                                        {errors.pseudo && <ErrorText />}
                                    </div>

                                    <div className="mt-5 w-full">
                                        <p className="text-sxl font-MontBold text-white underline underline-offset-1 text-center">Enter your name</p>

                                        <div className="control-container-S mt-3 mb-2" id='cPar'>
                                            <IoPerson
                                                color="white"
                                                size={18}
                                            />
                                            <input
                                                {...register("name", { required: true })}
                                                placeholder='Your name'
                                                type="text"
                                                className="control-input-S" />
                                        </div>
                                        {errors.name && <ErrorText />}
                                    </div>

                                    <div className="mt-5 w-full">
                                        <p className="text-sxl font-MontBold text-white underline underline-offset-1 text-center">Enter your mail</p>

                                        <div className="control-container-S mt-3 mb-2" id='cPar'>
                                            <IoPerson
                                                color="white"
                                                size={18}
                                            />
                                            <input
                                                {...register("email", { required: true })}
                                                placeholder='Your mail'
                                                type="text"
                                                className="control-input-S" />
                                        </div>
                                        {errors.email && <ErrorText />}
                                    </div>

                                    <div className="mt-3 w-full">
                                        <p className="text-sxl font-MontBold text-white underline underline-offset-1 text-center">Enter your password</p>

                                        <div className="control-container-S mt-3 mb-2" id='cPar'>
                                            <RiLockPasswordLine
                                                color="white"
                                                size={18}
                                            />
                                            <input
                                                {...register("password", { required: true })}
                                                placeholder='Your password'
                                                type="password"
                                                className="control-input-S" />
                                        </div>

                                        {errors.password && <ErrorText />}
                                    </div>

                                    {/* <div className="mt-3" style={{ textAlign: "center", width: "90%", }}>
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
                                    </div> */}

                                    <div className='w-full'>
                                        <button
                                            type='submit'
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
                                </form>

                                <h2 className="text-sm text-center font-Regular text-slate-200 mt-3">You have an account
                                    <button
                                        onClick={() => {
                                            dispatch({ type: TOGGLE_MODAL_FOR_LOGIN, payload: true })
                                        }}
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
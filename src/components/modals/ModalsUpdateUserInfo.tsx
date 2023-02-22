import React from 'react'
import { IoClose, IoFileTray, } from 'react-icons/io5'
import { MdMail, MdOutlinePriceChange, MdPerson, MdTitle } from 'react-icons/md'
import { RiShoppingBasket2Line } from 'react-icons/ri'

import CustomIMG2 from "../../imgs/pexels-pixabay.jpg"
import { RootNftContext, RootUserContext, RootUserTokenContext } from '../../contexts'
import { useAppDispatch, useAppSelector } from '../../hooks/modalsHooks'
import { TOGGLE_MODAL_ADDING_FAQS, TOGGLE_MODAL_SUSCRIPTION, TOGGLE_MODAL_UPDATE_USER_INFO } from '../../redux/constants/ModalsConstants'
import { RootState } from '../../redux/store'

import LOGOPNG from "../../imgs/nft.png";
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorText from '../ErrorText'
import { FaqsAPI } from '../../APIs/FaqsAPI'
import { SET_FAQS } from '../../redux/constants/FAQsConstants'
import { UserTypesValues } from '../../types/UserTypeValues'
import { AuthAPI } from '../../APIs/AuthApi'
import { FileInterface } from '../../types/FileInterface'

const ModalsUpdateUserInfo = () => {

    const userTokenContext = React.useContext(RootUserTokenContext)
    const { showModalUpdateUserInfo } = useAppSelector((state: RootState) => state.modalsReducer)
    const dispatch = useAppDispatch();
    const userContext = React.useContext(RootUserContext)
    const [file, setFile] = React.useState<FileInterface>({} as FileInterface);
    const customDispatcher = () => {
        setFile({} as FileInterface)
        dispatch({ type: TOGGLE_MODAL_ADDING_FAQS, payload: false })
    }

    const updateUserInfo = (dataSended: any) => {
        let authMee = new AuthAPI()
        let token = userTokenContext.token

        authMee
            .retrive_mee_update(token, dataSended)
            .then(data => {
                Boolean(file.file) && authMee
                    .upload_image_to_user(userContext.user.id, { image: file.file }, token)
                    .then(() => {
                        authMee
                            .retrive_me__account(token)
                            .then(data => {
                                userContext.setUser(data)
                                dispatch({ type: TOGGLE_MODAL_UPDATE_USER_INFO, payload: false })
                            })
                    })
                if (!Boolean(file.file)) {
                    userContext.setUser(data)
                    dispatch({ type: TOGGLE_MODAL_UPDATE_USER_INFO, payload: false })
                }
            })

        // Boolean(file.file) && authMee
        //     .retrive_mee_update(token, {
        //         ...dataSended,
        //         image: new FormData().append("image", file.file),
        //         // id: userContext.user.id
        //     }, true)
        //     .then(data => {
        //         console.log("data IMG", data)
        // userContext.setUser(data)
        // dispatch({ type: TOGGLE_MODAL_UPDATE_USER_INFO, payload: false })
        //     })

        // !Boolean(file.file) && authMee
        //     .retrive_mee_update(token, dataSended)
        // // .then(data => {
        // //     userContext.setUser(data)
        // //     dispatch({ type: TOGGLE_MODAL_UPDATE_USER_INFO, payload: false })
        // // })
    }

    const { register, handleSubmit,
        resetField, formState: { errors } } = useForm<UserTypesValues>();

    const handleSuscribeToSale = (gettedData: UserTypesValues) => {
        updateUserInfo(gettedData)
    }

    const onSubmit: SubmitHandler<UserTypesValues> = data => {
        handleSuscribeToSale(data)
    };

    function handleChange(e: any) {
        console.log(e.target.files[0]);
        setFile({
            asPreview: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
        });
    }

    return (
        <>
            {
                showModalUpdateUserInfo && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container p0">


                                <img src={LOGOPNG} className="" alt="Imgs" />
                                <div className="min-[800px]:px-[2rem] px-[1rem] w-full mb-[1rem]">
                                    <h2 className="text-lg font-MontSemiBold text-white mt-5 
                                    mb-2 pb-[1rem] text-center border-b w-full border-slate-700">Update Profile</h2>
                                </div>
                                <h2 className="text-sm font-Regular 
                                    text-center mx-auto w-3/4 text-slate-200">Please follow this step to update your account please.</h2>

                                <button
                                    onClick={customDispatcher} className="cModals-container-close">
                                    <IoClose
                                        color="white"
                                        size={15}
                                    />
                                </button>

                                <form id="form-scrollable"
                                    className='text-center w-full flex flex-col 
                                    items-center mt-[1rem]
                                 pt-[.5rem] border-b pb-[1.5rem] border-slate-700' onSubmit={handleSubmit(onSubmit)}>

                                    <div className="w-full">
                                        <figure className="corerImg">
                                            <div className="corerImg-action">
                                                <input type="file"
                                                    onChange={handleChange}
                                                    // {...register("title", { required: true })}
                                                    className='opacity-0 absolute top-0 left-0 right-0 bottom-0' name="" id="" />
                                                <IoFileTray
                                                    // color="white"
                                                    size={15}
                                                />
                                            </div>
                                            {
                                                userContext?.user.id ? <>

                                                    <img
                                                        src={file.asPreview || userContext?.user.image}
                                                        alt="user Profile" />
                                                </> : <>
                                                    <img
                                                        src={file.asPreview || CustomIMG2}
                                                        alt="user Profile" />
                                                </>
                                            }
                                        </figure>
                                    </div>

                                    <div className='mt-[1.5rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Modify your email</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdMail
                                                color="white"
                                                size={18}
                                            />
                                            <input {...register("email", { required: true })}
                                                placeholder='Email'
                                                type="text"
                                                defaultValue={userContext.user.email}
                                                className="control-input-S" />
                                        </div>
                                        {errors.email && <ErrorText />}
                                    </div>


                                    <div className='mt-[1.5rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Modify your pseudo</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdMail
                                                color="white"
                                                size={18}
                                            />
                                            <input {...register("pseudo",)}
                                                placeholder='Pseudo'
                                                type="text"
                                                defaultValue={userContext.user.pseudo}
                                                className="control-input-S" />
                                        </div>
                                        {errors.pseudo && <ErrorText />}
                                    </div>


                                    <div className='mt-[1.2rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Modify your name</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdPerson
                                                color="white"
                                                size={18}
                                            />
                                            <input {...register("name", { required: true })}
                                                placeholder='Name'
                                                defaultValue={userContext.user.name}
                                                type="text"
                                                className="control-input-S" />
                                        </div>
                                        {errors.name && <ErrorText />}
                                    </div>

                                    <div className='mt-[1.5rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Modify your account_balance_btc</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdMail
                                                color="white"
                                                size={18}
                                            />
                                            <input {...register("account_balance_btc", { required: true })}
                                                placeholder='Account BTC balance'
                                                type="number"
                                                defaultValue={userContext.user.account_balance_btc}
                                                className="control-input-S" />
                                        </div>
                                        {errors.account_balance_btc && <ErrorText />}
                                    </div>

                                    <div className='mt-[1.5rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Modify your account_balance_eth</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdMail
                                                color="white"
                                                size={18}
                                            />
                                            <input {...register("account_balance_eth", { required: true })}
                                                placeholder='Account ETH balance'
                                                type="number"
                                                defaultValue={userContext.user.account_balance_eth}
                                                className="control-input-S" />
                                        </div>
                                        {errors.account_balance_eth && <ErrorText />}
                                    </div>

                                    <div className="mt-5 w-3/4">
                                        <button
                                            type='submit'
                                            // onClick={handleSuscribeToSale}
                                            className="bg-violet-600 flex items-center justify-center gap-1 w-full
                                                    hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                                                    focus:outline-none
                                                    text-sm font-MontSemiBold
                                                    focus:ring-2
                                                    focus:ring-gray-500
                                                        py-1 text-white px-[1rem]
                                                        rounded-md">
                                            <RiShoppingBasket2Line
                                                // color="white"
                                                size={17}
                                            /> <p>Update</p>
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </>

                )
            }
        </>
    )
}

export default ModalsUpdateUserInfo
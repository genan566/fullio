import React from 'react'
import { IoClose, IoFileTray, } from 'react-icons/io5'
import { MdMail, MdPerson, } from 'react-icons/md'
import { RiShoppingBasket2Line } from 'react-icons/ri'

import CustomIMG2 from "../../imgs/pexels-pixabay.jpg"
import { RootAdminEditableUserContext, RootUserContext, RootUserTokenContext } from '../../contexts'
import { useAppDispatch, useAppSelector } from '../../hooks/modalsHooks'
import { TOGGLE_MODALS_EDIT_USERS, TOGGLE_MODAL_UPDATE_USER_INFO } from '../../redux/constants/ModalsConstants'
import { RootState } from '../../redux/store'

import LOGOPNG from "../../imgs/nft.png";
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorText from '../ErrorText'
import { UserTypesValues } from '../../types/UserTypeValues'
import { AuthAPI } from '../../APIs/AuthApi'
import { FileInterface } from '../../types/FileInterface'
import { UsersAPI } from '../../APIs/UsersAPi'

const ModalsEditUserByAdmin = () => {

    const userTokenContext = React.useContext(RootUserTokenContext)
    const { showModalEditUser, } = useAppSelector((state: RootState) => state.modalsReducer)
    const dispatch = useAppDispatch();
    const userContext = React.useContext(RootUserContext)
    const userEditableContext = React.useContext(RootAdminEditableUserContext)
    const [file, setFile] = React.useState<FileInterface>({} as FileInterface);
    const customDispatcher = () => {
        setFile({} as FileInterface)
        dispatch({ type: TOGGLE_MODALS_EDIT_USERS, payload: false })
    }

    const updateUserInfo = (dataSended: any) => {
        let authMee = new AuthAPI()
        let token = userTokenContext.token

        authMee
            .retrive_account_update(token, userEditableContext?.userEdited.id, dataSended)
            .then(data => {
                let user_api = new UsersAPI()
                Boolean(file.file) && user_api
                    .retrieve_update_user(userTokenContext.token, userEditableContext?.userEdited.id, { image: file.file })
                    .then(() => {
                        customDispatcher()
                    })
                if (!Boolean(file.file)) {
                    customDispatcher()
                }
            })
    }

    const { register, handleSubmit, setValue,
        resetField, formState: { errors } } = useForm<UserTypesValues>();

    const handleSuscribeToSale = (gettedData: UserTypesValues) => {
        updateUserInfo(gettedData)
    }

    const loadEditableInfos = React.useCallback(() => {
        setValue("email", userEditableContext?.userEdited.email || "")
        setValue("account_balance_btc", userEditableContext?.userEdited.account_balance_btc || "")
        setValue("account_balance_eth", userEditableContext?.userEdited.account_balance_eth || "")
        setValue("name", userEditableContext?.userEdited.name || "")
    }, [userEditableContext?.userEdited])

    const onSubmit: SubmitHandler<UserTypesValues> = data => {
        handleSuscribeToSale(data)
        console.log("data", data)
    };

    function handleChange(e: any) {
        console.log(e.target.files[0]);
        setFile({
            asPreview: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
        });
    }

    React.useEffect(() => {
        loadEditableInfos()
    }, [loadEditableInfos])

    return (
        <>
            {
                showModalEditUser && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container p0">

                                <img src={LOGOPNG} className="" alt="Imgs" />
                                <div className="min-[800px]:px-[2rem] px-[1rem] w-full mb-[1rem]">
                                    <h2 className="text-lg font-MontSemiBold text-white mt-5 
                                    mb-2 pb-[1rem] text-center border-b w-full border-slate-700">Update Profile</h2>
                                </div>
                                <h2 className="text-sm font-Regular 
                                    text-center mx-auto w-3/4 text-slate-200">Please follow this step to update the account please.</h2>

                                <button
                                    onClick={() => {
                                        customDispatcher()
                                    }} className="cModals-container-close">
                                    <IoClose
                                        color="white"
                                        size={15}
                                    />
                                </button>

                                <form id="form-scrollable"
                                    className='text-center w-full flex flex-col 
                                    items-center mt-[1rem]
                                 pt-[.5rem] border-b pb-[1.5rem] border-slate-700'
                                    onSubmit={handleSubmit(onSubmit)}>

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
                                                        src={file.asPreview || userEditableContext?.userEdited.image || CustomIMG2}
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
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Modify the email</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdMail
                                                color="white"
                                                size={18}
                                            />
                                            <input
                                                required
                                                {...register("email", { required: true })}
                                                placeholder='Email'
                                                type="text"
                                                // value={userEditableContext?.userEdited.email} 
                                                id="email"
                                                // defaultValue={userEditableContext?.userEdited.email}
                                                className="control-input-S" />
                                        </div>
                                        {errors.email && <ErrorText />}
                                    </div>


                                    <div className='mt-[1.5rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Modify the pseudo</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdMail
                                                color="white"
                                                size={18}
                                            />
                                            <input
                                                {...register("pseudo",)}
                                                // required
                                                placeholder='Pseudo'
                                                type="text"
                                                // defaultValue={userEditableContext?.userEdited.pseudo}
                                                className="control-input-S" />
                                        </div>
                                        {errors.pseudo && <ErrorText />}
                                    </div>


                                    <div className='mt-[1.2rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Modify the name</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdPerson
                                                color="white"
                                                size={18}
                                            />
                                            <input
                                                required
                                                {...register("name", { required: true })}
                                                placeholder='Name'
                                                // defaultValue={userEditableContext?.userEdited.name}
                                                type="text"
                                                className="control-input-S" />
                                        </div>
                                        {errors.name && <ErrorText />}
                                    </div>

                                    <div className='mt-[1.5rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Modify the account_balance_btc</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdMail
                                                color="white"
                                                size={18}
                                            />
                                            <input
                                                required
                                                {...register("account_balance_btc", { required: true })}
                                                placeholder='Account BTC balance'
                                                type="number"
                                                // defaultValue={userEditableContext?.userEdited.account_balance_btc}
                                                className="control-input-S" />
                                        </div>
                                        {errors.account_balance_btc && <ErrorText />}
                                    </div>

                                    <div className='mt-[1.5rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Modify the account_balance_eth</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdMail
                                                color="white"
                                                size={18}
                                            />
                                            <input
                                                required
                                                {...register("account_balance_eth", { required: true })}
                                                placeholder='Account ETH balance'
                                                type="number"
                                                // defaultValue={userEditableContext?.userEdited.account_balance_eth}
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
                                            /> <p>Update Account</p>
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

export default ModalsEditUserByAdmin
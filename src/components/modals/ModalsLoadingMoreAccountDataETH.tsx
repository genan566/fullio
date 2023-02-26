import React from 'react'
import { IoClose, } from 'react-icons/io5'
import { MdMail } from 'react-icons/md'
import { RiShoppingBasket2Line } from 'react-icons/ri'

import { RootNftContext, RootUserContext, RootUserTokenContext } from '../../contexts'
import { useAppDispatch, useAppSelector } from '../../hooks/modalsHooks'
import { TOGGLE_MODAL_ADDING_FAQS, TOGGLE_MODAL_FOR_LOADING_MORE_WALLET_ETH, TOGGLE_MODAL_FOR_LOGIN, TOGGLE_MODAL_UPDATE_USER_INFO } from '../../redux/constants/ModalsConstants'
import { RootState } from '../../redux/store'

import LOGOPNG from "../../imgs/nft.png";
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorText from '../ErrorText'

import { UserTypesValues } from '../../types/UserTypeValues'
import { AuthAPI } from '../../APIs/AuthApi'
import { notify } from '../../utilities/Toaster'

const ModalsLoadingMoreAccountDataWalletETH = () => {

    const userTokenContext = React.useContext(RootUserTokenContext)
    const { showModalForLoadingMoreWalletETH } = useAppSelector((state: RootState) => state.modalsReducer)
    const dispatch = useAppDispatch();
    const userContext = React.useContext(RootUserContext)
    const customDispatcher = () => dispatch({ type: TOGGLE_MODAL_ADDING_FAQS, payload: false })

    const updateUserInfo = (dataSended: any) => {
        let authMee = new AuthAPI()
        let token = userTokenContext.token
        authMee.retrive_mee_update(token, dataSended)
        .then(data => {
            userContext.setUser(data)
            notify("Chargement réussie")
            dispatch({ type: TOGGLE_MODAL_UPDATE_USER_INFO, payload: false })
        })
    }

    const { register, handleSubmit,
        resetField, formState: { errors } } = useForm<UserTypesValues>();

    const handleSuscribeToSale = (gettedData: UserTypesValues) => {

        if (!Boolean(userContext.user.id)) {
            dispatch({ type: TOGGLE_MODAL_FOR_LOADING_MORE_WALLET_ETH, payload: false })
            dispatch({ type: TOGGLE_MODAL_FOR_LOGIN, payload: true })
            resetField("account_balance_eth")
        }
        else {
            updateUserInfo(gettedData)
        }
    }

    const onSubmit: SubmitHandler<UserTypesValues> = data => {
        handleSuscribeToSale(data)
    };

    // React.useEffect(() => {
    //     !Boolean(userContext.user.id) && dispatch({ type: TOGGLE_MODAL_FOR_LOGIN, payload: true })
    // }, [showModalForLoadingMoreWalletETH])

    return (
        <>
            {
                showModalForLoadingMoreWalletETH && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container p0">


                                <img src={LOGOPNG} className="" alt="Imgs" />
                                <div className="min-[800px]:px-[2rem] px-[1rem] w-full mb-[1rem]">
                                    <h2 className="text-lg font-MontSemiBold text-white mt-5 
                                    mb-2 pb-[1rem] text-center border-b w-full border-slate-700">Loading More ETH balance</h2>
                                </div>
                                <h2 className="text-sm font-Regular text-center mx-auto w-3/4 text-slate-200">Please follow this step to load more your wallet.</h2>

                                <button
                                    onClick={customDispatcher} className="cModals-container-close">
                                    <IoClose
                                        color="white"
                                        size={15}
                                    />
                                </button>

                                <form id="form-scrollable"
                                    className='text-center w-full flex flex-col 
                                    items-center max-h-[300px] overflow-y-scroll
                                 border-b pb-[1.5rem] border-slate-700' onSubmit={handleSubmit(onSubmit)}>
                                    {/* {
                                        userContext?.user.id ? <>

                                            <img
                                                className="h-30 w-20 object-cover shadow-lg"
                                                src={userContext?.user.image}
                                                alt="user Profile" />
                                        </> : <>
                                            <img
                                                className="h-30 w-20 object-cover shadow-lg"
                                                src={CustomIMG2}
                                                alt="user Profile" />
                                        </>
                                    } */}

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
                                            /> <p>Update Wallet</p>
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

export default ModalsLoadingMoreAccountDataWalletETH
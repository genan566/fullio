import React from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'
import { MdOutlinePriceChange, MdTitle } from 'react-icons/md'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { SaleHistoriesAPI } from '../../APIs/SaleHistoriesAPI'
import { RootNftContext, RootUserContext, RootUserTokenContext } from '../../contexts'
import { useAppDispatch, useAppSelector } from '../../hooks/modalsHooks'
import { TOGGLE_MODAL_SUSCRIPTION } from '../../redux/constants/ModalsConstants'
import { RootState } from '../../redux/store'



import LOGOPNG from "../../imgs/nft.png";
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorText from '../ErrorText'
import { AuthAPI } from '../../APIs/AuthApi'

type Inputs = {
    title: string,
    // price: string,
};

const ModalSubscription = () => {
    const userContext = React.useContext(RootUserContext)
    const nftContext = React.useContext(RootNftContext)
    const userTokenContext = React.useContext(RootUserTokenContext)
    const { showModalSuscription } = useAppSelector((state: RootState) => state.modalsReducer)
    const dispatch = useAppDispatch();
    const customDispatcher = () => dispatch({ type: TOGGLE_MODAL_SUSCRIPTION, payload: false })
    const [errorState, setStateError] = React.useState({ set: false, value: "" })


    const { register, handleSubmit,
        resetField, formState: { errors } } = useForm<Inputs>();

    const handleSuscribeToSale = (gettedData: { title: string, }) => {
        let token = userTokenContext.token
        let sale_posting = new SaleHistoriesAPI()
        if (Boolean(nftContext?.nftData?.id)) {
            let rootNFTID = nftContext?.nftData?.id
            console.log("nft context", rootNFTID)
            let data = { title: gettedData.title, nfts_id: rootNFTID }
            sale_posting.post__create_sale(token, data).then(res => {
                // 
                if (Boolean(res.non_field_errors))
                    setStateError({ set: true, value: res.non_field_errors })
                // return;
                else {
                    customDispatcher()
                    resetField("title")
                    let authMee = new AuthAPI()
                    let token = userTokenContext.token
                    authMee
                        .retrive_me__account(token)
                        .then(data => {
                            userContext.setUser(data)
                        })
                }

                console.log(res);
                // resetField("price")
            })
        }
    }

    const onSubmit: SubmitHandler<Inputs> = data => {
        handleSuscribeToSale(data)
    };

    return (
        <>
            {
                showModalSuscription && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container p0">

                                <img src={LOGOPNG} className="" alt="Imgs" />
                                <div className="min-[800px]:px-[2rem] px-[1rem] w-full mb-[1rem]">
                                    <h2 className="text-lg font-MontSemiBold text-white mt-5 mb-2 pb-[1rem] text-center border-b w-full border-slate-700">Subscription Form</h2>
                                </div>
                                <h2 className="text-sm font-Regular text-center text-slate-200">Please follow this step to subscribe.</h2>

                                <div className="w-full max-w-[200px]">
                                    {
                                        errorState.set && <p className="mt-[1rem] text-red-400 text-xs w-full text-center">{errorState.value}</p>
                                    }
                                </div>

                                <button
                                    onClick={() => {
                                        customDispatcher()
                                        resetField("title")
                                        setStateError({ set: false, value: "" })
                                    }} className="cModals-container-close">
                                    <IoClose
                                        color="white"
                                        size={15}
                                    />
                                </button>

                                <form className='text-center w-full flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>


                                    <div className='mt-[1.5rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Enter any title to your subscription</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdTitle
                                                color="white"
                                                size={18}
                                            />
                                            <input {...register("title", { required: true })}
                                                placeholder='Your title'
                                                type="text"
                                                className="control-input-S" />
                                        </div>
                                        {errors.title && <ErrorText />}
                                    </div>
                                    {/* 

                                    <div className='mt-[1.2rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Enter any price to your subscription</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdOutlinePriceChange
                                                color="white"
                                                size={18}
                                            />
                                            <input {...register("price", { required: true })}
                                                placeholder='Your price'
                                                type="number"
                                                className="control-input-S" />
                                        </div>
                                        {errors.price && <ErrorText />}
                                    </div> */}

                                    <div className="mt-5">
                                        <button
                                            type='submit'
                                            // onClick={handleSuscribeToSale}
                                            className="bg-violet-600 flex row items-center justify-center gap-1 w-fit 
                                        hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                                        focus:outline-none
                                        text-sm font-MontSemiBold
                                        focus:ring-2
                                        focus:ring-gray-500
                                            py-1 text-white px-[1rem]
                                            rounded-lg">
                                            <RiShoppingBasket2Line
                                                // color="white"
                                                size={17}
                                            /> <p>Suscribe Now</p>
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

export default ModalSubscription
import React from 'react'
import { IoClose, } from 'react-icons/io5'
import { MdOutlinePriceChange, MdTitle } from 'react-icons/md'
import { RiShoppingBasket2Line } from 'react-icons/ri'

import { RootNftContext, RootUserTokenContext } from '../../contexts'
import { useAppDispatch, useAppSelector } from '../../hooks/modalsHooks'
import { TOGGLE_MODAL_ADDING_FAQS, TOGGLE_MODAL_SUSCRIPTION } from '../../redux/constants/ModalsConstants'
import { RootState } from '../../redux/store'

import LOGOPNG from "../../imgs/nft.png";
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorText from '../ErrorText'
import { FaqsAPI } from '../../APIs/FaqsAPI'
import { SET_FAQS } from '../../redux/constants/FAQsConstants'

type Inputs = {
    title: string,
    description: string,
};

const ModalAddingFAQs = () => {

    const userTokenContext = React.useContext(RootUserTokenContext)
    const { showModalAddingFAQs } = useAppSelector((state: RootState) => state.modalsReducer)
    const dispatch = useAppDispatch();
    const customDispatcher = () => dispatch({ type: TOGGLE_MODAL_ADDING_FAQS, payload: false })

    const loadInitial = () => {
        let respFaqs = new FaqsAPI()
        respFaqs.get_all_faqs().then(data => {
            dispatch({ type: SET_FAQS, payload: data.results })
        })
    }

    const { register, handleSubmit,
        resetField, formState: { errors } } = useForm<Inputs>();

    const handleSuscribeToSale = (gettedData: { title: string, description: string }) => {
        let token = userTokenContext.token

        let resNFTs = new FaqsAPI()
        resNFTs.post_FAQ({
            title: gettedData.title,
            description: gettedData.description
        }, token).then(data => {
            loadInitial()
            dispatch({ type: TOGGLE_MODAL_ADDING_FAQS, payload: false })

            resetField("description")
            resetField("title")
        })
    }

    const onSubmit: SubmitHandler<Inputs> = data => {
        handleSuscribeToSale(data)
    };

    return (
        <>
            {
                showModalAddingFAQs && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container p0">


                                <img src={LOGOPNG} className="" alt="Imgs" />
                                <div className="min-[800px]:px-[2rem] px-[1rem] w-full mb-[1rem]">
                                    <h2 className="text-lg font-MontSemiBold text-white mt-5 
                                    mb-2 pb-[1rem] text-center border-b w-full border-slate-700">FAQs Form</h2>
                                </div>
                                <h2 className="text-sm font-Regular text-center text-slate-200">Please follow this step to add FAQs.</h2>

                                <button
                                    onClick={customDispatcher} className="cModals-container-close">
                                    <IoClose
                                        color="white"
                                        size={15}
                                    />
                                </button>

                                <form className='text-center w-full flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>


                                    <div className='mt-[1.5rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Enter any title</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdTitle
                                                color="white"
                                                size={18}
                                            />
                                            <input {...register("title", { required: true })}
                                                placeholder='Title'
                                                type="text"
                                                className="control-input-S" />
                                        </div>
                                        {errors.title && <ErrorText />}
                                    </div>


                                    <div className='mt-[1.2rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Enter any description</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdOutlinePriceChange
                                                color="white"
                                                size={18}
                                            />
                                            <input {...register("description", { required: true })}
                                                placeholder='Description'
                                                type="text"
                                                className="control-input-S" />
                                        </div>
                                        {errors.description && <ErrorText />}
                                    </div>

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
                                            /> <p>Send Now</p>
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

export default ModalAddingFAQs
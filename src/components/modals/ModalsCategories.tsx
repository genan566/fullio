import React from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'
import { MdOutlinePriceChange, MdTitle } from 'react-icons/md'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { SaleHistoriesAPI } from '../../APIs/SaleHistoriesAPI'
import { RootNftContext, RootUserContext, RootUserTokenContext } from '../../contexts'
import { useAppDispatch, useAppSelector } from '../../hooks/modalsHooks'
import { TOGGLE_MODAL_FOR_CATEGORIES, TOGGLE_MODAL_SUSCRIPTION } from '../../redux/constants/ModalsConstants'
import { RootState } from '../../redux/store'



import LOGOPNG from "../../imgs/nft.png";
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorText from '../ErrorText'
import { AuthAPI } from '../../APIs/AuthApi'
import { CategoriesTrendingAPI } from '../../APIs/CategoriesTrending'

type Inputs = {
    name: string,
    // price: string,
};

const ModalsCategories = () => {
    const userContext = React.useContext(RootUserContext)
    const nftContext = React.useContext(RootNftContext)
    const userTokenContext = React.useContext(RootUserTokenContext)
    const { showModalForCategories } = useAppSelector((state: RootState) => state.modalsReducer)
    const dispatch = useAppDispatch();
    const customDispatcher = () => dispatch({ type: TOGGLE_MODAL_FOR_CATEGORIES, payload: false })
    const [errorState, setStateError] = React.useState({ set: false, value: "" })


    const { register, handleSubmit,
        resetField, formState: { errors } } = useForm<Inputs>();

    const handleSuscribeToSale = (gettedData: { name: string, }) => {
        let token = userTokenContext.token
        let categories_trending = new CategoriesTrendingAPI()

        categories_trending
            .add_categorie(gettedData, userTokenContext.token)
            .then(() => {
                resetField("name")
                customDispatcher()
            })
    }

    const onSubmit: SubmitHandler<Inputs> = data => {
        handleSuscribeToSale(data)
    };

    return (
        <>
            {
                (showModalForCategories && userContext.user.is_superuser) && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container p0">

                                <img src={LOGOPNG} className="" alt="Imgs" />
                                <div className="min-[800px]:px-[2rem] px-[1rem] w-full mb-[1rem]">
                                    <h2 className="text-lg font-MontSemiBold text-white mt-5 mb-2 pb-[1rem] text-center border-b w-full border-slate-700">Subscription Form</h2>
                                </div>
                                <h2 className="text-sm font-Regular text-center text-slate-200">Please enter the name of the categorie.</h2>

                                <div className="w-full max-w-[200px]">
                                    {
                                        errorState.set && <p className="mt-[1rem] text-red-400 text-xs w-full text-center">{errorState.value}</p>
                                    }
                                </div>

                                <button
                                    onClick={() => {
                                        customDispatcher()
                                        resetField("name")
                                        setStateError({ set: false, value: "" })
                                    }} className="cModals-container-close">
                                    <IoClose
                                        color="white"
                                        size={15}
                                    />
                                </button>

                                <form className='text-center w-full flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>


                                    <div className='mt-[1.5rem] w-3/4 mx-auto'>
                                        <p className="text-xs text-center font-MontSemiBold text-white mb-4">Enter name of the category</p>

                                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                                            <MdTitle
                                                color="white"
                                                size={18}
                                            />
                                            <input {...register("name", { required: true })}
                                                placeholder='The name of the category'
                                                type="text"
                                                className="control-input-S" />
                                        </div>
                                        {errors.name && <ErrorText />}
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
                                            /> <p>Create Category</p>
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

export default ModalsCategories
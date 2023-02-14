import React from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'
import { MdOutlinePriceChange, MdTitle } from 'react-icons/md'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { SaleHistoriesAPI } from '../../APIs/SaleHistoriesAPI'
import { RootNftContext, RootUserTokenContext } from '../../contexts'
import { useAppDispatch, useAppSelector } from '../../hooks/modalsHooks'
import { TOGGLE_MODAL_SUSCRIPTION } from '../../redux/constants/ModalsConstants'
import { RootState } from '../../redux/store'

import LOGOPNG from "../../imgs/nft.png";
const ModalSubscription = () => {
    const nftContext = React.useContext(RootNftContext)
    const userTokenContext = React.useContext(RootUserTokenContext)
    const { showModalSuscription } = useAppSelector((state: RootState) => state.modalsReducer)
    const dispatch = useAppDispatch();
    const customDispatcher = () => dispatch({ type: TOGGLE_MODAL_SUSCRIPTION, payload: false })

    const handleSuscribeToSale = () => {
        let token = userTokenContext.token
        let sale_posting = new SaleHistoriesAPI()
        if (Boolean(nftContext?.nftData?.id)) {
            let rootNFTID = nftContext?.nftData?.id
            console.log("nft context", rootNFTID)
            let data = { title: "Un test de souscription", price: 20, nfts_id: rootNFTID }
            sale_posting.post__create_sale(token, data).then(res => customDispatcher())
        }
    }
    return (
        <>
            {
                showModalSuscription && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container p0">


                                <img src={LOGOPNG} className="" alt="Imgs" />
                                <h2 className="text-lg font-MontSemiBold text-white mt-5 mb-2">Subscription Form</h2>
                                <h2 className="text-sm font-Regular text-center text-slate-200">Please follow this step to subscribe.</h2>

                                <button
                                    onClick={customDispatcher} className="cModals-container-close">
                                    <IoClose
                                        color="white"
                                        size={15}
                                    />
                                </button>

                                <div className='mt-[1.5rem] w-3/4 mx-auto'>
                                    <p className="text-xs text-center font-MontSemiBold text-white mb-4">Enter any title to your subscription</p>

                                    <div className="control-container-S mt-3 mb-1" id='cPar'>
                                        <MdTitle
                                            color="white"
                                            size={18}
                                        />
                                        <input
                                            placeholder='Your title'
                                            type="text"
                                            className="control-input-S" />
                                    </div>
                                </div>


                                <div className='mt-[1.2rem] w-3/4 mx-auto'>
                                    <p className="text-xs text-center font-MontSemiBold text-white mb-4">Enter any price to your subscription</p>

                                    <div className="control-container-S mt-3 mb-1" id='cPar'>
                                        <MdOutlinePriceChange
                                            color="white"
                                            size={18}
                                        />
                                        <input
                                            placeholder='Your price'
                                            type="number"
                                            className="control-input-S" />
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <button
                                        onClick={handleSuscribeToSale}
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

                            </div>
                        </div>
                    </>

                )
            }
        </>
    )
}

export default ModalSubscription
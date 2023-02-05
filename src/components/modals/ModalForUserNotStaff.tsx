import React from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { routeAPIBaseImage } from '../../APIs/APIRoutes'
import { AuthAPI } from '../../APIs/AuthApi'
import { RootCreatorContext, RootUserContext, RootUserTokenContext } from '../../contexts'
const ModalForUserNotStaff = () => {
    const userContext = React.useContext(RootUserContext)
    const creatorContext = React.useContext(RootCreatorContext)
    const userTokenContext = React.useContext(RootUserTokenContext)

    const request_For_Staff_Status = () => {
        let respFaqs = new AuthAPI()
        let token = userTokenContext.token
        respFaqs
            .retrive_account_update(token, userContext?.user.id, { is_staff: true })
            .then(data => {
                userContext.setUser({
                    id: data.id,
                    email: data.email,
                    name: data.name,
                    is_staff: data.is_staff,
                    is_superuser: data.is_superuser,
                    image: routeAPIBaseImage + data.image.toString(),
                    account_balance_eth: data.account_balance_eth,
                    account_balance_btc: data.account_balance_btc,
                    pseudo: data.pseudo,
                })
                creatorContext?.setisCreator(!creatorContext.isCreator)

            });
    }

    return (
        <>
            {
                ((!userContext?.user?.is_staff) && creatorContext?.isCreator) && (
                    <>
                        <div className="cModals-B">

                            <div className="cModals-B-container p0">
                                <button
                                    onClick={() => creatorContext.setisCreator(!creatorContext.isCreator)} className="cModals-B-container-close">
                                    <IoClose
                                        color="white"
                                        size={15}
                                    />
                                </button>

                                <p
                                    className="text-sxl font-MontRegular mt-5 text-slate-200 mx-4 w-3/5 text-center">Vous n'êtes pas éligible pour être créateur</p>
                                <button
                                    onClick={request_For_Staff_Status}
                                    className="bg-violet-600 flex row items-center justify-center gap-1 w-fit mb-[1rem]
                                        hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                                        focus:outline-none
                                        text-sm font-MontSemiBold
                                        focus:ring-2
                                        focus:ring-gray-500 mt-5
                                            py-1 text-white px-3
                                            rounded-lg">
                                    <RiShoppingBasket2Line
                                        // color="white"
                                        size={17}
                                    /> <p>Demander à être créateur</p>
                                </button>
                            </div>
                        </div>
                    </>

                )
            }
        </>
    )
}

export default ModalForUserNotStaff
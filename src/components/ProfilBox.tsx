import React from 'react'

import { IoCopy, IoHeart, IoEllipsisHorizontal, IoMenu, IoPerson, IoClose } from "react-icons/io5";
import { routeAPIBaseImage } from '../APIs/APIRoutes';
import { AuthAPI } from '../APIs/AuthApi';
import { NftsAPI } from '../APIs/NftsAPI';
import { SaleHistoriesAPI } from '../APIs/SaleHistoriesAPI';
import { RootUserContext, RootUserTokenContext, } from '../contexts';
import useLoadNFT from '../customHooks/LoadNFT';
import { useAppDispatch } from '../hooks/modalsHooks';
import ISOTOP from "../imgs/pexels-pixabay.jpg";


import CustomIMG2 from "../imgs/pexels-pixabay.jpg"
import { TOGGLE_MODAL_FOR_LOGIN } from '../redux/constants/ModalsConstants';
import { NftTypesValues } from '../types/NFTTypes';
import { SaleHistory } from '../types/SaleHistoryType';
import { UserRetrieveInterface } from '../types/UserRetrieveTypes';

const ProfilBox = ({ handleLog, handlShow, handleLogOut }: { handleLog: () => void, handlShow: () => void, handleLogOut: () => void }) => {
    const dispatch = useAppDispatch();


    const [userRetrieveDataListForSales, setuserRetrieveDataListForSales] = React.useState<UserRetrieveInterface[]>([])
    const [saleHistories, setSaleHistories] = React.useState<SaleHistory[]>([])
    const [sale_Set_NFT, setSale_Set_NFT] = React.useState<NftTypesValues[]>([])


    const userContext = React.useContext(RootUserContext)
    const userTokenContext = React.useContext(RootUserTokenContext)

    React.useEffect(() => {

        let order_mee = new SaleHistoriesAPI()
        let token = userTokenContext.token
        Boolean(token) && order_mee
            .get_all_sales_by_mee(token)
            .then(data => {
                if (Boolean(data)) {
                    setSaleHistories([...data])
                    data.map((item: any) => {
                        let respAuth = new AuthAPI()
                        if (userTokenContext.token !== "") {
                            let token = userTokenContext.token
                            respAuth
                                .retrive_account(token, item.user_suscribed)
                                .then(res => {
                                    let formatedData = {
                                        email: res.email,
                                        id: res.id,
                                        name: res.name,
                                        pseudo: res.pseudo,
                                        is_superuser: res.is_superuser,
                                        is_staff: res.is_staff,
                                        image: routeAPIBaseImage + res.image.toString(),
                                    }

                                    setuserRetrieveDataListForSales([...userRetrieveDataListForSales, formatedData])

                                })
                        }
                    })
                }
            })

    }, [userTokenContext.token])

    React.useEffect(() => {
        if (Boolean(saleHistories.length)) {
            const list_id_nfts = Array.from(new Set(saleHistories.map(it => it.nfts_id)))
            console.log(list_id_nfts)
            let nftApi = new NftsAPI()
            nftApi.get_multi_NFT_by_ID(list_id_nfts).then((data) => {
                setSale_Set_NFT(data.results)
            })
        }
    }, [saleHistories])

    return (
        <div className="custom-w-d">

            <button
                onClick={handlShow}
                className="navs-close-L">

                <IoClose
                    color="white"
                    size={18}
                />
            </button>

            <figure className="userProf">

                {
                    userContext?.user.id ? <>

                        <img
                            className="rounded-full object-cover"
                            src={userContext?.user.image || CustomIMG2}
                            alt="user Profile" />
                    </> : <>
                        <img
                            className="rounded-full object-cover"
                            src={CustomIMG2}
                            alt="user Profile" />
                    </>
                }

            </figure>

            <div className="mt-3 w-full" style={{ textAlign: 'center' }}>

                {
                    !userContext?.user.id && <>
                        <p className="text-slate-500 font-MontRegular text-sxl align-center my-5">Nothing to show now</p>
                    </>
                }


                {
                    !userContext?.user.id &&
                    <button
                        onClick={() => {
                            dispatch({ type: TOGGLE_MODAL_FOR_LOGIN, payload: true })
                        }}
                        className="bg-violet-500
                            hover:bg-violet-600
                            active:bg-violet-700 
                            focus:outline-none 
                            text-sm
                            focus:ring-2
                            focus:ring-violet-300
                                py-2 text-white px-5
                                rounded-2xl">
                        Log In
                    </button>
                }


                {
                    !userContext?.user.id && <>
                        <p className="text-slate-400 font-MontSemiBold text-sm mt-12">Recent Activity</p>
                        <p className="text-slate-500 font-MontRegular text-sxl align-center my-5">Nothing to show now</p>
                    </>
                }

                {
                    userContext?.user.id && <>

                        <h3 className="text-xl font-MontBold text-slate-200">{userContext?.user?.name}</h3>
                        <div className="flex mt-3 gap-2 align-center"
                            style={{ textAlign: 'center', justifyContent: "center" }}>
                            <p className="text-sxl text-slate-500">{userContext?.user?.email}</p>
                            <IoCopy
                                color="rgba(255,255,255,.5)"
                                size={15}
                            />
                        </div>

                        <div className="flex gap-2 mt-5 items-center justify-center px-3">
                            {/* <button className="bg-violet-500
                        hover:bg-violet-600
                        active:bg-violet-700 
                        focus:outline-none 
                        text-sm
                        focus:ring-2
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-2xl">
                                Save changes
                            </button> */}

                            {/* <button className="customButtonFilterD p0">
                                <IoHeart
                                    color="white"
                                    size={15}
                                />


                            </button>

                            <button className="customButtonFilterD p0">
                                <IoEllipsisHorizontal
                                    color="white"
                                    size={15}
                                />

                            </button> */}


                            <button
                                onClick={handleLogOut}
                                className="bg-red-500
                                hover:bg-red-600
                                active:bg-red-700 my-2
                                focus:outline-none 
                                text-sm
                                focus:ring-2
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-2xl">
                                Se déconnecter
                            </button>
                        </div>

                        <div className="mt-5 flex row align-center">
                            <p className="text-slate-400 font-MontSemiBold text-sm">Recent Orders</p>
                            <p className="text-slate-400 font-MontRegular text-sm">See all</p>
                        </div>

                        {
                            saleHistories.map((item) => {
                                // useLoadNFT(item.nfts_id)
                                let retrieveNFT = sale_Set_NFT.find((it) => item.nfts_id === it.id);
                                console.log("Retrieve", retrieveNFT)
                                let retrievingUser = userRetrieveDataListForSales
                                    .find((it => it.id === item.user_suscribed))
                                return (
                                    <>
                                        <div className="custom-userStatus mt-3">
                                            <img
                                                src={retrieveNFT?.image || ISOTOP}
                                                alt="user Profile" />
                                            <div style={{ textAlign: "left" }}>
                                                <p className="text-white font-MontSemiBold text-sm max-w-[120px] truncate">{retrieveNFT?.title}</p>
                                                <p className="text-slate-400 font-MontRegular text-sxl mt-[.35rem]">{item.price}ETH</p>
                                            </div>

                                            {/* <p className="text-slate-400 font-MontRegular text-sm">View</p> */}
                                        </div>
                                    </>)
                            })
                        }
                    </>
                }

            </div>
        </div>
    )
}

export default ProfilBox
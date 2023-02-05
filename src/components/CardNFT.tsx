import React from 'react'
import { IoArrowForward, IoArrowForwardCircle, IoChevronForward, IoPeople } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import { routeAPIBaseImage } from '../APIs/APIRoutes';
import { AuthAPI } from '../APIs/AuthApi';
import { CategoriesTrending, NftTypesValues, RootNftContext, RootUserTokenContext, SaleHistory } from '../contexts';

import ISOTOP from "../imgs/istockphoto.jpg";



interface UserRetrieveInterface {
    email: string,
    pseudo: string,
    name: string,
    image: string | null,
}


const CardNFT = ({ image, categories_trending, owner, rebirth, data, link = false }: {
    image?: string, sales_history?: SaleHistory[], owner?: number,
    categories_trending?: CategoriesTrending[], rebirth?: string, data?: NftTypesValues, link?: boolean
}) => {
    const [userRetrieveData, setuserRetrieveData] = React.useState<UserRetrieveInterface>({} as UserRetrieveInterface)
    const userTokenContext = React.useContext(RootUserTokenContext)


    const nFTContext = React.useContext(RootNftContext)
    // React.useEffect(() => {
    //     if (owner) {
    //         let respAuth = new AuthAPI()
    //         if (userTokenContext.token !== "") {
    //             let token = userTokenContext.token

    //             respAuth
    //                 .retrive_account(token, owner)
    //                 .then(res => {
    //                     let formatedData = {
    //                         email: res.email,
    //                         name: res.name,
    //                         pseudo: res.pseudo,
    //                         image: routeAPIBaseImage + res.image.toString(),
    //                     }
    //                     setuserRetrieveData(formatedData)
    //                 })
    //         }
    //     }
    // }, [owner])

    React.useEffect(() => {
        console.log('dfjgf', userRetrieveData)
    }, [userRetrieveData])

    return (

        <>
            {
                link ? <>

                    <div
                        className='customNFTT'
                    >
                        <div className='w-[330px] bg-slate-900 shadow-md rounded-md overflow-hidden'>
                            <img
                                className="h-[300px] w-full rounded-sm object-cover bg-cover shadow-lg"
                                src={image || ISOTOP}
                                alt="user Profile" />
                            <div className="p-5">
                                <p className=" font-MontSemiBold text-md max-h-[2rem] truncate">{rebirth || "Non défini"}</p>

                                {/* <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                                    <img
                                        className="h-10 w-10 rounded-full object-cover shadow-lg"
                                        src={userRetrieveData.image || ISOTOP}
                                        alt="user Profile" />
                                    <p className="text-sm text-white font-MontBold max-h-[2rem] truncate w-3/4">{userRetrieveData.name || "Non défini"}</p>
                                </div> */}

                                <p className="text-[1.2rem] mb-1 mt-2 text-indigo-500 font-MontSemiBold">ETH {data?.price}</p>
                                <div className="flex row justify-between mt-[.5rem] mb-[.5rem] items-center">
                                    <p className="text-white font-MontSemiBold text-xs">Nbr Follows</p>
                                    <div className='flex gap-[.5rem]'>
                                        <IoPeople
                                            color="white"
                                            size={15}
                                        />
                                        <h2
                                            className={data?.sales_history.length !== 0 ? 'text-[.8rem] text-indigo-500 font-MontSemiBold' :
                                                'text-[.8rem] text-red-500 font-MontSemiBold'}>{data?.sales_history.length}</h2>
                                    </div>
                                </div>

                                <Link
                                    to={"/detailNFT"}
                                    onClick={(e) => {
                                        data && nFTContext?.setNftData(data)
                                    }}>
                                    <button className='px-[.5rem] bg-indigo-500 text-white py-[.2rem] flex gap-[.25rem] mt-[.5rem] items-center justify-center rounded-lg'>
                                        <p className=" font-MontSemiBold text-xs">View details</p>
                                        <IoArrowForward
                                            // color="white"
                                            size={20}
                                        />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </> : <>
                    <div className='w-[330px] bg-slate-900 shadow-md rounded-md overflow-hidden'>
                        <img
                            className="h-[300px] w-full rounded-sm object-cover bg-cover shadow-lg"
                            src={image}
                            alt="user Profile" />
                        <div className="p-5">
                            <p className=" font-MontSemiBold text-md">Secret Artistics</p>
                            <p className="text-fuchsia-500 font-MontRegular text-sm">Amazing viewing</p>

                            <div className="flex gap-2 row mt-3 items-center justify-start w-fit " >
                                <img
                                    className="h-10 w-10 rounded-full object-cover shadow-lg"
                                    src={ISOTOP}
                                    alt="user Profile" />
                                <p className="text-sm text-white font-MontBold">Jean15</p>
                            </div>

                            <p className="text-sm mb-1 mt-2 text-white font-MontSemiBold">ETH 25.00</p>
                            <div className="flex row justify-between mt-[1rem] mb-[.5rem]">
                                <p className="text-white font-MontSemiBold text-xs">Nbr Follows</p>
                                <div className='flex gap-[.5rem]'>
                                    <IoPeople
                                        color="white"
                                        size={15}
                                    />
                                    <h2 className='text-[.8rem] text-green-300 font-MontSemiBold'>15k</h2>
                                </div>
                            </div>

                            <div className="flex row justify-between items-center">
                                <p className="text-green-300 font-MontSemiBold text-xs">Current Bid</p>
                                <button>
                                    <IoArrowForwardCircle
                                        color="white"
                                        size={20}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default CardNFT
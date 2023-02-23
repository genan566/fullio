import React from 'react'

import "../styles/orders.scss"

import ISOTOP from "../imgs/pexels-pixabay.jpg";

import { motion } from "framer-motion"
import { RootUserContext, RootUserTokenContext } from '../contexts';
import { OrdersAPI } from '../APIs/OrdersAPI';
import { SaleHistoriesAPI } from '../APIs/SaleHistoriesAPI';
import { UserRetrieveInterface } from '../types/UserRetrieveTypes';
import { SaleHistory } from '../types/SaleHistoryType';
import { AuthAPI } from '../APIs/AuthApi';
import { routeAPIBaseImage } from '../APIs/APIRoutes';


const containerVariants = {


    hidden: {
        opacity: 0,
        x: "-2.5vh",
    },
    visible: {
        opacity: 1,
        x: "0",
        // transition: { duration: .5 }
    },
    exit: {
        x: "-2.5vh",
        opacity: 0,
        transition: { ease: 'easeInOut' },
    }
};

interface Orders {
    named_id: string,
    addresse: string,
    name: string
    status: boolean,
    action: boolean,
    price: string,
    date: string,
}


const Orders = () => {
    const [ordersData, setOrdersData] = React.useState<Orders[]>([])

    const [userRetrieveDataListForSales, setuserRetrieveDataListForSales] = React.useState<UserRetrieveInterface[]>([])
    const [saleHistories, setSaleHistories] = React.useState<SaleHistory[]>([])

    const userContext = React.useContext(RootUserContext)
    const userTokenContext = React.useContext(RootUserTokenContext)

    React.useEffect(() => {

        let order_mee = new SaleHistoriesAPI()
        let token = userTokenContext.token
        order_mee
            .get_all_sales_by_mee(token)
            .then(data => {
                if (data.length > 0) {
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
    }, [])

    // React.useEffect(() => {
    //     console.log("data", ordersData)
    // }, [ordersData])


    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='orders'>
            <h1 className="text-4xl font-MontBold">
                Mes ordres
            </h1>
            {
                userContext?.user && <>
                    <p className="text-sm mt-5 w-full"><div className="inline font-MontBold">{saleHistories.length}</div> ordres de trouvées</p>
                    <div className="box-scrollContent">

                        {/* <div style={{ height: "1px", width:, backgroundColor: "red", marginBottom: "1rem", }} /> */}

                        <div className="box-table-data">

                            {/* <div className="box-title-table-P">
                                <div className="box-title-table-id">#021201</div>
                                <div className="box-title-table-name">Name</div>
                                <div className="box-title-table-address">Addresse</div>
                                <div className="box-title-table-date">Date</div>
                                <div className="box-title-table-price">Price</div>
                                <div className="box-title-table-status">Status</div>
                                <div className="box-title-table-action">Action</div>
                            </div> */}


                            {/* <div className="box-title-table">
                                <div className="box-title-table-id">#021201</div>
                                <div className="box-title-table-name">Avodagbe Jean Bignon</div>
                                <div className="box-title-table-address">Avodagbe Jean Bignon Avodagbe Jean Bignon</div>
                                <div className="box-title-table-date">Avodagbe Jean Bignon</div>
                                <div className="box-title-table-price">Avodagbe Jean Bignon</div>
                                <div className="box-title-table-status">Avodagbe Jean Bignon</div>
                                <div className="box-title-table-action">Avodagbe Jean Bignon</div>
                            </div> */}

                            {
                                saleHistories.map((item) => {
                                    let retrievingUser = userRetrieveDataListForSales.find((it => it.id === item.user_suscribed))

                                    return (
                                        <>
                                            <div className="flex row justify-between items-center bottom-divider py-3  flex-wrap gap-2">
                                                <div className="flex row justify-center items-center max-w-[200px] flex-grow">
                                                    <div className="flex gap-2 row items-center justify-start w-fit" >
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover bg-cover shadow-lg"
                                                            src={retrievingUser?.image || ISOTOP}
                                                            alt="user Profile" />
                                                        <p className="text-sm text-white font-MontSemiBold max-w-[120px] truncate">{item.title}</p>
                                                    </div>
                                                </div>
                                                <p className="text-white text-sm font-MontSemiBold flex-grow">{retrievingUser?.email || "Anonyme"}</p>
                                                <p className="text-orange-500 text-sm font-MontSemiBold flex-grow">{item?.price}ETH</p>
                                                <p className="text-white text-sm font-MontSemiBold flex-grow">{item.created_at}</p>
                                                <p className="text-white text-sm font-MontSemiBold flex-grow">{item.will_end_at}</p>
                                                {/* <button
                                            // onClick={handleLog}
                                            className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                                                    hover:bg-white hover:text-black
                                                    
                                                    focus:outline-none
                                                    text-xs font-MontSemiBold
                                                    focus:ring-2 py-2
                                                    focus:ring-gray-500
                                                        text-white px-3
                                                        rounded-lg">
                                            Learn More
                                        </button> */}
                                            </div>
                                        </>
                                    )
                                })
                            }
                            {
                                saleHistories.length === 0 && <div className="text-center">
                                    <h1 className="text-white text-xs font-MontBold mt-5">Historique NFT vide.</h1>
                                    <h1 className="text-white text-xs font-MontBold mt-2">Veuillez bien vous souscrire au NFT pour avoir un suivi</h1>
                                </div>
                            }


                        </div>


                    </div>
                </>
            }

            {
                (!userContext?.user) && <div className="text-center">
                    <h1 className="text-white text-lg font-MontBold mt-10">Aucune donnée n'est à afficher pour l'instant.</h1>
                    <p className="text-white text-sm">Veuillez bien vous connecter pour visualiser ici vos données.</p>
                </div>
            }

            {
                ordersData.length === 0 && <div className="text-center">
                    <h1 className="text-white text-lg font-MontBold mt-10">Vous n'avez aucune ordre de lancée.</h1>
                </div>
            }
        </motion.div>
    )
}

export default Orders
import React from 'react'

import "../styles/Settings.scss"

import CustomIMG2 from "../imgs/pexels-pixabay.jpg"
import { IoCopy } from 'react-icons/io5'
import { GiCrenelCrown } from "react-icons/gi";
import { motion } from "framer-motion"
import { FaIcons, FaUncharted, FaUsers } from 'react-icons/fa';
import { RootUserContext } from '../contexts';


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



const PageSettings = () => {


    const userContext = React.useContext(RootUserContext)



    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="settings">
            <h1 className="text-4xl font-MontBold">
                Mes paramètres
            </h1>
            {
                userContext?.user && <>
                    <p className="text-sm mt-2">Welcomes back <span className="text-sm font-MontBold">{userContext?.user?.name || "Non défini"}</span></p>

                    <div className="flex mt-4 shadow-xl items-center justify-between p-2 px-4 rounded-md bg-gray-700 flex-wrap gap-2">

                        <div className="flex items-center gap-3 justify-center py-1">
                            {/* <img className="h-20 w-20 object-cover rounded-full shadow-lg"
            src={CustomIMG2}
            alt="{user.handle}" /> */}

                            {
                                userContext?.user ? <>

                                    <img
                                        className="h-20 w-20 rounded-full object-cover shadow-lg"
                                        src={userContext?.user.image}
                                        alt="user Profile" />
                                </> : <>
                                    <img
                                        className=" h-20 w-20 rounded-full object-cover shadow-lg"
                                        src={CustomIMG2}
                                        alt="user Profile" />
                                </>
                            }
                            <div className="columns">

                                <p className="text-md text-slate-100 font-MontBold ">{userContext?.user?.name || "Non défini"}</p>
                                <p className="text-sm text-slate-300">{userContext?.user?.email || "Non défini"}</p>
                            </div>
                        </div>

                        <button
                            // to={"/"}
                            // onClick={handleLog}
                            className="bg-violet-500
            hover:bg-violet-600
            active:bg-violet-700 
            focus:outline-none h-10
            text-sm
            focus:ring-2
            focus:ring-violet-300
                py-2 text-white px-5
                ">
                            Modifier mon profil
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-2 mt-5 md:grid-cols-2 sm:grid-cols-1">
                        <div className="bg-slate-700 h-48 hover:bg-gradient-to-r from-green-400 to-blue-500 p-8 md:p-5 sm:p-2 rounded-md cursor-pointer shadow-lg">

                            <div className="flex items-center justify-start gap-5">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                                    <IoCopy
                                        color="black"
                                        size={20}
                                    />
                                </div>
                                <div className="columns gap-1">
                                    <h3 className="text-md font-MontBold">$0.00</h3>
                                    <p className="text-sm">Account balance</p>
                                </div>
                            </div>

                            <div className="columns mt-4 gap-2">
                                <p className="text-sm">Top up balance</p>
                                <p className="text-sm">Transactions & receipts</p>
                            </div>
                        </div>

                        <div className="bg-slate-700 h-48 hover:bg-gradient-to-r from-green-400 to-blue-500 p-8 md:p-5 sm:p-2 rounded-md cursor-pointer shadow-lg">

                            <div className="flex items-center justify-start gap-5">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                                    <GiCrenelCrown
                                        color="black"
                                        size={20}
                                    />
                                </div>
                                <div className="columns gap-1">
                                    <h3 className="text-md font-MontBold">Pro Subscription</h3>
                                    <p className="text-sm">No subscription</p>
                                </div>
                            </div>

                            <div className="columns mt-4 gap-3">
                                <p className="text-sm">How it works</p>
                                <p className="text-sm">Upgrade to PRO</p>
                            </div>
                        </div>


                        <div className="bg-slate-700 h-48 hover:bg-gradient-to-r from-green-400 to-blue-500 p-8 md:p-5 sm:p-2 rounded-md cursor-pointer shadow-lg">

                            <div className="flex items-center justify-start gap-5">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                                    <FaUsers
                                        color="black"
                                        size={20}
                                    />
                                </div>
                                <div className="columns gap-1">
                                    <h3 className="text-md font-MontBold">Teams members</h3>
                                    <p className="text-sm">No seats available</p>
                                </div>
                            </div>

                            <div className="columns mt-4 gap-3">
                                <p className="text-sm">Upgrade to Pro</p>
                            </div>
                        </div>

                        <div className="bg-slate-700 h-48 hover:bg-gradient-to-r from-green-400 to-blue-500 p-8 md:p-5 sm:p-2 rounded-md cursor-pointer shadow-lg">

                            <div className="flex items-center justify-start gap-5">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                                    <FaIcons
                                        color="black"
                                        size={20}
                                    />
                                </div>
                                <div className="columns gap-1">
                                    <h3 className="text-md font-MontBold">Icons</h3>
                                </div>
                            </div>

                            <div className="columns mt-4 gap-3">
                                <p className="text-sm">Download history</p>
                                <p className="text-sm">Collections</p>
                                <p className="text-sm">Purchases</p>
                            </div>
                        </div>

                        <div className="bg-slate-700 h-48 hover:bg-gradient-to-r from-green-400 to-blue-500 p-8 md:p-5 sm:p-2 rounded-md cursor-pointer shadow-lg">

                            <div className="flex items-center justify-start gap-5">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                                    <FaUncharted
                                        color="black"
                                        size={20}
                                    />
                                </div>
                                <div className="columns gap-1">
                                    <h3 className="text-md font-MontBold">Contributors</h3>
                                </div>
                            </div>

                            <div className="columns mt-4 gap-3">
                                <p className="text-sm">Upload content</p>
                                <p className="text-sm">Analitycs</p>
                                <p className="text-sm">Cashout</p>
                            </div>
                        </div>
                    </div>
                </>
            }

            {
                !userContext?.user && <div className="text-center">
                    <h1 className="text-white text-lg font-MontBold mt-10">Aucune donnée n'est à afficher pour l'instant.</h1>
                    <p className="text-white text-sm">Veuillez bien vous connecter pour visualiser ici vos données.</p>
                </div>
            }
        </motion.div>
    )
}

export default PageSettings
import React from 'react'

import "../styles/orders.scss"


import { motion } from "framer-motion"
import { RootUserContext } from '../contexts/RootUserContext';


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


const Orders = () => {


    const userContext = React.useContext(RootUserContext)


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
                    <p className="text-sxl mt-1">27 ordres de trouvées</p>
                    <div className="box-scrollContent">

                        {/* <div style={{ height: "1px", width:, backgroundColor: "red", marginBottom: "1rem", }} /> */}

                        <div className="box-table-data">

                            <div className="box-title-table-P">
                                <div className="box-title-table-id">#021201</div>
                                <div className="box-title-table-name">Name</div>
                                <div className="box-title-table-address">Addresse</div>
                                <div className="box-title-table-date">Date</div>
                                <div className="box-title-table-price">Price</div>
                                <div className="box-title-table-status">Status</div>
                                <div className="box-title-table-action">Action</div>
                            </div>


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
                                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].map(a => {
                                    return (
                                        <>
                                            <div className="box-title-table">
                                                <div className="box-title-table-id">#021201</div>
                                                <div className="box-title-table-name">Jean</div>
                                                <div className="box-title-table-address">Calavi Kpota</div>
                                                <div className="box-title-table-date">31 Juil 2020</div>
                                                <div className="box-title-table-price">$65.00</div>
                                                <div className="box-title-table-status">Pending</div>
                                                <div className="box-title-table-action">Vendu</div>
                                            </div>
                                        </>
                                    )
                                })
                            }

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

export default Orders
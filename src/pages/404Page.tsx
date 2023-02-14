import React from 'react'

import "../styles/Page404.scss"

import { Link } from 'react-router-dom';

import { motion } from "framer-motion"


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
const Page404 = () => {

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="page404" >

            {/* <figure>
                <img src={CustomIMG2} alt="user Profile" />
            </figure> */}

            < h1 className="text-white text-9xl font-MontBold" > 404.</h1 >
            <h1 className="text-white text-2xl font-MontBold">Ouuups ce contenu n'existe pas.</h1>
            <p className="text-white">Veuillez bien revenir en lieu sûr.</p>

            <Link
                to={"/"}
                // onClick={handleLog}
                className="bg-violet-500
                        hover:bg-violet-600
                        active:bg-violet-700 
                        focus:outline-none 
                        text-sm
                        focus:ring-2
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-2xl">
                Revenir en lieu sûr
            </Link>
        </motion.div>
    )
}

export default Page404
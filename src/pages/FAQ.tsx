import React from 'react'

import Accordion from '../components/Accordion'
import "../styles/FAQ.scss"

import { RootUserContext, RootUserTokenContext } from '../contexts'
import { FaqsAPI } from '../APIs/FaqsAPI'

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


interface FAQs {
    title: string,
    description: string
}

const FAQ = () => {

    const [isActive, setIsActive] = React.useState<boolean>(false)
    const [dataFAQS, setDataFAQS] = React.useState<FAQs[]>([])

    const userContext = React.useContext(RootUserContext)
    const userToken = React.useContext(RootUserTokenContext)

    const loadInitial = () => {
        let respFaqs = new FaqsAPI()
        respFaqs.get_all_faqs().then(data => setDataFAQS(data.results))
    }

    React.useEffect(() => {
        loadInitial()
    }, [])

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='faqs'>
            <h1 className="text-4xl font-MontBold">
                FAQs
            </h1>


            {
                userContext?.user && <>
                    <p className="text-sm mt-6 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Veritatis ab, iure sint magni tempora architecto ducimus assumenda reprehenderit!
                        Reprehenderit voluptatem illum architecto cum cupiditate! Ea modi a doloribus excepturi fuga?</p>

                    {
                        dataFAQS.length > 0 && dataFAQS.map((it, idx) => {
                            return (
                                <>
                                    <Accordion
                                        key={`${idx}`}
                                        title={it.title}
                                        description={it.description} />
                                </>
                            )
                        })
                    }



                    <button

                        onClick={() => {

                            let resNFTs = new FaqsAPI()
                            let parsedToken = userToken.token
                            resNFTs.post_FAQ({
                                title: "What the meaning of NFT?",
                                description: "An NFT or non-fungible token is a valued data composed of a type of cryptographic token that represents an object, to which is attached a digital identity. This data is stored and authenticated thanks to a blockchain protocol, which gives it its first value."
                            }, parsedToken).then(data => { loadInitial() })
                        }}
                        className="bg-violet-500
                        hover:bg-violet-600
                        active:bg-violet-700 
                        focus:outline-none mt-9
                        text-sm
                        focus:ring-2
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-2xl">
                        Ajouter une note à la FAQ
                    </button>
                </>
            }

            {
                !userContext?.user && <div className="text-center">
                    <h1 className="text-white text-lg font-MontBold mt-10">Aucune donnée n'est à afficher pour l'instant.</h1>
                    <p className="text-white text-sm">Veuillez bien vous connecter pour visualiser ici vos données.</p>
                </div>
            }

            {
                dataFAQS
                    .length === 0 && <div className="text-center">
                    <h1 className="text-white text-lg font-MontBold mt-10">Aucune donnée FAQ n'est à afficher pour le moment.</h1>
                </div>
            }
        </motion.div>
    )
}

export default FAQ
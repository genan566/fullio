import React from 'react'
import { IoArrowDown, IoArrowUp, IoBusiness } from 'react-icons/io5'
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

const data = [
    {
        id: 1,
        title: "I'm an influencer/content creator/partner-Who should I contact",
        description: "@Jawad | Illuvium#0481 is our community growth manager. Send a DM with a link to the plateform(s) you operate on!"
    },
    {
        id: 2,
        title: "What is Illuvium Zero, and what is the Land Sale",
        description: "Illuvium: Zero is a mobile mini-game that will interact with the main game. Illuvium: Zero will be a base building game which will be staged on a piece of land. The free version of land will not produce resources that can interact with the main game. Paid land will produce resources which can interact with the main game. There will be 100k plots of paid land in total, and the first land sale will offer 20k of these plots for sale in a dutch auction format. For more information, visit#🎮illuvium-zero."
    },

    {
        id: 3,
        title: "Is the game playable on mobile",
        description: "The game won't be available on mobile to start. We have plans to build a modified mobile version as well as console versions."
    },

    {
        id: 4,
        title: "What are the play-to-earn aspects of the game",
        description: "Illuvium’s play to earn features might be its most exciting. Players can earn in-game rewards in ILV through competitions and tournaments, or completing PVE quests. Additionally, players can capture Illuvials and collect resources to buy and sell on the Illuvidex, the in-game marketplace."
    },

    {
        id: 5,
        title: "Is the a free-to-play aspect of the game?",
        description: "You begin our game with a free-to-play experience that immerses you in our richly-detailed world, lets you enjoy some action, and helps you understand how the game works. The free-to-play experience of the Tier 0 regions will familiarize you with Illuvium, and won’t feel like an “abridged” version of the game. It is a full-fledged gameplay experience! If you like it, you can then decide to opt in to the paid experience, start collecting NFTs from higher tiered regions, and delve into deeper adventures to explore the mysteries of the game where the NFTs you gather start to hold more value as well."
    },
]

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
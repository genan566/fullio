import React from 'react'

import Accordion from '../components/Accordion'
import "../styles/FAQ.scss"

import { RootUserContext, RootUserTokenContext } from '../contexts'
import { FaqsAPI } from '../APIs/FaqsAPI'

import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from '../hooks/modalsHooks'
import { SET_FAQS, TOGGLE_LOADING } from '../redux/constants/FAQsConstants'
import { RootState } from '../redux/store'
import { TOGGLE_MODAL_ADDING_FAQS } from '../redux/constants/ModalsConstants'

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

    const [dataFAQS, setDataFAQS] = React.useState<FAQs[]>([])

    const userContext = React.useContext(RootUserContext)
    const userToken = React.useContext(RootUserTokenContext)
    const dispatch = useAppDispatch();
    const { stateFAQs } = useAppSelector((state: RootState) => state.faqsReducer)


    const loadInitial = () => {
        dispatch({ type: TOGGLE_LOADING, payload: true })
        let respFaqs = new FaqsAPI()
        respFaqs.get_all_faqs().then(data => {
            setDataFAQS(data.results)
            dispatch({ type: SET_FAQS, payload: data.results })
        })
    }

    React.useEffect(() => {
        loadInitial()
    }, [])

    React.useEffect(() => {
        setDataFAQS(stateFAQs)
    }, [stateFAQs])

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
                            dispatch({ type: TOGGLE_MODAL_ADDING_FAQS, payload: true })
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
import React from 'react'

import Accordion from '../components/Accordion'
import "../styles/FAQ.scss"

import { RootUserContext, RootUserTokenContext } from '../contexts'
import { FaqsAPI } from '../APIs/FaqsAPI'

import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from '../hooks/modalsHooks'
import { SET_FAQS, TOGGLE_LOADING } from '../redux/constants/FAQsConstants'
import { RootState } from '../redux/store'
import { TOGGLE_MODAL_ADDING_FAQS, TOGGLE_MODAL_FOR_LOGIN } from '../redux/constants/ModalsConstants'
import { useToast } from '@chakra-ui/react'
import { IoTrash } from 'react-icons/io5'
import { notify } from '../utilities/Toaster'

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
    id: number
    title: string,
    description: string
}

const FAQ = () => {

    const [dataFAQS, setDataFAQS] = React.useState<FAQs[]>([])
    const userContext = React.useContext(RootUserContext)
    const userToken = React.useContext(RootUserTokenContext)
    const dispatch = useAppDispatch();
    const { stateFAQs } = useAppSelector((state: RootState) => state.faqsReducer)
    const toast = useToast()


    const loadInitial = () => {

        dispatch({ type: TOGGLE_LOADING, payload: true })
        let respFaqs = new FaqsAPI()
        respFaqs.get_all_faqs().then(data => {
            setDataFAQS(data.results)
            dispatch({ type: SET_FAQS, payload: data.results })
        })
    }

    const delete_FAQs = (id: number) => {
        let respFaqs = new FaqsAPI()
        respFaqs.delete_faq(userToken.token, id,).then(data => {
            loadInitial()
            notify("Suppression réussie")
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
                    <p className="text-sm mt-6 mb-5">This page relate to the frequents questions asked on NFT Project. And we often trying to answer on it.</p>

                    {
                        dataFAQS.length > 0 && dataFAQS.map((it, idx) => {
                            return (
                                <div className='flex gap-[1rem] mt-4 items-start'>
                                    <Accordion
                                        key={`${idx}`}
                                        title={it.title}
                                        description={it.description} />

                                    {
                                        userContext.user.is_superuser && <button
                                            onClick={() => {
                                                delete_FAQs(it.id)
                                            }}

                                            className="active:bg-red-700 
                                            rounded-full border border-1 border-transparent p-2 bg-red-900 shadow-lg">
                                            <IoTrash
                                                // color="white"
                                                size={17}
                                            />
                                        </button>
                                    }
                                </div>
                            )
                        })
                    }



                    {
                        userContext.user.is_superuser && <button

                            onClick={() => {

                                if (!Boolean(userContext.user.id)) {
                                    dispatch({ type: TOGGLE_MODAL_ADDING_FAQS, payload: true })
                                    dispatch({ type: TOGGLE_MODAL_FOR_LOGIN, payload: true })
                                }
                                else {
                                    dispatch({ type: TOGGLE_MODAL_ADDING_FAQS, payload: true })
                                }


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
                    }
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
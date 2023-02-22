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

import ISOTOP from "../imgs/istockphoto.jpg";
import { UsersAPI } from '../APIs/UsersAPi'
import { UserTypesValues } from '../types/UserTypeValues'
import { useNavigate } from 'react-router-dom'
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

const UsersList = () => {

    const [dataUsers, setDataUsers] = React.useState<UserTypesValues[]>([])

    const userContext = React.useContext(RootUserContext)
    const userToken = React.useContext(RootUserTokenContext)
    const dispatch = useAppDispatch();
    // const { stateFAQs } = useAppSelector((state: RootState) => state.faqsReducer)
    const toast = useToast()


    const loadInitial = () => {

        // dispatch({ type: TOGGLE_LOADING, payload: true })
        let resUsers = new UsersAPI()
        try {
            resUsers.get_all_users(userToken.token).then(data => {
                setDataUsers(data.results)
                // dispatch({ type: SET_FAQS, payload: data.results })
            })
        }
        catch(error) {
            console.log("Une erreur est survenue")
        }
    }

    const history = useNavigate()

    const check_user_can_create = React.useCallback(() => {
        ((!Boolean(userContext.user.id)) || (Boolean(userContext?.user?.is_superuser === false))) && history("/")
    }, [userContext?.user])

    React.useEffect(() => {
        loadInitial()
    }, [])

    React.useEffect(() => {
        check_user_can_create()
    }, [check_user_can_create])

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='faqs'>
            <h1 className="text-4xl font-MontBold mb-5">
                Users
            </h1>

            {
                userContext?.user && <>
                    {
                        dataUsers.map(it => {
                            return <>
                                <div className="flex row justify-between items-center bottom-divider py-3  flex-wrap gap-2">
                                    <div className="flex row justify-center items-center flex-grow">
                                        <div className="flex gap-2 row items-center justify-start w-fit" >
                                            <img
                                                className="h-10 w-10 rounded-full object-cover bg-cover shadow-lg"
                                                src={it?.image || ISOTOP}
                                                alt="user Profile" />
                                            <p className="text-sm text-white font-MontSemiBold truncate ml-[1rem]">{it.email}</p>
                                        </div>
                                    </div>
                                    <p className="text-white text-sm font-MontSemiBold flex-grow">{it.is_staff ? "Active" : "Not Active"}</p>
                                    <p className="text-white text-sm font-MontSemiBold flex-grow">{it.is_superuser ? "Super User" : "Not Super User"}</p>
                                    <p className="text-white text-sm font-MontSemiBold flex-grow">{it.account_balance_eth} ETH</p>
                                    <p className="text-white text-sm font-MontSemiBold flex-grow">{it.account_balance_btc} BTC</p>
                                    <button
                                        // onClick={handleLog}
                                        className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                                                        hover:bg-white hover:text-black
                                            
                                            focus:outline-none
                                            text-xs font-MontSemiBold
                                            focus:ring-2 py-2
                                            focus:ring-gray-500
                                                text-white px-3
                                                rounded-lg">
                                        Edit User
                                    </button>
                                </div>
                            </>
                        })

                    }



                    <button

                        // onClick={() => {

                        //     if (!Boolean(userContext.user.id)) {
                        //         dispatch({ type: TOGGLE_MODAL_ADDING_FAQS, payload: true })
                        //         dispatch({ type: TOGGLE_MODAL_FOR_LOGIN, payload: true })
                        //     }
                        //     else {
                        //         dispatch({ type: TOGGLE_MODAL_ADDING_FAQS, payload: true })
                        //     }


                        // }}

                        className="bg-violet-500
                        hover:bg-violet-600
                        active:bg-violet-700 
                        focus:outline-none mt-9
                        text-sm
                        focus:ring-2
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-md">
                        Ajouter un nouvel utilisateur
                    </button>
                </>
            }

            {/* {
                !userContext?.user && <div className="text-center">
                    <h1 className="text-white text-lg font-MontBold mt-10">Aucune donnée n'est à afficher pour l'instant.</h1>
                    <p className="text-white text-sm">Veuillez bien vous connecter pour visualiser ici vos données.</p>
                </div>
            }

            {
                dataUsers
                    .length === 0 && <div className="text-center">
                    <h1 className="text-white text-lg font-MontBold mt-10">Aucune donnée FAQ n'est à afficher pour le moment.</h1>
                </div>
            } */}
        </motion.div>
    )
}

export default UsersList
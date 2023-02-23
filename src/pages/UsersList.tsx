import React from 'react'

import "../styles/FAQ.scss"

import { RootAdminEditableUserContext, RootUserContext, RootUserTokenContext } from '../contexts'

import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector, } from '../hooks/modalsHooks'
import { TOGGLE_MODALS_EDIT_USERS, TOGGLE_MODALS_FOR_CREATING_USER_BY_ADMIN, } from '../redux/constants/ModalsConstants'
import { useToast } from '@chakra-ui/react'

import ISOTOP from "../imgs/pexels-pixabay.jpg";
import { UsersAPI } from '../APIs/UsersAPi'
import { UserTypesValues } from '../types/UserTypeValues'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack, IoTrash } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { AuthAPI } from '../APIs/AuthApi'
import { RootState } from '../redux/store'
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

const UsersList = () => {

    const [dataUsers, setDataUsers] = React.useState<UserTypesValues[]>([])

    const userContext = React.useContext(RootUserContext)
    const userEditableContext = React.useContext(RootAdminEditableUserContext)
    const userToken = React.useContext(RootUserTokenContext)
    const dispatch = useAppDispatch();
    const toast = useToast()
    const { showModalEditUser, showModalForSignUpByAdmin } = useAppSelector((state: RootState) => state.modalsReducer)


    const loadInitial = () => {
        let resUsers = new UsersAPI()
        try {
            resUsers.get_all_users(userToken.token).then(data => {
                setDataUsers(data.results)
            })
        }
        catch (error) {
            console.log("Une erreur est survenue")
        }
    }

    const history = useNavigate()

    const check_user_can_create = React.useCallback(() => {
        ((!Boolean(userContext.user.id)) || (Boolean(userContext?.user?.is_superuser === false))) && history("/")
    }, [userContext?.user])

    const delete_account = (id: number) => {
        let resNFTs = new AuthAPI()
        resNFTs
            .delete_account(userToken.token, id)
            .then(data => {
                loadInitial()
                // setnftsData(data)
            })
    }

    React.useEffect(() => {
        loadInitial()
    }, [])

    React.useEffect(() => {
        loadInitial()
    }, [showModalEditUser, showModalForSignUpByAdmin])

    React.useEffect(() => {
        check_user_can_create()
    }, [check_user_can_create])

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='px-[1rem]'>

            <div className="">
                <button
                    // to={location.pathname === "/detailOwnNFT" ? "/manageNFTs" : "/nftMarketPlace"}
                    onClick={() => window.history.back()}
                    // onClick={handleLog}
                    className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                        hover:bg-white hover:text-black

                        focus:outline-none
                        text-xs font-MontSemiBold
                        focus:ring-2
                        focus:ring-gray-500
                        py-1 text-white px-3
                            rounded-lg">
                    <IoArrowBack
                        // color="white"
                        size={17}
                    /> <p>Go Back</p>
                </button>
            </div>
            <h1 className="text-4xl font-MontBold my-5 mt-[3rem]">
                Users
            </h1>

            {
                userContext?.user && <>
                    {
                        dataUsers.length > 0 && dataUsers.map((it, idX) => {
                            return <>
                                <div
                                    key={`${idX}`}
                                    className="flex row justify-between items-center bottom-divider py-3  flex-wrap gap-2">
                                    <div className="flex row justify-center items-center flex-grow">
                                        <div className="flex gap-2 row items-center justify-start w-fit" >
                                            <img
                                                className="h-10 w-10 rounded-full object-cover bg-cover shadow-lg"
                                                src={it?.image || ISOTOP}
                                                alt="user Profile" />
                                            <p className="text-sm text-white font-MontSemiBold truncate ml-[1rem]">{it.email}</p>
                                        </div>
                                    </div>
                                    <p className="text-white text-sm font-MontSemiBold flex-grow">{it.name || "Not defined"}</p>
                                    <p className="text-white text-sm font-MontSemiBold flex-grow">{it.pseudo || "Not defined"}</p>
                                    <p className={!it.is_staff ? "text-white text-sm font-MontSemiBold text-center p-1 px-3 bg-red-500 rounded-full" :
                                        "text-white text-sm font-MontSemiBold text-center p-1 px-3 bg-green-500 rounded-full"}>{it.is_staff ? "Staff" : "Not staff"}</p>
                                    <p className={!it.is_superuser ? "text-white text-sm font-MontSemiBold text-center p-1 px-3 bg-red-500 rounded-full" :
                                        "text-white text-sm font-MontSemiBold text-center p-1 px-3 bg-green-500 rounded-full"}>{it.is_superuser ? "Super User" : "Not Super User"}</p>
                                    <p className="text-white text-sm font-MontSemiBold flex-grow">{it.account_balance_eth} ETH</p>
                                    <p className="text-white text-sm font-MontSemiBold flex-grow">{it.account_balance_btc} BTC</p>
                                    <button
                                        onClick={() => {
                                            userEditableContext?.setUserEdited(it)
                                            dispatch({ type: TOGGLE_MODALS_EDIT_USERS, payload: true })
                                        }}
                                        className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                                                        hover:bg-white hover:text-black
                                            
                                            focus:outline-none
                                            text-xs font-MontSemiBold
                                            focus:ring-2 py-2
                                            focus:ring-gray-500
                                                text-white px-3
                                                rounded-lg">
                                        <MdEdit
                                            // color="white"
                                            size={17}
                                        />
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => delete_account(it.id)}
                                        className="bg-red-600 flex row items-center justify-center gap-1 w-fit 
                                            hover:bg-transparent hover: border hover: border-red-600 hover:text-white
                                            focus:outline-none
                                            text-sm font-MontSemiBold
                                            focus:ring-2 mx-auto
                                            focus:ring-gray-500
                                                py-1 text-white px-[1rem]
                                                rounded-lg">
                                        <IoTrash
                                            // color="white"
                                            size={17}
                                        /> <p>Supprimer</p>
                                    </button>
                                </div>
                            </>
                        })

                    }



                    <button

                        onClick={() => dispatch({ type: TOGGLE_MODALS_FOR_CREATING_USER_BY_ADMIN, payload: true })}

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
        </motion.div>
    )
}

export default UsersList
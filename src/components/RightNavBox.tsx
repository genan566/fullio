import React from 'react'
import { ValuesTypes } from '../contexts'
import ProfilBox from './ProfilBox'
import CustomIMG2 from "../imgs/pexels-pixabay.jpg"
import { RightNavBoxTypes } from '../types/RightNavBoxTypes'


const RightNavBox = ({ userContext, isOpenUser, toggleIsOpenUser, handleLog, handleLogOut, handleShow }:
    RightNavBoxTypes) => {
    return (
        <>
            {
                !isOpenUser && <button
                    onClick={toggleIsOpenUser}
                    className="navs-close-D mt-1 mr-1">
                    {/* {
                        isOpen ? <IoClose
                            color="white"
                            size={18}
                        /> :
                    } */}

                    {
                        userContext?.user ? <>

                            <img
                                className="rounded-full object-cover"
                                src={userContext?.user.image}
                                alt="user Profile" />
                        </> : <>
                            <img
                                className="rounded-full object-cover"
                                src={CustomIMG2}
                                alt="user Profile" />
                        </>
                    }
                </button>
            }

            {
                isOpenUser && <ProfilBox
                    handleLogOut={handleLogOut}
                    handleLog={handleLog}
                    handlShow={handleShow}
                />
            }
        </>
    )
}

export default RightNavBox
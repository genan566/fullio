import React from 'react'

import { IoClose, IoBusiness, IoSettings, IoLogOut, IoLogIn, IoMenu, IoHome, IoAtCircleOutline } from "react-icons/io5";

import { MdOutlineDashboardCustomize } from "react-icons/md";

import NFT from "../imgs/nft.png";

import { FaQuinscape } from "react-icons/fa";

import { useLocation } from "react-router-dom"

import { Link } from 'react-router-dom';
import { RootUserContext } from '../contexts';
import { GiVirtualMarker } from 'react-icons/gi';
import { useMediaQuery } from 'usehooks-ts';
import RenderingSideNavs from './RenderingSideNavs';



const SideNavs = ({ isOpen, toggleIsOpen, handleLog, handleLogOut }:
    { isOpen: boolean, toggleIsOpen: () => void, handleLog: () => void, handleLogOut: () => void }) => {


    const location = useLocation();
    const userContext = React.useContext(RootUserContext)

    const [isActive, setIsActive] = React.useState<string>(`${location?.pathname}`)


    const matches = useMediaQuery('(min-width: 1300px)')

    React.useEffect(() => {
        setIsActive(`${location?.pathname}`)
    }, [location])

    React.useEffect(() => {
        console.log('matches', matches)
    }, [matches])

    return (

        <>
            {
                matches ? <>
                    <div className={!isOpen ? "custom-w-m" : "custom-w-m showing"}>
                        <RenderingSideNavs
                            isActive={isActive}
                            handleLog={handleLog}
                            handleLogOut={handleLogOut}
                            setIsActive={setIsActive}
                            isOpen={isOpen} toggleIsOpen={toggleIsOpen} />

                    </div >
                </> : <>
                    {
                        !isOpen && <div className="custom-w-m_sabs">
                            <button
                                onClick={toggleIsOpen} className="navs-close">
                                {
                                    isOpen ? <IoClose
                                        color="white"
                                        size={18}
                                    /> : <IoMenu
                                        color="white"
                                        size={18}
                                    />
                                }
                            </button>
                        </div>
                    }

                    {
                        isOpen && <div className={"custom-w-m showing"}>
                            <RenderingSideNavs
                                isActive={isActive}
                                handleLog={handleLog}
                                handleLogOut={handleLogOut}
                                setIsActive={setIsActive}
                                isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
                        </div >
                    }
                </>
            }
        </>
    )
}

export default SideNavs
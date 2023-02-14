import React from 'react'
import { IoLogOut } from 'react-icons/io5';
import { ModalsLogOutTypes } from '../../types/ModalsLogOutTypes';

import LOGOPNG from "../../imgs/nft.png";
const ModalsLogOut = ({ isShownModalsLogOut, toggleModalsOnLogout, handlerLogoutFunc }:
    ModalsLogOutTypes) => {
    return (
        <>
            {
                isShownModalsLogOut && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container">
                                
                                <img src={LOGOPNG} className="mb-[1rem]" alt="Imgs" />
                                <h2 className="text-md text-center text-white font-MontBold">Etes-vous sûr de vouloir vous déconnecter?</h2>
                                <div className="flex row gap-4 justify-between flex-wrap px-2 w-full mt-5">
                                    <div style={{ flexGrow: 1 }}>
                                        <button
                                            onClick={toggleModalsOnLogout}
                                            className="bg-violet-500
                                            hover:bg-violet-600
                                            active:bg-violet-700 
                                            focus:outline-none w-full
                                            focus:ring-2 text-xs
                                            focus:ring-violet-300 font-MontSemiBold
                                                py-[.5rem] text-white px-5
                                                rounded-lg">
                                            Annuler
                                        </button>
                                    </div>

                                    <div style={{ flexGrow: 1 }}>
                                        <button
                                            onClick={handlerLogoutFunc}
                                            className="bg-red-500
                    hover:bg-red-600
                    active:bg-red-700 
                    focus:outline-none w-full
                    focus:ring-2 text-xs
                    // focus:ring-red-300 font-MontSemiBold
                        py-[.5rem] text-white px-5
                        rounded-lg">
                                            Valider
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default ModalsLogOut
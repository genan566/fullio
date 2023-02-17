import React from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'
import { ModalsOnSearchTypes } from '../../types/ModalsOnSearchTypes'
const ModalsOnSearch = ({ isOpenResearch, toggleOnResearch }:
    ModalsOnSearchTypes) => {
    return (
        <>
            {
                isOpenResearch && (
                    <>
                        <div className="cModals">

                            <div className="cModals-container p0">
                                <button
                                    onClick={toggleOnResearch} className="cModals-container-close">
                                    <IoClose
                                        color="white"
                                        size={15}
                                    />
                                </button>


                                <div className='w-[90%] mt-[.8rem]'>
                                    <p className="text-xs font-MontBold text-white mb-4">Enter your research</p>

                                    <div className="control-container-S mt-3 mb-1" id='cPar'>
                                        <IoSearch
                                            color="white"
                                            size={18}
                                        />
                                        <input
                                            placeholder='Your search'
                                            type="text"
                                            className="control-input-S" />
                                    </div>
                                </div>


                                <p
                                    className="text-sxl font-MontRegular mt-5 text-slate-200 mx-4 w-3/5 text-center">Aucun résultat de recherche pour l'instant
                                    veuillez bien entrer votre recherche</p>

                            </div>
                        </div>
                    </>

                )
            }
        </>
    )
}

export default ModalsOnSearch
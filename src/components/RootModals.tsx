import React from 'react'
import { RootModalsTypes } from '../types/RootModalsTypes';
import ModalsLogOut from './modals/ModalsLogOut';
import ModalsOnSearch from './modals/ModalsOnSearch';
import ModalsShowingLogin from './modals/ModalsShowingLogin';
import ModalsShowingSignin from './modals/ModalsShowingSignin';

const RootModals = ({ isShownModalsSignIn, isShownModalsFirstSignIn, toggleShowSignUpModal, isOpenResearch, isShownModalsLogOut, toggleShowSigninModal, navLogin, navSignin,
    toggleModalsOnLogout, toggleOnResearch, errorFuncOnLogIn, responseGoogle, handlerLogoutFunc }:
    RootModalsTypes
) => {
    return (
        <>
            <ModalsShowingLogin
                navSignin={navSignin}
                errorFuncOnLogIn={errorFuncOnLogIn}
                responseGoogle={responseGoogle}
                isShownModalsSignIn={isShownModalsSignIn}
                toggleShowSigninModal={toggleShowSigninModal} />

            <ModalsShowingSignin
                navLogin={navLogin}
                errorFuncOnLogIn={errorFuncOnLogIn}
                responseGoogle={responseGoogle}
                isShownModalsFirstSignIn={isShownModalsFirstSignIn}
                toggleShowSignUpModal={toggleShowSignUpModal} />

            <ModalsOnSearch
                isOpenResearch={isOpenResearch}
                toggleOnResearch={toggleOnResearch}
            />

            <ModalsLogOut
                toggleModalsOnLogout={toggleModalsOnLogout}
                isShownModalsLogOut={isShownModalsLogOut}
                handlerLogoutFunc={handlerLogoutFunc}
            />
        </>
    )
}

export default RootModals
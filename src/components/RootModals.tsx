import React from 'react'
import { RootModalsTypes } from '../types/RootModalsTypes';
import ModalForUserNotStaff from './modals/ModalForUserNotStaff';
import ModalAddingFAQs from './modals/ModalsAddingFAQs';
import ModalsLogOut from './modals/ModalsLogOut';
import ModalsOnSearch from './modals/ModalsOnSearch';
import ModalsShowingLogin from './modals/ModalsShowingLogin';
import ModalsShowingSignin from './modals/ModalsShowingSignin';
import ModalSubscription from './modals/ModalsSubscription';
import ModalsUpdateUserInfo from './modals/ModalsUpdateUserInfo';

const RootModals = ({ isShownModalsSignIn, isShownModalsFirstSignIn, toggleShowSignUpModal, isOpenResearch, isShownModalsLogOut, toggleShowSigninModal, navLogin, navSignin,
    toggleModalsOnLogout, toggleOnResearch, errorFuncOnLogIn, responseGoogle, handlerLogoutFunc }:
    RootModalsTypes
) => {

    return (
        <>
            <ModalsUpdateUserInfo />
            <ModalSubscription />
            <ModalAddingFAQs />
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

            <ModalForUserNotStaff />
        </>
    )
}

export default RootModals
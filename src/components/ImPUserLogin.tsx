import React from 'react'
import { useGoogleOneTapLogin } from 'react-google-one-tap-login'
import { ValuesTypes } from '../contexts'
import { ImpUserLoginTypes } from '../types/ImpUserLoginTypes'
import { UserTypesValues } from '../types/UserTypeValues'
import { user_ID } from './constants/constants'

const ImpUserLogin = ({ userContext }: ImpUserLoginTypes) => {
    useGoogleOneTapLogin({
        onSuccess: (response: any) => {
            if (response) {

                // if (!userContext?.user) {
                let { email, account_balance_btc, account_balance_eth, id,
                    image, is_staff, is_superuser, pseudo, name }: UserTypesValues = response

                let dataStructured: UserTypesValues = {
                    email: email,
                    account_balance_btc: account_balance_btc,
                    account_balance_eth: account_balance_eth,
                    id: id,
                    is_staff: is_staff,
                    is_superuser: is_superuser,
                    image: image,
                    pseudo: pseudo,
                    name: name,
                }

                // console.log("dataStructured", dataStructured)
                // console.log(" userContext?.setUser", userContext?.setUser)

                userContext?.setUser(dataStructured)
                localStorage.setItem('dataUser', JSON.stringify(dataStructured));
                // }
            }

        },
        onError: (err: any) => console.log(err),
        googleAccountConfigs: {
            client_id: user_ID
        }

    })

    return (
        <></>
    )
}

export default ImpUserLogin
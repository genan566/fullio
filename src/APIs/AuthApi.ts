import axios from "axios";
import { api_url } from "./APIRoutes";

interface DataForm {
    email: string,
    password: string,
}

export class AuthAPI {

    async login_account(data: DataForm) {
        return fetch(
            api_url(`user/token/`),
            {
                method: "POST",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
                body: JSON.stringify(data)
            }
        )
            .then((js) => js.json())
            .then((res) => {
                if (res.non_field_errors) {
                    return { error: res.non_field_errors }
                }
                return res;
            })

    }

    async retrive_me__account(token: string) {
        if (token) {
            return fetch(
                api_url('user/mee/'),
                {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Token " + JSON.parse(token),
                    }

                }
            )
                .then((res) => {
                    return res.json();
                })
                .catch(er => console.log("er on retrieve", er))

        }

    }

    async retrive_account(token: string, id: number) {
        if (token) {
            return fetch(
                api_url('user/retrieve/' + id.toString()),
                {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Token " + JSON.parse(token),
                    }

                }
            )
                .then((res) => {
                    return res.json();
                })
                .catch(er => console.log("er on retrieve", er))

        }

    }

    async retrive_account_update(token: string, id: number, data: any) {
        if (token && id) {
            return fetch(
                api_url('user/retrieve/' + id.toString()),
                {
                    method: "PATCH",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Token " + JSON.parse(token),
                    },
                    body: JSON.stringify(data)

                }
            )
                .then((res) => {
                    return res.json();
                })
                .catch(er => console.log("er on retrieve", er))

        }

    }

    async retrive_mee_update(token: string, data: any, formed?: boolean) {
        if (token && data) {
            // if (!Boolean(formed)) {
            //     return fetch(
            //         api_url('user/mee/'),
            //         {
            //             method: "PATCH",
            //             headers: {
            //                 Accept: 'application/json',
            //                 'Content-Type': 'application/json',
            //                 'Authorization': "Token " + JSON.parse(token),
            //             },
            //             body: JSON.stringify(data)

            //         }
            //     )
            //         .then((res) => {
            //             return res.json();
            //         })
            //         .catch(er => console.log("er on retrieve", er))
            // } else {
            //     console.log(data)
            //     let dataSent = new FormData()
            //     // dataSent.append("image", data.image)
            //     dataSent.append("account_balance_btc", data.account_balance_btc)
            //     dataSent.append("account_balance_eth", data.account_balance_eth)
            //     dataSent.append("email", data.email)
            //     dataSent.append("name", data.name)
            //     dataSent.append("pseudo", data.pseudo)
            //     // console.log(data)
            //     // console.log(dataSent.get("account_balance_btc"))
            //     // console.log(dataSent.get("account_balance_eth"))
            //     // console.log(dataSent.get("name"))
            //     // console.log(dataSent.get("email"))
            //     // console.log(dataSent.get("pseudo"))

            //     return fetch(
            //         api_url('user/mee/'),
            //         {
            //             method: "PATCH",
            //             headers: {
            //                 // Accept: 'application/json',
            //                 // "content-type": "application/x-www-form-urlencoded",
            //                 'Content-Type': 'application/json',
            //                 'Authorization': "Token " + JSON.parse(token),
            //             },
            //             body: JSON.stringify(data)

            //         }
            //     )
            //         .then((res) => {
            //             return res.json();
            //         })
            //         .catch(er => console.log("er on retrieve", er))
            // }

            return fetch(
                api_url('user/mee/'),
                {
                    method: "PATCH",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Token " + JSON.parse(token),
                    },
                    body: JSON.stringify(data)

                }
            )
                .then((res) => {
                    return res.json();
                })
                .catch(er => console.log("er on retrieve", er))

        }

    }

    async upload_image_to_user(id: number, data: any, token: string) {

        let dataSent = new FormData()
        dataSent.append("image", data.image)
        console.log(dataSent.get("image"))

        return fetch(
            api_url(`user/retrieve/upload-image/${id}`),
            {
                method: "PUT",
                headers: {
                    // "content-type": "application/x-www-form-urlencoded",
                    'Authorization': "Token " + JSON.parse(token),
                },
                body: dataSent
            }
        )
            .then((js) => js.json())

    }
}
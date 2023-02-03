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
}
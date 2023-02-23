import { api_url } from "./APIRoutes";

export class UsersAPI {
    async get_all_users(token: string) {
        return fetch(
            api_url(`user/list/`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8",
                    'Authorization': "Token " + JSON.parse(token),
                },
            }
        )
            .then((js) => js.json())

    }

    async retrieve_update_user(token: string, id: number | undefined, data: any) {
        if (token && id) {
            let dataSent = new FormData()
            dataSent.append("image", data.image)
            console.log(dataSent.get("image"))

            return fetch(
                api_url(`user/retrieve/upload-image-auth/${id}`),
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
}
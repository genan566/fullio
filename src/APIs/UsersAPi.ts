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
}
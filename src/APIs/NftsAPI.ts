import axios from "axios";
import { api_url } from "./APIRoutes";

export class NftsAPI {

    async get_all_nfts() {
        return fetch(
            api_url(`core_nfts/`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.json())

    }
}
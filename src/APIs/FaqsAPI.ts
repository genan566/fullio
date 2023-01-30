import axios from "axios";
import { api_url } from "./APIRoutes";

export class FaqsAPI {

    async get_all_faqs() {
        return fetch(
            api_url(`faqs/`),
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
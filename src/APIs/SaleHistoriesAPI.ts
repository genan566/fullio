import axios from "axios";
import { api_url } from "./APIRoutes";

export class SaleHistoriesAPI {

    async get_all_sales() {
        return fetch(
            api_url(`sale_histories/`),
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }

            }
        )
            .then((js) => js.json())

    }

    async get_sales_by_ID(id: number) {
        return fetch(
            api_url(`sale_histories/${id}`),
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }

            }
        )
            .then((js) => js.json())

    }
}
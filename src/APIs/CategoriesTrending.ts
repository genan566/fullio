import axios from "axios";
import { api_url } from "./APIRoutes";

export class CategoriesTrendingAPI {

    async get_all_categories() {
        return fetch(
            api_url(`categories_trending/`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.json())

    }

    async get_categorie(idx: number) {
        return fetch(
            api_url(`categories_trending/${idx}`),
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

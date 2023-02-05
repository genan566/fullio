import axios from "axios";
import { idText } from "typescript";
import { api_url } from "./APIRoutes";

export class NftsAPI {

    async get_all_nfts(page = 1) {
        return fetch(
            api_url(`core_nfts/?page=${page}`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.json())

    }

    async create_nfts(data: any, token: string) {


        let newDataForm = new FormData()

        console.log("mtdata", data)
        newDataForm.append("image", data.image)


        return fetch(
            api_url(`core_nfts/`),
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': "Token " + JSON.parse(token),
                },
                body: JSON.stringify({
                    title: data.title,
                    owner: data.owner,
                    sales_history: data.sales_history,
                    categories_trending: data.categories_trending,
                    price: data.price,
                    description: data.description,
                })
            }
        )
            .then((js) => js.json())

    }

    async upload_image_to_nft(id: number, data: any, token: string) {

        let dataSent = new FormData()
        dataSent.append("image", data.image)

        return fetch(
            api_url(`core_nfts/${id}/upload-image/`),
            {
                method: "POST",
                headers: {
                    'Authorization': "Token " + JSON.parse(token),
                },
                body: dataSent
            }
        )
            .then((js) => js.json())

    }
}
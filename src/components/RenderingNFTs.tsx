import React from 'react'
import { PaginatedData } from '../pages/ContainerPrincipal'
import { NftTypesValues } from '../types/NFTTypes'
import CardNFT from './CardNFT'
import FlatedNFT from './FlatedNFT'

const RenderingNFTs = ({ nftsData, with_slice, render_type = "default", custom_func }:
    { nftsData: PaginatedData, with_slice: boolean, render_type?: "default" | "flated", custom_func?: () => void }) => {
    let data_renderring_likes = Boolean(nftsData.results) ?
        !Boolean(with_slice) ? nftsData.results : nftsData.results.slice(0, 5) : nftsData.results
    return (
        <>
            {
                nftsData.results && <>
                    {
                        data_renderring_likes.map(item => {
                            let sendedData: NftTypesValues = {
                                id: item.id,
                                title: item.title,
                                description: item.description,
                                owner_id: item.owner,
                                image: item.image,
                                price: item.price,
                                categories_trending: item.categories_trending,
                                sales_history: item.sales_history,
                            }
                            return (
                                <>
                                    {
                                        render_type === "default" &&
                                        <CardNFT
                                            data={sendedData}
                                            rebirth={item.title}
                                            owner={item.owner}
                                            key={item.id}
                                            image={item.image}
                                            link={true}
                                            categories_trending={item.categories_trending}
                                            sales_history={item.sales_history}
                                        />
                                    }


                                    {
                                        render_type === "flated" &&
                                        <FlatedNFT
                                            custom_call={custom_func}
                                            data={sendedData}
                                            rebirth={item.title}
                                            owner={item.owner}
                                            key={item.id}
                                            image={item.image}
                                            link={true}
                                            categories_trending={item.categories_trending}
                                            sales_history={item.sales_history}
                                        />
                                    }
                                </>
                            )
                        })
                    }
                </>
            }

            {
                !Boolean(nftsData.results) && <div className="text-center w-full">
                    <h1 className="text-white text-lg font-MontBold mt-10">Aucune donnée NFTs n'est à afficher pour le moment.</h1>
                </div>
            }
        </>
    )
}

export default RenderingNFTs
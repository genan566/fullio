import React from 'react'
import { PaginatedData } from '../pages/ContainerPrincipal'
import { NftTypesValues } from '../types/NFTTypes'
import CardNFT from './CardNFT'

const RenderingNFTs = ({ nftsData }: { nftsData: PaginatedData }) => {
    return (
        <>
            {
                nftsData.results && <>
                    {
                        nftsData.results.slice(0, 5).map(item => {
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
                                </>
                            )
                        })
                    }
                </>
            }

            {
                ((!nftsData.results)) && <div className="text-center w-full">
                    <h1 className="text-white text-lg font-MontBold mt-10">Aucune donnée NFTs n'est à afficher pour le moment.</h1>
                </div>
            }
        </>
    )
}

export default RenderingNFTs
import React from 'react'
import { NftsAPI } from '../APIs/NftsAPI'
import { NftTypesValues } from '../types/NFTTypes'

const useLoadNFT = (id: number) => {
    const [loadedNDT, setNFT] = React.useState<NftTypesValues>()

    React.useEffect(() => {
        let nftApi = new NftsAPI()
        nftApi.get_unique(id).then((data) => {
            console.log("yaaaaaaaaaaaaaaaaaa", data)
        })
    }, [])

    return {
        loadedNDT
    }

}

export default useLoadNFT
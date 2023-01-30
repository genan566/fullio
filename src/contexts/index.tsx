import React from "react"

export type UserTypesValues = {
    account_balance_btc: string,
    account_balance_eth: string,
    email: string,
    id: number,
    image: string | undefined,
    is_staff: boolean,
    is_superuser: boolean,
    name: string,
    pseudo: string,
}

export interface Owner {
    id: number,
    image: string,
    email: string,
}

export interface SaleHistory {
    title: string,
    user_suscribed: Owner,
    price: string,
    created_at: string,
    will_end_at: string,
}

export interface CategoriesTrending {
    id: number,
    name: string,
}

export type NftTypesValues = {
    title: string,
    description: string,
    price: number | string,
    owner_name: string,
    owner_pic: string,
    image: string,
    categories_trending: CategoriesTrending[],
    sales_history: SaleHistory[],
}

export type UserTokenTypesValues = {
    token: string,
}

export interface ValuesTypes {
    user: UserTypesValues | null,
    setUser: React.Dispatch<React.SetStateAction<UserTypesValues | null>>
}

export interface ValuesNftDataTypes {
    nftData: NftTypesValues | null,
    setNftData: React.Dispatch<React.SetStateAction<NftTypesValues | null>>
}

export interface ValuesSetUserTokenDataTypes {
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>
}


export const RootUserContext = React.createContext<ValuesTypes | null>(null)

export const RootUserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<UserTypesValues | null>(null)

    return <RootUserContext.Provider value={{ user, setUser }}>
        {children}
    </RootUserContext.Provider>
}

export const RootNftContext = React.createContext<ValuesNftDataTypes | null>(null)

export const RootNFTContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [nftData, setNftData] = React.useState<NftTypesValues | null>(null)

    return <RootNftContext.Provider value={{ nftData, setNftData }}>
        {children}
    </RootNftContext.Provider>
}


export const RootUserTokenContext = React.createContext<ValuesSetUserTokenDataTypes>({} as ValuesSetUserTokenDataTypes)

export const RootUserTokenProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = React.useState<string>("")

    return <RootUserTokenContext.Provider value={{ token, setToken }}>
        {children}
    </RootUserTokenContext.Provider>
}
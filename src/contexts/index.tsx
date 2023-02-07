import React from "react"
import { NftTypesValues } from "../types/NFTTypes"
import { UserTypesValues } from "../types/UserTypeValues"


export type UserTokenTypesValues = {
    token: string,
}

export interface ValuesTypes {
    user: UserTypesValues,
    setUser: React.Dispatch<React.SetStateAction<UserTypesValues>>
}

export interface ValuesNftDataTypes {
    nftData: NftTypesValues | null,
    setNftData: React.Dispatch<React.SetStateAction<NftTypesValues | null>>
}

export interface ValuesSetUserTokenDataTypes {
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>
}

export interface ValuesSetIsCreatorDataTypes {
    isCreator: boolean,
    setisCreator: React.Dispatch<React.SetStateAction<boolean>>
}


export const RootUserContext = React.createContext<ValuesTypes>({} as ValuesTypes)
export const RootNftContext = React.createContext<ValuesNftDataTypes | null>(null)
export const RootCreatorContext = React.createContext<ValuesSetIsCreatorDataTypes | null>(null)
export const RootUserTokenContext = React.createContext<ValuesSetUserTokenDataTypes>({} as ValuesSetUserTokenDataTypes)


export const RootUserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<UserTypesValues>({} as UserTypesValues)

    return <RootUserContext.Provider value={{ user, setUser }}>
        {children}
    </RootUserContext.Provider>
}


export const RootNFTContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [nftData, setNftData] = React.useState<NftTypesValues | null>(null)

    return <RootNftContext.Provider value={{ nftData, setNftData }}>
        {children}
    </RootNftContext.Provider>
}


export const RootUserTokenProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = React.useState<string>("")

    return <RootUserTokenContext.Provider value={{ token, setToken }}>
        {children}
    </RootUserTokenContext.Provider>
}

export const RootCreatorProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCreator, setisCreator] = React.useState<boolean>(false)

    return <RootCreatorContext.Provider value={{ isCreator, setisCreator }}>
        {children}
    </RootCreatorContext.Provider>
}
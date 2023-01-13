import React from "react"

export type UserTypesValues = {
    email: string,
    email_verified: boolean,
    family_name: string,
    given_name: string,
    name: string,
    picture: string,
}

type ValuesTypes = {
    user: UserTypesValues | null,
    setUser: React.Dispatch<React.SetStateAction<UserTypesValues | null>>
}

export const RootUserContext = React.createContext<ValuesTypes | null>(null)

export const RootUserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<UserTypesValues | null>(null)

    return <RootUserContext.Provider value={{ user, setUser }}>
        {children}
    </RootUserContext.Provider>
}
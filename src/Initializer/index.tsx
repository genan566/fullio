import React from 'react'
import { RootUserTokenContext, RootNftContext, RootUserTokenProvider } from '../contexts'
type Props = {
  children: string | JSX.Element | JSX.Element[]
}
const Initializer = ({ children }: Props) => {
  return (
    <RootUserTokenProvider>
      {children}
    </RootUserTokenProvider>
  )
}

export default Initializer
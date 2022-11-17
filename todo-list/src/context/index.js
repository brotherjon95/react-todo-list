import React from 'react'
import list from '../data/list'

export const MainContext = React.createContext()

const ContextData = ({ children }) => {

  let data ={
    list,
    // colors
    primaryColor: '#0088cc',
    lightPrimaryColor: '#f6f6f6',
    darkPrimaryColor: '#060606',
    warningLowColor: '#ff9999',
    warningMediumColor: '#ff4d4d',
    warningHighColor: '#cc0000',
    succesMediumColor: '#00cc00'
  }

  return <MainContext.Provider value={data}>
    {children}
  </MainContext.Provider>
}

export default ContextData
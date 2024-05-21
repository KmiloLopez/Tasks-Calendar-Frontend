import React from 'react'

const CardComp = ({children}) => {
  return (
    <div className="bg-zinc-800 max-w-md w-full p-2 rounded-md relative">
      {children}
    </div>
  )
}

export default CardComp
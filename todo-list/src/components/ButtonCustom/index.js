import React from 'react'
// style
import '../ButtonCustom/ButtonCustom.css'

const ButtonCustom = ({ children, onClickHandler, backgroundColor, color }) => {
  return <button onClick={onClickHandler} style={{ backgroundColor, color}}>
    {children}
  </button>
}

ButtonCustom.defaultProps = {
  backgroundColor: '#0088cc',
  color: '#f6f6f6'
}

export default ButtonCustom
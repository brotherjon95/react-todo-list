import React, { useState, useEffect } from 'react'
// style
import '../Modal/Modal.css'

const Modal = ({ children, modalVisibility, closeModal, modalTitle }) => {
  return modalVisibility ? <div className='modal'>
    <div className='modal-content'>
      {modalTitle && <h1>{modalTitle}</h1>}
      <button className='close-modal' onClick={closeModal}>x</button>
      {children}
    </div>
  </div> : null
}

export default Modal
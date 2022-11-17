import React, { useState, useContext } from 'react'
// style
import '../AddItem/AddItem.css'
// context
import { MainContext } from '../../context'
// components
import { ButtonCustom, FormHandler, Modal } from '../'

const AddItem = () => {
  const { lightPrimaryColor, darkPrimaryColor } = useContext(MainContext)
  const [showAddModal, setShowAddModal] = useState(false)

  return <div className='add-item-wrapper'>
    <h1>Todo list</h1>
    <ButtonCustom onClickHandler={() => setShowAddModal(true)} backgroundColor={lightPrimaryColor} color={darkPrimaryColor}>add item</ButtonCustom>

    <Modal modalVisibility={showAddModal} closeModal={() => setShowAddModal(false)} modalTitle='Add new item'>
      <FormHandler onSubmitForm={() => setShowAddModal(false)} typeOfSubmit='create-item' />
    </Modal>
  </div>
}

export default AddItem
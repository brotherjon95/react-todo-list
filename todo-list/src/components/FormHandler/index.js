import React, { useState, useContext } from 'react'
// style
import '../FormHandler/FormHandler.css'
// context
import { MainContext } from '../../context'
// components
import { ButtonCustom, Error } from '../index'

const FormHandler = ({ id, title, description, finalDate, priority, onSubmitForm, typeOfSubmit }) => {
  const { primaryColor, lightPrimaryColor, addListItem, updateListItem } = useContext(MainContext)

  const [itemID, setItemID] = useState(id)

  const [itemTitle, setItemTitle] = useState(title)
  const [itemTitelError, setItemTitleError] = useState(false)

  const [itemDescription, setItemDescription] = useState(description)
  const [itemDescriptionError, setItemDescriptionError] = useState(false)

  const [itemFinalDate, setItemFinalDate] = useState(finalDate)
  const [itemFinalDateError, setItemFinalDateError] = useState(false)

  const [itemPriority, setItemPriority] = useState(priority)

  const handleTitleChange = value => {
    if (value.length <= 100) {
      setItemTitle(value)
      setItemTitleError(false)
    } else {
      setItemTitleError(true)
    }
  }

  const handleDescriptionChange = value => {
    if (value.length <= 100) {
      setItemDescription(value)
      setItemDescriptionError(false)
    } else {
      setItemDescriptionError(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    switch (typeOfSubmit) {
      case 'create-item':
        addListItem(new Date().getTime().toString(), itemTitle, itemFinalDate, itemDescription, itemPriority)
        break;
      case 'update-item':
        updateListItem(itemID, itemTitle, itemFinalDate, itemDescription, itemPriority)
        break;
      default:
        break;
    }

    onSubmitForm()
  }

  return <form className='form-handler' onSubmit={(e) => handleSubmit(e)}>
    <div>
      <label>Title:</label>
      <input value={itemTitle} onChange={(e) => handleTitleChange(e.target.value)} type='text' placeholder='Enter title' />
      {itemTitelError && <Error message='*Title can be max 100 characters long.' />}
    </div>

    <div>
      <label>Description:</label>
      <textarea value={itemDescription} onChange={(e) => handleDescriptionChange(e.target.value)} placeholder='Enter description'></textarea>
      {itemDescriptionError && <Error message='*Description can be max 100 characters long.' />}
    </div>

    <div>
      <label>Final date:</label>
      <p>{itemFinalDate}</p>
    </div>

    <div>
      <label>Priority:</label>
      <select value={itemPriority} onChange={(e) => setItemPriority(e.target.value)}>
        <option value='low'>low</option>
        <option value='medium'>medium</option>
        <option value='high'>high</option>
      </select>
    </div>

    <div>
      <ButtonCustom backgroundColor={primaryColor} color={lightPrimaryColor}>submit</ButtonCustom>
    </div>
  </form>
}

FormHandler.defaultProps = {
  itemID: new Date().getTime().toString(),
  title: '',
  description: '',
  finalDate: new Date().getTime().toString(),
  priority: 'low',
  onSubmitForm: () => null,
  typeOfSubmit: 'create-item' // can be create-item for adding new items, or update-item for updating existing items
}

export default FormHandler
import React, { useState, useContext } from 'react'
// style
import '../FormHandler/FormHandler.css'
// context
import { MainContext } from '../../context'
// components
import { ButtonCustom, Error } from '../index'
// datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var todaysDate = new Date()
var todaysDateDay = todaysDate.getDate()
var todaysDateMonth = todaysDate.getMonth() + 1
var todaysDateYear = todaysDate.getFullYear()

const FormHandler = ({ id, title, description, finalDate, priority, onSubmitForm, typeOfSubmit }) => {
  const { primaryColor, lightPrimaryColor, addListItem, updateListItem } = useContext(MainContext)

  const [itemID, setItemID] = useState(id)

  const [itemTitle, setItemTitle] = useState(title)
  const [itemTitelError, setItemTitleError] = useState(false)

  const [itemDescription, setItemDescription] = useState(description)
  const [itemDescriptionError, setItemDescriptionError] = useState(false)

  const [itemFinalDate, setItemFinalDate] = useState(finalDate)

  const [itemPriority, setItemPriority] = useState(priority)

  const [globalError, setGlobalError] = useState(false)

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

  const handleDateChange = date => {
    let reformatedDateDay = date.getDate()
    let reformatedDateMonth = date.getMonth() + 1
    let reformatedDateYear = date.getFullYear()
    let reformatedDate = reformatedDateMonth + '/' + reformatedDateDay + '/' + reformatedDateYear

    setItemFinalDate(reformatedDate)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let proceedToSubmit = false

    if (!itemTitle.length || !itemDescription.length) {
      typeOfSubmit = ''
      setGlobalError('Fill all data.')
    } else {
      setGlobalError('')
      onSubmitForm()
    }

    switch (typeOfSubmit) {
      case 'create-item':
        addListItem(new Date().getTime().toString(), itemTitle, itemFinalDate, itemDescription, itemPriority)
        proceedToSubmit = true
        break;
      case 'update-item':
        updateListItem(itemID, itemTitle, itemFinalDate, itemDescription, itemPriority)
        proceedToSubmit = true
        break;
      default:
        break;
    }
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
      <DatePicker 
        selected={new Date(itemFinalDate)} 
        onChange={(date) => handleDateChange(date)} 
        minDate={new Date()}
      />
    </div>

    <div>
      <label>Priority:</label>
      <select value={itemPriority} onChange={(e) => setItemPriority(e.target.value)}>
        <option value='low'>low</option>
        <option value='medium'>medium</option>
        <option value='high'>high</option>
      </select>
    </div>

    {globalError && <Error message={`*${globalError}`} />}

    <div>
      <ButtonCustom backgroundColor={primaryColor} color={lightPrimaryColor}>submit</ButtonCustom>
    </div>
  </form>
}

FormHandler.defaultProps = {
  itemID: new Date().getTime().toString(),
  title: '',
  description: '',
  finalDate: todaysDateMonth + '/' + todaysDateDay + '/' + todaysDateYear,
  priority: 'low',
  onSubmitForm: () => null,
  typeOfSubmit: '' // can be create-item for adding new items, or update-item for updating existing items
}

export default FormHandler
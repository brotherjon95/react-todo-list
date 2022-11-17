import React, { useState, useContext } from 'react'
// style
import '../List/List.css'
// context
import { MainContext } from '../../context'
// components
import { ButtonCustom, Modal, FormHandler } from '../'

const List = () => {
  const { list, warningLowColor, warningMediumColor, warningHighColor, succesMediumColor } = useContext(MainContext)
  const [showEditModal, setShowEditModal] = useState(false)
  const [itemForEditing, setItemForEditing] = useState({})

  const showListItemPriority = (priorityLevel) => {
    let priorityLabel = <b>undefined</b>

    switch (priorityLevel) {
      case 'low':
        priorityLabel = <strong style={{color: warningLowColor}}>{priorityLevel}</strong>
        break;
      case 'medium':
        priorityLabel = <strong style={{color: warningMediumColor}}>{priorityLevel}</strong>
        break;
      case 'high':
        priorityLabel = <strong style={{color: warningHighColor}}>{priorityLevel}</strong>
        break;
      default:
        break;
    }

    return priorityLabel
  }

  const editItem = (e, listItem) => {
    e.stopPropagation()

    setItemForEditing(listItem)

    setShowEditModal(true)
  }

  return <>
    <ul>
      {list.map(listItem => {
        return <li key={listItem.id} onClick={(e) => editItem(e, listItem)}>
          <h2>{listItem.title}</h2>
          <p>{listItem.description}</p>
          <article>
            <div>
              <p>Final date: <strong>{listItem.finalDate}</strong></p>
            </div>
            <div>
              <p>Priority: {showListItemPriority(listItem.priority)}</p>
            </div>
            <div>
              <ButtonCustom backgroundColor={warningMediumColor}>remove</ButtonCustom>
              <ButtonCustom backgroundColor={succesMediumColor}>complete</ButtonCustom>
            </div>
          </article>
        </li>
      })}
    </ul>

    <Modal modalVisibility={showEditModal} closeModal={() => setShowEditModal(false)} modalTitle='Edit item'>
      <FormHandler 
        id={itemForEditing.id} 
        title={itemForEditing.title}
        description={itemForEditing.description}
        finalDate={itemForEditing.finalDate}
        priority={itemForEditing.priority}
        onSubmitForm={() => setShowEditModal(false)} 
        typeOfSubmit='update-item'
      />
    </Modal>
  </>
}

export default List
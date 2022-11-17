import React, { useContext } from 'react'
// style
import '../List/List.css'
// context
import { MainContext } from '../../context'
// components
import { ButtonCustom } from '../'

const List = () => {
  const { list, warningLowColor, warningMediumColor, warningHighColor, succesMediumColor } = useContext(MainContext)

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

  return <>
    <h1>Todo list</h1>
    <ul>
      {list.map(listItem => {
        return <li key={listItem.id}>
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
  </>
}

export default List
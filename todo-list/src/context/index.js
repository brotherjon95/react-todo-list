import React, { useState, useEffect } from 'react'
import list from '../data/list'

export const MainContext = React.createContext()

const ContextData = ({ children }) => {
  const [todoList, setTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem('react-todo-list')) || list
  })

  useEffect(() => {
    const itemsFromStorage = JSON.parse(localStorage.getItem('react-todo-list'));

    if (itemsFromStorage) {
      setTodoList(itemsFromStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-todo-list', JSON.stringify(todoList));
  }, [todoList]);

  const addListItem = (id, title, finalDate, description, priority, completed) => {
    const newListItem = {
      id,
      title, 
      finalDate,
      description,
      priority,
      completed
    }

    setTodoList([...todoList, newListItem])
  }

  const updateListItem = (id, title, finalDate, description, priority, completed) => {
    const newTodoList = todoList.map(item => {
      if (item.id === id) {
        item.title = title
        item.finalDate = finalDate
        item.description = description
        item.priority = priority
        item.completed = completed
      }

      return item
    })

    setTodoList(newTodoList)
  }

  const removeListItem = (id) => {
    const newTodoList = todoList.filter(item => item.id !== id)

    setTodoList(newTodoList)
  }

  const togleCompleteListItem = (id) => {
    const newTodoList = todoList.map(item => {
      if (item.id === id) {
        item.completed = !item.completed
      }

      return item
    })

    setTodoList(newTodoList)
  }

  let data ={
    // data
    list: todoList,
    // colors
    primaryColor: '#0088cc',
    lightPrimaryColor: '#f6f6f6',
    darkPrimaryColor: '#060606',
    warningLowColor: '#ff9999',
    warningMediumColor: '#ff4d4d',
    warningHighColor: '#cc0000',
    succesMediumColor: '#00cc00',
    // functions
    addListItem,
    updateListItem,
    removeListItem,
    togleCompleteListItem
  }

  return <MainContext.Provider value={data}>
    {children}
  </MainContext.Provider>
}

export default ContextData
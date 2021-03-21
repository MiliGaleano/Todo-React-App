import React, {useState, useEffect} from 'react'
import Header from './header'
import ListofTodos from './listofTodos'

const Home = () => {

    const [listTodos, setListTodos] = useState([])
    const [darkMode, setDarkMode] = useState(false)
    const [dragId, setDragId] = useState()

    const [isDesktop, setDesktop] = useState(window.innerWidth > 790);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 790)
    }
    
    useEffect(() => {
        window.addEventListener("resize", updateMedia)
        return () => window.removeEventListener("resize", updateMedia)
    })

    const handleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    const handleList = (x) => {
        setListTodos(listTodos.concat(x))
    }

    const handleUpdateItem = (x) => {
        const newList = listTodos.map((item) => {
            if (item.id === x) {
              const updatedItem = {
                ...item,
                completed: !item.completed,
              }
              return updatedItem
            }
            return item
          })
          setListTodos(newList)
    }

    const handleDeleteItem = (x) => {
        const newList = listTodos.filter((item) => item.id !== x)
          setListTodos(newList)
    }

    const handleClear = () => {
        const newList = listTodos.filter((item) => item.completed === false)
        setListTodos(newList)
    }

    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id)
    }

    const handleDrop = (ev) => {
        const dragTodo = listTodos.find((todo) => todo.id === dragId)
        const dropTodo = listTodos.find((todo) => todo.id === ev.currentTarget.id)
    
        const dragTodoOrder = dragTodo.order
        const dropTodoOrder = dropTodo.order
    
        const newTodoState = listTodos.map((todo) => {
          if (todo.id === dragId) {
            todo.order = dropTodoOrder
          }
          if (todo.id === ev.currentTarget.id) {
            todo.order = dragTodoOrder
          }
          return todo
        })
    
        setListTodos(newTodoState)
      }

      const styles1 = darkMode ? 'darkMode1' :'lightMode1'
      const styles2 = darkMode ? 'darkMode2' :'lightMode2'

    return(
        <div className={styles1}>
            <Header isDesktop={isDesktop} darkMode={darkMode} handleDarkMode={handleDarkMode} handleList={handleList} listTodos={listTodos} styles2={styles2} />
            <ListofTodos handleUpdateItem={handleUpdateItem} listTodos={listTodos} handleDeleteItem={handleDeleteItem} handleClear={handleClear} handleDrop={handleDrop} handleDrag={handleDrag} styles2={styles2}/>
            {listTodos.length !== 0 &&
            <p className='dragDrop'>Drag and drop to reorder list</p>
            }
        </div>
    )
}

export default Home
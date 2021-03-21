import React, { useEffect, useState } from 'react'
import TodoCard from './todocard'

const ListofTodos = ({listTodos, handleUpdateItem, handleDeleteItem, handleClear, handleDrag, handleDrop, styles2}) => {

    const [listToRender, setListToRender] = useState([])
    const [filterActive, setFilterActive] = useState('All')

    useEffect(() => {
        if (filterActive === 'All'){
        setListToRender(listTodos)
        } else if (filterActive === 'Active') {
            setListToRender(listTodos.filter((x)=> x.completed === false)) 
        } else {
            setListToRender(listTodos.filter((x)=> x.completed === true))
        }
    }, [listTodos])



    const handleActive = () => {
        setListToRender(listTodos.filter((x)=> x.completed === false))
        setFilterActive('Active')
    }

    const handleCompleted = () => {
        setListToRender(listTodos.filter((x)=> x.completed === true))
        setFilterActive('Completed')
    }

    const handleAll = () => {
        setListToRender(listTodos)
        setFilterActive('All')
    }

    return (
        <div>
            <div className='divListTodos'>
                {listToRender.sort((a, b) => a.order - b.order)
                .map((todo) => { 
                    return (
                    <TodoCard key={todo.id} todo={todo.todo} id={todo.id} completed={todo.completed} handleUpdateItem={handleUpdateItem} handleDeleteItem={handleDeleteItem} handleDrop={handleDrop} handleDrag={handleDrag} styles2={styles2}></TodoCard> 
                    )
                })
                }
                {listToRender.length !== 0 &&
                <div className={`divInput ${styles2}`}>
                    <input type='readonly' disabled="disabled" className='inputHeader clear' value={`${listToRender.filter((x)=> x.completed===false).length} items left`} />
                    <span className='inputHeader clear' onClick={()=>handleClear()} style={{fontSize:'13.3333px'}}>Clear Completed</span>
                </div>
                }
            </div>
            {listTodos.length !== 0 &&
                <div className={`divInput filters ${styles2}`}>
                    <p onClick={handleAll} className={filterActive==='All' ? 'active' : null}>All</p>
                    <p onClick={handleActive} className={filterActive==='Active' ? 'active' : null}>Active</p>
                    <p onClick={handleCompleted} className={filterActive==='Completed' ? 'active' : null}>Completed</p>
                </div>
            }
        </div>
    )
}

export default ListofTodos
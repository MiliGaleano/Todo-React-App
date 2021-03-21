import React from 'react'
import CircleButton from './circleButton'
import Cross from '../assets/icon-cross.svg'

const TodoCard = ({completed,todo,handleUpdateItem,id,handleDeleteItem,handleDrag,handleDrop,styles2}) => {

    const classInput= completed ? 'inputHeader done' : 'inputHeader'

    return(
            <div className={`divInput ${styles2}`} 
                draggable={true}
                id={id}
                onDragOver={(ev) => ev.preventDefault()}
                onDragStart={handleDrag}
                onDrop={handleDrop}>
                <CircleButton handleUpdateItem={handleUpdateItem} id={id} completed={completed} />
                <input type='readonly' disabled="disabled" className={classInput} value={todo} />
                <img src={Cross} alt='bg img' className='checkimg' onClick={() => handleDeleteItem(id)} />
            </div>
    )
}

export default TodoCard
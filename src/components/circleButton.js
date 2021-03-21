import React from 'react'
import Check from '../assets/icon-check.svg'

const CircleButton = ({completed, handleClick, handleUpdateItem, id}) => {

    let classStyle = completed ? 'circleButton checked' : 'circleButton'
    let checkClick
    if (handleClick !== undefined) {
    checkClick = handleClick
    } else {
        checkClick = () => handleUpdateItem(id) 
    }

    return(
        <div className={classStyle} onClick={checkClick}>
            {completed ? 
                <img src={Check} alt='checked' className='checkimg'></img> 
                : null}
        </div>
    )
}

export default CircleButton
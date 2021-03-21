import React, {useState, useEffect} from 'react'
import CircleButton from './circleButton'
import BgMobileDark from '../assets/bg-mobile-dark.jpg'
import BgMobileLight from '../assets/bg-mobile-light.jpg'
import BgDark from '../assets/bg-desktop-dark.jpg'
import BgLight from '../assets/bg-desktop-light.jpg'
import Moon from '../assets/icon-moon.svg'
import Sun from '../assets/icon-sun.svg'
import './styles.css'

const Header = ({darkMode, isDesktop, handleDarkMode, handleList, listTodos, styles2}) => {

    const [newTodo, setNewTodo] = useState('')
    const [completed, setCompleted] = useState(false)

    const handleChange = (e) => {
        setNewTodo(e.target.value)
    }

    useEffect(() => {
        if (newTodo !== '') {
            setCompleted(true)
        } else {
            setCompleted(false)
        }
    }, [newTodo])

    const handleClick = (e) => {
        e.preventDefault()
        let lastOrder
        if (listTodos.length !== 0){
        lastOrder= listTodos[listTodos.length-1].order
        } else {
        lastOrder= 0
        }
        const todoNew = {
            todo: newTodo,
            completed: false,
            id:`${newTodo}${Math.random()}`,
            order:lastOrder +1
        }
        handleList(todoNew)
        setNewTodo('')
        setCompleted(false)
    }

    const darkimg = isDesktop ? BgDark : BgMobileDark
    const lightimg = isDesktop ? BgLight : BgMobileLight

    return(
        <div className='divHeader'>
            <img src={darkMode ? darkimg : lightimg} alt='bg img' className='imgHeader' />
            <div className='divLogo'>
                <h1 className='logo'>T O D O</h1>
                <img src={darkMode ? Sun : Moon} alt='moon' onClick={handleDarkMode} className='darkMode'></img>
            </div>
            <form className={`divInput form ${styles2}`}  onSubmit={handleClick}>
                <CircleButton handleClick={handleClick} completed={completed} />
                <input type='text' onChange={handleChange} className='inputHeader' value={newTodo} placeholder='Create a new todo...'/>
            </form>
        </div>
    )
}

export default Header

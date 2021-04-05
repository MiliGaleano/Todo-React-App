import React, { useState } from 'react'
import Clock from './Clock'
import ShortBreak from './shortBreak'
import LongBreak from './longBreak'
import './styles.css'
import alarmSound from '../assets/alarmSound.mp3'

const Pomodoro = () => {

    const [sumPomodoro, setSumPomodoro] = useState(1)

    const [showPomodoro, setShowPomodoro] = useState(true)
    const [autoPomodoro, setAutoPomodoro] = useState(false)
    const [showShortBreak, setShowShortBreak] = useState(false)
    const [autoShort, setAutoShort] = useState(false)
    const [showLongBreak, setShowLongBreak] = useState(false)
    const [autoLong, setAutoLong] = useState(false)
    const [alarma, setAlarma] = useState(false)

    const handleSumPomodoro = () => {
        setSumPomodoro(sumPomodoro => sumPomodoro+1)
        console.log(sumPomodoro)
        handlePause()
    }

    const handlePause = () => {
        console.log(sumPomodoro)
        if (sumPomodoro % 3 === 0) {
            setAutoLong(true)
            handleClickLong()
        } else {
            setAutoShort(true)
            handleClickShort()
        }
    }
    const handlePomodoro = () => {
            setAutoPomodoro(true)
            handleClickPomodoro()
    }

    const handleClickPomodoro = () => {
        setShowPomodoro(true)
        setShowLongBreak(false)
        setShowShortBreak(false)
    }
    const handleClickShort = () => {
        setShowPomodoro(false)
        setShowLongBreak(false)
        setShowShortBreak(true)
    }
    const handleClickLong = () => {
        setShowPomodoro(false)
        setShowLongBreak(true)
        setShowShortBreak(false)
    }

    return(
        <div className='divPomodoro'>
            <div className='pomodoroDiv'>
                <h4 className={`pomodoroh4 firsth4 ${showPomodoro && 'activeh4'}`} onClick={handleClickPomodoro}>Pomodoro</h4>|
                <h4 className={`pomodoroh4 ${showShortBreak && 'activeh4'}`} onClick={handleClickShort}>Short Break</h4>|
                <h4 className={`pomodoroh4 lasth4 ${showLongBreak && 'activeh4'}`} onClick={handleClickLong}>Long Break</h4>
            </div>
            {showPomodoro && <Clock setAlarma={setAlarma} handleSumPomodoro={handleSumPomodoro} auto={autoPomodoro} sumPomodoro={sumPomodoro}></Clock>}
            {showShortBreak && <ShortBreak setAlarma={setAlarma} auto={autoShort} handlePomodoro={handlePomodoro}></ShortBreak>}
            {showLongBreak && <LongBreak setAlarma={setAlarma} auto={autoLong} handlePomodoro={handlePomodoro}></LongBreak>}
            {alarma &&
                <audio controls autoPlay style={{display:'none'}}>
                    <source src={alarmSound} type="audio/mpeg"/>
                </audio>
            }
        </div>
    )
}

export default Pomodoro
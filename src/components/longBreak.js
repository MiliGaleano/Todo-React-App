import React, { useState, useEffect } from 'react'

let intervalSegundos;
const LongBreak = ({setAlarma, auto, handlePomodoro}) => {

    const [minutos, setMinutos] = useState()
    const [segundos, setSegundos] = useState()

    const handleStart = () => {
        if (minutos === undefined || minutos < 1) {
            setMinutos('9')
        }
        if (!segundos || segundos < 1) {
             setSegundos('59')
        }
        intervalSegundos= setInterval(changeSegs, 1000)
    }
    const changeSegs = () => {
        setSegundos(segundos => (segundos-1).toString())
    }
    const changeMins = () => {
        setMinutos(minutos => (minutos-1).toString())
    }
    const handleStop = () => {
        clearInterval(intervalSegundos)
    }
    const handleReset = () => {
        clearInterval(intervalSegundos)
        setSegundos()
        setMinutos()
    }

    useEffect(()=>{ auto && handleStart() }, [])
    useEffect(() => {
        if (segundos < 0) {
            clearInterval(intervalSegundos)
            handleStart()
            changeMins()
        }
        if (minutos && segundos){
            document.title = titleText
            if (minutos.toString() === '0' && segundos.toString() === '0') {
                clearInterval(intervalSegundos)
                setMinutos()
                setSegundos()
                setAlarma(true)
                setTimeout(() => {
                    setAlarma(false)
                }, 3000)
                setTimeout(() => {
                handlePomodoro()
                }, 2000)
            }
        }
    }, [segundos, minutos])

    let titleText= `Long break (${!minutos ? '25' : minutos.toString().length < 2 ? `0${minutos.toString()}` : minutos.toString()}:${!segundos ? '00' : segundos.toString().length < 2 ? `0${segundos.toString()}` : segundos.toString()})`

    return(
        <div style={{width:'100vw', textAlign:'center'}}>
            <h1 className='clockh1'>{`${!minutos ? '10' : minutos.toString().length < 2 ? `0${minutos.toString()}` : minutos.toString()}:${!segundos ? '00' : segundos.toString().length < 2 ? `0${segundos.toString()}` : segundos.toString()}`}</h1>
            <div>
                <button onClick={handleStart}>start</button>
                <button onClick={handleStop}>stop</button>
                <button onClick={handleReset}>reset</button>
            </div>
        </div>
    )
}

export default LongBreak
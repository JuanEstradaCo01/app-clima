import React, { useState, useEffect } from 'react'
import "../styles-components/card.css"
import Icon from "./Icon"
import Celsius from "./Centigrado"
import Loader from "./Loader/Loader"

function Card() {

    const [buscar, setBuscar] = useState("")
    const [valores, setValores] = useState("")
    const [icono, setIcono] = useState("")
    const [valor, setValor] = useState("Pereira")

    const lang = "es"
    const units = "metric"

    const LINK = `https://api.openweathermap.org/data/2.5/weather?q=${valor}&lang=${lang}&units=${units}&appid=${process.env.REACT_APP_KEY}`

    const valoresIngresados = (e) => {
        setBuscar(e.target.value)
    }

    const enviarBusqueda = (e) => {
        e.preventDefault()
        document.getElementById("formulario").reset()
        setTimeout(() => {
            setValor(buscar)
        }, 600)
        setValores("")
    }

    //Consumo la API con FETCH:
    const get = async () => {
        await fetch(LINK)
            .then(res => {
                return res.json()
            })
            .then(info => {
                //Valido si el estado de la solicitud es optimo
                if (info.cod >= 400) {
                    setValores(false)
                } else {
                    //Seteo el estado de los valores
                    setValores(info)
                    //Seteo el estado de los iconos
                    setIcono(info.weather[0].main)
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        get()
    }, [valor])

    if (valores === "") {
        return <Loader />
    }

    return (
        <>
            <div className='contenedorPrincipalCard'>
                {/*Valido si la ciudad existe*/}
                {(valores) ? (
                    <>
                        {(valores === "") ? <Loader /> : <>
                            <div className='contenedorFormulario'>
                                <h3>Ingresa una ciudad:</h3>
                                <form id='formulario'>
                                    <input id='inputFormulario' name='buscar' onChange={valoresIngresados} type="text" placeholder='Buscar ciudad' required />
                                    <button className='btnFormulario' type='submit' onClick={enviarBusqueda}>Buscar</button>
                                </form>
                            </div>
                            <div className='contenedorPrincipalInfo'>
                                <h2>{valores.name}, {valores.sys.country}</h2>
                                <div>
                                    <img className='icono' src={Icon(icono)} alt="icono" />
                                    <p>{valores.weather[0].description}</p>
                                </div>
                                <div className='temperatura'>
                                    <p className='temperaturaP'>{Math.round(valores.main.temp)}</p>
                                    <img className='celsius' src={Celsius(icono)} alt="Celsius" />
                                </div>
                                <p>Humedad: {valores.main.humidity}%</p>
                                <div className='contenedorMaxMin'>
                                    <p>{Math.round(valores.main.temp_max)}</p><img className='grados' src={Celsius(icono)} alt="Celsius" />|
                                    <p className='pEs'>{Math.round(valores.main.temp_min)}<img className='grados' src={Celsius(icono)} alt="Celsius" /></p>
                                </div>
                            </div>
                        </>}
                    </>) : (
                    <div className='contenedorError'>
                        <h1>¡Ciudad no encontrada!</h1>
                        <div className='contenedorFormulario'>
                            <form id='formulario'>
                                <h3>Ingresa una ciudad:</h3>
                                <input id='inputFormulario' name='buscar' onChange={valoresIngresados} type="text" placeholder='Buscar nuevamente' required />
                                <button className='btnFormulario' type='submit' onClick={enviarBusqueda}>Buscar</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Card
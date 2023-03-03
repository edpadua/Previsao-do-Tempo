import "./PrevisaoTempo.css";
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTemperatureArrowDown, faTemperatureArrowUp, faDroplet, faWind, faMapMarkerAlt, faTemperature0 } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";

import countries from 'i18n-iso-countries';


function PrevisaoTempo() {



    const [apiDataClima, setApiDataClima] = useState({});
    const [getState, setGetState] = useState('');
    const [state, setState] = useState('');


    const apiKey = process.env.REACT_APP_API_KEY;
    const apiClimaUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}&lang=pt_br`;



    const getWeatherInfo = async () => {
        const { data } = await axios.get(apiClimaUrl);
        setApiDataClima(data);
    };






    useEffect(() => {
        getWeatherInfo();
    }, [apiClimaUrl]);


    const inputHandler = (event) => {
        setGetState(event.target.value);
    };

    const submitHandler = () => {
        setState(getState);
    };

    const kelvinToFarenheit = (k) => {
        return (k - 273.15).toFixed(2);
    };

    return (


        <div >
            <div >


                <div className="input-container">
                    <input
                        type="text"
                        id="location-name"
                        className="form-control"
                        onChange={inputHandler}
                        value={getState}
                        placeholder="Digite a localização"
                    />
                    <button className="btn" onClick={submitHandler}>
                        Procurar
                    </button>
                </div>

            </div>

            <div  >
                {apiDataClima.main ? (
                    <div >

                        <p >
                            <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}

                            <strong>{apiDataClima.name}</strong>
                        </p>

                        <img
                            src={`http://openweathermap.org/img/w/${apiDataClima.weather[0].icon}.png`}

                        />
                        <p>
                            {' '}
                            <strong>{apiDataClima.weather[0].main}</strong>
                        </p>
                        <p >
                            <FontAwesomeIcon icon={faTemperature0} />{' '}
                            <strong>{kelvinToFarenheit(apiDataClima.main.temp)}&deg; C</strong>
                        </p>



                        <div >
                            <div >
                                <p>
                                    <FontAwesomeIcon icon={faTemperatureArrowDown} />{' '}
                                    <strong>
                                        {kelvinToFarenheit(apiDataClima.main.temp_min)}&deg; C
                                    </strong>
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faTemperatureArrowUp} />{' '}
                                    <strong>
                                        {kelvinToFarenheit(apiDataClima.main.temp_max)}&deg; C
                                    </strong>
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faDroplet} />{' '}
                                    <strong>
                                        {apiDataClima.main.humidity} %
                                    </strong>
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faWind} />{' '}
                                    <strong>
                                        {apiDataClima.wind.speed} m/s
                                    </strong>
                                </p>
                            </div>
                            <div >

                                <p>
                                    <strong>
                                        {' '}
                                        {countries.getName(apiDataClima.sys.country, 'pt_br', {
                                            select: 'official',
                                        })}
                                    </strong>
                                </p>
                            </div>
                        </div>


                    </div>



                ) : (
                    <h1></h1>
                )}
            </div>
        </div>


    )
}


export default PrevisaoTempo;
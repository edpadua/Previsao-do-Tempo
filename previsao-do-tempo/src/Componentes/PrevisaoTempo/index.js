import "./PrevisaoTempo.css";
import { useState, useEffect } from 'react';
import axios from "axios";

import countries from 'i18n-iso-countries';


function PrevisaoTempo() {



    const [apiDataClima, setApiDataClima] = useState({});
    const [apiDataPrevisao, setApiDataPrevisao] = useState({});
    const [getState, setGetState] = useState('');
    const [state, setState] = useState('');


    const apiKey = process.env.REACT_APP_API_KEY;
    const apiClimaUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}&lang=pt_br`;
    const apiPrevisaoUrl = `https://api.openweathermap.org/data/2.5/forecast?&q=${state}&APPID=${apiKey}`


    const getWeatherInfo = async () => {
        const { data } = await axios.get(apiClimaUrl);
        setApiDataClima(data);
    };

    const getForecastInfo = async () => {
        const { data } = await axios.get(apiPrevisaoUrl);
        setApiDataPrevisao(data);
    };


    useEffect(() => {
        getForecastInfo();
    }, [apiPrevisaoUrl]);


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


                <div class="col-auto">
                    <input
                        type="text"
                        id="location-name"
                        class="form-control"
                        onChange={inputHandler}
                        value={getState}
                        placeholder="Digite a localização"
                    />
                </div>
                <button className="btn btn-primary mt-2" onClick={submitHandler}>
                    Procurar
                </button>
            </div>

            <div  >
                {apiDataClima.main ? (
                    <div >
                        <img
                            src={`http://openweathermap.org/img/w/${apiDataClima.weather[0].icon}.png`}
                            
                        />

                        <p >
                            {kelvinToFarenheit(apiDataClima.main.temp)}&deg; C
                        </p>

                        <p >
                            <i className="fas fa-map-marker-alt"></i>{' '}
                            <strong>{apiDataClima.name}</strong>
                        </p>

                        <div >
                            <div >
                                <p>
                                    <i class="fas fa-temperature-low "></i>{' '}
                                    <strong>
                                        {kelvinToFarenheit(apiDataClima.main.temp_min)}&deg; C
                                    </strong>
                                </p>
                                <p>
                                    <i className="fas fa-temperature-high"></i>{' '}
                                    <strong>
                                        {kelvinToFarenheit(apiDataClima.main.temp_max)}&deg; C
                                    </strong>
                                </p>
                            </div>
                            <div >
                                <p>
                                    {' '}
                                    <strong>{apiDataClima.weather[0].main}</strong>
                                </p>
                                <p>
                                    <strong>
                                        {' '}
                                        {countries.getName(apiDataClima.sys.country, 'pt', {
                                            select: 'official',
                                        })}
                                    </strong>
                                </p>
                            </div>
                        </div>
                        {
                            apiDataPrevisao.list.map((forecast, i) => (
                                <div key={i}>
                                    
                                    <h4>{forecast.dt_txt}</h4>
                                    <ul>
                                        <li>Temperatura: {forecast.main.temp}</li>
                                        <li>Umidade: {forecast.main.humidity}</li>
                                    </ul>
                                </div>
                            ))}

                    </div>



                ) : (
                    <h1></h1>
                )}
            </div>
        </div>


    )
}


export default PrevisaoTempo;
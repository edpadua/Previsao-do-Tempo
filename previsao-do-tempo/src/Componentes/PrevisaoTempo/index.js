import "./PrevisaoTempo.css";
import { useState, useEffect } from 'react';




function PrevisaoTempo() {


    const [apiData, setApiData] = useState({});
    const [getState, setGetState] = useState('');
    const [state, setState] = useState('');



    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setApiData(data));
    }, [apiUrl]);


    const inputHandler = (event) => {
        setGetState(event.target.value);
    };

    const submitHandler = () => {
        setState(getState);
    };

    return (
        <div>
            <form>
                <div >
                    <label for="nome-localizacao" >
                        Digite o nome da cidade :
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        id="nome-localizacao"
                        onChange={inputHandler}
                        value={getState}
                    />
                </div>
                &nbsp; &nbsp; &nbsp;&nbsp;

                <button className="btn btn-primary mt-2" onClick={submitHandler}>
                    Procurar
                </button>
            </form>
        </div>

    )

}


export default PrevisaoTempo;
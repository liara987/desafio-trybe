import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    const [curency, setCurency] = useState({});
    const [init, setInit] = useState(false);
    useEffect(() => {
        api.get('crypto/btc').then(response => {
            setCurency({
                ...curency,
                BRL: response.data.body.BRL.rate_float,
                CAD: response.data.body.CAD.rate_float,
                EUR: response.data.body.EUR.rate_float,
                USD: response.data.body.bpi.USD.rate_float,
                BTC: response.data.body.bpi.BTC.rate_float
            })
        });
        setInit(false);
    }, [init]);

    function handleChange(event) {
        let newBTC = Number(event.target.value);
        if (newBTC > 1) {
            setCurency({
                ...curency,
                USD: curency.USD * newBTC,
                BRL: curency.BRL * newBTC,
                EUR: curency.EUR * newBTC,
                CAD: curency.CAD * newBTC,
            })
        }
        if (event.target.value.length === 0) {
            setInit(true);
        }
    }

    return (
        <div>
            <Link to="/atualizar" className="atualizar box" id="atualizar">Atualizar valor monetário</Link>
            <span id='btc-label'>BTC</span>
            <input className="btc" type="number" name="" id="btc-input" onChange={handleChange} />
            <span id="USD-label"> USD </span>
            <span id="USD"> {curency.USD} </span>

            <span id="BRL-label"> BRL </span>
            <span id="BRL"> {curency.BRL}</span>

            <span id="EUR-label"> EUR </span>
            <span id="EUR"> {curency.EUR}</span>

            <span id="CAD-label"> CAD </span>
            <span id="CAD">{curency.CAD}</span>
        </div>
    )
}

export default Home;
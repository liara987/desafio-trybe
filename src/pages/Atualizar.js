import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../services/api';
import './atualizar.css';

function Atualizar() {
    const history = useHistory();

    const [cur, setCur] = useState('BRL');
    const [error, setError] = useState('');
    const [send, setSend] = useState(false);
    const [value, setValue] = useState({ cur: 5.400 });
    const [newValue, setNewValue] = useState(5.400);
    const valueCurrent = {
        BRL: 5.400,
        EUR: 0.920,
        CAD: 1.440
    };

    useEffect(() => {
        if (send === true) {
            api.post('crypto/btc', { currency: cur, value: newValue }).then(response => {
                console.log('funcionou');
                history.push("/");
            }).catch(e => {
                if (e.response && e.response.data) {
                    setError(e.response.data.message)
                }
            });
        } else {
            setSend(false)
        }
    }, [send]);

    function handleChangeValue(event) {
        setNewValue(parseFloat(event.target.value));        
    }

    function handleChangeCur(event) {
        switch (event.target.value) {
            case 'BRL':
                setValue({ cur: parseFloat(valueCurrent.BRL) })
                setCur(event.target.value)                
                break;
            case 'CAD':
                setValue({ cur: parseFloat(valueCurrent.CAD) })
                setCur(event.target.value)                
                break;
            case 'EUR':
                setCur(event.target.value)
                setValue({ cur: parseFloat(valueCurrent.EUR) })                
                break;

            default:
                setCur('BRL')
                break;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();        
        setSend(true);
    }

    return (
        <div className="container">
            {error}
            <form onSubmit={handleSubmit}>
                <Link id="voltar" to="/">Voltar</Link>
                <label id="curency-label" htmlFor="currency">Moeda</label>
                <select name="currency" id="currency" onChange={handleChangeCur}>
                    <option value="BRL">BRL</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                </select>

                <span id="current-value-label"><strong>Valor atual:</strong></span>
                <span id="current-value"> R$ {value.cur}</span>

                <label id="new-value-label" htmlFor="valor">Novo valor</label>
                <input id="new-value-input" type="number" name="valor" onChange={handleChangeValue} />

                <input className="button" type="submit" value="ATUALIZAR" />
            </form>
        </div>
    )
}

export default Atualizar;
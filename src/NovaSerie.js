import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NovaSerie = () => {
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);
    const onChange = evt => {
        setName(evt.target.value);
    }
    const onSave = () => {
        axios.post('/api/series', {
            name
        }).then(res => {
           setSuccess(true);     
        });
    }
    if (success) {
        return (
            <Redirect to="/series" />
        );
    }
    return (
        <div className="container">
            <h1>Nova Serie</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome Serie</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome da Serie"/>
                </div>
                <button type="button" onClick={onSave} className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
}

export default NovaSerie;

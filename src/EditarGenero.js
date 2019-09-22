import React, { useState, useEffect } from 'react';
import api from './Service';
import { Redirect } from 'react-router-dom';

const EditarGenero = ({match}) => {
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        api
        .get(`/api/genres/${match.params.id}`)
        .then(res => {
            setName(res.data.name);
        });
    }, [match.params.id]);

    const onChange = evt => {
        setName(evt.target.value);
    }
    
    const onSave = () => {
        api.put(`/api/genres/${match.params.id}`, {
            name
        }).then(res => {
           setSuccess(true);     
        });
    }
    
    if (success) {
        return (
            <Redirect to="/generos" />
        );
    }
    
    return (
        <div className="container">
            <h1>Editar Genero</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome Genero</label>
                    <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome do Genero"/>
                </div>
                <button type="button" onClick={onSave} className="btn btn-primary">Salvar</button>
            </form>
        </div>
    );
}

export default EditarGenero;

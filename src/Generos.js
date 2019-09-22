import React, { useState, useEffect } from 'react';
import api from './Service';
import { Link } from 'react-router-dom';

const Generos = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        api
        .get('/api/genres')
        .then( res => {
            setData(res.data.data);
        });
    }, []);

    const deleteGenero = id => {
        api.delete('/api/genres/' + id).then(res => {
            const filtrado = data.filter(item => item.id !== id);
            setData(filtrado); 
        });
    }

    const rendenrizaLinha = record => {
        return(
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button onClick={() => deleteGenero(record.id)} className="btn btn-danger">Remover</button>
                    <Link to={"/generos/" + record.id} className="btn btn-warning">Editar</Link>
                </td>    
            </tr>
        );
    }

    if (data.length === 0) {
        return (
            <div className="container">
                <h1>Generos</h1>
                <div className="alert alert-warning" role="alert">
                    Sem registros.
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Generos</h1>
            <div><Link to="/generos/novo" className="btn btn-primary">Novo Genero</Link></div>
            <table className="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(rendenrizaLinha)}
                </tbody>
            </table>
        </div>
    );
}

export default Generos;
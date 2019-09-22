import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({match}) => {
    const [form, setForm] = useState({
        name: ''
    });
    const [success, setSuccess] = useState(false);
    const [mode, setMode] = useState('INFO');
    const [genres, setGenres] = useState('');
    const [genreId, setGenreId] = useState('');
    
    const [data, setData] = useState({});
    useEffect(() => {
        axios
        .get(`/api/series/${match.params.id}`)
        .then(res => {
            setData(res.data);
            setForm(res.data);
        });
    }, [match.params.id]);

    useEffect(() => {
        axios
        .get('/api/genres')
        .then(res => {
            setGenres(res.data.data);
            const genres = res.data.data;
            const encontrado = genres.find(value => data.genre === value.name)
            if(encontrado){
                setGenreId(encontrado.id);
            }
        });
    }, [data]);

    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        });
    }

    const onChangeGenre = evt => {
        setGenreId(evt.target.value);
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        });
    }

    const onSave = () => {
        axios.put(`/api/series/${match.params.id}`, {
            ...form,
            genre_id: genreId
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
        <div>
            <header style={masterHeader}>
                <div className="h-100" style={{ background: 'rgba(0,0,0,0.7)' }}> 
                    <div className="h-100 container">
                        <div className="row h-100 align-items-center">
                            <div className="col-3">
                                <img alt={data.name} className="img-fluid img-thumbnail" src={data.poster} />
                            </div>
                            <div className="col-8">
                                <h1 className="font-weight-light text-white">{data.name}</h1>
                                <div className="lead text-white">
                                    { data.status === 'ASSISTIDO' && <Badge color="success">Assistido</Badge>}
                                    { data.status === 'PARA_ASSISTIR' && <Badge color="warning">Para Assistir</Badge>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <button className="btn btn-primary" onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            { mode === 'EDIT' &&
                <div className="container">
                    <h1>Info Serie</h1> 
                    <button className="btn btn-primary" onClick={() => setMode('INFO')}>Cancelar Edição</button>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome Serie</label>
                            <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name" placeholder="Nome da Serie"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="select">Genero</label>
                            <select multiple className="form-control" onChange={onChangeGenre} defaultValue={genreId}>
                                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option> )} 
                            </select>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" checked={form.status === 'ASSISTIDO'} name="status" id="assistido" value="ASSISTIDO" onChange={seleciona('ASSISTIDO')} />
                            <label className="form-check-label" htmlFor="assistido">
                                Assistido
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" checked={form.status === 'PARA_ASSISTIR'} name="status" id="para_assistir" value="PARA_ASSISTIR" onChange={seleciona('PARA_ASSISTIR')}/>
                            <label className="form-check-label" htmlFor="para_assistir">
                                Para Assistir
                            </label>
                        </div>
                        <button type="button" onClick={onSave} className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default InfoSerie;

import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {

    const {push} = useHistory();

    const [creds, setCreds] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState({
        errorMessage: ''
    });

    const handleChange = (e) => {
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/login', creds)
            .then(resp =>{
                localStorage.setItem('token', resp.data.token)
                push('/view');
            })
            .catch(err=>{
                console.log(err);
                setError({errorMessage: '**a server provided error message can be found in ```err.response.data```**'});
            })
    }

    
    return(<ComponentContainer>
        <ModalContainer>
            <h1>Welcome to Blogger Pro</h1>
            <h2>Please enter your account information.</h2>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    Username:
                    <input
                        id='username'
                        type="text"
                        name="username"
                        value={creds.username}
                        onChange={handleChange}
                    />
                    <br/>
                    Password:
                    <input
                        id='password'
                        type="password"
                        name="password"
                        value={creds.password}
                        onChange={handleChange}
                    />
                    <br/>
                <button id='submit'>Submit</button>
                </form>
                <p id='error'>{error.errorMessage}</p>
            </div>
        </ModalContainer>
    </ComponentContainer>);
}

export default Login;

const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
`

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`

const FormGroup = styled.form`
    padding:1rem;
`

const Input = styled.input`
    font-size: 1rem;
    padding: 1rem 0;
    width:100%;
`

const Button = styled.button`
    padding:1rem;
    width: 100%;
`

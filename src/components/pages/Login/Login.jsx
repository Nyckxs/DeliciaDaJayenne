import { useState } from "react";

import "./Login.css";

import Delicias from "../../../assets/dj.svg";


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        
        alert("Enviando os dados: " + username + "-" + password);
    };
  return (
<div className="page-wrapper">

    <div className="container">
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <p className="description" >Bem-vindo de volta! Faça seu login e dê uma pitada de doçura no seu dia com #deliciasdajayenne</p>
            <div className="input-field">
                <p>Email</p>
                    <input type="email" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="input-field">
                <p>Senha</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="recallForget">
                <label>
                    <input type="checkbox" />
                    Lembre de mim
                </label>
                <a href="#">Esqueceu a senha?</a>
            </div>
            <button>Entrar</button>

            <div className="signup-link">
                <p>
                    Não tem uma conta? <a href="#">Registrar</a>
                </p>
            </div>
        </form>
    </div>
    <div className="image-side">
        <img src={Delicias} alt="Delícias da Jayenne" classsName="image"/>
    </div>

</div>
    
  )
}

export default Login

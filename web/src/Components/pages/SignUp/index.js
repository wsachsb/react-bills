import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/airbnb-logo.svg";
import api from "../../../services/api";
import { Form, Container } from "./styles";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Preencha todos os dados para se cadastrar");
    } else {
      try {
        await api.post("/users", { username, email, password });
        navigate("/");
      } catch (err) {
        console.log(err);
        setError("Ocorreu um erro ao registrar sua conta. T.T");
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <img src={Logo} alt="Airbnb logo" />
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Nome de usuário"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Endereço de e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar grátis</button>
        <hr />
        <Link to="/">Fazer login</Link>
      </Form>
    </Container>
  );
};

export default SignUp;

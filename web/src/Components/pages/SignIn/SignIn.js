import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/bills-logo.svg";
import api from "../../../services/api";
import { login } from "../../../services/auth";
import { Form, Container } from "./styles";
import { UserContext } from "../../pages/UserContext/UserContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserResponse } = useContext(UserContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar!");
    } else {
      try {
        let data = {
          "userName": email,
          "password": password
        };

        let header = {
          headers: {
            "Content-Type": "application/json",
            "Cookie": this.sessionid,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
          }
        };

        const response = await api.post("/auth", data, header);       
        login(response.data.token);
        setUserResponse(response.data.userResponse);
        navigate("/dashboard");
      } catch (err) {
        setError("Houve um problema com o login, verifique suas credenciais");
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        <img src={Logo} alt="Bills logo" />
        {error && <p>{error}</p>}
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
        <button type="submit">Entrar</button>
        <hr />
        <Link to="/signup">Criar conta grátis</Link>
      </Form>
    </Container>
  );
};

export default SignIn;

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/login/login.svg";
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

  useEffect(() => {
    // Define o título da aba
    document.title = "My Finances";

    // Cria e adiciona o ícone
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = "./favicon.ico"; // Substitua pelo caminho do seu favicon
    document.head.appendChild(link);

    // Cleanup function to remove the link element
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar!");
    } else {
      try {
        let data = {
          userName: email,
          password: password,
        };

        let header = {
          headers: {
            "Content-Type": "application/json",
            "Cookie": this.sessionid,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept, charset, boundary, Content-Length",
          },
        };

        const response = await api.post("/auth", data, header);
        login(response.data.token);

        // Armazenar os dados do usuário no localStorage
        localStorage.setItem("userResponse", JSON.stringify(response.data.userResponse));

        // Atualizar o contexto do usuário
        setUserResponse(response.data.userResponse);

        // Navegar para o dashboard
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

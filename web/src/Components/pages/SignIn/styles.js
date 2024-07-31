import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5; /* Fundo claro */
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 40px 30px;
  border-radius: 10px; /* Bordas arredondadas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px; /* Margem lateral para responsividade */

  img {
    width: 150px; /* Tamanho maior da imagem */
    margin: 0 0 30px;
  }

  p {
    color: #ff4d4f;
    margin-bottom: 15px;
    border: 1px solid #ff4d4f;
    padding: 10px;
    width: 100%;
    text-align: center;
    border-radius: 5px; /* Bordas arredondadas para a mensagem de erro */
    background: #fff1f0; /* Fundo claro para a mensagem de erro */
  }

  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #333;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px; /* Bordas arredondadas */
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &::placeholder {
      color: #999;
    }

    &:focus {
      border-color: #007bff; /* Cor de foco */
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2); /* Sombra de foco */
    }
  }

  button {
    color: #fff;
    font-size: 16px;
    background: #007bff; /* Cor primária do botão */
    height: 56px;
    border: 0;
    border-radius: 5px; /* Bordas arredondadas */
    width: 100%;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background: #0056b3; /* Cor de hover mais escura */
      transform: translateY(-2px); /* Animação de elevação ao passar o mouse */
    }

    &:active {
      background: #004494; /* Cor mais escura ao clicar */
      transform: translateY(0); /* Reseta a animação de elevação */
    }
  }

  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }

  a {
    font-size: 16px;
    font-weight: bold;
    color: #007bff; /* Cor secundária para o link */
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #0056b3; /* Cor do link ao passar o mouse */
    }
  }

  @media (max-width: 480px) {
    padding: 20px 15px; /* Reduzindo o padding em telas menores */
    img {
      width: 100px; /* Tamanho menor da imagem em telas menores */
    }
    button {
      height: 46px; /* Reduzindo a altura do botão em telas menores */
    }
  }
`;

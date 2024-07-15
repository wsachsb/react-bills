import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100px;
    margin: 10px 0 40px;
  }

  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }

  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;

    &::placeholder {
      color: #999;
    }
  }

  button {
    color: #fff;
    font-size: 16px;
    background: #0056b3; /* Cor primária do botão */
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background: #004494; /* Cor de hover mais escura */
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
`;

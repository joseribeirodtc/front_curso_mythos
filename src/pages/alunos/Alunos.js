import React, { useEffect, useState } from "react";
import "./Alunos.css";
import Axios from "axios";
// import Card from "../../components/cards/cards";
import Table from "../../components/tables/alunos_table";

const moment = require("moment");

export default function Alunos() {
  const [values, setValues] = useState();
  const [rowsAlunos, setRowsAlunos] = useState([]);

  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/createAluno", {
      name: values.name,
      email: values.email,
    }).then(() => {
      Axios.post("http://localhost:3001/searchAluno", {
        name: values.name,
      }).then((response) => {
        setRowsAlunos([
          ...rowsAlunos,
          {
            id: response.data[0].id,
            name: values.name,
            email: values.email,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllAlunos").then((response) => {
      setRowsAlunos(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Adicionar Aluno</h1>
        <input
          type="text"
          name="name"
          placeholder="Nome do Aluno"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="register-input"
          onChange={handleaddValues}
        />
        <button onClick={handleRegisterGame} className="register-button">
          Cadastrar
        </button>
      </div>

      <Table rowsAlunos={rowsAlunos} setRowsAlunos={setRowsAlunos} />
    </div>
  );
}

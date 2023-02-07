import React, { useEffect, useState } from "react";
import "./Cursos.css";
import Axios from "axios";
// import Card from "../../components/cards/cards";
import Table from "../../components/tables/curso_table";

const moment = require("moment");

export default function Cursos() {
  const [values, setValues] = useState();
  const [rowsCursos, setRowsCursos] = useState([]);

  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/createCurso", {
      name: values.name,
      data_de_inicio: moment(values.data_de_inicio, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      ),
      data_de_termino: moment(values.data_de_termino, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      ),
      vagas: values.vagas,
    }).then(() => {
      Axios.post("http://localhost:3001/searchCurso", {
        name: values.name,
      }).then((response) => {
        setRowsCursos([
          ...rowsCursos,
          {
            id: response.data[0].id,
            name: values.name,
            data_de_inicio: moment(values.data_de_inicio, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            ),
            data_de_termino: moment(
              values.data_de_termino,
              "DD/MM/YYYY"
            ).format("YYYY-MM-DD"),
            vagas: values.vagas,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllCursos").then((response) => {
      setRowsCursos(response.data);
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
        <h1 className="register-title">Adicionar Curso</h1>
        <input
          type="text"
          name="name"
          placeholder="Nome do Curso"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Data de Início"
          name="data_de_inicio"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Data de Término"
          name="data_de_termino"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Quantidade de Vagas"
          name="vagas"
          className="register-input"
          onChange={handleaddValues}
        />
        <button onClick={handleRegisterGame} className="register-button">
          Cadastrar
        </button>
      </div>

      <Table rowsCursos={rowsCursos} setRowsCursos={setRowsCursos} />
    </div>
  );
}

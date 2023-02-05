import React, { useState } from "react";
import "./App.css";

function App() {
  const [values, setValues] = useState();
  console.log(values);
  const handlerChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handlerClickButton = () => {
    console.log(values);
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1>Scrim Shop</h1>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register-input"
          onChange={handlerChangeValues}
        />
        <input
          type="text"
          name="cost"
          placeholder="Preço"
          className="register-input"
          onChange={handlerChangeValues}
        />
        <input
          type="text"
          name="category"
          placeholder="Categoria"
          className="register-input"
          onChange={handlerChangeValues}
        />
        <button
          className="register-button"
          onClick={() => {
            handlerClickButton();
          }}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
// import produce from "immer";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.title,
    data_inicio: props.data_inicio,
    data_fim: props.data_fim,
    vagas: props.vagas,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
    console.log(editValues);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditCurso = () => {
    Axios.put("http://localhost:3001/editCurso", {
      id: editValues.id,
      name: editValues.name,
      data_inicio: editValues.data_inicio,
      data_fim: editValues.data_fim,
      vagas: editValues.vagas,
    }).then(() => {
      props.setRowsCursos(
        props.rowsCursos.map((value) => {
          console.log("value.id", value.id, "editValues.id", editValues.id);
          return value.id === editValues.id
            ? {
                id: editValues.id,
                name: editValues.name,
                data_inicio: editValues.data_inicio,
                data_fim: editValues.data_fim,
                vagas: editValues.vagas,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteCurso = () => {
    console.log("editValues", editValues);
    Axios.delete(`http://localhost:3001/deleteCurso/${editValues.id}`).then(
      () => {
        props.setRowsCursos(
          props.rowsCursos.filter((value) => {
            console.log("value.id", value.id);
            return value.id !== editValues.id;
          })
        );
      }
    );
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Curso"
            defaultValue={props.title}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="data_inicio"
            label="Data de Início"
            defaultValue={props.data_inicio}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="data_fim"
            label="Data de Término"
            defaultValue={props.data_fim}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="vagas"
            label="Vagas"
            defaultValue={props.vagas}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteCurso()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditCurso()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

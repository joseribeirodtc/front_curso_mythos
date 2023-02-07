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
    email: props.email,
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

  const handleEditAluno = () => {
    Axios.put("http://localhost:3001/editAluno", {
      id: editValues.id,
      name: editValues.name,
      email: editValues.email,
    }).then(() => {
      props.setRowsAlunos(
        props.rowsAlunos.map((value) => {
          console.log("value.id", value.id, "editValues.id", editValues.id);
          return value.id === editValues.id
            ? {
                id: editValues.id,
                name: editValues.name,
                email: editValues.email,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteAluno = () => {
    console.log("editValues", editValues);
    Axios.delete(`http://localhost:3001/deleteAluno/${editValues.id}`).then(
      () => {
        props.setRowsAlunos(
          props.rowsAlunos.filter((value) => {
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
            label="Aluno"
            defaultValue={props.title}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            defaultValue={props.email}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteAluno()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditAluno()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

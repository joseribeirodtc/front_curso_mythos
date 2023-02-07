import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import FormDialog from "../dialog/dialogFormCursos";

const moment = require("moment");

export default function BasicTable(props) {
  const [open, setOpen] = React.useState(false);

  const { rowsCursos } = props;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Curso</TableCell>
              <TableCell align="left">Data Início</TableCell>
              <TableCell align="left">Data Fim</TableCell>
              <TableCell align="left">Vagas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsCursos.map((row) => (
              <>
                <FormDialog
                  open={open}
                  setOpen={setOpen}
                  title={row.name}
                  data_inicio={row.data_de_inicio}
                  data_fim={row.data_de_termino}
                  vagas={row.vagas}
                  rowsCursos={props.rowsCursos}
                  setRowsCursos={props.setRowsCursos}
                  id={row.id}
                />

                <TableRow
                  onClick={() => setOpen(true)}
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    {moment(row.data_de_inicio).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="left">
                    {moment(row.data_de_termino).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="left">{row.vagas}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

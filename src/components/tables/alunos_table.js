import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import FormDialog from "../dialog/dialogFormAlunos";

export default function BasicTable(props) {
  const [open, setOpen] = React.useState(false);

  const { rowsAlunos } = props;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsAlunos.map((row) => (
              <>
                <FormDialog
                  open={open}
                  setOpen={setOpen}
                  title={row.name}
                  email={row.email}
                  rowsAlunos={props.rowsAlunos}
                  setRowsAlunos={props.setRowsAlunos}
                  id={row.id}
                />

                <TableRow
                  onClick={() => setOpen(true)}
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

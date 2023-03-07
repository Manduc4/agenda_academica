import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  Button,
  Card,
  Typography,
} from "@mui/material";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { useEffect, useState } from "react";
import {
  CollegeFaultProps,
  CollegeFaultService,
} from "../../../shared/services/api/CollegeFaultService/CollegeFaultSevice";
import { useNavigate } from "react-router-dom";
import { Environment } from "../../../shared/environment";
import { Box } from "@mui/material";
import { Stack } from '@mui/system';

export const CollegeFaultList = () => {
  const [rows, setRows] = useState<CollegeFaultProps[]>();
  const [isLoading, setIsLoading] = useState(0);
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    if (window.confirm("Deseja mesmo Apagar o registro?")) {
      CollegeFaultService.deleteById(id)
        .then((data) => {
          if (data instanceof Error) {
            console.log("error", data.message);
          }
          navigate(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    CollegeFaultService.getAll()
      .then((data) => {
        if (data instanceof Error) {
          window.alert(data.message);
        } else {
          setRows(data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <LayoutBaseDePagina>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          boxSizing: "border-box",
          minWidth: 700,
        }}
      >
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography
            variant="h3"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            alignSelf="start"
          >
            Faltas
          </Typography>
          <Button variant="contained" onClick={() => navigate("/faltas/nova")}>
            Adicionar Faltas
          </Button>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "end" }}></Box>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ width: "auto", marginTop: 4, minHeight: '100px' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Disciplina</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Máximo de Faltas</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.maxCollegeFaults}</TableCell>
                  <TableCell sx={{ padding: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ padding: 1 }}
                      onClick={() => navigate(`/faltas/${row.id}`)}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </LayoutBaseDePagina>
  );
};

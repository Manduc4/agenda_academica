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
  TableFooter,
  LinearProgress,
  Pagination,
  Button,
  Card,
  Typography,
  Stack,
} from "@mui/material";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { useEffect, useState } from "react";
import {
  SubjectProps,
  SubjectService,
} from "../../../shared/services/SubjectService/SubjectService";
import { useNavigate } from "react-router-dom";
import { Environment } from "../../../shared/environment";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";

export const SubjectList = () => {
  const [rows, setRows] = useState<SubjectProps[]>();
  const [isLoading, setIsLoading] = useState(0);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (id: number) => {
    if (window.confirm("Deseja mesmo Apagar o registro?")) {
      SubjectService.deleteById(id)
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
    SubjectService.getAll()
      .then((data) => {
        if (data instanceof Error) {
          enqueueSnackbar(data.message, {
            variant: 'error'
          })
        } else {
          setRows(data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
      enqueueSnackbar('teste', {
        variant: 'error'
      })
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="h3"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            alignSelf="start"
          >
            Disciplinas
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/disciplinas/nova")}
          >
            Nova Disciplina
          </Button>
        </Stack>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ width: "auto", marginTop: 4, minHeight: "100px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Abreviação</TableCell>
                <TableCell>Professor</TableCell>
                <TableCell>Máximo de Faltas</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.abbreviation}</TableCell>
                  <TableCell>{row.professor}</TableCell>
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
                      onClick={() => navigate(`/disciplinas/${row.id}`)}
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

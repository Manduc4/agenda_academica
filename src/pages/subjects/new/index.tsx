import { Button, Card, Container, TextField, Typography } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { Box, Stack } from "@mui/system";
import {
  SubjectProps,
  SubjectService,
} from "../../../shared/services/api/SubjectService/SubjectService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const NewSubject: React.FC = () => {
  // edit
  const [selected, setSelected] = useState<SubjectProps>({
    id: 0,
    name: "",
    abbreviation: "",
    professor: "",
    maxCollegeFaults: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  const [typePage, setTypePage] = useState<"new" | "edit">("new");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome da Disciplina é Obrigatório."),
    abbreviation: Yup.string().required("A abreviação é Obrigatória."),
    professor: Yup.string().required("O nome do Professor é Obrigatório."),
    maxCollegeFaults: Yup.string().required(
      "O número máximo de faltas é Obrigatório."
    ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      abbreviation: "",
      professor: "",
      maxCollegeFaults: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        abbreviation: values.abbreviation,
        professor: values.professor,
        maxCollegeFaults: values.maxCollegeFaults,
      } as SubjectProps;

      typePage === "edit" ? Object.assign(payload, { id: selected.id }) : null;

      if (typePage === "new") {
        SubjectService.create(payload)
          .then((data) => {
            if (data instanceof Error) {
              window.alert(data.message);
            }
            navigate("/disciplinas");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        SubjectService.updateById(selected.id, payload)
          .then((data) => {
            if (data instanceof Error) {
              window.alert(data.message);
            }
            navigate("/disciplinas");
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const callEdit = () => {
    SubjectService.getById(Number(params.id)).then((data) => {
      if (data instanceof Error) {
        window.alert("Houve um erro ao trazer o registro.");
      } else {
        setSelected(data);
      }
    });
  };

  const numberMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const typeValue = Number(value);
    const fieldName = event.target.name;
    if (!Number.isNaN(typeValue) && value.length < 4) {
      formik.setFieldValue(fieldName, value);
    }
  };

  useEffect(() => {
    if (params && params.id) {
      setTypePage("edit");
      callEdit();
    }
  }, []);

  useEffect(() => {
    if (selected) {
      formik.setFieldValue("name", selected.name);
      formik.setFieldValue("abbreviation", selected.abbreviation);
      formik.setFieldValue("professor", selected.professor);
      formik.setFieldValue("maxCollegeFaults", selected.maxCollegeFaults);
    }
  }, [selected]);

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
        <Typography
          variant="h3"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          alignSelf="start"
        >
          {typePage === "new" ? "Nova Disciplina" : selected.name}
        </Typography>
        <Card
          sx={{
            padding: 2,
            mt: 4,
          }}
        >
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Stack direction="row" spacing={2}>
                <TextField
                  {...formik.getFieldProps("name")}
                  label="Nome"
                  fullWidth
                  helperText={touched.name && errors.name}
                  error={Boolean(touched.name && errors.name)}
                />
                <TextField
                  {...formik.getFieldProps("abbreviation")}
                  label="Abreviação"
                  fullWidth
                  error={Boolean(touched.abbreviation && errors.abbreviation)}
                  helperText={touched.abbreviation && errors.abbreviation}
                />
                <TextField
                  {...formik.getFieldProps("professor")}
                  label="Professor"
                  fullWidth
                  error={Boolean(touched.professor && errors.professor)}
                  helperText={touched.professor && errors.professor}
                />
                <TextField
                  {...formik.getFieldProps("maxCollegeFaults")}
                  label="Máximo de Faltas"
                  onChange={numberMask}
                  fullWidth
                  error={Boolean(
                    touched.maxCollegeFaults && errors.maxCollegeFaults
                  )}
                  helperText={
                    touched.maxCollegeFaults && errors.maxCollegeFaults
                  }
                />
              </Stack>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                gap={2}
                mt={2}
              >
                <Button
                  type="button"
                  onClick={() => navigate(-1)}
                  variant="outlined"
                >
                  Voltar
                </Button>
                <Button type="submit" variant="contained">
                  Salvar
                </Button>
              </Box>
            </Form>
          </FormikProvider>
        </Card>
      </Box>
    </LayoutBaseDePagina>
  );
};

export default NewSubject;

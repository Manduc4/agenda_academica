import {
  Autocomplete,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { Box, Stack } from "@mui/system";
import {
  NoteProps,
  NoteService,
} from "../../../shared/services/NoteService/NoteServiceService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  SubjectProps,
  SubjectService,
} from "../../../shared/services/SubjectService/SubjectService";

const NewNote: React.FC = () => {
  // edit
  const [selected, setSelected] = useState<NoteProps>({
    id: 0,
    title: "",
    value: "",
    maxValue: "",
    subject: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  const [typePage, setTypePage] = useState<"new" | "edit">("new");
  const [subjectList, setSubjectList] = useState<SubjectProps[]>([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("O Título é Obrigatório."),
    value: Yup.string().required("A Nota é Obrigatória."),
    maxValue: Yup.string().required("A Nota máxima é Obrigatória."),
    subject: Yup.string().required("A Disciplina é Obrigatória."),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      value: "",
      maxValue: "",
      subject: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("teste");
      const payload = {
        title: values.title,
        value: values.value,
        maxValue: values.maxValue,
        subject: values.subject,
      } as NoteProps;

      typePage === "edit" ? Object.assign(payload, { id: selected.id }) : null;

      if (typePage === "new") {
        NoteService.create(payload)
          .then((data) => {
            if (data instanceof Error) {
              window.alert(data.message);
            }
            navigate("/notas");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        NoteService.updateById(selected.id, payload)
          .then((data) => {
            if (data instanceof Error) {
              window.alert(data.message);
            }
            navigate("/notas");
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const callEdit = () => {
    NoteService.getById(Number(params.id)).then((data) => {
      if (data instanceof Error) {
        window.alert("Houve um erro ao trazer o registro.");
      } else {
        setSelected(data);
      }
    });
  };

  const getSubjectList = () => {
    SubjectService.getAll()
      .then((data) => {
        if (data instanceof Error) {
          window.alert(data.message);
        } else {
          setSubjectList(data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
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
    getSubjectList();
  }, []);

  useEffect(() => {
    if (selected) {
      formik.setFieldValue("title", selected.title);
      formik.setFieldValue("value", selected.value);
      formik.setFieldValue("maxValue", selected.maxValue);
      formik.setFieldValue("subject", selected.subject);
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
          {typePage === "new" ? "Nova Nota" : selected.title}
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
                <Autocomplete
                  {...formik.getFieldProps("title")}
                  onChange={(event, value) =>
                    formik.setFieldValue("title", value)
                  }
                  options={[
                    "Prova",
                    "Trabalho",
                    "Seminário",
                    "Apresentação",
                    "Atividade",
                  ]}
                  fullWidth
                  renderInput={(props) => (
                    <TextField
                      label="Tipo"
                      {...props}
                      onChange={formik.handleChange}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />
                  )}
                />
                <TextField
                  {...formik.getFieldProps("value")}
                  label="Nota"
                  onChange={numberMask}
                  fullWidth
                  error={Boolean(touched.value && errors.value)}
                  helperText={touched.value && errors.value}
                />
                <TextField
                  {...formik.getFieldProps("maxValue")}
                  label="Nota Máxima"
                  onChange={numberMask}
                  fullWidth
                  error={Boolean(touched.maxValue && errors.maxValue)}
                  helperText={touched.maxValue && errors.maxValue}
                />
                <Autocomplete
                  {...formik.getFieldProps("subject")}
                  onChange={(event, value) =>
                    formik.setFieldValue("subject", value)
                  }
                  options={subjectList}
                  getOptionLabel={(option) => (option.name ? option.name : "")}
                  fullWidth
                  renderInput={(props) => (
                    <TextField
                      label="Disciplina"
                      {...props}
                      error={Boolean(touched.subject && errors.subject)}
                      helperText={touched.subject && errors.subject}
                    />
                  )}
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

export default NewNote;

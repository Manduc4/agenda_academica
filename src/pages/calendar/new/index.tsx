import {
  Autocomplete,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { Box, Stack } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SubjectService } from "../../../shared/services/SubjectService/SubjectService";
import { daysOfWeek } from "../../../shared/utils/dateAndTime";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputMask from "react-input-mask";
import dayjs from "dayjs";
import {
  EventListProps,
  EventProps,
  EventService,
} from "../../../shared/services/EventService/EventService";

const NewEvent: React.FC = () => {
  // edit
  const [selected, setSelected] = useState<EventProps>({
    id: 0,
    title: "",
    subject: "",
    date: "",
    content: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  const [typePage, setTypePage] = useState<"new" | "edit">("new");
  const [subjectList, setSubjectList] = useState<string[]>([]);

  const euaFormatTransform = (date: string) => {
    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}`
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("O Título é brigatório."),
    subject: Yup.string().required("A Disciplina é Obrigatória."),
    date: Yup.string().required("A data é Obrigatória."),
    content: Yup.string().required("O Conteúdo é Obrigatório."),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      subject: "",
      date: "",
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        title: values.title,
        subject: values.subject,
        date: dayjs(euaFormatTransform(values.date)).format(),
        content: values.content,
      } as EventProps;

      typePage === "edit" ? Object.assign(payload, { id: selected.id }) : null;

      if (typePage === "new") {
        EventService.create(payload)
          .then((data) => {
            if (data instanceof Error) {
              window.alert(data.message);
            }
            navigate("/agenda");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        EventService.updateById(selected.id, payload)
          .then((data) => {
            if (data instanceof Error) {
              window.alert(data.message);
            }
            navigate("/agenda");
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  });

  const { handleSubmit, touched, errors, setFieldValue } = formik;

  const callEdit = () => {
    EventService.getById(Number(params.id)).then((data) => {
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
          setSubjectList(data.data.map((el) => el.name));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
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
      formik.setFieldValue("subject", selected.subject);
      formik.setFieldValue("date", selected.date);
      formik.setFieldValue("content", selected.content);
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
          {typePage === "new" ? "Novo Evento" : "Editar Evento"}
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
                <Autocomplete
                  {...formik.getFieldProps("subject")}
                  onChange={(event, value) => {
                    formik.setFieldValue("subject", value);
                  }}
                  options={subjectList}
                  getOptionLabel={(option) => option}
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
                <TextField
                  {...formik.getFieldProps("content")}
                  label="Conteúdo"
                  error={Boolean(touched.content && errors.content)}
                  helperText={touched.content && errors.content}
                  fullWidth
                />

                <TextField
                  {...formik.getFieldProps("date")}
                  label="Data"
                  fullWidth
                  error={Boolean(touched.date && errors.date)}
                  helperText={touched.date && errors.date}
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

export default NewEvent;

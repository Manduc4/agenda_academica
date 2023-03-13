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
import {
  ScheduleProps,
  ScheduleService,
} from "../../../shared/services/api/ScheduleService/ScheduleService";
import { SubjectService } from "../../../shared/services/api/SubjectService/SubjectService";
import { daysOfWeek } from "../../../shared/utils/dateAndTime";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const NewSchedule: React.FC = () => {
  // edit
  const [selected, setSelected] = useState<ScheduleProps>({
    id: 0,
    subject: "",
    dayOfWeek: "",
    start: "",
    end: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  const [typePage, setTypePage] = useState<"new" | "edit">("new");
  const [subjectList, setSubjectList] = useState<string[]>([]);

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required("A Disciplina é Obrigatória."),
    dayOfWeek: Yup.string().required("O dia da Semana é Obrigatório."),
    start: Yup.string().required("O Horário de Início é Obrigatório."),
    end: Yup.string().required("O Horário Final é Obrigatório."),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      subject: "",
      dayOfWeek: "",
      start: "",
      end: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        subject: values.subject,
        dayOfWeek: values.dayOfWeek,
        start: values.start,
        end: values.end,
      } as ScheduleProps;
      console.log("teste");

      typePage === "edit" ? Object.assign(payload, { id: selected.id }) : null;

      if (typePage === "new") {
        ScheduleService.create(payload)
          .then((data) => {
            if (data instanceof Error) {
              window.alert(data.message);
            }
            navigate("/horarios");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        ScheduleService.updateById(selected.id, payload)
          .then((data) => {
            if (data instanceof Error) {
              window.alert(data.message);
            }
            navigate("/horarios");
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  });

  const { handleSubmit, touched, errors, setFieldValue } = formik;

  const callEdit = () => {
    ScheduleService.getById(Number(params.id)).then((data) => {
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
      formik.setFieldValue("subject", selected.subject);
      formik.setFieldValue("dayOfWeek", selected.dayOfWeek);
      formik.setFieldValue("start", selected.start);
      formik.setFieldValue("end", selected.end);
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
          {typePage === "new" ? "Novo Horário" : "Editar Horário"}
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
                />{" "}
                <Autocomplete
                  {...formik.getFieldProps("dayOfWeek")}
                  onChange={(event, value) => {
                    formik.setFieldValue("dayOfWeek", value);
                  }}
                  options={daysOfWeek}
                  getOptionLabel={(option) => option}
                  fullWidth
                  renderInput={(props) => (
                    <TextField
                      label="Dia da Semana"
                      {...props}
                      error={Boolean(touched.dayOfWeek && errors.dayOfWeek)}
                      helperText={touched.dayOfWeek && errors.dayOfWeek}
                    />
                  )}
                />
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={"pt-br"}
                  sx={{ width: 450 }}
                >
                  <TimePicker
                    {...formik.getFieldProps("start")}
                    openTo="hours"
                    onChange={(value) => {
                      setFieldValue("start", value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Início"
                        fullWidth
                        error={Boolean(touched.start && errors.start)}
                        helperText={touched.start && errors.start}
                      />
                    )}
                  />
                  <TimePicker
                    {...formik.getFieldProps("end")}
                    openTo="hours"
                    onChange={(value) => {
                      setFieldValue("end", value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Fim"
                        fullWidth
                        error={Boolean(touched.end && errors.end)}
                        helperText={touched.end && errors.end}
                      />
                    )}
                  />
                </LocalizationProvider>
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

export default NewSchedule;

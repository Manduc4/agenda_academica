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
  CollegeFaultProps,
  CollegeFaultService,
} from "../../../shared/services/CollegeFaultService/CollegeFaultSevice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  SubjectProps,
  SubjectService,
} from "../../../shared/services/SubjectService/SubjectService";
import InputMask from "react-input-mask";

const NewCollegeFault: React.FC = () => {
  // edit
  const [selected, setSelected] = useState<CollegeFaultProps>({
    id: 0,
    quantity: "",
    subject: "",
    maxCollegeFaults: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  const [typePage, setTypePage] = useState<"new" | "edit">("new");
  const [subjectList, setSubjectList] = useState<string[]>([]);

  const validationSchema = Yup.object().shape({
    quantity: Yup.string().required("A quantidade é Obrigatório."),
    subject: Yup.string().required("A Disciplina é Obrigatória."),
    maxCollegeFaults: Yup.string().required(
      "O número máximo de faltas é Obrigatório."
    ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      quantity: "",
      subject: "",
      maxCollegeFaults: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("teste");
      const payload = {
        quantity: values.quantity,
        subject: values.subject,
        maxCollegeFaults: values.maxCollegeFaults,
      } as CollegeFaultProps;

      typePage === "edit" ? Object.assign(payload, { id: selected.id }) : null;

      if (typePage === "new") {
        CollegeFaultService.create(payload)
          .then((data) => {
            if (data instanceof Error) {
              window.alert(data.message);
            }
            navigate("/faltas");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        CollegeFaultService.updateById(selected.id, payload)
          .then((data) => {
            if (data instanceof Error) {
              window.alert(data.message);
            }
            navigate("/faltas");
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
  });

  const { handleSubmit, touched, errors, getFieldProps } = formik;

  const callEdit = () => {
    CollegeFaultService.getById(Number(params.id)).then((data) => {
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
      formik.setFieldValue("quantity", selected.quantity);
      formik.setFieldValue("subject", selected.subject);
      formik.setFieldValue("maxCollegeFaults", selected.maxCollegeFaults);
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
          {typePage === "new" ? "Nova Falta" : selected.quantity}
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
                />
                <TextField
                  {...formik.getFieldProps("quantity")}
                  label="Quantidade"
                  fullWidth
                  disabled={false}
                  onChange={numberMask}
                  error={Boolean(touched.quantity && errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                />

                <TextField
                  {...formik.getFieldProps("maxCollegeFaults")}
                  label="Máximo de Faltas"
                  fullWidth
                  onChange={numberMask}
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
                sx={{ alignItems: 'center'}}
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

export default NewCollegeFault;

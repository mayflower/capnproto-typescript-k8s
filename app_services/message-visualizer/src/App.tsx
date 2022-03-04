import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field, FieldArray, FormikValues } from "formik";
import * as Yup from "yup";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ButtonGroup } from "@mui/material";

import {
  PageWrapper,
  Title,
  Label,
  Input,
  StyledInlineErrorMessage,
  Submit,
  CodeWrapper
} from "./styles";


interface Values {
  fullname: string;
  email: string;
  phones: [
    {
      number: string,
      type: [],
    },
  ];
  birthdate: Date;
}

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Dude's name is too short")
    .required("Please enter dude's full name"),
  email: Yup.string()
    .email("Dude's email is incorrect")
    .required("Please enter dude's email"),
  phones: Yup.array().of(
    Yup.object().shape({
      number: Yup.string().required("Please enter dude's phone number"),
      type: Yup.array().required("Please select dude's phone type")
    })
  ).required("How dude is callable?"),
  birthdate: Yup.date().required("Please enter dude's birthdate")
});

function submitPost(values: Values) {
  axios.post('http://localhost:3001/datas/dude', JSON.stringify(values, null, 2)).then(response => {
    console.log("Status: ", response.status);
    console.log("Data: ", response.data);
    }).catch(error => {
        console.error('Something went wrong!', error);
  });
}

const App = () => {
  const [formValues, setFormValues] = useState<any>(null);

  return (
    <PageWrapper>
      <Title>
        Add another dude!
      </Title>
      <hr />
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          phones:  [{number: '', type: []}],
          birthdate: undefined
        }}

        validationSchema={validationSchema}
        onSubmit={(values: Values, actions) => {
          console.log(values, actions);
          setFormValues(values);
          submitPost(values);

          const timeOut = setTimeout(() => {
            actions.setSubmitting(false);

            clearTimeout(timeOut);
          }, 1000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          isValid
        }) => {
          return (
            <>
              <Form name="contact" method="post" onSubmit={handleSubmit}>
                <Label htmlFor="fullname">
                  Fullname
                  <Input
                    type="text"
                    name="fullname"
                    autoCorrect="off"
                    autoComplete="name"
                    placeholder="dude's fullname"
                    valid={touched.fullname && !errors.fullname}
                    error={touched.fullname && errors.fullname}
                  />
                </Label>
                {errors.fullname && touched.fullname && (
                  <StyledInlineErrorMessage>
                    {errors.fullname}
                  </StyledInlineErrorMessage>
                )}
                <Label htmlFor="email">
                  Email
                  <Input
                    type="email"
                    name="email"
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="email"
                    placeholder="dude's email"
                    valid={touched.email && !errors.email}
                    error={touched.email && errors.email}
                  />
                </Label>
                <ErrorMessage name="email">
                  {(msg) => (
                    <StyledInlineErrorMessage>{msg}</StyledInlineErrorMessage>
                  )}
                </ErrorMessage>
                <FieldArray name="phones">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.phones.length > 0 &&
                        values.phones.map((phone, index) => (
                          <div className="row" key={index}>
                            <div className="col">
                              <Label  htmlFor={`phones.${index}.number`}>
                                Phones
                                <Input
                                  name={`phones.${index}.number`}
                                  type="text"
                                  autoCapitalize="off"
                                  autoCorrect="off"
                                  autoComplete="number"
                                  placeholder="dude's phone"
                                  valid={touched.phones && !errors.phones}
                                  error={touched.phones && errors.phones}
                                />
                              <div role="type" aria-labelledby="checkbox-group">
                                <Label htmlFor={`phones.${index}.type`}>
                                  <Field 
                                    type="checkbox" 
                                    name={`phones.${index}.type`} 
                                    value="Mobile"
                                  />
                                  Mobile
                                </Label>
                                <Label>
                                  <Field 
                                    type="checkbox" 
                                    name={`phones.${index}.type`} 
                                    value="Home"
                                  />
                                  Home
                                </Label>
                                <Label>
                                  <Field 
                                    type="checkbox" 
                                    name={`phones.${index}.type`} 
                                    value="Work"
                                  />
                                  Work
                                </Label>
                              </div>
                              </Label>
                            </div>
                            <div className="col">
                              <ButtonGroup variant="text" aria-label="text button group">
                              <Button
                                type="button"
                                variant="outlined" startIcon={<DeleteIcon />}
                                onClick={() => remove(index)}
                              >
                                Delete
                              </Button>
                              <Button
                                type="button"
                                variant="contained" startIcon={<AddIcon />}
                                onClick={() => push({ number: '' })}
                              >
                                Add phone
                              </Button>
                              </ButtonGroup>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </FieldArray>
                <Label htmlFor="birthdate">
                  Birthdate
                  <Input
                    type="Date"
                    name="birthdate"
                    autoCorrect="off"
                    autoComplete="birthdate"
                    placeholder="dude's birthdate"
                    valid={touched.birthdate && !errors.birthdate}
                    error={touched.birthdate && errors.birthdate}
                  />
                </Label>
                {errors.birthdate && touched.birthdate && (
                  <StyledInlineErrorMessage>
                    {errors.birthdate}
                  </StyledInlineErrorMessage>
                )}
                <Submit type="submit" disabled={!isValid || isSubmitting}>
                  {isSubmitting ? `Submiting...` : `Submit`}
                </Submit>
              </Form>

              <hr />
              <CodeWrapper>
                <strong>Errors:</strong> {JSON.stringify(errors, null, 2)}
                <strong>Touched:</strong> {JSON.stringify(touched, null, 2)}
                {formValues && <strong>Submitted values:</strong>}
                {JSON.stringify(formValues, null, 2)}
              </CodeWrapper>
            </>
          );
        }}
      </Formik>
    </PageWrapper>
  );
}

export default App;
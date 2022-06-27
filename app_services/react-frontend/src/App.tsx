import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field, FieldArray } from "formik";
import * as Yup from "yup";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ButtonGroup } from "@mui/material";
import { createPayloadDataView, createPayloadNumberArray, createPayloadTypedArray, deserialize, messageRep, serializeToCapn } from "./Serialize"; 

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
      type: number
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
      type: Yup.number().required("Please select dude's phone type")
    })
  ).required("How dude is callable?"),
  birthdate: Yup.date().required("Please enter dude's birthdate")
});

function submitPost(values: Values): void {
  /**depending on the payload type used (number array, uint8array) 
  this data type must also be used in the respective consumers 
  nestjs-receiver-publisher and nestjs-subscriber**/
  axios.post(
    'http://traefik-ui.minikube/datas/number',
    {"dude": createPayloadNumberArray(values)}, 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => {
    console.log("Status: ", response.status);
    console.log("Data: ", response.data);
    }).catch(error => {
        console.error('Something went wrong!', error);
  });

  // for local testing purpose only
  deserialize(serializeToCapn(values));
  messageRep(serializeToCapn(values));
}
  
  const App = () => {
  const [formValues, setFormValues] = useState<any>(null);
  
  return (
    <PageWrapper>
      <Title>
        Add another dude!
      </Title>
      <hr/>
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          phones:  [{number: '', type: null}],
          birthdate: new Date(),
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
          isValid,
          setFieldValue
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

                              <div role="group" aria-labelledby="checkbox-group">
                                <Label>
                                  <Label htmlFor={`phones.${index}.type`}>
                                    <Field
                                      name={`phones.${index}.type`}
                                      type="radio" 
                                      onChange={ () => setFieldValue(`phones.${index}.type`, "0") }
                                      value="0"
                                    />
                                    Mobile
                                  </Label>
                                  <Label>
                                    <Field
                                      name={`phones.${index}.type`}
                                      type="radio"
                                      onChange={ () => setFieldValue(`phones.${index}.type`, "1") }
                                      value="1"
                                    />
                                    Home
                                  </Label>
                                  <Label>
                                    <Field
                                      name={`phones.${index}.type`}
                                      type="radio"
                                      onChange={ () => setFieldValue(`phones.${index}.type`, "2") }
                                      value="2"
                                    />
                                    Work
                                  </Label>
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
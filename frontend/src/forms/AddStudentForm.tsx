import React from "react";
import { Form, Formik } from "formik";
import { Input, Button, Tag } from "antd";
import * as yup from "yup";
import { StudentModel } from "../models/studentModel";

const inputBottomMargin = {
  marginBottom: "5px",
};

const buttonTopMargin = {
  marginTop: "15px",
};

const tagStyle = {
  backgroundColor: "orange",
  color: "white",
  ...inputBottomMargin,
};

type Props = {
  postNewStudent: (student: StudentModel) => Promise<void>;
  onSuccessfulSubmit: () => void;
  onFailureSubmit: (any) => void;
};

const AddStudentForm = ({
  postNewStudent,
  onSuccessfulSubmit,
  onFailureSubmit,
}: Props) => {
  const handleSubmit = async (student, actions) => {
    try {
      await postNewStudent(student);
      onSuccessfulSubmit();
    } catch (e) {
      onFailureSubmit(e);
    } finally {
      actions.setSubmitting(false);
      actions.resetForm();
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          id: "",
          firstName: "",
          lastName: "",
          gender: "",
          email: "",
        }}
        validationSchema={yup.object({
          firstName: yup.string().label("First Name").min(2).required(),
          lastName: yup.string().label("Last Name").min(2).required(),
          gender: yup.string().label("Gender required").required(),
          email: yup.string().label("Email is required").required(),
        })}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          submitForm,
          isValid,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              style={inputBottomMargin}
              type="firstName"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              placeholder="First Name"
            />
            {errors.firstName && touched.firstName && (
              <Tag style={tagStyle}>{errors.firstName}</Tag>
            )}
            <Input
              style={inputBottomMargin}
              type="lastName"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              placeholder="Last Name"
            />
            {errors.lastName && touched.lastName && (
              <Tag style={tagStyle}>{errors.lastName}</Tag>
            )}
            <Input
              style={inputBottomMargin}
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Email Address"
            />
            {errors.email && touched.email && (
              <Tag style={tagStyle}>{errors.email}</Tag>
            )}
            <Input
              style={inputBottomMargin}
              name="gender"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
              placeholder="Gender"
            />
            {errors.gender && touched.gender && (
              <Tag style={tagStyle}>{errors.gender}</Tag>
            )}
            <Button
              onClick={submitForm}
              style={buttonTopMargin}
              type={"primary"}
              disabled={isSubmitting || (touched && !isValid)}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStudentForm;

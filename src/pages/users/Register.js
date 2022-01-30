import axios from "axios";
import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import * as YUP from "yup";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: none;
  height: 100vh;
  width: 100vw;
  ${mobile({
    width: "100vw",
  })}
`;

const schema = YUP.object().shape({
  name: YUP.string().required("Please enter Name"),
  email: YUP.string().email().required("Please Enter your Email"),
  password: YUP.string()
    .min(4, "Password should be atlease 4 characters")
    .required("Enter Password"),
  confirm_password: YUP.string()
    .required()
    .oneOf([YUP.ref("password"), null], "Password Should Match"),
});

export default function Register() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [loading,setLoading] =useState(false);

  const createAccount = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://first-backend-abi.herokuapp.com/users/register",
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );
      console.log(response);
      setUser("User Registered Successfully. Please Login with Your Email and Password");
      history.push("/users/login");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  
  return (
    <MainContainer>
      <div
        style={{
          height: "100vh",
          background: "none",
        }}
      >
        <div className="card-container d-flex justify-content-center">
          <Card style={{marginTop: "3%"}}>
            <Card.Header className="text-center">
              <h4>Create Account</h4>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirm_password: "",
                }}
                validationSchema={schema}
                onSubmit={(values, { resetForm }) => {
                    createAccount(values);
                  resetForm();
                }}
              >
                {() => {
                  return (
                    <Form className="d-flex flex-column">
                      {/* name */}
                      <div className="mb-3">
                        <label>Name</label>
                        <Field
                          className="form-control"
                          type="text"
                          name="name"
                          component="input"
                          autocomplete="on"
                        />
                        <div className="text-danger">
                          <ErrorMessage name="name" />
                        </div>
                      </div>

                      {/* email */}
                      <div className="mb-3">
                        <label>Email</label>
                        <Field
                          className="form-control"
                          type="email"
                          name="email"
                          component="input"
                        />
                        <div className="text-danger">
                          <ErrorMessage name="email" />
                        </div>
                      </div>

                      {/* password */}
                      <div className="mb-3">
                        <label>Password</label>
                        <Field
                          className="form-control"
                          type="password"
                          name="password"
                          component="input"
                        />
                        <div className="text-danger">
                          <ErrorMessage name="password" />
                        </div>
                      </div>

                      {/* confirm password */}
                      <div className="mb-3">
                        <label>Confirm Password</label>
                        <Field
                          className="form-control"
                          type="password"
                          name="confirm_password"
                          component="input"
                        />
                        <div className="text-danger">
                          <ErrorMessage name="confirm_password" />
                        </div>
                      </div>
                      <div className="mt-2 d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                        <Link to="/users/login">Go to Login</Link>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <div className="mt-3 text-center text-success">
                <p>{user}</p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </MainContainer>
  );
}

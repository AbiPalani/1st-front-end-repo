import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, {  useState } from "react";
import { Card } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import * as YUP from "yup";
import styled from "styled-components";
import { mobile } from "../../responsive";


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background:none;
  height: 100vh;
  width: 100vw;
  ${mobile({
    width: "100vw",
  })}
`;

// schema
const schema = YUP.object().shape({
  email: YUP.string()
    .email("Please enter a valid Email")
    .required("Please enter your Email ID"),
  password: YUP.string()
    .min(4, "Password should be minimum 4 characters")
    .required("Please enter your Password"),
});

export default function Login() {
  const history = useHistory();
  const [dummy, setDummy] = useState(false);
  const [logRes, setLogRes] = useState(true);
  const [loading, setLoading] = useState(false);

  
   const loginAccount = (async(values) => {
      
        try{
          setLoading(true);
          const response = await axios.post("https://first-backend-abi.herokuapp.com/users/login",
         {
           email:values.email,
           password:values.password
         }).then(response=>{
           if(response.data.Token)
              localStorage.setItem("user",JSON.stringify(response.data));
              console.log(response.data);
              history.push("/events/view");
              console.log(response);
       })
     } catch (err) {
       console.log("login failed");
       setDummy(true);
     }
   });

  return (
    <MainContainer>
      {logRes ? (
        <div
          style={{
            background: "none",
          }}
        >
          <div className="d-flex justify-content-center">
            <Card
              style={{
                marginTop: "3%",
              }}
            >
              <Card.Header className="text-center">
                <h4>Login</h4>
              </Card.Header>
              <Card.Body>
                <Formik 
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={schema}
                  onSubmit={async (values) => {
                    await loginAccount(values);
                  }}
                >
                  {() => {
                    return (
                      <Form className="mb-3">
                        {/* email */}

                        <div className="mb-3">
                          <label>Email</label>
                          <Field
                            className="form-control"
                            type="text"
                            name="email"
                            component="input"
                          />
                          <div className="text-danger">
                            <ErrorMessage name="email" />
                          </div>
                        </div>

                        {/* password */}
                        <div>
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
                        <div className="mt-3 d-flex justify-content-center">
                          <button type="submit" className="btn btn-primary">
                            Login
                          </button>
                        </div>
                        <div className="mt-3 d-flex justify-content-between">
                          <div>
                            <NavLink to="/users/register">New Here? Register</NavLink><br/>
                            <NavLink to="/password">Forget Password</NavLink>
                          </div>
                        </div>
                        
                      </Form>
                    );
                  }}
                </Formik>
                {dummy ? (
                  <div className="d-flex justify-content-center text-danger">
                    <h3>Email or Password is wrong</h3>
                  </div>
                ) : (
                  <div></div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </MainContainer>
  );
}

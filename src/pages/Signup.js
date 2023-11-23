import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import Base from "../components/Base";
import { toast } from "react-toastify";
import React, { useRef, useState } from "react";
import { NavLink, NavLink as ReactLink,useNavigate } from "react-router-dom";
import { doMfa} from "../auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const mfaEnableRef = useRef(null);
  const navigate = useNavigate();

  const signUpToAccount = async (event) => {
    event.preventDefault();

    // Validate input fields
    if (!firstName || !lastName || !email || !password) {
      toast.error("Fill up all the fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email format is wrong");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be of 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          email: email,
          password: password,
          firstname: firstName,
          lastname: lastName,
          role: "ADMIN",
          mfaEnabled: mfaEnableRef.current.checked,
        }
      );

      if (mfaEnableRef.current.checked) {
        console.log("Response from registration: ", response.data);
      }

      if (response.status === 200) {
        if (mfaEnableRef.current.checked) {
          doMfa(response.data.accessToken, () => {
            // Redirect to qrscan page
            navigate("/signup/qrscan", {
              state: {
                secretImageUri: response.data.secretImageUri,
                email: email,
              },
            });
          });
        } 
      }else if (response.status === 202){
        
        toast.success("Signup success")
        
        navigate('/login')
      }
    } catch (error) {
      // Handle any API request errors
      console.error("Error during registration:", error);
      toast.error("Email Already exists!")
    }
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 5, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Register here!!</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="email"> Enter your FirstName</Label>
                    <Input
                      type="text"
                      placeholder="Enter firstName"
                      id="fname"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email"> Enter your LastName</Label>
                    <Input
                      type="text"
                      placeholder="Enter lastName"
                      id="lname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email"> Enter your email</Label>
                    <Input
                      type="text"
                      placeholder="Enter email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password"> Enter your password</Label>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="checkbox">Enable MFA? </Label>
                    <Input
                      innerRef={mfaEnableRef}
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button outline color="light" onClick={signUpToAccount}>
                      SignUp
                    </Button>
                  </Container>
                  <p className="mt-3 text-center">
                    Already have an account? <NavLink tag={ReactLink} to="/login">
                        Log In
                      </NavLink>
                  </p>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Signup;

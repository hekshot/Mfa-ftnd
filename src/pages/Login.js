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
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink, NavLink as ReactLink,useNavigate } from "react-router-dom";
import axios from "axios";
import { doLogin } from "../auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Fill up all the fields");
      return;
    }

    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/authenticate",
      {
        email: email,
        password: password,
      }
    );
    console.log("Response from login: ", response.data);
    if (response.data.mfaEnabled === true) {
      toast.dark("Verify Otp");
      doLogin(email,() => {
        console.log("verify otp");
        //redirect to verify page
        navigate("/verify", { state: { email: email } });
      });
    } else {
      doLogin(email,() => {
        //redirect to dashboard page
        toast.success("Login success");
        navigate("/", { state: { email: email } });
      });
    }
  };

  //   const handleReset = () => {
  //     setLoginDetail({
  //       username: "",
  //       password: "",
  //    });
  // };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Login here!!</h3>
              </CardHeader>
              <CardBody>
                <Form>
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
                  <Container className="text-center">
                    <Button outline color="light" onClick={login}>
                      Login
                    </Button>
                    {/* <Button
                      color="secondary"
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button> */}
                  </Container>
                  <p className="mt-3 text-center">
                    Don't have an account?{" "}
                      <NavLink tag={ReactLink} to="/signup">
                        Signup
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

export default Login;

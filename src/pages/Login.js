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
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);

    //validation
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      toast.error("username and password is required");
      return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log(data);

        //save the data to local storage
        doLogin(data, () => {
          console.log("login details is saved to local storage");

          //redirect to user Dashboard
          navigate("/user/dashboard");
        });

        toast.success("Login success");
        setLoginDetail({
          username: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong ");
      });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

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
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="email"> Enter your email</Label>
                    <Input
                      type="text"
                      placeholder="Enter email"
                      id="email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password"> Enter your password</Label>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button outline color="light">
                      Login
                    </Button>
                    <Button
                      onClick={handleReset}
                      color="secondary"
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
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

import {signUp} from "../services/user-service"
import { Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label, Button, Row, Col, FormFeedback } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from 'react-toastify';

const Signup = () => {

    const [data,setData] = useState({

        name:'',
        email:'',
        password:'',
        about:'',

    })

    const [error,setError] = useState({
        errors:{},
        isError:false
    })


    const handleChange=(event,property)=>{
        setData({...data,[property]:event.target.value})
    }

    const resetData=()=>{
        setData({
            name:'',
            email:'',
            password:'',
            about:'',
        })
    }

    const submitForm=(event)=>{
        event.preventDefault()

        if(error.isError){
            toast.error("user registration failed");
            return;
        }
        //data validation

        //call server api for sending data
        signUp(data).then((resp)=>{
            console.log(resp)
            console.log("success log")
            toast.success("user registerd successfuly !!")
            setData({
                name:'',
                email:'',
                password:'',
                about:'',
            })
        }).catch((error)=>{
            console.log(error)
            console.log("error log")
            
             //handle error
            setError({
                errors:error,
                isError:true
            })
        })
        ;
    };

    return (
       <Base>
        
        <Container>

        <Row className="mt-4">
            <Col sm={{size:6,offset:3}}>
            <Card color="dark" inverse>
                <CardHeader>
                    <h3>Register here!!</h3>
                </CardHeader>
                <CardBody>

                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <Label for="name"> Enter your name</Label>
                            <Input 
                                type="text" 
                                placeholder="Enter Name" 
                                id="name" 
                                onChange={(e) => handleChange(e,'name')} 
                                value={data.name} 
                                invalid={error.errors?.response?.data?.name ? true: false}
                            />
                            <FormFeedback>
                               {error.errors?.response?.data?.name}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email"> Enter your email</Label>
                            <Input type="text" placeholder="Enter email" id="email" onChange={(e) => handleChange(e,'email')} value={data.email} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password"> Enter your password</Label>
                            <Input type="password" placeholder="Enter password" id="password" onChange={(e) => handleChange(e,'password')} value={data.password} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="about"> Enter About</Label>
                            <Input type="text-area" placeholder="Enter About" id="about" onChange={(e) => handleChange(e,'about')} value={data.about} />
                        </FormGroup>
                        <Container className="text-center">
                            <Button outline color="light">Register</Button>
                            <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
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

export default Signup;




// import { signUp } from "../services/user-service";
// import { Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label, Button, Row, Col, FormFeedback } from "reactstrap";
// import Base from "../components/Base";
// import { useState } from "react";
// import { toast } from 'react-toastify';

// const Signup = () => {
//     const [data, setData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         about: '',
//     });

//     const [errors, setErrors] = useState({
//         name: '',
//         email: '',
//         password: '',
//         about: '',
//     });

//     const handleChange = (event, property) => {
//         setData({ ...data, [property]: event.target.value });
//         // Clear the error for the current field as soon as the user starts typing
//         const newErrors = { ...errors };
//         newErrors[property] = '';
//         setErrors(newErrors);
//     }

//     const resetData = () => {
//         setData({
//             name: '',
//             email: '',
//             password: '',
//             about: '',
//         });
//         setErrors({
//             name: '',
//             email: '',
//             password: '',
//             about: '',
//         });
//     }

//     const submitForm = (event) => {
//         event.preventDefault();

//         let formIsValid = true;
//         const newErrors = { ...errors };

//         if (!data.name) {
//             formIsValid = false;
//             newErrors.name = 'Name is required';
//         }

//         if (!data.email) {
//             formIsValid = false;
//             newErrors.email = 'Email is required';
//         }

//         if (!data.password) {
//             formIsValid = false;
//             newErrors.password = 'Password is required';
//         }

//         if (!data.about) {
//             formIsValid = false;
//             newErrors.about = 'About is required';
//         }

//         setErrors(newErrors);

//         if (!formIsValid) {
//             toast.error("User registration failed");
//             return;
//         }

//         signUp(data)
//             .then((resp) => {
//                 console.log(resp);
//                 console.log("success log");
//                 toast.success("User registered successfully!!");
//                 resetData();
//             })
//             .catch((error) => {
//                 console.log(error);
//                 console.log("error log");
//                 toast.error("User registration failed");
//             });
//     };

//     return (
//         <Base>
//             <Container>
//                 <Row className="mt-4">
//                     <Col sm={{ size: 6, offset: 3 }}>
//                         <Card color="dark" inverse>
//                             <CardHeader>
//                                 <h3>Register here!!</h3>
//                             </CardHeader>
//                             <CardBody>
//                                 <Form onSubmit={submitForm}>
//                                     <FormGroup>
//                                         <Label for="name"> Enter your name</Label>
//                                         <Input
//                                             type="text"
//                                             placeholder="Enter Name"
//                                             id="name"
//                                             onChange={(e) => handleChange(e, 'name')}
//                                             value={data.name}
//                                             invalid={errors.name ? true : false}
//                                         />
//                                         <FormFeedback>{errors.name}</FormFeedback>
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Label for="email"> Enter your email</Label>
//                                         <Input
//                                             type="text"
//                                             placeholder="Enter email"
//                                             id="email"
//                                             onChange={(e) => handleChange(e, 'email')}
//                                             value={data.email}
//                                             invalid={errors.email ? true : false}
//                                         />
//                                         <FormFeedback>{errors.email}</FormFeedback>
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Label for="password"> Enter your password</Label>
//                                         <Input
//                                             type="password"
//                                             placeholder="Enter password"
//                                             id="password"
//                                             onChange={(e) => handleChange(e, 'password')}
//                                             value={data.password}
//                                             invalid={errors.password ? true : false}
//                                         />
//                                         <FormFeedback>{errors.password}</FormFeedback>
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Label for="about"> Enter About</Label>
//                                         <Input
//                                             type="text"
//                                             placeholder="Enter About"
//                                             id="about"
//                                             onChange={(e) => handleChange(e, 'about')}
//                                             value={data.about}
//                                             invalid={errors.about ? true : false}
//                                         />
//                                         <FormFeedback>{errors.about}</FormFeedback>
//                                     </FormGroup>
//                                     <Container className="text-center">
//                                         <Button outline color="light">Register</Button>
//                                         <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
//                                     </Container>
//                                 </Form>
//                             </CardBody>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </Base>
//     );
// };

// export default Signup;


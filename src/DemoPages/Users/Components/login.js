import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText } from 'reactstrap';
import style from "../style.module.css";
import {userService, alertService} from "../../../services/index";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import logo from "../../../assets/utils/images/review_analytics_logo.png";
import placeholder from "../../../assets/utils/images/side_placeholder.png";

const Login = () => {
    const [{user_email, user_password,errorLog},
        setState] = useState({
            user_email: "",
            user_password:"",
            errorLog:""
        })
    
    const handleChange = (event) =>{
        var attrname = event.target.name;
        var attrvalue = event.target.value;
        setState((prevState) => ({
            ...prevState,
            [attrname]: attrvalue
        }))
    }

    const redirectToForgotPass = () => {
        window.location.href = "/users/forgot_pass";
    }
    
    const login = () => {

        if(user_email!="" && user_password!=""){
            var req = {
                user_email:user_email,
                user_password:user_password
            }
            userService.login(req).then(async (response) => {
                if(response.success==true){
                    Cookies.set('token', response.token);
                    setState((prevState) => ({
                        ...prevState,
                        errorLog: ""
                    }))
                    window.location = "/dashboards";
                }else{
                    setState((prevState) => ({
                        ...prevState,
                        errorLog: response.error
                    }))
                    return;
                }
            }).catch(error => {
                setState((prevState) => ({
                    ...prevState,
                    errorLog: error
                }))
                return;
            });
        }else{
            setState((prevState) => ({
                ...prevState,
                errorLog: "Mandatory Fields Missing"
            }))
            return;
        }
    }

    return(
        <Fragment>
            <Row style={{
                    height: "100vh",
                    width: '100vw'
                }}>
                <Col style={{
                    height:"100vh"
                }} md="7">
                    <div className={style.customLoginFormContainer}>
                        <div>
                            <p className={style.loginHeader}>
                                <img src = {logo} />
                            </p>
                            <p className={style.loginWelcome}>Welcome Back!</p>
                            <p>Get insights and turn up your customer service game!</p>
                            {errorLog && errorLog!=""?
                                <div className={style.loginError}>
                                    &#9888; {errorLog}
                                </div>:<></>
                            }
                            
                            <FormGroup>
                                <Label for="email">Email Address</Label>
                                <Input onChange = {(e)=>handleChange(e)} value={user_email} className={style.customInput} type="email" name="user_email" id="email" placeholder="Enter your email address" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input onChange = {(e)=>handleChange(e)} value={user_password} className={style.customInput} type="password" name="user_password" id="password" placeholder="Enter your password" />
                            </FormGroup>
                            <Label for="password">
                                <Link to="/users/forgot_pass"> Forgot Password?</Link>
                            </Label>
                            <FormGroup>
                                <Button onClick={(e)=>login()} className={style.loginBtn}>
                                    <div
                                        style={{
                                            float:"left"
                                        }}
                                    >
                                        Sign In
                                    </div>
                                    <div
                                        style={{
                                            float:"right"
                                        }}
                                    >
                                        →
                                    </div>
                                </Button>
                            </FormGroup>
                            <FormGroup>
                                <div className={style.customSignupLink}>
                                    Dont't have an account? <Link to="/users/signup" className={style.customLink}>Sign Up</Link>
                                </div>
                            </FormGroup>
                            {/* <Card>
                                <CardBody className={style.customPaddingCardBody}>
                                    <FormGroup>
                                        <Label for="email">Email Address</Label>
                                        <Input onChange = {(e)=>handleChange(e)} value={user_email} className={style.customInput} type="email" name="user_email" id="email" placeholder="Enter your email address" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input onChange = {(e)=>handleChange(e)} value={user_password} className={style.customInput} type="password" name="user_password" id="password" placeholder="Enter your password" />
                                    </FormGroup>
                                    <Label for="password">
                                        <Link to="/users/forgot_pass"> Forgot Password?</Link>
                                    </Label>
                                    <FormGroup>
                                        <Button onClick={(e)=>login()} className={style.loginBtn}>
                                            <div
                                                style={{
                                                    float:"left"
                                                }}
                                            >
                                                Sign In
                                            </div>
                                            <div
                                                style={{
                                                    float:"right"
                                                }}
                                            >
                                                →
                                            </div>
                                        </Button>
                                    </FormGroup>
                                    <FormGroup>
                                        <div className={style.customSignupLink}>
                                            Dont't have an account? <Link to="/users/signup" className={style.customLink}>Sign Up</Link>
                                        </div>
                                    </FormGroup>
                                </CardBody>
                            </Card> */}
                        </div>
                        {/* <div>
                            <Link to="/users/forgot_pass">
                                <Button className={style.forgotPassBtn}>I forgot my password</Button>
                            </Link>
                        </div> */}
                    </div>
                </Col>
                <Col md="5"
                    style= {{
                        backgroundImage: 'url(' + placeholder + ')',
                        backgroundRepeat:"no-repeat",
                        backgroundSize:"100% 100%",
                        backgroundPosition:"center",
                        height:"100vh"
                    }}
                >

                </Col>
            </Row>

        </Fragment>
    )
}

export default Login;
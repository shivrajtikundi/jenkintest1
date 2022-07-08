import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText } from 'reactstrap';
import style from "../style.module.css";
import {userService, alertService} from "../../../services/index";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from "react-toastify";
import logo from "../../../assets/utils/images/review_analytics_logo.png"

const Login = () => {
    const [{user_email, user_password},
        setState] = useState({
            user_email: "",
            user_password:""
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
    /*const testLogin = () => {
        var req = {
            user_email:user_email,
            user_password:user_password
        }
        const resolveWithSomeData = new Promise((resolve, reject) => setTimeout(() => resolve("world"), 3000));
        toast.promise(
            userService.login(req),
            {
              pending: 'Promise is pending',
              success: {
                render({data}){
                  return `Hello ${data}`
                },
              },
              error: {
                render({data}){
                    return `Hello ${data}`
                }
              }
            }
        )
    }*/
    const login = () => {
        const loginpromise = new Promise(async (resolve, reject)=>{
            if(user_email!="" && user_password!=""){
                var req = {
                    user_email:user_email,
                    user_password:user_password
                }
                userService.login(req).then(async (response) => {
                    if(response.success==true){
                        Cookies.set('token', response.token);
                        // alertService.throwSuccess("Successfully Logged in");
                        resolve("Successfully Logged in");
                        window.location = "/dashboards";
                    }else{
                        reject(response.error);
                        // alertService.throwError(response.error);
                        return;
                    }
                }).catch(error => {
                    // alertService.throwWarning(error);
                    reject(error);
                    return;
                });
            }else{
                reject("Mandatory Fields Missing Mandatory");
                // alertService.throwError("Mandatory Fields Missing Mandatory Fields Missing Mandatory Fields Missing ");
                return;
            }
        })
        alertService.throwPromise(loginpromise);
    }

    return(
        <Fragment>
            <div className={style.customLoginFormContainer}>
                <div>
                    <p className={style.loginHeader}>
                        <img src = {logo} />
                    </p>
                    <p className={style.loginWelcome}>Welcome Back 👋</p>
                    <Card>
                        <CardBody className={style.customPaddingCardBody}>
                            <FormGroup>
                                <Label for="email">Email Address</Label>
                                <Input onChange = {(e)=>handleChange(e)} value={user_email} className={style.customInput} type="email" name="user_email" id="email" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input onChange = {(e)=>handleChange(e)} value={user_password} className={style.customInput} type="password" name="user_password" id="password" placeholder="Password" />
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={(e)=>login()} className={style.loginBtn}>Sign In</Button>
                            </FormGroup>
                            <FormGroup>
                                <div className={style.customSignupLink}>
                                    New to Review Analytics? <Link to="/users/signup" className={style.customLink}>Create an Account</Link>
                                </div>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <Link to="/users/forgot_pass">
                        <Button className={style.forgotPassBtn}>I forgot my password</Button>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;
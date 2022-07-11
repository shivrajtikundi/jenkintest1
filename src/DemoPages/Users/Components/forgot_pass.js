import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText } from 'reactstrap';
import style from "../style.module.css";
import {userService, alertService} from "../../../services/index";
import Cookies from 'js-cookie';
import logo from "../../../assets/utils/images/review_analytics_logo.png";
import placeholder from "../../../assets/utils/images/side_placeholder.png";


const ForgotPassword = () => {
    const [{
            user_email, 
            user_password
        },
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

    const goToLogin = () =>{
        window.location.href = "/users/login"
    }

    const sendResetPassLink = () => {
        var send_reset_pass_link = new Promise((resolve, reject)=>{
            if(user_email!=""){
                var req = {
                    user_email:user_email
                }
        
                userService.sendResetPassLink(req).then(async (response) => {
                    if(response.success==true){
                        resolve("Password reset link sent to your email");
                    }else{
                        reject(response.error);
                        return;
                    }
                }).catch(error => {
                    reject(error);
                    return;
                });
            }else{
                reject("Mandatory Fields Missing");
                return;
            }
        })
        alertService.throwPromise(send_reset_pass_link);

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
                            <Button onClick={(e)=>goToLogin()} className={style.backButton}>
                                <div className={style.btnElemText}>←</div>
                            </Button>
                            <p className={style.loginWelcome}>Forgot Password?</p>
                            <p>It's Ok, we've got your back!</p>
                            <FormGroup>
                                <Label for="email">Email Address</Label>
                                <Input onChange = {(e)=>handleChange(e)} value={user_email} className={style.customInput} type="email" name="user_email" id="email" placeholder="Enter your email address" />
                            </FormGroup>
                            
                            <FormGroup>
                                <Button 
                                    onClick={(e)=>sendResetPassLink()} 
                                    className={style.loginBtn}>
                                    <div
                                        style={{
                                            float:"left"
                                        }}
                                    >
                                        Get OTP
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
                            {/* <Card>
                                <CardBody className={style.customPaddingCardBody}>
                                    <FormGroup>
                                        <Label for="email">Email Address</Label>
                                        <Input onChange = {(e)=>handleChange(e)} value={user_email} className={style.customInput} type="email" name="user_email" id="email" placeholder="Enter your email address" />
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <Button 
                                            onClick={(e)=>sendResetPassLink()} 
                                            className={style.loginBtn}>
                                            <div
                                                style={{
                                                    float:"left"
                                                }}
                                            >
                                                Get OTP
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
                                </CardBody>
                            </Card> */}
                        </div>
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

export default ForgotPassword;
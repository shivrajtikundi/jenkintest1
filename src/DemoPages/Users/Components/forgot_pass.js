import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText } from 'reactstrap';
import style from "../style.module.css";
import {userService, alertService} from "../../../services/index";
import Cookies from 'js-cookie';
import logo from "../../../assets/utils/images/review_analytics_logo.png";

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
            <div className={style.customLoginFormContainer}>
                <div>
                    <p className={style.loginHeader}>
                        <img src = {logo} />
                    </p>
                    <p className={style.loginWelcome}>😬 It's ok, it happens to the best of us.</p>
                    <Card>
                        <CardBody className={style.customPaddingCardBody}>
                            <FormGroup>
                                <Label for="email">Email Address</Label>
                                <Input onChange = {(e)=>handleChange(e)} value={user_email} className={style.customInput} type="email" name="user_email" id="email" placeholder="Email" />
                            </FormGroup>
                            
                            <FormGroup>
                                <Button onClick={(e)=>sendResetPassLink()} className={style.loginBtn}>
                                    Send Password Reset Instruction
                                </Button>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword;
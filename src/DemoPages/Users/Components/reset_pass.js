import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText } from 'reactstrap';
import style from "../style.module.css";
import {userService, alertService} from "../../../services/index";
import Cookies from 'js-cookie';
import logo from "../../../assets/utils/images/review_analytics_logo.png";

const ResetPass = (props) => {
    const [{user_password, user_c_password, b_pass_match, pass_error_msg},
        setState] = useState({
            user_password:"",
            user_c_password:"",
            b_pass_match: true,
            pass_error_msg:""
        })
    const restPass = () =>{
        var reset_pass_promise = new Promise((resolve, reject)=>{
            var email = props.match.params.email;;
            var req = {
                user_email : email,
                user_password : user_password
            }
    
            userService.resetPassword(req).then(res=>{
                if(res.success== true){
                    resolve("Password successfully rest. Login to continue");
                    window.location.href = "http://localhost:3000/";
                }else{
                    reject(res.error);
                    return;
                }
            }).catch(err=>{
                reject("Password rest failed");
                return;
            })
        })
        alertService.throwPromise(reset_pass_promise);

    }
    const handleChange = (event) =>{
        var attrname = event.target.name;
        var attrvalue = event.target.value;
        if(attrname==='user_password'){
            const uppercaseRegExp   = /(?=.*?[A-Z])/;
            const lowercaseRegExp   = /(?=.*?[a-z])/;
            const digitsRegExp      = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp   = /.{8,}/;
            const passwordLength =      attrvalue.length;
            const uppercasePassword =   uppercaseRegExp.test(attrvalue);
            const lowercasePassword =   lowercaseRegExp.test(attrvalue);
            const digitsPassword =      digitsRegExp.test(attrvalue);
            const specialCharPassword = specialCharRegExp.test(attrvalue);
            const minLengthPassword =   minLengthRegExp.test(attrvalue);
            let errMsg ="";
            if(passwordLength===0){
                errMsg="Password is empty";
            }else if(!uppercasePassword){
                errMsg="At least one Uppercase";
            }else if(!lowercasePassword){
                errMsg="At least one Lowercase";
            }else if(!digitsPassword){
                errMsg="At least one digit";
            }else if(!specialCharPassword){
                errMsg="At least one Special Characters";
            }else if(!minLengthPassword){
                errMsg="At least minumum 8 characters";
            }else{
                errMsg="";
            }
            // setPasswordErr(errMsg);
            setState((prevState) => ({
                ...prevState,
                pass_error_msg: errMsg
            }))

        }

        setState((prevState) => ({
            ...prevState,
            [attrname]: attrvalue
        }))
    }

    const matchConfirmPass = () =>{
        if(user_password!="" && user_c_password!=""){
            if(user_password==user_c_password){
                setState((prevState) => ({
                    ...prevState,
                    b_pass_match: true
                }))
            }else{
                setState((prevState) => ({
                    ...prevState,
                    b_pass_match: false
                }))
            }
        }
    }

    return(
        <Fragment>
            <div className={style.customLoginFormContainer}>
                <div>
                    <p className={style.loginHeader}>
                        <img src = {logo} />
                    </p>
                    <p className={style.loginWelcome}>Choose your new password</p>
                    <Card>
                        <CardBody className={style.customPaddingCardBody}>
                            <FormGroup>
                                <Label for="password">New Password (Mininum 8 characters) 
                                    {b_pass_match===false?<span style={{color:"red"}}> (Not Matched) </span>:""}
                                </Label>
                                <Input onChange={(e)=>handleChange(e)} className={style.customInput} value={user_password} type="password" name="user_password" id="password" placeholder="Password" />
                                <p className={style.passvalidText}>{pass_error_msg}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label for="c_password">Confirm Password</Label>
                                <Input  onBlur={(e)=>matchConfirmPass(e)} onChange={(e)=>handleChange(e)} className={style.customInput} value={user_c_password} type="password" name="user_c_password" id="c_password" placeholder="Password" />
                            </FormGroup>
                            
                            <FormGroup>
                                <Button 
                                    disabled={
                                        (user_password!="" && user_c_password!=""
                                        && pass_error_msg == ""
                                        && user_password == user_c_password)?false:true}
                                    onClick={(e)=>restPass()} className={style.resetPassBtn}>
                                    Reset Password
                                </Button>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Fragment>
    )
}

export default ResetPass;
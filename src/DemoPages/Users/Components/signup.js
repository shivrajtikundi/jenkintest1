import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, CardFooter, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, FormText } from 'reactstrap';
import style from "../style.module.css";
import ToggleSwitch from "./ToggleSwtch";
import {userService, alertService} from "../../../services/index";
import logo from "../../../assets/utils/images/Logo (2).png";
import placeholder from "../../../assets/utils/images/side_placeholder.png";
import forward_arrow from "../../../assets/utils/images/arrow_forward_24px.svg";

const Signup = () => {
    const [{user_email, user_name, user_password, user_c_password, terms_and_condition_accepted, b_pass_match, pass_error_msg},
        setState] = useState({
            user_email: "",
            user_name: "",
            user_password:"",
            user_c_password:"",
            terms_and_condition_accepted: false,
            b_pass_match: true,
            pass_error_msg:""
        })
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

    const handleCheckboxChange = (event) =>{
        setState((prevState)=>({
            ...prevState, terms_and_condition_accepted: !prevState.terms_and_condition_accepted
        }))
    }


    const signup = () => {
        const signup_promise = new Promise((resolve, reject)=>{
            if(user_email!="" && user_name!="" && user_password!=""){
                var req = {
                    user_email:user_email,
                    user_name:user_name,
                    user_password:user_password
                }
        
                userService.signup(req).then(async (response) => {
                    if(response.success==true){
                        resolve("Successfully Sign Up");
                        // alertService.throwSuccess("Successfully Sign Up");
                        window.location = "/users/login";
                    }else{
                        // alertService.throwError(response.error);
                        reject(response.error);
                        return;
                    }
                }).catch(error => {
                    // alertService.throwWarning(error);
                    reject(error);
                    return;
                });
            }else{
                // alertService.throwError("Mandatory Fields Missing");
                reject("Mandatory Fields Missing");
                return;
            }
        })
        alertService.throwPromise(signup_promise);
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
        // "react-toastify": "^5.4.0",
        <Fragment>
            <Row style={{
                    height: "100vh",
                    width: '100vw'
                }}>
                <Col style={{
                    height:"100vh",
                    paddingLeft:"370px"
                }} md="8">
                    <div className={style.customLoginFormContainer}>
                        <p className={style.loginHeader}>
                            <img className={style.authPageLogo} src = {logo} />
                        </p>
                        <p className={style.loginWelcome}>New User?</p>
                        <p>Get insights and turn up your customer service game!</p>
                        <FormGroup>
                            <Label for="user_name">Full Name</Label>
                            <Input onChange={(e)=>handleChange(e)} className={style.customInput} value={user_name} type="user_name" name="user_name" id="user_name" placeholder="Enter your full name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Work Email Address</Label>
                            <Input onChange={(e)=>handleChange(e)} className={style.customInput} value={user_email} type="email" name="user_email" id="user_email" placeholder="Enter your email address" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password (Mininum 8 characters) 
                                {b_pass_match===false?<span style={{color:"red"}}> (Not Matched) </span>:""}
                            </Label>
                            <Input onChange={(e)=>handleChange(e)} className={style.customInput} value={user_password} type="password" name="user_password" id="password" placeholder="Enter your password" />
                            <p className={style.passvalidText}>{pass_error_msg}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="c_password">Confirm Password</Label>
                            <Input  onBlur={(e)=>matchConfirmPass(e)} onChange={(e)=>handleChange(e)} className={style.customInput} value={user_c_password} type="password" name="user_c_password" id="c_password" placeholder="Confirm password" />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input 
                                    onClick={(e)=>handleCheckboxChange(e)}
                                    checked = {terms_and_condition_accepted?
                                        true:
                                        false
                                    }
                                type="checkbox" id="checkbox" />{' '}
                                I have read and agree to the <Link className={style.customLinkSignUp}>Terms</Link> including the <Link className={style.customLinkSignUp}>Privacy Policy</Link>
                            </Label>
                        </FormGroup>
                        <Button 
                            disabled={
                                (user_password!="" && user_c_password!=""
                                && pass_error_msg == ""
                                && user_password == user_c_password
                                && terms_and_condition_accepted == true)?false:true}
                            onClick={(e)=>signup()} className={style.loginBtn}>
                            <div
                                style={{
                                    float:"left",
                                    fontWeight:"300"
                                }}
                            >
                                Get OTP
                            </div>
                            <div
                                style={{
                                    float:"right"
                                }}
                            >
                                <img src={forward_arrow}></img>
                            </div>
                        </Button>
                        
                        <FormGroup>
                            <div className={style.customSignupLink}>
                                Already got an account? <Link to="/users/login" className={style.customLink}>Sign In</Link>
                            </div>
                        </FormGroup>
                        {/* <Card>
                            <CardBody className={style.customPaddingCardBody}>
                                <FormGroup>
                                    <Label for="user_name">First Name & Last Name</Label>
                                    <Input onChange={(e)=>handleChange(e)} className={style.customInput} value={user_name} type="user_name" name="user_name" id="user_name" placeholder="First Name & Last Name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Work Email Address</Label>
                                    <Input onChange={(e)=>handleChange(e)} className={style.customInput} value={user_email} type="email" name="user_email" id="user_email" placeholder="Work Email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password (Mininum 8 characters) 
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
                                            && user_password == user_c_password
                                            && terms_and_condition_accepted == true)?false:true}
                                        className={style.loginBtn}
                                        onClick={(e)=>signup()}
                                    >
                                            Start Free Trial
                                    </Button>
                                </FormGroup>
                                <FormGroup>
                                    <div>
                                        <div onClick={(e)=>handleCheckboxChange()} className={style.ToggleSwitch}>
                                            {terms_and_condition_accepted?
                                                <div className={style.knobActive} />:
                                                <div className={style.knob} />
                                            }
                                            
                                        </div>
                                        <div className={style.termsAndConditionText}>
                                            I have read and agree to the <Link className={style.customLinkSignUp}>Terms</Link> including the DPA and the <Link className={style.customLinkSignUp}>Privacy Policy</Link>
                                        </div>
                                    </div>
                                    
                                </FormGroup>
                                <FormGroup>
                                    <div className={style.customSignupLink}>
                                        Already got an account? <Link to="/users/login" className={style.customLink}>Sign In</Link>
                                    </div>
                                </FormGroup>
                                
                            </CardBody>
                        </Card> */}
                    </div>

                </Col>
                <Col md="4"
                    style= {{
                        backgroundImage: 'url(' + placeholder + ')',
                        backgroundRepeat:"no-repeat",
                        backgroundSize:"100% 100%",
                        backgroundPosition:"center"
                    }}
                >
                </Col>
            </Row>
        </Fragment>
    )
}

export default Signup;
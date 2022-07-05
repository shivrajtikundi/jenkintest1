import React, { Fragment, useState } from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { acquireRegister } from '../../../redux/Auth/authThunks';
import { useDispatch } from 'react-redux';
import './style.scss'

// Layout

const RegisterBoxed = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [registerData, setRegisterData] = useState({})
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const handleChange = (event) =>{
    const {name,value} = event.target
    if(name === "terms_and_condition_accepted"){
      setRegisterData({...registerData,[name]:event.target.checked})
    }else{
      setRegisterData({...registerData,[name]:value})
    }
    if(name === "user_c_password"){
      if(registerData?.user_password !== value && registerData !== ""){
        setConfirmPasswordError("Password does not match!")
      }else{
        setConfirmPasswordError("")
      }
    }
  }

  const handleRedirection = (res) => {
    if(res.success){
      history.push('/auth/login');
    }
    console.log("&&&&&&&&", res)
  }

  const handleSubmit = () =>{
    dispatch(acquireRegister({registerData, handleRedirection}));
  }

    return(
      <Fragment>
        <div className="h-100 bg-premium-dark">
          <div className="d-flex h-100 justify-content-center align-items-center">
            <Col md="8" className="mx-auto app-login-box">
              <div className="app-logo-inverse mx-auto mb-3"/>
              <div className="modal-dialog w-100">
                <div className="modal-content">
                  <div className="modal-body">
                    <h5 className="modal-title">
                      <h4 className="mt-2">
                        <div>Welcome,</div>
                        <span>
                      It only takes a <span className="text-success">few seconds</span> to create your account
                    </span>
                      </h4>
                    </h5>
                    <Row className="divider"/>
                    <Row form>
                      <Col md={12}>
                        <FormGroup>
                          <Input type="email" name="user_email" id="exampleEmail" placeholder="Email here..."
                                 onChange={(e) => handleChange(e)} value={registerData.user_email}/>
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Input type="text" name="user_name" id="exampleName" placeholder="Name here..."
                                 onChange={(e) => handleChange(e)} value={registerData.user_name}/>
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Input type="password" name="user_password" id="examplePassword" placeholder="Password here..."
                                 onChange={(e) => handleChange(e)} value={registerData.user_password}/>
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Input
                            type="password"
                            name="user_c_password"
                            id="examplePasswordRep"
                            placeholder="Repeat Password here..."
                            value={registerData.user_c_password}
                            onChange={(e) => handleChange(e)}
                          />
                        </FormGroup>
                        {confirmPasswordError !== '' && <h6 className="passwordErrorText">{confirmPasswordError}</h6>}
                      </Col>
                    </Row>
                    <FormGroup className="mt-3" check>
                      <Input type="checkbox" name="terms_and_condition_accepted" id="exampleCheck"
                             onChange={(e) => handleChange(e)}/>
                      <Label for="exampleCheck" check>
                        Accept our{' '}
                        <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()}>
                          Terms and Conditions
                        </a>
                        .
                      </Label>
                    </FormGroup>
                    <Row className="divider"/>
                    <h6 className="mb-0">
                      Already have an account?{' '}
                      <NavLink to={'/auth/login'} className="text-primary">
                        Sign in
                      </NavLink>{' '}
                      |{' '}
                      <NavLink to={'/auth/forgot-password'} className="text-primary">
                        Recover Password
                      </NavLink>
                    </h6>
                  </div>
                  <div className="modal-footer d-block text-center">
                    <Button disabled={registerData.user_password !== registerData.user_c_password || !registerData.user_password} color="primary" className="btn-wide btn-pill btn-shadow btn-hover-shine" size="lg" onClick={()=>handleSubmit()} >
                      Create Account
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-center text-white opacity-8 mt-3">Copyright &copy; ArchitectUI 2019</div>
            </Col>
          </div>
        </div>
      </Fragment>
      )
};

export default RegisterBoxed;

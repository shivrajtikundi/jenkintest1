import React, { Fragment, useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { acquireToken } from '../../../redux/Auth/authThunks';

const LoginBoxed = () => {
  const history = useHistory();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = () => {
    dispatch(acquireToken({ user_email: loginData.email, user_password: loginData.password, handleRedirection }));
  };

  const handleRedirection = (res) => {
    if (res?.success === true) {
      sessionStorage.setItem('token', JSON.stringify(res?.token));
      history.push('/analysis/reviews');
    }
  };

  return (
    <Fragment>
      <div className="h-100 bg-plum-plate bg-animation">
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Col md="8" className="mx-auto app-login-box">
            <div className="app-logo-inverse mx-auto mb-3"/>
            <div className="modal-dialog w-100 mx-auto">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="h5 modal-title text-center">
                    <h4 className="mt-2">
                      <div>Welcome back,</div>
                      <span>Please sign in to your account below.</span>
                    </h4>
                  </div>
                  <Form>
                    <Row form>
                      <Col md={12}>
                        <FormGroup>
                          <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="Email here..."
                            value={loginData.email}
                            onChange={(e) => handleChange(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="Password here..."
                            value={loginData.password}
                            onChange={(e) => handleChange(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup check>
                      <Input type="checkbox" name="check" id="exampleCheck"/>
                      <Label for="exampleCheck" check>
                        Keep me logged in
                      </Label>
                    </FormGroup>
                  </Form>
                  <div className="divider"/>
                  <h6 className="mb-0">
                    No account?{' '}
                    <NavLink to={'/auth/signup'} className="text-primary">
                      Sign up now
                    </NavLink>
                  </h6>
                </div>
                <div className="modal-footer clearfix">
                  <div className="float-start">
                    <NavLink to={'/auth/forgot-password'} className="text-primary">
                      Recover Password
                    </NavLink>
                  </div>
                  <div className="float-end">
                    <Button color="primary" size="lg" onClick={() => handleLogin()}>
                      Login to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-white opacity-8 mt-3">
              Copyright &copy; Review Analysis {new Date().getFullYear()}
            </div>
          </Col>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginBoxed;

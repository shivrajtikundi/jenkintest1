import Cookies from 'js-cookie';
export const USER_KEY = 'authorization';
// const appConfig = window.globalConfig || { siteName: 'Gusei', base_url: 'http://localhost:5000/api/' };
export const apiUrl = process.env.REACT_APP_API_BASE_URL;
export const token = Cookies.get('token');
export const razor_pay_key_id = 'rzp_test_Q5SuMsyH1vVE8n';

export const LOGIN_URL = 'user/login';
export const REGISTER_URL = 'user/signup';
export const RESET_PASSWORD_URL = 'user/sendResetPassLink';

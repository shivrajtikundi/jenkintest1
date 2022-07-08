import { Route, Redirect } from 'react-router-dom';
import Cookie from "js-cookie";

// Private Route for Authenticated user
function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = JSON.parse(Cookie.getItem('token'));

  return (
    <>
      <Route
        {...rest}
        render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to={'/auth/login'}/>)}
      />
    </>
  );
}

export default PrivateRoute;

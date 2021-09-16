import { Redirect, Route as ReactDOMRoute, RouteProps } from "react-router-dom";
import { useAuth } from "../providers/Auth";

interface IRouteProps extends RouteProps {
  isPrivate?: boolean;
  admin?: boolean;
  component: React.ComponentType<any>;
}

const Route = ({
  isPrivate = false,
  admin = false,
  component: Component,
  ...rest
}: IRouteProps) => {
  // true true => ok
  // true false => login
  // false true  => dashboard
  // false false => ok

  const { token, user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() =>
        !isPrivate ||
        (!!token && isPrivate && !admin && !user.isAdmin) ||
        (!!token && isPrivate && admin && user.isAdmin) ? (
          <Component />
        ) : (
          <Redirect to={!token ? "/" : user.isAdmin ? "/admin" : "/analyst"} />
        )
      }
    />
  );
};

export default Route;

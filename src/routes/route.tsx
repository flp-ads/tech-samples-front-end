import { Redirect, Route as ReactDOMRoute, RouteProps } from 'react-router-dom';

interface IRouteProps extends RouteProps {
    isPrivate?: boolean,
    component: React.ComponentType<any>,
}

const Route = ({ isPrivate = false, component: Component, ...rest}: IRouteProps) => {

    // true true => ok
    // true false => login
    // false true  => dashboard
    // false false => ok

    return (
        <ReactDOMRoute
        {...rest}
        render={() => {
            return <Component />
        }}
    
    />
    )
}

export default Route
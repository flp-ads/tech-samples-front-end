import { Switch } from 'react-router-dom';

import Route from './route';

import Home from '../pages/Home';

const Routes = () => {

    return (
        <Switch>

            <Route
                exact
                path='/'
                component={Home}/>
            
        </Switch>
    )
}

export default Routes
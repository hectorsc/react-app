// import logo from '../logo.svg';
import React from 'react';
import '../App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import CeoList from './ceos/CeoList';
import CeoCreate from './ceos/CeoCreate';
import CeoEdit from './ceos/CeoEdit';
import CeoShow from './ceos/CeoShow';
import AccessMiddleware from './AccessMiddleware';
import Spinner from './Spinner';
import history from '../../src/history';
import Menu from '../components/Menu';
import Login from './auth/Layout';
import Register from './auth/Layout';
import NotFound from '../components/NotFound';

function App() {
   const [resources, loading] = AccessMiddleware();
   return (
      <div className="ui container" style={{ marginTop: "100px" }}>
         <Router history={history}>
            {
               !resources && !loading && (
                  <Switch>
                     <Route path="/" exact component={Login} />
                     <Route path="/register" exact component={Register} />
                     <Route path="*">
                        <Redirect to="/" />
                     </Route>
                  </Switch>
               )
            }
            {
               resources && !loading && (
                  <React.Fragment>
                     <Menu name={resources.user_name} />
                     <Switch>
                        <Route path="/" exact component={CeoList} />
                        <Route path="/ceos/new" exact component={CeoCreate} />
                        <Route path="/ceos/edit/:id" exact component={CeoEdit} />
                        <Route path="/ceos/:id" exact component={CeoShow} />
                        <Route path="*" exact component={NotFound} />
                     </Switch>
                  </React.Fragment>
               )
            }   
         </Router>
         { loading && <Spinner /> }
      </div>
   );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, PrivateRoute } from './Views';
import { connect } from 'react-redux';

import { history } from './_redux/helper';
import { alertActions } from './_redux/actions';


class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <BrowserRouter history={history}>
              <Switch>
                <PrivateRoute exact path="/" component={HomePage}/>
                <Route path="/login" component={LoginPage}></Route>
                <Route path="/register" component={RegisterPage}></Route>
                <Redirect from="*" to="/login" />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
    )
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };

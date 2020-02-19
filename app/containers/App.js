import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers/history';
import { alertActions } from '../actions';
import { PrivateRoute } from '../PrivateRoute';
import { HomePage } from '../components/Home';
import { LoginPage } from '../components/Login';
import { RegisterPage } from '../components/Register';
import { AddLessonElement } from '../components/lesson_components/AddLessonElement';
import ShowLesson from '../components/teaching_components/showLesson';
import QuizChoiceComponent from '../components/teaching_components/quizChoiceComponent';
import AddNewStudent from '../components/student_components/addNewStudent';

class App extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-unused-vars
    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="app-container">
        {/* eslint-disable-next-line react/prop-types */}
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/addLessonElement" component={AddLessonElement} />
            <Route path="/lesson" component={ShowLesson} />
            <Route path="/quiz" component={QuizChoiceComponent}/>
            <Route path="/newStudent" component={AddNewStudent}/>
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    );
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

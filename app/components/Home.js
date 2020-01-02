import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Popup from './common_components/Popup';
import AddLessonPopup from './lesson_components/AddLessonPopup';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }

  togglePopup() {
    this.setState({
      // eslint-disable-next-line react/destructuring-assignment
      showPopup: !this.state.showPopup
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { user } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        {/* eslint-disable-next-line react/prop-types */}
        <h1>What do you want to do today?</h1>
        <div className="item">
          <h2>All Students</h2>
          <h4>
            Add a new student, edit existing student details or view progress
            reports from here.
          </h4>
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <div
          className="item"
          role="dialog"
          onClick={this.togglePopup.bind(this)}
        >
          {this.state.showPopup ?
            <Popup
              element={<AddLessonPopup />}
              closePopup={this.togglePopup.bind(this)}
            />
            : null
          }
          <h2>All Lessons</h2>
          <h4>
            Add new lessons, change previously added lessons, or start a
            teaching session.
          </h4>
        </div>
        <div className="item">
          <h2>Start Teaching</h2>
          <h4>
            Start a new teaching session. You can also start a self study
            session, with additional sounds and prompts by the computer.
          </h4>
        </div>
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapState(state) {
  const { authentication } = state;
  const { user } = authentication;
  return { user };
}

const connectedHomePage = connect(mapState)(HomePage);
// eslint-disable-next-line import/prefer-default-export
export { connectedHomePage as HomePage };

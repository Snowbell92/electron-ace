import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { user } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        {/* eslint-disable-next-line react/prop-types */}
        <h1>Hi {user.username}!</h1>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>You're logged in with React!!</p>
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
export { connectedHomePage as HomePage };

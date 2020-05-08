/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { openLessonAction } from '../actions/openLesson.action';

class openLessonComponent extends React.component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h>open Lesson section</h>
        <p>kaj choltese eikane puzzle r mcq quize merge kora hobe</p>
      </div>
    );
  }
}

export default openLessonComponent;
/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/*
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { openLessonAction } from '../actions/openLesson.action';

class openLessonComponent extends React.component {
  constructor(props) {
    super(props);
    this.handleAllLesson = this.handleAllLesson.bind(this);
  }

  // eslint-disable-next-line camelcase
  L_name = [];

  // eslint-disable-next-line camelcase
  L_thumbnail = [];

  handleAllLesson(event) {
    event.preventDefault();
    const LessonInfo = this.props.fetchLesson();
    console.log(LessonInfo);
  }

  render() {
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <>
        // eslint-disable-next-line react/button-has-type
        <button onClick={this.handleAllLesson}>Refresh</button>
      </>
    );
  }
}

function mapState(state) {
  const { fetchLesson } = state.editForm;
  return { fetchLesson };
}

const actionCreators = {
  fetchLesson: openLessonAction.fetchLesson
};

const connectedElementForm = connect(
  mapState,
  actionCreators
)(openLessonComponent);

// eslint-disable-next-line import/prefer-default-export
export { connectedElementForm as openLessonPage }; */

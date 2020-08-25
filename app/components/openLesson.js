/* eslint-disable prettier/prettier */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { Tabs, Tab } from 'react-tab-view';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from "react-router-dom";
import { RoutedTabs, NavTab } from "react-router-tabs";
import { Component } from 'react';


const ipc = require('electron').ipcRenderer;
const db = require('../../db/db');

class openLessonComponent extends Component {

  constructor() {
    super();
    this.state = {
      lesson : ''
   };

   this.retrieveInfo = this.retrieveInfo.bind(this);
   this.setLesson = this.setLesson.bind(this);

  }

  // eslint-disable-next-line class-methods-use-this
  retrieveInfo(){

    return new Promise((resolve, reject) => {
      ipc.send( 'FIND_ALL_LESSON' );

      ipc.on('ALL_LESSON_FETCHED', (event, result) => {
        if (result.text !== 'success') {
          // eslint-disable-next-line no-shadow
          const error = result.message;
          reject(error);
        }
         resolve(result);
      });
    })
    .then(info =>{
      return info.lessons ;
    }).catch(message=>{
       return message;
    });

  }

  // eslint-disable-next-line class-methods-use-this
  async setLesson(){
    const lName =await this. retrieveInfo();

    // eslint-disable-next-line array-callback-return
   /*  lName.map(item => {

      console.log(item);
    });

    then(message => {

      return  message.lessons;

    }) ;

    */

   console.log(lName);

  // return this.lName.map(name => <div className="text-center"><Link to="play"><h3>{name}</h3></Link></div>);
  }

  render() {
    const headers = ['Open Lesson', 'Add New Lesson', 'Add Lesson Element'];
    // eslint-disable-next-line no-undef
   this.setLesson();
    return (
      <div className="left">
        <h>open Lesson section</h>
     </div>
    );
  }
}

/*
function mapState(state) {
  const { fetchLesson } = state.editForm;
  return { fetchLesson };
}

const actionCreators = {
  fetchLesson: null
};

const connectedElementForm = connect(
  mapState,
  actionCreators
)(openLessonComponent);

// eslint-disable-next-line import/prefer-default-export
export { connectedElementForm as openLessonPage };

*/


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

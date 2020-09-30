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
      lesson : [] ,
      retrieveLesson : false
   };

   this.retrieveInfo = this.retrieveInfo.bind(this);
   this.setLesson = this.setLesson.bind(this);

  }

  // eslint-disable-next-line class-methods-use-this
  retrieveInfo(){

     new Promise((resolve, reject) => {
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
      this.setState({lesson : info.lessons});
      this.setState({retrieveLesson : true});
    }).catch(message=>{
       console.log(message);
    });

  }

  // eslint-disable-next-line class-methods-use-this
   async setLesson(){
    await this. retrieveInfo();

   /* return lName.then(message => {
		return  message;

    }) ; */
  }



  // console.log(lName);
  // console.log(typeof(lName));
  // console.log(Array.isArray(lName));

 //  return lName;
 // }

  render() {
    const headers = ['Open Lesson', 'Add New Lesson', 'Add Lesson Element'];
    // eslint-disable-next-line no-undef
	//let allLesson=[];
   // allLesson = this.setLesson();
   if(this.state.retrieveLesson==false){
    this.setLesson();
   }
   console.log('yesss we can');
   console.log(this.state.retrieveLesson);
   console.log(this.state.lesson);
    return (
      <>
        <div className="left">
        {
          this.state.lesson.map((lessonList)=>(
            <div className="related_links">
              <li> <Link
              to={{
                pathname: '/showLesson',
                state: {
                  name: lessonList.name
                }
              }}
              className="btn btn-link"
            >
             { lessonList.name }
            </Link></li>
            </div>
          ))
        }
        </div>
     </>
    );
  }
}


export default openLessonComponent;

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
import { Component } from 'react';
import './add_lesson/AddLession.css';

class TabView extends Component {
  render() {
    const headers = ['Open Lesson', 'Add New Lesson', 'Add Lesson Element'];

    return (
      <div className="left">
        <Tabs headers={headers}>
          <Tab>
            <div>
              <h2>Open Lesson</h2>
            </div>
          </Tab>
          <Tab>
            <Link to="/AddLesson"> Click here</Link>
          </Tab>
          <Tab>
            <h2>Add Lesson Element</h2>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default TabView;

/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { showLessonConstants } from '../constants';
import { getLessonDataService } from '../services/getLessonService';
import { alertActions } from './alert.actions';

export const showLessonActions = {
  fetchLesson
};

function fetchLesson(id) {
  return dispatch => {
    request(id);
    // eslint-disable-next-line promise/catch-or-return
    return getLessonDataService
      .getLesson(id)
      .then(
        // eslint-disable-next-line promise/always-return
        data => {
          console.log(data);
          console.log(data.wordName);
          console.log('action');
          dispatch(success(data));
          return data;
        }
      )
      .catch(error => {
        console.log(error);
        dispatch(alertActions.error(error));
      });
  };
}

  function request(lessonID) {
    return { type: showLessonConstants.FETCH, lessonID };
  }
  function success(lessonData) {
    return { type: showLessonConstants.SUCCESS, lessonData };
  }

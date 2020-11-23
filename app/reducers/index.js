import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import editForm from './editForm.reducer';
import lessonData from './lesson.reducer';
import alLessonName from './alLesson.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  editForm,
  lessonData,
  alLessonName
});

export default rootReducer;

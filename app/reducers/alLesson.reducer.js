import { editLessonConstants } from '../constants';

const initialState = {
  editLesson: {
    isLoadedAlLesson: false,
    isLoadingAlLesson: true,
    data: {}
  }
}

const alLessonName = (state = initialState.editLesson, action) => {
  switch (action.type) {
    case editLessonConstants.FETCH:
      return {
        ...state,
        isLoadingAlLesson: true
      }
    case editLessonConstants.SUCCESS:
      return {
        isLoadingAlLesson: false,
        isLoadedAlLesson: true,
        data: action.alLessonName
      };
    default:
      return state;
  }
};

export default alLessonName;

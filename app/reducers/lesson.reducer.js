import { showLessonConstants } from '../constants';

const initialState = {
  showLesson: {
    isLoaded: false,
    isLoading: false,
    data: {}
  }
}

const lessonData = (state = initialState.showLesson, action) => {
  switch (action.type) {
    case showLessonConstants.FETCH:
      return {
        ...state,
        isLoading: true
      }
    case showLessonConstants.SUCCESS:
      return {
        isLoading: false,
        isLoaded: true,
        data: action.lessonData.data
      };
    default:
      return state;
  }
};

export default lessonData;

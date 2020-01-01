import { editConstants } from '../constants';

const initialState = {
  edit: {
    status: null,
    data: null,
    changed: null
  }
};

export default function editForm(state = initialState.edit, action) {
  switch (action.type) {
    case editConstants.CHANGE:
      const newForm = { ...state.data };
      console.log('change');
      console.log(newForm);
      return {
        ...state,
        changed: true,
        data: newForm
      };
    case editConstants.PENDING:
      console.log('pending');
      console.log(...state);
      return {
        ...state,
        status: editConstants.PENDING
      };
    case editConstants.SUBMITTED:
      console.log('success');
      return {
        ...state,
        changed: false,
        data: action.form,
        status: editConstants.SUBMITTED
      };

    default:
      return state;
  }
}

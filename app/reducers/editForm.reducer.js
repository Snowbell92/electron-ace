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
      // eslint-disable-next-line no-case-declarations
      const newForm = { ...state.data };
      console.log('change');
      console.log(newForm);
      return {
        ...state,
        changed: true,
        data: newForm
      };
    case editConstants.PENDING:
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

    case editConstants.FAILED:
      console.log('failed');
      return {
        ...state,
        changed: false,
        data: action.form,
        status: editConstants.FAILED
      };

    default:
      return state;
  }
}

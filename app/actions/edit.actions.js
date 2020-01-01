import { editConstants } from '../constants';
import { addElementService } from '../services';

export const editActions = {
  pending,
  submitted
};

function pending(val) {
  console.log(val);
}

function submitted(element) {
  return dispatch => {
    dispatch(request(element));

    // eslint-disable-next-line promise/catch-or-return,promise/always-return
    addElementService.addElement(element).then(data => {
      console.log(data);
    });
  };

  function request(value) {
    return { type: editConstants.SUBMITTED, value };
  }
}

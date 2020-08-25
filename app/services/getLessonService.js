/* eslint-disable import/prefer-default-export */
const ipc = require('electron').ipcRenderer;

export const getLessonDataService = {
  getLesson
};

function getLesson(id) {
  console.log('in service');
  console.log(id);

  return new Promise((resolve, reject) => {
    // will send the element object here.
    ipc.send('GET_LESSON_DATA', id);
    // once I get the information back, pass this to actions so that
    // my store updates with the information
    ipc.on('LESSON_DATA_FETCHED', (event, result) => {
      if (result.text !== 'success') {
        // eslint-disable-next-line no-shadow
        const error = result.message;
        return reject(error);
      }
      return resolve(result);
    });
    // eslint-disable-next-line promise/always-return
  }).then(message => {
    // eslint-disable-next-line no-shadow
    return message.data;
  });
}

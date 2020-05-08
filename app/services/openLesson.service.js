/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
const ipc = require('electron').ipcRenderer;

// eslint-disable-next-line import/prefer-default-export
export const openLesson = {
  allLesson
};

function  allLesson(lesson) {

  console.log('in service');

  return new Promise((resolve, reject) => {
    // will send the element object here.
    ipc.send('FIND_ALL_LESSON', lesson);
    // once I get the information back, pass this to actions so that
    // my store updates with the information
    ipc.on('FIND_ALL_LESSON', (event, result) => {
      if (result.text !== 'success') {
        // eslint-disable-next-line no-shadow
        const error = result.message;
        return reject(error);
      }
      return resolve(result);
    });
    // e slint-disable-next-line promise/always-return
  }).then(message => {
    // eslint-disable-next-line no-shadow
    return message;
  });
}

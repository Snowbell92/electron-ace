const ipc = require('electron').ipcRenderer;

export const addElementService = {
  addElement
};

function addElement(element) {
  console.log('in service');
  console.log(element);

  return new Promise((resolve, reject) => {
    // will send the element object here.
    ipc.send('ADD_ELEMENT', element);
    // once I get the information back, pass this to actions so that
    // my store updates with the information
    ipc.on('ELEMENT_ADDED', (event, result) => {
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
    return message;
  });
}

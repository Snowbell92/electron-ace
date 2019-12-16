const ipc = require('electron').ipcRenderer;

// eslint-disable-next-line import/prefer-default-export
export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(username, password) {
  const teacher = {
    username,
    password
  };

  return new Promise((resolve, reject) => {
    // will send the teacher object here.
    ipc.send('DO_LOGIN', teacher);
    // once I get the information back, pass this to actions so that
    // my store updates with the information
    ipc.on('LOGIN_COMPLETE', (event, result) => {
      if (result.text !== 'success') {
        // eslint-disable-next-line no-shadow
        const error = result.message;
        return reject(error);
      }
      return resolve(result);
    });
    // eslint-disable-next-line promise/always-return
  }).then(user => {
    // eslint-disable-next-line no-shadow
    const teacher = user.user;
    localStorage.setItem('user', JSON.stringify(teacher));
    return teacher;
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  return new Promise((resolve, reject) => {
    // will send the user object here.
    ipc.send('DO_REGISTER', user);
    // once I get the information back, pass this to actions so that
    // my store updates with the information
    ipc.on('REGISTER_COMPLETE', (event, result) => {
      console.log(result);
      if (result.text !== 'success') {
        // eslint-disable-next-line no-shadow
        const error = result.message;
        return reject(error);
      }
      return resolve(result);
    })
  });
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  console.log(response);
  const data = response;
  if (response.text !== 'success') {
    logout();
    // eslint-disable-next-line no-restricted-globals
    location.reload(true);
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return Promise.resolve(data);
}

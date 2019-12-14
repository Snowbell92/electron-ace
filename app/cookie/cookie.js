function setCookie(currentSession) {
  currentSession.cookies
    .set({
      url: 'http://localhost.com',
      name: 'userCookie',
      value: 'loggedin=1',
      expirationDate: 1531036000
    })
    // eslint-disable-next-line promise/always-return
    .then(() => {
      console.log('successfully set cookie');
    })
    .catch(err => console.log(err));
}

// eslint-disable-next-line no-shadow
function getCookie(name, currentSession) {
  // eslint-disable-next-line func-names
  currentSession.cookies.get({ name }, function(error, cookies) {
    console.log(cookies);
  });
}

// eslint-disable-next-line import/prefer-default-export
const cookies = {
  setCookie,
  getCookie
};

module.exports = cookies;

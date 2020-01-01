/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

const fse = require('fs-extra');
const db = require('../db/db');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);
  mainWindow.webContents.openDevTools();

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();

  ipcMain.on('DO_REGISTER', (event, user) => {
    // run the sequelize query
    // eslint-disable-next-line promise/catch-or-return
    db.teacher
      .findOrCreate({
        where: {
          name: user.fullName,
          username: user.username,
          password: user.password
        }
      })
      // eslint-disable-next-line no-shadow,promise/always-return
      .then(([user, created]) => {
        event.sender.send('REGISTER_COMPLETE', {
          text: 'success',
          userId: user.id
        });
      })
      .catch(error => {
        //cls console.log(error);
        return event.sender.send('REGISTER_COMPLETE', {
          text: 'failed',
          message: 'Registration failed'
        });
      });
  });

  ipcMain.on('DO_LOGIN', (event, teacher) => {
    // do something
    // run the sequelize query
    // eslint-disable-next-line promise/catch-or-return
    db.teacher
      .findOne({ where: { username: teacher.username } })
      .then(entry => {
        // entry will be the first entry of the teacher table with the username 'userame' || null
        // eslint-disable-next-line promise/always-return
        if (!entry) {
          return event.sender.send('LOGIN_COMPLETE', {
            text: 'failed',
            message: "user doesn't exist"
          });
        }
        entry
          .comparePassword(teacher.password)
          .then(result => {
            if (result) {
              // localStorage.setItem('users', JSON.stringify(user))
              return event.sender.send('LOGIN_COMPLETE', {
                text: 'success',
                message: 'Login successful',
                user: {
                  username: entry.dataValues.username,
                  id: entry.dataValues.id
                }
              });
            } else {
              console.log("authentication failed. Password doesn't match");
              return event.sender.send('LOGIN_COMPLETE', {
                text: 'failed',
                message: 'Invalid Credentials'
              });
            }
          })
          .catch(err => console.error(err));
      })
      // eslint-disable-next-line no-shadow,promise/always-return
      .catch(error => {
        //console.log(error);
        event.sender.send('LOGIN_FAILED', {
          text: 'failed',
          message: 'user does not exist',
          error
        });
      });
  });

  ipcMain.on('ADD_ELEMENT', (event, element) => {
    // save and rename the file to proper directory

    if (!Array.isArray(element.images) || !element.images.length) {
      // image exists
      console.log('images exists');
      
    }




    // eslint-disable-next-line promise/catch-or-return
    /*db.teacher
      .findOne({ where: { username: teacher.username } })
      .then(entry => {
        // entry will be the first entry of the teacher table with the username 'userame' || null
        // eslint-disable-next-line promise/always-return
        if (!entry) {
          return event.sender.send('LOGIN_COMPLETE', {
            text: 'failed',
            message: "user doesn't exist"
          });
        }
        entry
          .comparePassword(teacher.password)
          .then(result => {
            if (result) {
              // localStorage.setItem('users', JSON.stringify(user))
              return event.sender.send('LOGIN_COMPLETE', {
                text: 'success',
                message: 'Login successful',
                user: {
                  username: entry.dataValues.username,
                  id: entry.dataValues.id
                }
              });
            } else {
              console.log("authentication failed. Password doesn't match");
              return event.sender.send('LOGIN_COMPLETE', {
                text: 'failed',
                message: 'Invalid Credentials'
              });
            }
          })
          .catch(err => console.error(err));
      })
      // eslint-disable-next-line no-shadow,promise/always-return
      .catch(error => {
        //console.log(error);
        event.sender.send('LOGIN_FAILED', {
          text: 'failed',
          message: 'user does not exist',
          error
        });
      });*/
  });
});

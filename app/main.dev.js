/* eslint-disable prettier/prettier */
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

const path = require('path');
const fse = require('fs-extra');
const ba64 = require('ba64');
const db = require('../db/db');

const imageDir = 'app/assets/images/';

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
        // cls console.log(error);
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
            }
            console.log("authentication failed. Password doesn't match");
            return event.sender.send('LOGIN_COMPLETE', {
              text: 'failed',
              message: 'Invalid Credentials'
            });
          })
          .catch(err => console.error(err));
      })
      // eslint-disable-next-line no-shadow,promise/always-return
      .catch(error => {
        // console.log(error);
        event.sender.send('LOGIN_FAILED', {
          text: 'failed',
          message: 'user does not exist',
          error
        });
      });
  });

  ipcMain.on('ADD_ELEMENT', (event, element) => {
    return new Promise((resolve, reject) => {
      if (Array.isArray(element.images) && element.images.length) {
        // image exists. save image to proper folder.create folder if necessary
        for (let i = 0; i < element.images.length; i++) {
          const subDir = imageDir + element.word;
          // eslint-disable-next-line promise/always-return
          fse
            .ensureDir(subDir)
            // eslint-disable-next-line promise/always-return
            .then(data => {
              console.log(data);
              const fullImagePath = `${imageDir + element.word}/${
                element.word
              }_${i}`;
              // Or save the image asynchronously.
              ba64.writeImage(
                fullImagePath,
                element.images[i].toString(),
                function(err) {
                  if (err) {
                    reject(new Error('Image could not be saved to disk'));
                  }
                  console.log('Image saved successfully');
                }
              );
            })
            .catch(err => {
              console.error(err);
              reject(
                new Error(
                  'something went wrong and image could not be saved to disk.'
                )
              );
            });
        }
        db.allImages
          .findOrCreate({
            where: {
              name: element.word
            }
          })
          // eslint-disable-next-line promise/always-return
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
            reject(new Error('Image could not be saved to database'));
          });
      }

      db.lesson_elements
        .findOrCreate({
          where: {
            // TODO: pass proper type from parent dropdown, i.e noun/verb/associate etc
            type: 'noun',
            word: element.word,
            word_category: element.wordType
          }
          // eslint-disable-next-line promise/always-return
        })
        .then(result => {
          console.log(result);
          resolve(result);
          return event.sender.send('ELEMENT_ADDED', {
            text: 'success',
            message: 'Element added successfully'
          });
        })
        .catch(error => {
          console.log(error);
          reject(error);
          return event.sender.send('ELEMENT_ADDED', {
            text: 'failed',
            message: 'Element could not be added to the database'
          });
        });
    });
  });

  ipcMain.on('ADD_LESSON', (event, lesson) => {
    // run the sequelize query
    // eslint-disable-next-line promise/catch-or-return
    db.lesson
      .findOrCreate({
        where: {
          name: lesson.name,
          thumbnail:lesson.thumbnail
        }
      })
      // eslint-disable-next-line no-shadow,promise/always-return
      .then(result => {
        console.log(result);
        // eslint-disable-next-line no-undef
        resolve(result);
        return event.sender.send('LESSON_ADDED', {
          text: 'success',
          message: 'Lesson added successfully'
        });
      }).catch(error => {
        console.log(error);
        // eslint-disable-next-line no-undef
        reject(error);
        return event.sender.send('ELEMENT_ADDED', {
          text: 'failed',
          message: 'Element could not be added to the database'
        });
      });
  });

  ipcMain.on('GET_LESSON_DATA', (event, lessonID) => {
    return new Promise((resolve, reject) => {
      db.lesson_elements
        .findByPk(lessonID)
        .then(lessonData => {
          const word = lessonData.getDataValue('word');
          const dir = path.join(imageDir, word);
          const images = fse.readdirSync(dir, (err, files) => {
            return files;
          });
          resolve(lessonData);
          return event.sender.send('LESSON_DATA_FETCHED', {
            text: 'success',
            message: 'lesson found',
            data: {
              wordName: word,
              slideImages: images
            }
          });
        })
        .catch(err => {
          console.log(err);
          reject(err);
          return event.sender.send('ELEMENT_ADDED', {
            text: 'failed',
            message: 'Not Found'
          });
        });
    });
  });
});

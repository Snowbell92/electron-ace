/* eslint-disable promise/catch-or-return */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable new-cap */
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
import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron';
import {
  autoUpdater
} from 'electron-updater';
import log from 'electron-log';
import {
  promises
} from 'dns';
import MenuBuilder from './menu';

const path = require('path');
const fse = require('fs-extra');
const ba64 = require('ba64');
const db = require('../db/db');
const fs = require('fs');

const imageDir = 'app/assets/images/';
const videoDir = 'app/assets/videos/';
const audioDir = 'app/assets/audioes/';
const thumbnailDir = 'app/assets/thumbnails/';

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

function compare(wordOne, wordTwo,i) {
  return wordOne.charAt(i) === wordTwo.charAt(0);
}

function getPathRelation(position, basePath, input) {
  var basePathR = basePath.split("/");
  var inputR = input.split("/");
  var output = "";
  for(c=0; c < inputR.length; c++) {
     if(c < position) continue;
     if(basePathR.length <= c) output = "../" + output;
     if(inputR[c] == basePathR[c]) output += inputR[c] + "/";
  }

  return output;
}

// function to know whether directory is empty or not
function isEmpty(path) {
  return fs.readdirSync(path).length === 0;
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
      .findOne({
        where: {
          username: teacher.username
        }
      })
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

        Array.isArray(element.video) && element.video.map((video,i) => {

          const destinationPath =`${videoDir  + element.word}`;
          const dest = `${destinationPath}/_${i}.mp4`
          console.log(destinationPath);

          if (!fs.existsSync(destinationPath)){
            fs.mkdirSync(destinationPath);
        }

          fs.copyFileSync( video, dest, (err) => {
            if (err) {
              console.log("Error Found:", err);
            }  });

        });

        Array.isArray(element.audio) && element.audio.map((audio,i) => {

          const destinationPath =`${audioDir  + element.word}`;
          const dest = `${destinationPath}/_${i}.mp3`
          console.log(destinationPath);

          if (!fs.existsSync(destinationPath)){
            fs.mkdirSync(destinationPath);
        }

        console.log(audio);
        console.log(dest);

          fs.copyFileSync( audio, dest, (err) => {
            if (err) {
              console.log("Error Found:", err);
            }  });

        });


        db.allImages
          .findOrCreate({
            where: {
              name: element.word,
            //  lesson_name: element.lesson_name,
            //  category: element.category
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
            lesson_name: element.lesson_name,
            type: element.wordType,
            word: element.word,
            word_category: element.category
          }
          // eslint-disable-next-line promise/always-return
        })
        .then(result => {
          console.log(result);
          resolve(result);
          return event.sender.send('ADD_ELEMENT', {
            text: 'success',
            message: 'Element added successfully'
          });
        })
        .catch(error => {
          console.log(error);
          reject(error);
          return event.sender.send('ADD_ELEMENT', {
            text: 'failed',
            message: 'Element could not be added to the database'
          });
        });
    });
  });

  ipcMain.on('ADD_LESSON', (event, lesson) => {
    // run the sequelize query
    // eslint-disable-next-line promise/catch-or-return
     return new Promise((resolve, reject) => {
      // eslint-disable-next-line promise/catch-or-return

      if (Array.isArray(lesson.thumbnail) && lesson.thumbnail.length) {
        // image exists. save image to proper folder.create folder if necessary
        for (let i = 0; i < lesson.thumbnail.length; i++) {
          const subDir = thumbnailDir + lesson.name;
          // eslint-disable-next-line promise/always-return
          fse
            .ensureDir(subDir)
            // eslint-disable-next-line promise/always-return
            .then(data => {
              console.log(data);
              const fullImagePath = `${thumbnailDir + lesson.name}/${
                lesson.name
              }_${i}`;
              // Or save the image asynchronously.
              ba64.writeImage(
                fullImagePath,
                lesson.thumbnailFile[i].toString(),
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
      }

      db.lesson
        .findOrCreate({
          where: {
            name: lesson.name,
            thumbnail: lesson.thumbnail
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
          return event.sender.send('LESSON_ADDED', {
            text: 'failed',
            message: 'Lesson could not be added to the database'
          });
        });

    });

  });

  ipcMain.on('ALL_LESSON', (event) => {

    return new Promise((resolve, reject) => {
      db.lesson
        .findAll({ raw:true })
        .then(lessonData =>  {
          resolve(lessonData);
          // console.log(lessonData);
          return event.sender.send('ALL_LESSON_FETCHED', {
            text: 'success',
            message: 'lesson found',
            // lessons:result
            lessons : lessonData
          });
        })
        .catch(err => {
          console.log(err);
          reject(err);
          return event.sender.send('LESSON_NOT_FOUND', {
            text: 'failed',
            message: 'Not Found'
          });
        });
    });
  });


  // eslint-disable-next-line no-unused-vars
  ipcMain.on('FIND_ALL_LESSON', (event) => {

    return new Promise((resolve, reject) => {
      db.lesson_elements
        .findAll({ raw:true })
        .then(lessonData =>  {
          resolve(lessonData);
          // console.log(lessonData);
          return event.sender.send('ALL_LESSON_FETCHED', {
            text: 'success',
            message: 'lesson found',
            // lessons:result
            lessons : lessonData
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


  ipcMain.on('GET_LESSON_DATA', (event, lessonName) => {

   // console.log(db.lesson_element);
    return new Promise((resolve, reject) => {
      // console.log('keno mile na ');
      // console.log(db.lesson);
      db.lesson_elements
      .findAll({
         where: {
              word: lessonName
            }
          }).then(info => {
              return JSON.stringify(info);
          }).then(jsonData => {
            const obj = JSON.parse(jsonData);
            return obj;
          })
        .then(lessonData => {
          console.log(lessonData);
          console.log(lessonData[0].word);
          const size =Object.keys(lessonData).length;


          const str = [];
          const images =[];
          const audioes=[];
          const videoes=[];

          for (let i=0 ; i<size ; i++){
            str.push(lessonData[i].word);

            const dirImage = path.join(imageDir, str[i]);
            const dirVideo = path.join(videoDir, str[i]);
            const dirAudio = path.join(audioDir, str[i]);


            console.log(dirAudio);
            console.log(dirVideo);


              if (fs.existsSync(dirImage)) {
                images.push(fse.readdirSync(dirImage, (err, files) => {
                  return files;
                }));
            }

            if (fs.existsSync(dirAudio)) {
              audioes.push(fse.readdirSync(dirAudio, (err, files) => {
                return files;
              }));
            }

            if (fs.existsSync(dirVideo)) {
              videoes.push(fse.readdirSync(dirVideo, (err, files) => {
                return files;
              }));
            }

        /*    if(isEmpty(dirAudio)){
              audioes.push(fse.readdirSync(dirImage, (err, files) => {
                return files;
              }));
            }

            if(isEmpty(dirVideo)){
              videoes.push(fse.readdirSync(dirImage, (err, files) => {
                return files;
              }));
            } */

          }
         // console.log(videoes);
          resolve(lessonData);
          return event.sender.send('LESSON_DATA_FETCHED', {
            text: 'success',
            message: 'lesson found',
            data: {
              wordName: str,
              slideImages: images,
              audio: audioes,
              video: videoes
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

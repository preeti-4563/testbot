const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const app = express();
const gkeys = require('./googleapi.json');
const unirest = require('unirest');
const timer = require('timers');
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ 
    extended: false
}))
app.use(bodyParser.json())
app.post('/test', function(req, res) {
    console.log('someone pinged @');
  
       // console.log('someone pinged @');
      return res.json({
        text: 'hellooo...'
      });
    }
  );

  function getJWT() {
    return new Promise(function(resolve, reject) {
      let jwtClient = new google.auth.JWT(
        gkeys.client_email,
        null,
        gkeys.private_key, ['https://www.googleapis.com/auth/chat.bot']
      );
  
      jwtClient.authorize(function(err, tokens) {
        if (err) {
          console.log('Error create JWT hangoutchat');
          reject(err);
        } else {
          resolve(tokens.access_token);
        }
      });
    });
  }
  function postMessage(count) {
    return new Promise(function(resolve, reject) {
        getJWT().then(function(token) {
            unirest.post('https://chat.googleapis.com/v1/spaces/AAAAzmWIBkE/messages')
                .headers({
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                })
                .send(JSON.stringify({
                    'text': 'Hello! This is message number ' + count,
                }))
                .end(function(res) {
                    resolve();
                });
        }).catch(function(err) {
            reject(err);
        });
    });
  }  

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  let count = 0;
  timer.setInterval(function() {
      postMessage(count += 1);
  }, 60000);
});
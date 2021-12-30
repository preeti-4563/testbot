const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const app = express();
const gkeys = require('./googleapi.json');
const unirest = require('unirest');
const func = require('./app');
const timer = require('timers');
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ 
    extended: false
}))
app.use(bodyParser.json())
app.post('/test', function(req, res) {
    console.log('someone pinged @');
  
    if (req.body.type === 'MESSAGE') {
       // console.log('someone pinged @');
      return res.json({
        text: 'hellooo...'
      });
    }
  });

 

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  let count = 0;
  timer.setInterval(function() {
      postMessage(count += 1);
  }, 60000);
});
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
           unirest.post('https://chat.googleapis.com/v1/spaces/' + {} + '/messages')
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
  module.exports = { getJWT, postMessage };
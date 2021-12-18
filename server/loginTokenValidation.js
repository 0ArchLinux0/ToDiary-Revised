const axios = require("axios");
const db = require('./dbManager2.js');
const googleTokenCheckBaseUrl ="https://oauth2.googleapis.com/tokeninfo?id_token=";
const apiClient = axios.create({
  timeout: 300*60*1000,
});

function googleTokenValidationCheck(token) {
  return apiClient.get(googleTokenCheckBaseUrl + token)
}

function verifyToken(token, accountType) {
    if(accountType === 'google') {  
      googleTokenValidationCheck(token).then((result) => {
        // console.log('data')
        // console.log('in token veryfication');
        // console.log(result.data)
        if(!result.data.error && result.status == 200) {
          getAccountWithEmail(result.data.email)
            .then((data) => { 
              // console.log('then data');
              console.log(data);
              return data; 
            })
            .catch(() => { return 'register'; })
        }
        else return;
      })
      .catch(() => {
        return ;
      })
    } else return;
}

function getAccountWithEmail(email) {
  console.log('mail: ' + email);
  return new Promise((resolve, reject) => {
    db.findOne("userdata", "accounts", { email })
    .then(data  => resolve(data))
    .catch((err) => {console.log(err); reject();});
    // dbManager
    //   .get('/readone', {
    //     params: {
    //       filter: { email },
    //       dbname: 'userdata',
    //       collection: 'accounts'
    //     }
    //   })
    //   .then(response => resolve(response))
    //   .catch((err) => {
    //     resolve(undefined)
    //   })
  })
}

function bindDBManager(_dbmanger) { 
  if(!dbmanger) dbManager = _dbmanger;
}

module.exports = {
  verifyToken,
  bindDBManager
}
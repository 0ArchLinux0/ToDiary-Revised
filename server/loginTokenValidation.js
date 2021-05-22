const axios = require("axios");

const googleTokenCheckBaseUrl ="https://oauth2.googleapis.com/tokeninfo?id_token=";
const apiClient = axios.create({
  timeout: 300*60*1000,
});

function googleTokenValidationCheck(token) {
  return apiClient.get(googleTokenCheckBaseUrl + token)
}

function verifyToken(token, accountType) {
  return new Promise((resolve, reject) => {
    if(accountType === 'google') {  
      googleTokenValidationCheck(token).then(async (result) => {
        // console.log('data')
        // console.log(result.data)
        if(!result.data.error && result.status == 200) {
          const accountQuery = await getAccountWithEmail(result.data.email);
          // console.log(accountQuery)
          if(!accountQuery || accountQuery.status == 404) reject('!registered');
          else resolve(accountQuery.data);
        }
        else reject();
      })
      .catch(() => reject())
    } else reject();
  })
}

function getAccountWithEmail(email) {
  return new Promise((resolve, reject) => {
    dbManager
      .get('/readone', {
        params: {
          filter: { email },
          dbname: 'userdata',
          collection: 'accounts'
        }
      })
      .then(response => resolve(response))
      .catch((err) => {
        resolve(undefined)
      })
  })
}

function bindDBManager(_dbmanger) { 
  if(!dbmanger) dbManager = _dbmanger;
}

module.exports = {
  verifyToken,
  bindDBManager
}
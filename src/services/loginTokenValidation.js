const axios = require("axios");
const { reject, resolve } = require("core-js/fn/promise");

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
      googleTokenValidationCheck.then(async (result) => {
        if(!result.data.error && result.status == 200) {
          const accountQuery = await getAccountWithEmail(result.data.email);
          if(!accountQuery || accountQuery.status !== 200) reject();
          else resolve(accountQuery.data);
        }
        else reject();
      })
      .catch(reject)
    } else reject();
  })
}

function getAccountWithEmail(email) {
  return new Promise((resolve, reject) => {
    dbManager
      .get('/exists', {
        params: {
          email,
          dbname: 'userdata',
          collection: 'accounts'
        }
      })
      .then(({ accountData }) =>  resolve(accountData) )
      .catch(resolve(undefined))
  })
}

function bindDBManager(_dbmanger) { 
  if(!dbmanger) dbManager = _dbmanger;
}

module.exports = {
  verifyToken,
  bindDBManager
}
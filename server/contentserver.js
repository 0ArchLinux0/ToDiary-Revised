const cors = require("cors");
const express = require("express");
const axios = require('axios');
// const md5 = require("crypto-js/md5");
const loginTokenValidation = require('./loginTokenValidation');

const dbManagerUrl = "http://localhost:1111";
const port = "3083"

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// const localApp = express();
// localApp.use(express.json({ limit: "50mb" }));
// localApp.use(cors());

app.post('/content', (req, res) => {
  const data = req.body;
  console.log(data);
  const { collection, contentInfo } = data;
  // if(data.requestorOid == data.userOid) {
    // 
  // }
  dbManager
    .post('writeone', data)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(404)
    });

  // loginTokenValidation.verifyToken(token, 'google')
  //   .then(accountInfo => res.send(accountInfo))
  //   .catch((err) => {
  //     if(err==='!registered') res.send('register');
  //     else res.sendStatus(404)
  //   })
})

app.get('/postIt', (req, res) => {
  const _id = req.query._id;
  console.log(_id);
  dbManager
    .get('readone', { params: { 
      filter: { _id },
      dbname: 'content',
      collection: 'postit', 
    }}) 
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.sendStatus(404));
})


app.listen(port, "0.0.0.0", () => {
  dbManager = axios.create({
    withCredentials: false,
    baseURL: dbManagerUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 0,
  });
  console.log("Public Content API Listening to: " + port);
});

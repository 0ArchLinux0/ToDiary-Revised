const cors = require("cors");
const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require('axios');
const loginTokenValidation = require('./loginTokenValidation');
const https = require("https");

const dbManagerUrl = "http://localhost:1111";
// const dbManagerUrl = "http://ec2-54-180-90-248.ap-northeast-2.compute.amazonaws.com:1111";
const port = "2083"

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// const localApp = express();
// localApp.use(express.json({ limit: "50mb" }));
// localApp.use(cors());

app.get("/test", ((req, res, next) => {
  console.log("test http connection");
  console.log(req.query.fuck);
  res.send("response");
}));

app.post('/login', (req, res) => {
  const data = req.body;
  console.log(data);
  const { token, loginAttemptType } = data;
  loginTokenValidation.verifyToken(token, 'google')
    .then(accountInfo => res.send(accountInfo))
    .catch((err) => {
      if(err==='!registered') res.send('register');
      else res.sendStatus(404)
    })
})

app.post('/readone', (req, res) => {
  const query = req.body;
  // return new Promise((resolve, reject) => {
    dbManager
      .get('/readone', {
        params: {
          filter: query,
          dbname: 'userdata',
          collection: 'accounts'
        }
      })
      .then(response => res.send('1'))
      .catch((err) => {
        // console.log(err);
        if(err.response.status== 409) res.send('0')
        else res.sendStatus(401);
      })
  // })
})

app.post('/accountdata', (req, res) => {
  const dataToSet = req.body;
    dbManager
      .post('/updateone', {
        dbname: 'userdata',
        collection: 'accounts',
        filter: { _id: dataToSet.oid },
        toSet: dataToSet.toWrite,
      })
      .then(response => res.sendStatus(200))
      .catch((err) => {
        console.log(err);
        res.sendStatus(404)
      })
  // })
})

app.post('/content', (req, res) => {
  const data = req.body;
  console.log(data);
  const { collection, contentInfo } = data;
  dbManager
    .post('writeone', data)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(404)
    });
})

app.post('/accountdata', (req, res) => {
  const data = req.body;
  dbManager
    .post('updatone', { 
      dbname: 'userdata',
      collection: 'accounts',
      filter: { _id: data.oid },
      toSet: data.toSet,
    }) 
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.sendStatus(404));
})

app.get('/accountdata', (req, res) => {
  const data = req.query;
  dbManager
    .get('/readone', {
      params: {
        dbname: 'userdata',
        collection: 'accounts',
        filter: { _id: data.userOid },
        toGrab: data.toGrab,
      },
    }).then(({ data }) => res.send(data))
    .catch((err) => {console.log(err); res.sendStatus(404)});
})

let server;
try {
  options = {
    cert: fs.readFileSync(path.resolve(__dirname, "./ssl/cloudflare-cert.pem")),
    key: fs.readFileSync(path.resolve(__dirname, "./ssl/cloudflare-private.key")),
  };
  server = https.createServer(options, app);
} catch(e) {
  console.log("contentserver - development mode");
  console.log(e);
  server = app;
}


server.listen(port, "0.0.0.0", () => {
  dbManager = axios.create({
    withCredentials: false,
    baseURL: dbManagerUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 0,
  });
  console.log("Public Account API Listening to: " + port);
  // localApp.listen(localApiPort, () => {
    // console.log("Local API Listening to: " + localApiPort);
  // });
});

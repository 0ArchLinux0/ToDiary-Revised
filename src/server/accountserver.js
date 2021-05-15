const cors = require("cors");
const express = require("express");
const axios = require('axios');
const loginTokenValidation = require('./loginTokenValidation');


const dbManagerUrl = "http://localhost:1111";
const port = "2083"

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// const localApp = express();
// localApp.use(express.json({ limit: "50mb" }));
// localApp.use(cors());

app.post('/login', (req, res) => {
  const data = req.body;
  console.log(data);
  const { token, loginAttemptType } = data;
  loginTokenValidation.verifyToken(token, 'google')
    .then(accountInfo => res.send(accountInfo))
    .catch((err) => {
      if(err==='!registered') res.send('register');
      else res.sendStatus(389)
    })
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
  console.log("Public Account API Listening to: " + port);
  // localApp.listen(localApiPort, () => {
    // console.log("Local API Listening to: " + localApiPort);
  // });
});

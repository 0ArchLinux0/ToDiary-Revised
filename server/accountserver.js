const cors = require("cors");
const express = require("express");
const fs = require("fs");
const path = require("path");
const loginTokenValidation = require('./loginTokenValidation');
const https = require("https");

const db = require('./dbManager2.js');
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
  console.log('in post /login')
  console.log(data);
  const { token, loginAttemptType } = data;
  loginTokenValidation.verifyToken(token, 'google')
    .then(accountInfo => {
      console.log(accountInfo);
      res.send(accountInfo)
    })
    .catch((err) => {
      if(err==='!registered') res.send('register');
      else res.sendStatus(404)
    })
})

// app.post('/readone', (req, res) => {
//   const query = req.body;
//   // return new Promise((resolve, reject) => {
//     db.findOne("userdata", "accounts", query)
//     .then( data  => res.send('0'))
//     .catch((err) => { 
//       if(err.response.status== 409) res.send('0');
//       else res.sendStatus(401);
//     });
// })

app.post('/accountdata', (req, res) => {
  const dataToSet = req.body;
  console.log('in /accountdata');
  console.log(dataToSet);
    db.updateOne('userdata', 'accounts', { _id: dataToSet.oid }, { $set: dataToSet.toWrite })
      .then(response => res.sendStatus(200))
      .catch((err) => {
        // console.log(err);
        res.sendStatus(404)
      })
  // })
})

app.post('/register', (req, res) => {
  const data = req.body;
  console.log('in register');
  console.log(data);
  db.writeOne('userdata', 'accounts', data)
  .then( data => {
    console.log(data);
    res.send(data);
  })
  .catch((err) => {
    console.log(err)
    res.sendStatus(404)
  });
})

app.get('/accountdata', (req, res) => {
  const { userOid, toGrab } = req.query;

  const projection = {};
  for(const item of toGrab) projection[item] = 1;
  console.log('in /accountdata: oid and tograb' + userOid + ' ' + toGrab);
  db.findOne("userdata", "accounts", { _id: userOid }, projection)
    .then(({ data }) => {
      console.log(data);
      res.send(data)
    })
    .catch((err) => {console.log(err); res.sendStatus(404)});
})

app.get('/exists', (req, res) => {
  const filter = req.query;
  // const filter = JSON.stringify(req.query);
  db.findOne("userdata", "accounts", filter, projection)
    .then(({ data }) => res.send('1'))
    .catch((err) => { res.sendStatus('0'); });

    // if(err.response.status == 404) res.send('0')
    // else {
    //   res.sendStatus(401)
    // }
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


server.listen(port, "0.0.0.0", async () => {
  await db.connectDB();
  console.log("Public Account API Listening to: " + port);
  // localApp.listen(localApiPort, () => {
    // console.log("Local API Listening to: " + localApiPort);
  // });
});

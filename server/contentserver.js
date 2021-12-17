const cors = require("cors");
const express = require("express");
const axios = require('axios');
const db = require('./dbManager2.js');
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

app.post('/content', async (req, res) => {
  const data = req.body;
  const { collection, content, todoListId, useroid } = data;
  const { year, month, day } = content.date;
  const $set = {};

  if(todoListId) {
    $set['todos'] = content.todos;
    db.updateOne("content", collection, { _id: todoListId }, { $set }, { upsert: false })
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(401));
  } else {
    const inserted_id = 
      await db.writeOne("content", collection, content)
          .catch((e) => { res.sendStatus(401); return; });
    
    
    $set[`todoIds.${year}.${Number(month)}.${Number(day)}`] = inserted_id;

    db.updateOne("userdata", "accounts", { _id: useroid }, { $set }, { upsert: true })
      .then((_id) => {
        res.send(inserted_id);
      })
      .catch((e) => {
        res.sendStatus(404);
      });
  }
  
})

app.get('/content', (req, res) => {
  const { collection, contentoid, toGrab } = req.query;
  const projection = {};
  if(toGrab) for(const item of toGrab) projection[item] = 1;
  db.findOne('content', collection, { _id: contentoid }, projection)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.sendStatus(404));
})


app.listen(port, "0.0.0.0", async () => {
  await db.connectDB();
  dbManager = axios.create({
    withCredentials: false,
    baseURL: dbManagerUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 0,
  });
});

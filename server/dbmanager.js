const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
// const md5 = require('crypto-js/md5');
const app = express();

const db = {};
const uri = "mongodb+srv://minjun:4e@!fHNQCuG!VbG@cluster0.5qorl.mongodb.net/test";
const mongodb = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
	
const port = 1111;

app.use(express.json({ limit: "11mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/test", ((req, res, next) => {
  console.log("test http connection");
  console.log(req.query.fuck);
  res.send("response");
}));

app.post("/writeone",((req, res, next) => {
  const data = req.body;
	const dbname = data.dbname;
	const collection = data.collection; 
	const toWrite = data.toWrite;
	if(toWrite._id) toWrite._id = ObjectId(toWrite._id);
	if(data)
	db[dbname]
		.collection(collection)
		.insertOne({...toWrite})
		.then((result) => {
			// console.log('inserted oid: ' + result.insertedId);
			res.send(result.insertedId);
			// console.log("successfully inserted account info into database")
		})
		.catch(err => res.sendStatus(404));
}));

app.get("/readone",((req, res, next) => {
	const data = req.query;
	const dbname = data.dbname;
	const collection = data.collection;
	// console.log(typeof data.filter);
	const filter = JSON.parse(data.filter);
	if(filter._id) filter._id = ObjectId(filter._id); 

	const toGrab = {};
  if (data.toGrab) {
    for (let item of data.toGrab) {
      toGrab[`${item}`] = 1;
    }
  }
	// console.log(filter);
	// console.log(toGrab);
	db[dbname].collection(collection).findOne(filter, {projection: toGrab})
	.then(result => {
		// console.log(result) 
		if(result) res.send(result)
		else res.sendStatus(404);
	})
	.catch(err => {
		// console.log(err);
		res.sendStatus(409)})
	// , (err, accountData) => {
	// db[dbname].collection(collection)
	// .findOne(filter, { todolist: { $eleMatch: data.toGrab[0] }, (err, accountData) => {
		// 	if(err) {
		// 		res.sendStatus(404);
		// 		console.log(err);
		// 	}
		// 	else {
		// 		if(accountData) {
    //       console.log(accountData)
    //       res.send(accountData);
    //     }
		// 		else res.sendStatus(409)
		// 	}
		// });
}));

app.post("/updateone",((req, res, next) => {
	const data = req.body;
	const dbname = data.dbname;
	const collection = data.collection;
	const toSet = data.toSet;
	// console.log(typeof data.filter);
	// console.log(data.filter);
	// const filter = JSON.parse(data.filter);
	const filter = data.filter;
	if(filter._id) filter._id = ObjectId(filter._id); 
	// console.log(filter);
	db[dbname].collection(collection)
	.updateOne(filter, { $set: toSet })
	.then((result) => {
		res.sendStatus(200);
	})
	.catch((err) => {
		// console.log(err)
		res.sendStatus(404)
	});
}));


//----------------------From IBM internship----------------//

const express = require('express');
const db = require('./dbManager.js');
const app = express();

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Expose-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '5mb' }));
app.use((req, res, next) => { res.set(headers); next(); })

// const port = process.env.PORT || 8080;
const port = 8080;

app.get("/user/email", async (req, res) => {
  const email = req.query.email;
  const userInfo =
    await db.findOne("user", "info", { email })
      .catch((e) => {
        console.log(e)
        res.sendStatus(404);
      });
  res.send(userInfo);
});

app.get("/test", async (req, res) => {
  res.send("yes");
})


//date, start time, title
//@param date : format => 2021-12-10T13:00
app.post("/schedule", async (req, res) => {
  let { email, startDate, title, memo, endDate } = req.body;
  if (email === undefined || email === null) email = "test_user"
  // console.log(req.body);
  const [year, month, day, time] = startDate.split(/[-T]/);
  const _id =
    await db.writeOne("user", "schedule", {
      title,
      memo,
      startDate,
      endDate: endDate ? endDate : startDate,
      email,
    })
      .catch((e) => {
        console.log(e);
        res.sendStatus(404);
      });

  const $set = {};
  $set[`scheduleIds.${year}.${month}.${day}.${time}`] = _id;

  db.updateOne("user", "info", { email }, { $set }, { upsert: true })
    .then(() => {
      console.log("insert complete! " + _id);
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(404);
    });
});

app.get("/schedule", async (req, res) => { //
  // const data;
  let { email, date, searchmode } = req.query;
  console.log(req.query);
  if (email === undefined || email === null) email = "test_user"
  if (date === undefined || date === null) {
    res.sendStatus(401);
    return;
  }
  // const [year, month, day, time] = date.split(/[-T]/);
  const [year, month, day] = date.split(/[-T]/);
  const projection = {};
  if (searchmode == 'month') {
    projection[`scheduleIds.${year}.${month}`] = 1;
  } else if (searchmode == 'day') {
    projection[`scheduleIds.${year}.${month}.${day}`] = 1;
  } else { // searchmode == time
    // search with specific time??? 
    //temp
    res.sendStatus(404);
    return;
  }

  const data =
    (await db.findOne("user", "info", { email }, { projection })
      .catch((e) => {
        console.log(e);
        res.sendStatus(404);
        return;
      })).scheduleIds;
  console.log(data);

  const searchFilters = []; //to search scheduleIds

  if (searchmode == 'month') {
    const days = data[year][month];
    for (const [key, obj] of Object.entries(days)) {
      const scheduleIds = Object.values(obj);
      for (const schedule_id of Object.values(obj)) searchFilters.push({ _id: schedule_id })
      console.log(scheduleIds);
      console.log('---------');
    }
  } else if (searchmode == 'day') {
    for (const schedule_id of Object.values(data[year][month][day]))
      searchFilters.push({ _id: schedule_id })
  }

  db.findAll("user", "schedule", searchFilters)
    .then((result) => {
      console.log('result!!!!');
      console.log(result);
      res.send(result);
      return;
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(401)
    });
})

//-------------------Local function for test------------//

const getTest = async (email) => {
  const data = await db.findOne("user", "info", { email })
    .catch((e) => {
      console.log(e)
      res.sendStatus(404);
    });
  console.log(data);
}

app.listen(port, '0.0.0.0', async () => {
  await db.connectDB();
  getTest("ibm@intern.com");
  getTest("abc@email.com");
});

app.listen(port, "0.0.0.0", ()=>{ 
	console.log("started db server");
	mongodb.connect(function(err) {
		if(!err) console.log("mongodb connected");
		else console.log(err);
		db["userdata"] = mongodb.db("userdata");
		db["content"] = mongodb.db("content");
	})
});
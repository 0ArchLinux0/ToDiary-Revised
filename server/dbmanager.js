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
			console.log('inserted oid: ' + result.insertedId);
			res.send(result.insertedId);
			console.log("successfully inserted account info into database")
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
	console.log(filter);
	console.log(toGrab);
	db[dbname].collection(collection).findOne(filter, {projection: toGrab})
	.then(result => res.send(result))
	.catch(err => res.sendStatus(409))
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
	console.log(typeof data.filter);
	console.log(data.filter);
	// const filter = JSON.parse(data.filter);
	const filter = data.filter;
	if(filter._id) filter._id = ObjectId(filter._id); 
	console.log(filter);
	db[dbname].collection(collection)
	.updateOne(filter, { $set: toSet })
	.then((result) => {
		res.sendStatus(200);
	})
	.catch((err) => {
		console.log(err)
		res.sendStatus(404)
	});
}));

app.listen(port, "0.0.0.0", ()=>{ 
	console.log("started db server");
	mongodb.connect(function(err) {
		if(!err) console.log("mongodb connected");
		else console.log(err);
		db["userdata"] = mongodb.db("userdata");
		db["content"] = mongodb.db("content");
	})
});
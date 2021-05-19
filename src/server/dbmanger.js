const express = require("express");
const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectId;
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
	db[dbname]
		.collection(collection)
		.insertOne({...toWrite})
		.then((result) => {
			res.send(result.insertedId);
			console.log("successfully inserted account info into database")
		})
		.catch(err => res.sendStatus(404));
}));

app.get("/exists",((req, res, next) => {
	const data = req.query;
	const dbname = data.dbname;
	const collection = data.collection;
	const filter = data.filter;
	console.log(filter);
	db[dbname].collection(collection).findOne(filter, (err, accountData) => {
			if(err) res.sendStatus(404);
			else {
				if(accountData) res.send(accountData);
				else res.sendStatus(409)
			}
		});
}));

app.listen(port, "0.0.0.0", ()=>{ 
	console.log("started db server");
	mongodb.connect(function(err) {
		if(!err) console.log("mongodb connected");
		else console.log(err);
		db["userdata"] = mongodb.db("userdata");
	})
});
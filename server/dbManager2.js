const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
const db = {};


const uri = 'mongodb+srv://minjun:4e@!fHNQCuG!VbG@cluster0.5qorl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

if (!uri) console.log("MONGODB CONNECTION STRING NOT DEFINED");

const mongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// disable for debugging
// if (!process.env.DEBUG) console.log = function () { };

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoClient.connect(async function (err) {
      if (err) {
        console.log('fail connect: ' + err);
        reject();
        return;
      }
      console.log("MongoDB: Connected successfully to server");
      db["content"] = mongoClient.db("content");
      db["userdata"] = mongoClient.db("userdata");
      // console.log(db["content"]);
      // db["callender"] = await mongoClient.db("callender");
      resolve();
    })
  })
}

const findOne = (dbname, collection, filter, projection) => {
  if(filter._id) filter._id = ObjectId(filter._id);
  return new Promise((resolve, reject) => {
    const proj = projection ? projection : {};
    const dbObj = db[dbname];
    if(isNull(dbObj)) { reject(); return; }
    const collectionObj = dbObj.collection(collection);
    if(isNull(collectionObj)) { reject(); return; }
    collectionObj.findOne(filter, proj)
      .then((result) => {
        // console.log(result);
        resolve(result);
      })
      .catch((e) => {
        console.log(e);
        reject();
      });
  })
}

const findAll = (dbname, collection, queries, projectionParam) => {
  console.log('queries');
  console.log(queries);
  for(const query of queries) if(query._id) query._id = ObjectId(query._id);

  const projection = projectionParam ? projectionParam : {}
  return new Promise((resolve, reject) => {
    db[dbname]
      .collection(collection)
      .find({ $or: queries }, { projection })
      .toArray((err, documents) => {
        if(!err && documents) {
          console.log(documents);
          resolve(documents);
        } else reject();
      })
  })
}


const writeOne = (dbname, collection, data) => {
  return new Promise((resolve, reject) => {
    db[dbname]
      .collection(collection)
      .insertOne({ ...data })
      .then((data) => {
        // console.log(data);
        resolve(data.insertedId.toString());
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  })
}

const updateOne = (dbname, collection, filter, updateQuery, options) => {
  return new Promise((resolve, reject) => {
    const opt = options ? options : { upsert: true };
    if(filter._id) filter._id = ObjectId(filter._id);
    db[dbname]
      .collection(collection)
      .updateOne(filter, updateQuery, opt)
      .then((data) => {
        // resolve(data.insertedId.toString());
        // console.log(data);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  })
}

const isNull = (obj) => obj === undefined || obj === null || (typeof obj === 'string' && obj.length === 0); 

module.exports = {
  connectDB,
  findOne,
  writeOne,
  updateOne,
  findAll
}


const { setInternalBufferSize } = require('bson');
const express = require('express');

//player routes is an instance of the express router
//we use it to define routes
//router will be aded as a middleware and will take control of requests
const playerRoutes= express.Router();

//will help to connect to db
const dbo = require('../db/conn')

//this helps convert the id from string to objectid for the _id
const ObjectId = require('mongodb').ObjectId;

//this section helps list all recorsd
playerRoutes.route('/player').get(function(req, res){
    let db_connect = dbo.getDb('/cubs_database');
    db_connect
        .collection('/players')
        .find({})
        toArray(function(err, result){
            if(err) throw err;
            res.json(result)
        })
})

playerRoutes.route('/player/:id').get(function(req, res){
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect
        .collection('players')
        .findOne(myquery, function(err, result){
            if(err) throw err;
            res.json(result);
        })
})

playerRoutes.route('/player/add').post(function (req, res){
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        average: req.body.average,
    }
    db_connect.collection('players').insertOne(myobj, function(err, result){
        if(err) throw err;
        res.json(result)
    })
})

playerRoutes.route('/player/:id').post(function(req, res){
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)}
    let newValues = {
        $set:{
            name: req.body.name,
            position: req.body.position,
            average: req.body.average,
        }
    }
    db_connect
        .collection('players')
        .updateOne(myquery, newValues, function(err, result){
            if(err) throw err;
            console.log('updated 1 document');
            res.json(result)
        })
})

// This section will help you delete a record
playerRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("players").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
   });

module.exports = playerRoutes;
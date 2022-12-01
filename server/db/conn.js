const { MongoClient } = require('mongodb');
const Db = process.env.DATABASE_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var _db;

module.exports = {
    connectToServer: function(callback){
        client.connect(function(err, db){
            if(db){
                _db = db.db('players');
                console.log('Successfully connnected to MongoDB!')
            }
            return callback(err)
        });
    },
    getDb: function(){
        return _db;
    }
}
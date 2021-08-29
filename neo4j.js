// neo4j-driver.js
const neo4j = require('neo4j-driver')
const db = 'bolt://localhost' // http://localhost:7474 bolt://localhost:7687
const dbuser = 'neo4j'
const dbpassword = 'syz0615'
const driver = neo4j.driver(db, neo4j.auth.basic(dbuser, dbpassword),{
  maxTransactionRetryTime: 30000
})

function query_(label, callback) {
    var session = driver.session()
    var res = []
    session.run('Match (m:knowledge{name:$nameParam})-[r:`拥有`]->(n:knowledge) RETURN n.name as name', {
      nameParam: label
    }).subscribe({
        onKeys: keys => {
        },
        onNext: record => {
        //   console.log(record.get('name'))
          res.push(record.get('name'))
        },
        onCompleted: () => {
          session.close() 
        //   return res;
          callback(null, res); 
        },
        onError: error => {
          console.log(error)
        }
      })
      driver.close()
};

exports.query_ = query_;



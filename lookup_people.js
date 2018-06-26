const firstname = process.argv.slice(2);
const pg = require("pg");
const settings = require("./settings"); // settings.json
var text = "SELECT * FROM famous_people where first_name = $1";
values = firstname;
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(text, values ,(err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
   // console.log(result.rows); //output: 1
    for(var item in result.rows){
      console.log(result.rows[item].first_name + ' ,DOB: ' + result.rows[item].birthdate);
    }
    client.end();
  });
});

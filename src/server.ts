import express from "express";
import { insertDb } from "./db_action/db_insert";
import { createTableIfNotExists } from "./db_action/db_createTable";
import { selectAll } from "./db_action/db_select";
import { deleteAll } from "./db_action/db_delete";
import bodyParser from "body-parser";

createTableIfNotExists();

const app = express();

app.use(bodyParser.json());

app.get('/', (req,res) => res.send('FC5Y Entry Task 2'));

app.get('/timstamp', (req, res) => res.send({"timestamp": Math.floor(Date.now() / 1000)}));

app.post('/registrations', (req, res) => {
  if (req.headers.authorization == process.env.AUTH) {
    const insert = insertDb({
      table: process.env.TABLE,
      data: {
        username: req.body.username,
        displayed_name: req.body.displayed_name,
        password: req.body.password
      }
    });
    insert.then((dt) => res.send(dt));
  } else {
    res.send({"error": 1});
  }
})

app.get('/registrations', (req, res) => {
  if (req.headers.authorization == process.env.AUTH) {
    const selectAllFromTable = selectAll(process.env.TABLE);
    selectAllFromTable.then((dt) => res.send(dt));
  } else {
    res.send({"error": 1});
  }
})

app.delete('/reset_database', (req, res) => {
  if (req.headers.authorization == process.env.AUTH) {
    const resetDb = deleteAll(process.env.TABLE);
    resetDb.then((dt) => res.send(dt));
  } else {
    res.send({"error": 1});
  }
})

app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running on ${process.env.PORT}`);
});


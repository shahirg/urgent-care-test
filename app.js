// import { createAccount } from "./modules/auth.js";
const express = require("express");
var cors = require("cors");
const app = express();
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const port = 3000;
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "urgentcare.c1ssetuk2fby.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Urgent_6",
  port: "3306",
  database: "Urgent_Care",
});
connection.connect(function (err) {
  if (err) {
    console.error("connection failed" + err.stack);
    return;
  }
  console.log("Connected to Database");
});
app.get("/", (req, res) => {
  res.sendFile("static/index.html");
});

app.post("/createaccount", (req, res) => {
  let user = { email: req.body.email, password: req.body.password };
  console.log(user);
  createAccount(user);
});

app.get("/patients", (req, res) => {
  let sql = `SELECT * FROM Patient`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error.message);
    }
    console.log(results);
    res.json(results);
  });

  console.log("conn ended");
});

app.get("/test", (req, res) => {
  let sql = `show tables`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error.message);
    }
    console.log(results);
    res.json(results);
  });
});

// get patient with email
app.get("/patients/:uid", (req, res) => {
  let sql = `SELECT * FROM Patient`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error.message);
    }
    console.log(results);
    res.json(results);
  });
});

app.post("/add/patient", (req, res) => {
  let sql = `INSERT INTO Patient (id,name, gender, dob, email, phone, address, insurance_number, username,password)`;
  sql += ` VALUES (${req.query.id},'${req.query.name}','${req.query.gender}','${req.query.dob}','${req.query.email}','${req.query.phone}',`;
  sql += `'${req.query.address}', ${req.query.insurance_number}, '${req.query.username}','${req.query.password}');`;
  console.log(sql);
  //YYMMDDhhmmss
  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
    res.status(200).json(results);
  });
});

app.get("/appointments", (req, res) => {
  let sql = `SELECT * FROM Appointments`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error.message);
    }
    console.log(results);
    res.json(results);
  });
});

app.post("/newappointment", (req, res) => {
  let sql = `INSERT INTO Appointments (date,patient_id,doctor_id)`;
  sql += ` VALUES ('${req.query.date}','${req.query.patient_id}','${req.query.doctor_id}')`;
  console.log(sql);
  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
    res.status(200).json(results);
  });
});

//get doctor appointments
app.get("/appointments/:doctor_id", (req, res) => {
  let sql = `SELECT * FROM Appointments WHERE doctor_id='${req.params.doctor_id}'`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error.message);
    }
    console.log(results);
    res.json(results);
  });
});

//get patient Appointments
app.get("/appointments/:patient_id", (req, res) => {
  let sql = `SELECT * FROM Appointments WHERE doctor_id='${req.params.patient}'`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error.message);
    }
    console.log(results);
    res.json(results);
  });
});

app.get("/doctors", (req, res) => {
  let sql = `SELECT * FROM Doctor`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error.message);
    }
    console.log(results);
    res.json(results);
  });
});

app.get("/doctors/:specialty", (req, res) => {
  let sql = `SELECT * FROM Doctor WHERE speciality='${req.params.specialty}'`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error.message);
    }
    console.log(results);
    res.json(results);
  });
});

app.post("/add/doctor", (req, res) => {
  let sql = `INSERT INTO Doctor (id,name, gender, dob, email, phone, address, speciality, username,password,status)`;
  sql += ` VALUES (${req.query.id},'${req.query.name}','${req.query.gender}','${req.query.dob}','${req.query.email}','${req.query.phone}'`;
  sql += `,'${req.query.address}', '${req.query.speciality}', '${req.query.username}','${req.query.password}','${req.query.status}');`;
  console.log(sql);
  //YYMMDDhhmmss
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error.message);
    }
    console.log(results);
    res.status(200).json(results);
  });
});

app.get("/lab_technicians", (req, res) => {
  let sql = `SELECT * FROM Lab_Technician`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error.message);
    }
    console.log(results);
    res.json(results);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

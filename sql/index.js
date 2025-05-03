
const express = require("express");
const app = express();
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");

let port = 3000;

app.listen(port, () => {
  console.log("App is listening on port", port);
});
app.set("view engine","ejs");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "userdb",
  password: "12345",
});
const methodoverride = require('method-override');
app.use(methodoverride('_method'));
app.use(express.urlencoded({extended:true}));
// Optional: seeding function for test data
const getrandom = () => {
  return [
    faker.number.int({ min: 100, max: 9999 }),
    faker.number.int({ min: 18, max: 30 }),
    faker.person.firstName(),
    faker.internet.email(),
  ];
};

// Use alias in SQL for easier access


app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) AS count FROM users";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      const count = result[0].count;
      console.log("User count:", count);

      res.render("home.ejs",{count});
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Something went wrong.");
  }
});
app.get("/user",(req,res)=>{
  let q="SELECT * FROM users";

  try{
    
    connection.query(q,(err,result)=>{
      let users=result;

res.render("show.ejs",{users})
    });
  }
  catch{
    console.error("something went wrong");
    res.send("some error occured!");
  }
});
app.get("/user/:rollno/edit",(req,res)=>{
  let {rollno}=req.params;
  let q=`SELECT * FROM users WHERE rollno=${rollno}`;
  try{
    connection.query(q,(err,result)=>{
console.log(result);
let user=result[0];
res.render("edit.ejs",{user});
    });
  }
  catch{
    console.error("something went wrong");
    res.send("some error occured!");
  }
});
app.patch("/user/:rollno", (req, res) => {
  let { name, age, rollno } = req.body;

  // Step 1: Check if rollno exists
  let q1 = `SELECT * FROM users WHERE rollno = ?`;
  connection.query(q1, [rollno], (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).send("Server error");
    }

    // ❗ Check if user is not found
    if (result.length === 0) {
      console.log("No user found with rollno:", rollno);
      return res.send("Incorrect roll number. User not found.");
    }

    // Step 2: Now it's safe to access result[0]
    let user = result[0];
    if (parseInt(rollno) != user.rollno) {
      console.log("Roll number mismatch");
      return res.send("Roll number mismatch");
    }

    // Step 3: Update
    let q2 = `UPDATE users SET name = ?, age = ? WHERE rollno = ?`;
    connection.query(q2, [name, age, rollno], (err, updateResult) => {
      if (err) {
        console.error("Update error:", err);
        return res.status(500).send("Update failed");
      }

      res.redirect("/user");
    });
  });
});
app.get("/user/add",(req,res)=>{
  res.render("new.ejs");
});
app.post("/user",(req,res)=>{

let {rollno,age,name,email}=req.body;


let q=`INSERT INTO users(rollno,age,name,email) VALUES (?,?,?,?)`;
  connection.query(q,[rollno,age,name,email],(err,result)=>{
if(err) 
  {throw err;}
console.log(result);
res.redirect("/user");
  });

});
app.delete("/user/:rollno",(req,res)=>{
  let {rollno}=req.params;
  let q=`DELETE FROM users WHERE rollno=${rollno}`;
  connection.query(q,(err,result)=>{
if (err){
  throw err;
}
console.log(result);
res.redirect("/user");
  });
});
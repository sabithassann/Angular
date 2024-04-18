const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Import the cors module

const server = express();
server.use(bodyParser.json());
server.use(cors());


//This section for routing
// server.get("/",(req,res)=>{
//     res.send("product.component.html")
// })



//establish the database connection
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"inv_mang_sys"
});
db.connect(function(error){

    if(error){
        console.log(" Error Connecting to Database",error.message);
    }
    else{
        console.log("Successfully Connecting to Database");
    }
});


//establish the port
server.listen(8087,function check(error){
    if(error){
        console.log("Error starting server");
    }
    else{
        console.log("Starting server with 8087");
    }
})

//create the products
 server.post("/api/product/add",(req,res)=>{
   let details={
    name:req.body.name,
    price:req.body.price,
    quantity:req.body.quantity
   };
   let sql="insert into product set ?";
   db.query(sql,details,(error)=>{
    if(error){
        res.send({status:false, message:"Product add failed"});
    }
    else{
        res.send({status:true, message:"Product add successfully"});
    }

   });

});


//view the records
server.get("/api/product",(req,res)=>{
    let sql="select * from product";
    db.query(sql,function(error,result){
        if(error){
            console.log("failed to show");
        }
        else{
            res.send({status:true,data:result});
        }
    });
});

//search the records
server.get("/api/product/:id", (req, res) => {
    let id = req.params.id;
    let sql = "SELECT * FROM product WHERE id=?";
    db.query(sql, [id], function(error, result) {
        if (error) {
            console.log("Failed to show the product");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

//update the records
server.put("/api/product/update/:id",(req,res)=>{
    let sql=
    "UPDATE product SET name=?,price=?,quantity=? WHERE id=?";
    let params=[req.body.name,req.body.price,req.body.quantity, req.params.id];
    db.query(sql,params,(error,result)=>{
        if(error){
            res.send({status:false,message:"Product update failed"});

        }
        else{
            res.send({status:true,message:"Product update successfully"});
        }
    });
});


//delete the products
server.delete("/api/product/delete/:id", (req, res) => {
    let sql = "DELETE FROM product WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Product Deleted Failed" });
      } else {
        res.send({ status: true, message: "Product Deleted successfully" });
      }
    });
  });




// server.delete("/api/product/delete/:id",(res,req)=>{
//     // console.log("ID Parameter:", req.params.id);
//     let sql="DELETE FROM product WHERE id=?";
//     let params=[req.params.id];
//     db.query(sql,params,(error)=>{
//         if(error){
//             res.send({status:false,message:"Product delete failed"});
//         }
//         else{
//             res.send({status:true,message:"Product delete successfully"});
//         }
//     });
// });















// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(3000)
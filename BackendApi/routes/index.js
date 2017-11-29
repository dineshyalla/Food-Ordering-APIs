var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express is here! your express server is up" });
});

module.exports = router;

//Api to create User
router.post("/createUser", function(req, res, next) {
  try {
    req.getConnection(function(err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        return next(ex);
      } else {
        var insertSql = "INSERT INTO User SET ?";
        var insertValues = {
          User_Id: req.param("userId"),
          Email: req.param("email"),
          Password: req.param("password"),
          Name: req.param("name"),
          Street_Address: req.param("streetAddress"),
          Zip: req.param("zip"),
          State: req.param("state"),
          Longitude: req.param("longitude"),
          Payment_Id: req.param("paymentId"),
          Created_Date: req.param("createdAt"),
          Updated_Date: req.param("updatedAt"),
          User_Type: req.param("userType")
        };

        var query = conn.query(insertSql, insertValues, function(err, result) {
          if (err) {
            res.json({ dinesh: "failure" });
            return next(err);
          }
          console.log(result);
          res.json({ dinesh: "success" });
        });
      } // end of else
    }); // end of getConnection
  } catch (ex) {
    console.error("Internal error:" + ex);
    return next(ex);
  }
}); //end of Post API

//Api to authenticate user

router.get("/userAuthenticate", function(req, res, next) {
  try {
    req.getConnection(function(err, conn) {
      if (err) {
        console.error("SQL Connection error:" + err);
        return next(err);
      } else {
        if (req.param("userId") == "undefined" || req.param("userId") == null) {
          conn.query("SELECT * from User", function(err, rows, fields) {
            if (err) {
              console.error("SQL error:" + err);
              return next(err);
            }
            var resCard = [];
            for (var items in rows) {
              var itemObj = rows[items];
              resCard.push(itemObj);
            }
            res.json(resCard);
          });
        } else {
          console.log("recieved userId:" + req.param("userId"));
          var userId = req.param("userId");
          var password = req.param("password");
          conn.query(
            "SELECT Name,Street_Address,State,Zip from User where User_Id = ? AND Password = ?",
            [userId, password],
            function(err, rows, fields) {
              if (err) {
                console.error("SQL error:" + err);
                return next(err);
              }
              var resCard = [];
              for (var items in rows) {
                var itemObj = rows[items];
                resCard.push(itemObj);
              }
              res.json(resCard);
            }
          );
        } //end of null else
      } //end of try else
    }); // end of getConnection
  } catch (ex) {
    console.error("Internal erro:" + ex);
    return next(ex);
  }
});

//Create Menu Api
router.post("/createMenu", function(req, res, next) {
  try {
    //   console.log("checking if map exists" + req.param());
    //   console.log(JSON.stringify(req.param());
    //   if (
    //     req.param("empName") == "undefined" ||
    //     req.param("empName") == null ||
    //     req.param("roleId") == "undefined" ||
    //     req.param("roleId") == null
    //   ) {
    //     console.log("Emploe  details are  null");
    //     res.render("EmployeeDetails are null");
    //   } else {
    req.getConnection(function(err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        return next(err);
      } else {
        var insertSql = "INSERT INTO Menu SET ?";
        var insertValues = {
          Dish_Id: req.param("dishId"),
          Cuisine_Type: req.param("cuisineType"),
          Dish_Name: req.param("dishName"),
          Dish_Description: req.param("dishDescription"),
          Spice_Level: req.param("spiceLevel"),
          Vegan_Type: req.param("veganType"),
          Price: req.param("price"),
          Chef_Id: req.param("chefId"),
          isActive: req.param("isAct")
        };
        var query = conn.query(insertSql, insertValues, function(err, result) {
          if (err) {
            res.json({ dinesh: "failure" });
            return next(err);
          }
          console.log(result);
          res.json({ dinesh: "success" });
        });
      }
    });
  } catch (ex) {
    // end of try
    console.error("Internal error:" + ex);
    return next(ex);
  }
});

// Create Order API
router.post("/createOrder", function(req, res, next) {
  try {
    req.getConnection(function(err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        return next(ex);
      } else {
        var insertSql = "INSERT INTO OrderT SET ?";
        var insertValues = {
          Order_Id: req.param("orderId"),
          User_Id: req.param("userId"),
          Tax: req.param("tax"),
          Discount: req.param("discount"),
          Total_Price: req.param("totalPrice"),
          Chef_Id: req.param("chefId"),
          Order_Date: req.param("date")
        };

        var query = conn.query(insertSql, insertValues, function(err, result) {
          if (err) {
            res.json({ dinesh: "failure" });
            return next(err);
          }
          console.log(result);
          res.json({ dinesh: "success" });
        });
      } // end of else
    }); // end of getConnection
  } catch (ex) {
    console.error("Internal error:" + ex);
    return next(ex);
  }
}); //end of Post API

// get orders API
router.get("/getOrder", function(req, res, next) {
  try {
    req.getConnection(function(err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        return next(err);
      } else {
        if (req.param("userId") == "undefined" || req.param("userId") == null) {
          console.log("Return all orders");
          conn.query("select * from OrderT", function(err, rows, fields) {
            if (err) {
              console.error("SQL error: ", err);
              return next(err);
            }
            var resOrder = [];
            for (var items in rows) {
              var itemObj = rows[items];
              resOrder.push(itemObj);
            }
            res.json(resOrder);
          });
        } else {
          console.log("entered else");
          conn.query(
            "select Order_Id,User_Id,Tax,Discount,Total_Price,Chef_Id,Order_Date from OrderT where User_Id = ?",
            [req.param("userId")],
            function(err, rows, fields) {
              if (err) {
                console.error("SQL error: ", err);
                return next(err);
              }
              var resOrder = [];
              for (var items in rows) {
                var itemObj = rows[items];
                resOrder.push(itemObj);
              }
              res.json(resOrder);
            }
          );
        } //end of null else
      }
    });
  } catch (ex) {
    console.error("Internal error:" + ex);
    return next(ex);
  }
});

//API for Getting Distinct chief Ids
router.get("/Chef", function(req, res, next) {
  try {
    req.getConnection(function(err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        return next(err);
      } else {
        console.log("entered else");
        conn.query("select distinct (Chef_Id) from Menu", function(
          err,
          rows,
          fields
        ) {
          if (err) {
            console.error("SQL error: ", err);
            return next(err);
          }
          var resChef = [];
          for (var chefs in rows) {
            var resObj = rows[chefs];
            resChef.push(resObj);
          }
          res.json(resChef);
        });
      } // end of try else
    });
  } catch (ex) {
    console.error("Internal error:" + ex);
    return next(ex);
  }
});

//API to Menu for specific chief based on Cuisine
router.get("/Chef/Cuisine/Menu", function(req, res, next) {
  try {
    req.getConnection(function(err, conn) {
      if (err) {
        console.error("SQL Connection error: ", err);
        return next(err);
      } else {
        if (
          req.param("cuisineType") == "undefined" ||
          req.param("cuisineType") == null
        ) {
          console.log("entered if");
          conn.query(
            "select Dish_Name,Cuisine_Type,Dish_Description,Spice_Level,Price from Menu",
            function(err, rows, fields) {
              if (err) {
                console.error("SQL error: ", err);
                return next(err);
              }
              var resMenu = [];
              for (var menu in rows) {
                var resObj = rows[menu];
                console.log("loop is: " + resObj);
                resMenu.push(resObj);
              }
              res.json(resMenu);
            }
          );
        } else {
          console.log("entered else");
          var chefId = req.param("chefId");
          var cuisineType = req.param("cuisineType");
          conn.query(
            "SELECT Dish_Name,Cuisine_Type,Dish_Description,Spice_Level,Price FROM Chief_DB.Menu where Chef_Id = ? AND Cuisine_Type = ?",
            [chefId, cuisineType],
            function(err, rows, fields) {
              if (err) {
                console.error("SQL error: ", err);
                return next(err);
              }
              var resMenu = [];
              for (var menu in rows) {
                var resObj = rows[menu];
                resMenu.push(resObj);
              }
              res.json(resMenu);
            }
          );
        } //end of null else
      } // end of try else
    });
  } catch (ex) {
    console.error("Internal error:" + ex);
    return next(ex);
  }
});

//API to save Payment Details
router.post("/savePayment", function(req, res, next) {
  try {
    req.getConnection(function(err, conn) {
      if (err) {
        console.error("SQl Connection error:", err);
        return next(err);
      } else {
        var insertSql = "INSERT INTO PaymentCard SET ?";
        var insertValues = {
          Pay_Id: req.param("payId"),
          CC_Name: req.param("ccName"),
          CC_No: req.param("ccNo"),
          Created_At: req.param("createdAt"),
          Updated_At: req.param("updatedAt"),
          User_Id: req.param("userId")
        };
        var query = conn.query(insertSql, insertValues, function(err, result) {
          if (err) {
            res.json({ dinesh: "failure" });
            return next(err);
          }
          console.log(result);
          res.json({ dinesh: "success" });
        });
      } // end of else
    }); // end of getConnection
  } catch (ex) {
    console.error("Internal error:" + ex);
    return next(ex);
  }
});

// API to get Card Details
router.get("/getCardDetails", function(req, res, next) {
  try {
    req.getConnection(function(err, conn) {
      if (err) {
        console.error("SQL Connection error:" + err);
        return next(err);
      } else {
        if (req.param("userId") == "undefined" || req.param("userId") == null) {
          conn.query("SELECT * from PaymentCard", function(err, rows, fields) {
            if (err) {
              console.error("SQL error:" + err);
              return next(err);
            }
            var resCard = [];
            for (var items in rows) {
              var itemObj = rows[items];
              resCard.push(itemObj);
            }
            res.json(resCard);
          });
        } else {
          console.log("recieved userId:" + req.param("userId"));
          conn.query(
            "SELECT CC_Name,CC_No from PaymentCard where User_Id = ?",
            [req.param("userId")],
            function(err, rows, fields) {
              if (err) {
                console.error("SQL error:" + err);
                return next(err);
              }
              var resCard = [];
              for (var items in rows) {
                var itemObj = rows[items];
                resCard.push(itemObj);
              }
              res.json(resCard);
            }
          );
        } //end of null else
      } //end of try else
    }); // end of getConnection
  } catch (ex) {
    console.error("Internal erro:" + ex);
    return next(ex);
  }
});

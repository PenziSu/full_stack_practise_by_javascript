const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models/student");
const methodOverride = require("method-override");

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


mongoose.connect("mongodb://localhost:27017/studentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to mongoDB.");
}).catch((e) => {
    console.log("Connection failed.");
    console.log(e);
})

// 查詢清單API
app.get("/students", async (req, res) => {
    try {
        data = await Student.find();
        // res.render("students.ejs", {data});
        res.send(data);
    } catch (error) {
        res.status(404);
        res.send(error);
    }

});

// 新增資料 API
app.post("/students", (req, res) => {
    console.log("Get student insert request.");
    // 取出資料
    let {
        id,
        name,
        age,
        merit,
        other
    } = req.body;
    console.log(req.body);

    // 建立 Student物件
    let newStudent = new Student({
        id,
        name,
        age,
        scholarship: {
            merit,
            other
        }
    });

    // 執行Add
    newStudent.save().then(() => {
        res.send({message: "新增學生資料成功"});
    }).catch((e) => {
        res.status(500);
        res.send({message: "新增學生資料失敗", error: e});
    });

});

// 查詢特定資料 API
app.get("/students/:id", async (req, res) => {
    try {
        let {id} = req.params;
        let data = await Student.findOne({id});
        if (data !== null) {
            res.send(data);
        } else {
            res.status(404);
            res.send({result: "null"});
        }
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send(error);
    }

});

// 修改資料 API PUT
app.put("/students/:id", async (req, res) => {
    try {
        let {
            id,
            name,
            age,
            merit,
            other
        } = req.body;
        console.log({
            id,
            name,
            age,
            merit,
            other
        });
        let d = await Student.findOneAndUpdate({
            id
        }, {
            id,
            name,
            age,
            scholarship: {
                merit,
                other
            }
        }, {
            new: true,
            runValidators: true
        });
        res.send({message: "資料更新成功"});
    } catch (e) {
        res.send({message: "資料更新失敗", errorMsg: e});
    }
});

// class的重點是，將前端傳入的[merit]轉換成儲存格式[scholarship.merit]
class newData {
    constructor() {} // class的建構參數
    setProperty(key, value) {
        if (key !== "merit" && key !== "other") {
            this[key] = value;
        } else {
            this[`scholarship.${key}`] = value;
        }
    }
}

// 修改資料 API PATCH
app.patch("/students/:id", async (req, res) => {
    try {
        let {id} = req.params;
        let newObj = new newData();
        for (let property in req.body) {
            newObj.setProperty(property, req.body[property]);
        }
        console.log(newObj);
        console.log(req.body);
        let d = await Student.findOneAndUpdate({
            id
        }, newObj, {
            new: true,
            runValidators: true
        });
        res.send({message: "資料更新成功"});
    } catch (e) {
        res.send({message: "資料更新失敗", errorMsg: e});
    }
});

// 刪除資料 API DELETE
app.delete("/students/delete/:id", (req, res) => {
    let {id} = req.params;
    Student.deleteOne({id}).then((meg) => {
        console.log(meg);
        console.log(`學號:${id} 刪除成功`);
        res.send({message: `學號:${id} 刪除成功`});
    }).catch((e) => {
        res.status(500);
        res.send({message: `學號:${id} 刪除失敗`});
    });
})

// 刪除全部資料 API
app.delete("/students/delete", (req, res) => {
    Student.deleteMany({}).then((meg) => {
        res.send("全部資料刪除成功");
    }).catch((e) => {
        res.send("全部資料刪除失敗");
        console.log(e);
    });
});

// 網頁伺服器
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})

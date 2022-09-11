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

// 首頁
app.get("/", (req, res) => {
    res.send("This is homepage.")
});

// 查詢清單
app.get("/students", async (req, res) => {
    try {
        data = await Student.find();
        res.render("students.ejs", {data});
    } catch (error) {
        res.status(404);
        res.send(error);
    }

});

// 新增資料網頁
app.get("/students/insert", (req, res) => {
    res.render("studentInsert.ejs");
    // res.send("Hello");
})

// 新增資料
app.post("/students/insert", (req, res) => {
    console.log("Get student insert request.");
    let {
        id,
        name,
        age,
        merit,
        other
    } = req.body;
    console.log(req.body);

    let newStudent = new Student({
        id,
        name,
        age,
        scholarship: {
            merit,
            other
        }
    });

    newStudent.save().then(() => {
        console.log("Student Accepted.");
        res.render("accept.ejs");
    }).catch((e) => {
        console.log("Student not Accepted.");
        console.log(e);
        res.render("reject.ejs");
    });

});

// 查詢資料
app.get("/students/:id", async (req, res) => {
    try {
        let {id} = req.params;
        let data = await Student.findOne({id});
        if (data !== null) {
            res.render("studentPage.ejs", {data});
        } else {
            res.status(404);
            res.send("學號輸入錯誤，請輸入正確學號。");
        }
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send(error);
    }

});

// 修改資料
app.get("/students/edit/:id", async (req, res) => {
    try {
        let {id} = req.params;
        let data = await Student.findOne({id});
        if (data !== null) {
            res.render("studentEdit.ejs", {data});
        } else {
            res.status(404);
            res.send("學號輸入錯誤，請輸入正確學號。");
        }
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send(error);
    }

});

app.put("/students/edit/:id", async (req, res) => {
    console.log(req.body);

    let {
        id,
        name,
        age,
        merit,
        other
    } = req.body;

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
    res.redirect(`/students/${id}`);
});

app.get("/students/delete/:id", async (req, res) => {
    let {id} = req.params;
    let data = await Student.findOne({id});
    if (data !== null) {
        res.render("studentDel.ejs", {data});
    } else {
        res.status(404);
        res.send("學號輸入錯誤，請輸入正確學號。");
    }
});

app.delete("/students/delete/:id", (req, res) => {
    let {id} = req.params;
    Student.deleteOne({id}).then((meg) => {
        console.log(meg);
        console.log(`學號:${id} 刪除成功`);
        res.redirect("/students");
    }).catch((e) => {
        res.status(500);
        res.send(`學號:${id} 刪除失敗`);
    });
})

// 網頁伺服器
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})

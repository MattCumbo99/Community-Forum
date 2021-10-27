const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:4200" // Website url
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db = require("./models");
// Connect to the database
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> {
        console.log("Database connected.");
    })
    .catch(()=> {
        console.log("Cannot connect to the database.", err);
        process.exit();
    });

// All database routers
require("./routers/user.router")(app);
require("./routers/ban.router")(app);
require("./routers/report.router")(app);

app.listen(9090, ()=> {
    console.log("Server running on port 9090.");
    console.log("Runtime: "+new Date().toLocaleTimeString());
});

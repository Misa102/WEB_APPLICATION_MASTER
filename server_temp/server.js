const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./app/config/database.config");
const authRoutes = require("./app/routes/auth.routes.js");

const app = express();

var corsOptions = {
    origin: "http://localhost:5000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/test", authRoutes);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to quote application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Authority = db.authority;

mongoose
    .connect(
        `mongodb+srv://admin:webm1@cluster0.7mbewn7.mongodb.net/quote_app?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        (async () => {
            let user = await findUser("user");
            let admin = await findUser("admin");
            if (user === null && admin === null) {
                const authUser = new Authority({ name: "user" });
                authUser.save();
                const authAdmin = new Authority({ name: "admin" });
                authAdmin.save();
            }
        })();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

async function findUser(name) {
    return await Authority.findOne({ name: name });
}

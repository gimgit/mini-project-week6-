const mongoose = require("mongoose");

const connect = () => {
    mongoose
    .connect("mongodb://localhost:27017/mini-project", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(err => console.log(err));
};

mongoose.connection.on("Error", err => {
    console.error("DB connection err", err);
});

module.exports = connect;
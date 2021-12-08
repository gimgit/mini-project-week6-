const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect('mongodb://localhost:27017/todo99', {
        useNewUrlParser: true,
        ignoreUndefined: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => {
        console.error(err);
    });
};

// connect
mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연걸 실패:', err);
});

console.log('MongoDB ON!');
module.exports = connect;
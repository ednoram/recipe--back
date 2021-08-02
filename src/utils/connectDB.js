const { connect } = require("mongoose");

const { DB_CONNECTION } = require("@config");

const connectDB = () => {
  connect(DB_CONNECTION, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err.message));
};

module.exports = connectDB;

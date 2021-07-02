const { connect } = require("mongoose");

const { DB_CONNECTION } = require("../constants");

const connectDB = () => {
  connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err.message));
};

module.exports = connectDB;

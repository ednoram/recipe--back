const { connect } = require("mongoose");

const connectDB = () => {
  connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err.message));
};

module.exports = connectDB;

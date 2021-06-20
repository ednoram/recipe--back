const { connect } = require("mongoose");

const URI = process.env.DB_CONNECTION || "";

const connectDB = () => {
  connect(URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err.message));
};

module.exports = connectDB;

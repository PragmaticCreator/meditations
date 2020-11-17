const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

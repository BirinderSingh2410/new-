const mongoose = require("mongoose"); //importing mongooose package

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //mongoose connecting through url
      useUnifiedTopology: true,
    });
    console.log("mongodb connected:" + conn.connection.host);
  } catch (error) {
    console.log("Error:" + error.message);
    process.exit();
  }
};

module.exports = connectDB;

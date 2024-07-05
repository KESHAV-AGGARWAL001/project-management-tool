import { connect } from "mongoose";
async function DbConnection() {
  try {
    const dbConnection = await connect(process.env.MONGO_URI);
    if (dbConnection) {
      console.log("mongo db connected");
    } else {
      console.log("some error in mongo db connection");
    }
  } catch (error) {
    console.log("some error in mongo db connection");
  }
}

export default DbConnection;

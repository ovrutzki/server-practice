import { connect } from "mongoose";

const uri = "mongodb+srv://eran:7cyk2XiLfilq5GmC@cluster0.lhookqd.mongodb.net/";

const dbName = "myDataBase";

export const connectToDB = async () => {
  try {
    await connect(`${uri}${dbName}`);
    console.log("db connected");
  } catch (err) {
    console.log("error connecting to DB", err);
  }
};

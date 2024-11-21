import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sourceAppId: { type: String, required: true },
  dataPayload: { type: Object, required: true },
  hash: { type: String, required: true },
  previousHash: { type: String, required: true },
});


const Log = mongoose.model('Log', logSchema);

export default Log;
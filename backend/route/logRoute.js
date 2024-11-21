import express from "express";

import Log from "../model/log.js";

import calculateHash from "../utils/hashUtils.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { eventType, timestamp, sourceAppId, dataPayload } = req.body;

    if (!eventType || !timestamp || !sourceAppId || !dataPayload) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const lastLog = await Log.findOne().sort({ _id: -1 });

    const previousHash = lastLog ? lastLog.hash : "0";

    const newLog = new Log({
      eventType,
      timestamp,
      sourceAppId,
      dataPayload,
      previousHash,
      hash: calculateHash({
        eventType,
        timestamp,
        sourceAppId,
        dataPayload,
        previousHash,
      }),
    });

    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    console.error("Error saving log:", error.message);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", async (req, res) => {
  const {
    eventType,
    sourceAppId,
    start,
    end,
    page = 1,
    limit = 10,
  } = req.query;

  const filters = {};

  if (eventType) filters.eventType = eventType;
  if (sourceAppId) filters.sourceAppId = sourceAppId;
  if (start || end) filters.timestamp = {};
  if (start) filters.timestamp.$gte = new Date(start);
  if (end) filters.timestamp.$lte = new Date(end);

  try {
    const total = await Log.countDocuments(filters); 
    const logs = await Log.find(filters)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ timestamp: -1 });

    res.json({ logs, total });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    
    const logs = await Log.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }, 
          count: { $sum: 1 }, 
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(logs); 
  } catch (error) {
    console.error('Error fetching logs for dashboard:', error);
    res.status(500).json({ message: 'Error fetching logs for dashboard' });
  }
});


export default router;

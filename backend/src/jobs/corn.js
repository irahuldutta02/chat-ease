import cron from "cron";
import axios from "axios";
import mongoose from "mongoose";
import { ENV } from "../lib/env.js";

const job = new cron.CronJob("* * * * * *", async function () {
  try {
    const res = await axios.get(ENV.CLIENT_URL + "/api/check-health");
    if (res.status === 200) {
      console.log("GET request sent successfully");
    } else {
      console.log("GET request failed", res.status);
    }

    const totalCollections = await mongoose.connection.db
      .listCollections()
      .toArray();

    console.log("Total Mongoose Collections:", totalCollections.length);
  } catch (e) {
    console.error("Error while sending request", e.message || e);
  }
});

export { job };

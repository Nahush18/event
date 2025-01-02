import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

// Add Event API Route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, description, date } = req.body;

    try {
      // Insert event into the database
      const [result] = await pool.query(
        "INSERT INTO events (title, description, date) VALUES (?, ?, ?)",
        [title, description, date]
      );
      res.status(200).json({ success: true, message: "Event added successfully!" });
    } catch (error) {
      console.error("Error inserting event:", error);
      res.status(500).json({ error: "Failed to add event" });
    }
  } else if (req.method === "GET") {
    try {
      // Fetch events from the database
      const [rows] = await pool.query("SELECT * FROM events ORDER BY date ASC");
      res.status(200).json(rows); // Return the events
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';  // DB connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
      // Example query to check username and password
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password]
      );

      if (rows.length > 0) {
        // Assuming login is successful
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

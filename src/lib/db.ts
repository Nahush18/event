import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Xqnz@180104",
  database: "eventic_clone",
});

export default pool;



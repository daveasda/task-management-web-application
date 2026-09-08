import db from '../config/db.js';

//login account
export const login = async (req, res) => { 
  const username = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM account WHERE username = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const account = result.rows[0];
      const storedPassword = account.password;

      if (password === storedPassword) {
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(401).json({ error: "Invalid password" });
      }
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  };

}

//register account
export const register = async (req, res) => { 
  const { username, password, email, user_type } = req.body;

  try {
    // Check if username already exists
    const userExists = await db.query('SELECT * FROM account WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Insert new user into database
    const result = await db.query(
      'INSERT INTO account (username, password, email, user_type) VALUES ($1, $2, $3, $4) RETURNING id, username, email, user_type',
      [username, password, email, user_type || 'normal']
    );

    res.status(201).json({
      message: 'Registration successful',
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
    
}


const connection = require("../config/db");

const getSubordinatesUsers = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [subordinates] = await connection.query(
      `
      SELECT 
        id, 
        CONCAT(first_name, ' ', last_name) AS responsible 
      FROM users 
      WHERE manager_id = ?`,
      [userId]
    );

    res.json(subordinates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = { getSubordinatesUsers };

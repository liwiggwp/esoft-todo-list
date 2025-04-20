const connection = require("../config/db");

const getStatuses = async (req, res) => {
  try {
    const [statuses] = await connection.query("SELECT id, name FROM statuses");
    res.status(200).json(statuses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const getPriorities = async (req, res) => {
  try {
    const [priorities] = await connection.query(
      "SELECT id, name FROM priorities"
    );
    res.status(200).json(priorities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = { getStatuses, getPriorities };

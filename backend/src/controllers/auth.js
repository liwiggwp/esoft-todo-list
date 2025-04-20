const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "secret-key";

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Доступ запрещен" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Недействительный токен" });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, first_name, last_name } = req.body;

    if (!username || !password || !first_name || !last_name) {
      return res
        .status(400)
        .json({ message: "Введите логин, пароль, имя и фамилию" });
    }

    const [uniqueUser] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (uniqueUser.length > 0) {
      return res.status(404).json({ message: "Логин уже существует" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await connection.query(
      "INSERT INTO users (username, password, first_name, last_name) VALUES (?, ?, ?, ?)",
      [username, hashPassword, first_name, last_name]
    );
    res.status(200).json({ message: "Пользователь зарегистрирован" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка регистрации. Попробуйте позже." });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Введите логин и пароль" });
    }

    const [rows] = await connection.query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const user = rows[0];

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Неправильный пароль" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "7d",
    });

    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = { register, login, authenticate };

const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../config/db");
const router = express.Router();
const jwt = require("jsonwebtoken");

const secretKey = "secret-key";

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  //   console.log(token.split(" ")[1]);
  if (!token) {
    return res.json({ message: "Доступ запрещен" });
  }
 
  try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.json({ message: "Недействительный токен" });
  }
};

router.post("/register", async (req, res) => {
  try {
    const { username, password, first_name, last_name } = req.body;

    if (!username || !password || !first_name || !last_name) {
      return res.json({ message: "Введите логин, пароль, имя и фамилию" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await connection.query(
      "INSERT INTO users (username, password, first_name, last_name) VALUES (?, ?, ?, ?)",
      [username, hashPassword, first_name, last_name]
    );
    res.json({ message: "Пользователь зарегистрирован" });
  } catch (error) {
    console.error(error);
    res.json({ message: "Ошибка регистрации. Попробуйте позже." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ message: "Введите логин и пароль" });
    }

    const [rows] = await connection.query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );

    if (rows.length === 0) {
      return res.json({ message: "Пользователь не найден" });
    }

    const user = rows[0];

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.json({ message: "Неправильный пароль" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });

    res.json({
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.json({ message: "Ошибка сервера" });
  }
});

module.exports = { router, authenticate };

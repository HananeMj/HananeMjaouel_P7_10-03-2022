const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cryptoJs = require("crypto-js");
require("dotenv").config();
const client = require("../config/db");

exports.getAllusers = (req, res) => {
  client.query(`SELECT * FROM users`, (err, results) => {
    if (!err) {
      res.send(results.rows);
    } else {
      res.status(400).json({ message: "Erreur requête !" });
    }
  });
};

exports.getOneUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const user = {
    id: req.params.id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isadmin,
  };
  if (user && user.id == userId) {
    client.query(
      `Select * from users where id=${req.params.id}`,
      (err, result) => {
        if (!err) {
          res.send(result.rows);
        } else {
          res
            .status(400)
            .json({ message: " Erreur de récupération de l'utilisateur !" });
        }
      }
    );
  } else {
    res.status(400).json({
      message:
        "Vous n'avez pas les droits pour acceder aux données de cet utilisateur",
    });
  }
};

exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = req.body;
      user.password = hash;
      user.email = cryptoJs
        .HmacSHA256(req.body.email, process.env.SECRET_KEY)
        .toString();
      let insertEmailQuery = `SELECT * FROM users WHERE email='${user.email}'`;
      client.query(insertEmailQuery, (err, results) => {
        if (results.length > 0) {
          res.status(400).json({ message: " Email déjà enregistrée !" });
        } else {
          let insertQuery = `INSERT INTO users (username, email, password, isAdmin) VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.isAdmin}')`;
          client.query(insertQuery, (err, results) => {
            if (!err) {
              console.log(results);
              res.send("Nouvel utilisateur créé !");
            } else {
              console.log(err.message);
              res.status(400).json({ error: "Echec de création utilisateur" });
            }
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

exports.login = (req, res) => {
  const emailEncrypted = cryptoJs
    .HmacSHA256(req.body.email, `${process.env.SECRET_KEY}`)
    .toString();
  let insertQuery = `SELECT id, username, email, password, isAdmin FROM users WHERE email='${emailEncrypted}'`;
  client.query(insertQuery, (err, results) => {
    if (err) {
      res.status(400).json({ message: "Connexion echouée !" });
    } else {
      const user = results.rows[0];
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res.status(400).json({ error: "Mot de passe incorrect !" });
        } else {
          res.status(200).json({
            message: "Connecté !",
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              `${process.env.SECRET_TOKEN}`,
              { expiresIn: "24h" }
            ),
          });
        }
      });
    }
  });
};

exports.deleteUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const user = {
    id: req.params.id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isadmin,
  };
  if (user && user.id == userId) {
    let insertQuery = `DELETE FROM users where id=${user.id}`;

    client.query(insertQuery, (err, results) => {
      if (!err) {
        console.log(results);
        res.send("Utilisateur supprimé !");
      } else {
        console.log(err.message);
      }
    });
  } else {
    res.status(400).json({
      message: "Vous n'avez pas les droits pour supprimer cet utilisateur !",
    });
  }
};

exports.updateUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const user = {
    id: req.params.id,
    username: req.body.username,
    email: cryptoJs
      .HmacSHA256(req.body.email, `${process.env.SECRET_KEY}`)
      .toString(),
    password: req.body.password,
    isAdmin: req.body.isadmin,
  };
  if (user && user.id == userId) {
    let updateQuery = `UPDATE users
                       SET username = '${user.username}',
                       email = '${user.email}',
                       password = '${user.password}',
                       isadmin = '${user.isAdmin}'
      
                       WHERE id = ${user.id}`;

    client.query(updateQuery, (err, results) => {
      if (!err) {
        console.log(results);
        res.send("Modifié avec succès !");
      } else {
        console.log(err.message);
      }
    });
  } else {
    res.status(400).json({
      message:
        "Vous n'avez pas les droits pour modifier les données de cet utilisateur !",
    });
  }
};

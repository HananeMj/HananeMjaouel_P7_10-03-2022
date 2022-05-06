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

  let selectQuery = `SELECT * FROM users WHERE iduser='${userId}`;
  client.query(selectQuery, (err, result) => {
    if (!err) {
      res.status(200).json({ message: "Utilisateur récupéré" + result });
    } else {
      res
        .status(400)
        .json({ message: " Erreur de récupération de l'utilisateur !" });
    }
  });
};

exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        username: req.body.username,
        email: cryptoJs
          .HmacSHA256(req.body.email, process.env.SECRET_KEY)
          .toString(),
        password: hash,
        //isadmin: req.body.isadmin,
      };
      /*const user = req.body;
      user.password = hash;
      user.email = cryptoJs
        .HmacSHA256(req.body.email, process.env.SECRET_KEY)
        .toString();*/
      let insertEmailQuery = `SELECT * FROM users WHERE email='${user.email}'`;
      client.query(insertEmailQuery, (err, results) => {
        if (results.length > 0) {
          res.status(400).json({ message: " Email déjà enregistrée !" });
        } else {
          let insertQuery = `INSERT INTO users (username, email, password) VALUES ('${user.username}', '${user.email}', '${user.password}')`;
          client.query(insertQuery, (err, results) => {
            if (!err) {
              console.log(results);
              res.send("Nouvel utilisateur créé !");
            } else {
              console.log(err.message);
              res
                .status(400)
                .json({ error: "Echec de création utilisateur", err });
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
  let insertQuery = `SELECT * FROM users WHERE email='${emailEncrypted}'`;
  client.query(insertQuery, (err, results) => {
    if (err) {
      res.status(400).json({ message: "Connexion echouée !" });
    } else {
      const user = results.rows[0];
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res.status(400).json({ error: "Mot de passe incorrect !" });
        } else {
          console.log("connecté", results);
          res.status(200).json({
            message: "Connecté !",
            userId: user.iduser,
            token: jwt.sign(
              { userId: user.iduser },
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
    iduser: req.params.iduser,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isadmin,
    avatar: req.body.avatar,
  };
  if (user && user.iduser == userId) {
    let insertQuery = `DELETE FROM USERS  WHERE iduser=${user.iduser}`;

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

/*exports.updateUser = (req, res) => {
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
    avatar: req.body.avatar,
  };
  if (user && user.id == userId) {
    let updateQuery = `UPDATE users
                       SET username = '${user.username}',
                       email = '${user.email}',
                       password = '${user.password}',
                       isadmin = '${user.isAdmin}',
                       avatar = '${user.avatar}
      
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
};*/

exports.uploadAvatar = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;

  let selectQuery = `SELECT * FROM users WHERE iduser='${userId}'`;

  client.query(selectQuery, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else {
      let user = results.rows.at(0);
      //console.log(user.avatar);

      if (user.avatar != null && user.avatar.trim() !== "") {
        console.log("profil picture:", user.avatar);
        const file = user.avatar.split("/images/")[1];
        fs.unlink(`images/${file}`, (err) => {
          if (err) {
            console.log(err, "Echec de suppression de la photo");
          } else {
            console.log("Photo supprimée");
          }
        });
      }

      if (req.file) {
        let avatar = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;

        console.log(req.file.filename);
        console.log(avatar);
        let queryUpdate = `UPDATE users SET avatar='${avatar}' WHERE iduser='${userId}'`;
        client.query(queryUpdate, (err, results) => {
          if (!err) {
            console.log(results, "Avatar modifié !");
            res.status(200).json({ message: "Avatar modifié" });
          } else {
            console.log(err, "Echec de modification de l'avatar !");
            res.status(500).json({ error: err.message });
          }
        });
      }
    }
  });
};

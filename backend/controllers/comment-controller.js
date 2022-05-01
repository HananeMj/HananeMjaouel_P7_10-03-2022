//const fs = require("fs");
const client = require("../config/db");
const jwt = require("jsonwebtoken");

exports.createComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;

  const date = new Date();
  console.log(date); // 👉 Thu Jul 21 2022 12:35:31 GMT+0300

  // 👇 "2022-07-21T09:35:31.820Z"
  console.log(date.toISOString());

  const comment = {
    content: req.body.content,
    postId: req.params.postid,
    userId: userId,
    createdAt: date.toISOString(),
  };
  if (comment.content != "") {
    let insertQuery = `INSERT INTO comments (content, postid, userid, createdat) VALUES ('${comment.content}', '${comment.postId}', '${comment.userId}','${comment.createdAt}')`;

    client.query(insertQuery, (err, results) => {
      if (!err) {
        console.log(results);
        res.send("Nouveau commentaire ajouté !");
      } else {
        res.status(400).json({ error: err.message });
      }
    });
  } else {
    res.status(400).json({
      message: "Vous ne pouvez pas publier de commentaire sans contenu ",
    });
  }
};

exports.deleteComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const date = new Date();
  console.log(date); // 👉 Thu Jul 21 2022 12:35:31 GMT+0300
  // 👇 "2022-07-21T09:35:31.820Z"
  console.log(date.toISOString());
  const comment = {
    idcomment: req.params.idcomment,
    content: req.params.body,
    postid: req.body.postid,
    userid: userId,
    createdAt: date.toISOString(),
  };
  if (comment && comment.userid == userId) {
    let insertQuery = `DELETE FROM comments WHERE idcomment ='${comment.idcomment}' `;
    client.query(insertQuery, (err, results) => {
      if (!err) {
        console.log(results);
        res.send("Commentaire supprimé !");
      } else {
        res.status(400).json({ error: err.message });
      }
    });
  }
};

exports.getAllComments = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const date = new Date();
  console.log(date); // 👉 Thu Jul 21 2022 12:35:31 GMT+0300
  // 👇 "2022-07-21T09:35:31.820Z"
  console.log(date.toISOString());
  const comment = {
    idcomment: req.params.idcomment,
    content: req.params.body,
    postid: req.body.postid,
    userid: userId,
    createdAt: date.toISOString(),
  };

  const postId = req.params.postid;
  if (comment && comment.userid == userId) {
    let insertQuery = `SELECT * FROM comments JOIN USERS ON COMMENTS.userid= USERS.iduser WHERE COMMENTS.postid = '${postId}' ORDER BY createdat DESC`;
    client.query(insertQuery, (err, results) => {
      if (!err) {
        console.log(results);
        res.send(results.rows);
      } else {
        console.log(err);
        res.status(400).json({ message: "Erreur requête !" });
      }
    });
  } else {
    res
      .status(400)
      .json({ message: "Vous ne pouvez pas supprimer ce commentaire" });
  }
};

exports.getOneComment = (req, res) => {
  let insertQuery = `SELECT * FROM comments WHERE idcomment=${req.params.idcomment}`;
  client.query(insertQuery, (err, results) => {
    if (!err) {
      res.send(results.rows);
      console.log(results);
    } else {
      res.status(400).json({ error: err.message });
    }
  });
};

exports.modifyComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const comment = req.body;
  let insertQuery = `UPDATE comments SET content= '${comment.content}' WHERE userid=${userId}`;
  client.query(insertQuery, (err, results) => {
    if (!err) {
      console.log(results);
      res.send("Modifié avec succès !");
    } else {
      res.status(400).json({ error: err.message });
      console.log(err.message);
    }
  });
};

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
  let insertQuery = `INSERT INTO comments (content, postid, userid, createdat) VALUES ('${comment.content}', '${comment.postId}', '${comment.userId}','${comment.createdAt}')`;

  client.query(insertQuery, (err, results) => {
    if (!err) {
      console.log(results);
      res.send("Nouveau commentaire ajouté !");
    } else {
      res.status(400).json({ error: err.message });
    }
  });
};

exports.deleteComment = (req, res) => {
  //const token = req.headers.authorization.split(" ")[1];
  //const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  //const userId = decodedToken.userId;
  const commentId = req.params.id;

  let insertQuery = `DELETE FROM comments WHERE id ='${commentId}' `;
  client.query(insertQuery, (err, results) => {
    if (!err) {
      console.log(results);
      res.send("Commentaire supprimé !");
    } else {
      res.status(400).json({ error: err.message });
    }
  });
};

exports.getAllComments = (req, res) => {
  //const comment = req.body;
  const postId = req.params.postid;
  let insertQuery = `SELECT * FROM comments JOIN USERS ON COMMENTS.userid= USERS.id WHERE COMMENTS.postid = '${postId}'`;
  client.query(insertQuery, (err, results) => {
    if (!err) {
      console.log(results);
      res.send(results.rows);
    } else {
      console.log(err);
      res.status(400).json({ message: "Erreur requête !" });
    }
  });
};

exports.modifyComment = (req, res) => {
  const comment = req.body;
  let insertQuery = `UPDATE comments SET content= '${comment.content}' WHERE id=${req.params.id}`;
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

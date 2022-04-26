const client = require("../config/db");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.getAllposts = (req, res) => {
  let insertQuery = `SELECT * FROM posts`;
  client.query(insertQuery, (err, results) => {
    if (!err) {
      res.send(results.rows);
      console.log(results);
    } else {
      res.status(400).json({ error: err.message });
    }
  });
};

exports.getOnePost = (req, res) => {
  let insertQuery = `SELECT * FROM posts WHERE id=${req.params.id}`;
  client.query(insertQuery, (err, results) => {
    if (!err) {
      res.send(results.rows);
    } else {
      res.status(400).json({ error: err.message });
    }
  });
};

exports.createPost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;

  let picture = "";
  if (req.file) {
    picture = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  //const dateStr = "2022-07-21T09:35:31.820Z";

  const date = new Date();
  console.log(date); // 👉 Thu Jul 21 2022 12:35:31 GMT+0300

  // 👇 "2022-07-21T09:35:31.820Z"
  console.log(date.toISOString());

  const post = {
    content: req.body.content,
    picture: picture,
    userId: userId,
    createdAt: date.toISOString(),
  };
  let insertQuery = `INSERT INTO posts (content, picture, userId, createdat) VALUES ('${post.content}', '${post.picture}', '${post.userId}', '${post.createdAt}')`;
  client.query(insertQuery, (err, results) => {
    if (!err) {
      res.status(200).json({ message: "Post publié" });
    } else {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  });
};

exports.deletePost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const date = new Date();
  console.log(date); // 👉 Thu Jul 21 2022 12:35:31 GMT+0300

  // 👇 "2022-07-21T09:35:31.820Z"
  console.log(date.toISOString());

  const post = {
    content: req.body.content,
    picture: req.body.picture,
    userId: userId,
    createdAt: date.toISOString(),
  };
  if (post && post.userId == userId) {
    let insertQuery = `delete from posts where id=${req.params.id}`;
    client.query(insertQuery, (err, results) => {
      if (!err) {
        console.log(results);
        res.status(200).json({ message: "Post supprimé !" });
      } else {
        res.status(400).json({ error: err.message });
      }
    });
  }
};

exports.modifyPost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const post = {
    content: req.body.content,
    picture: "",
    userId: userId,
    //createdAt: date.toISOString(),
  };
  if (post.userId == userId) {
    let updateQuery = `UPDATE posts SET content = '${post.content}', picture= '${post.picture}' WHERE id =${req.params.id} `;
    client.query(updateQuery, (err, results) => {
      if (!err) {
        console.log(results);
        res.status(200).json({ message: "Post modifié !" });
      } else {
        res.status(400).json({ error: err.message });
      }
    });
  }
};

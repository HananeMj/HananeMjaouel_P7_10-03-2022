const client = require("../config/db");
const jwt = require("jsonwebtoken");

exports.likePost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const postId = req.params.postid;
  let insertQuery = `SELECT * FROM likes WHERE postid='${postId}' AND userid='${userId}'`;
  try {
    new Promise((response, reject) => {
      client.query(insertQuery, (err, results) => {
        if (err) {
          console.log(reject);
          res.status(400).json({ error: err.message });
        }
        response(results);
      });
    }).then((results) => {
      const resLength = results.length;
      console.log(resLength);
      if (resLength === 0) {
        const like = {
          postId: postId,
          userId: userId,
        };
        console.log(like);
        let insertQuery = `INSERT INTO likes (postid, userid) VALUES ('${postId}', '${userId}')`;
        client.query(insertQuery, (err, results) => {
          if (!err) {
            console.log(results);
            res.send("Like ajouté !");
          } else {
            res.status(400).json({ error: err.message });
          }
        });
      } else if (resLength > 0) {
        let insertQuery = `DELETE FROM likes WHERE postid='${postId}' AND userid='${userId}'`;
        client.query(insertQuery, (err, results) => {
          if (!err) {
            console.log(results);
            res.send("like supprimé !");
          } else {
            console.log(err);
            res.status(400).json({ error: err.message });
          }
        });
      } else {
        res.status(200).json({ message: "length > 0" });
      }
    });
  } catch (error) {
    res.status(408).json(error);
  }
};

exports.getLikes = (req, res) => {
  const postId = req.params.postid;
  let insertQuery = `SELECT userid FROM likes WHERE postid='${postId}'`;
  client.query(insertQuery, (err, results) => {
    if (!err) {
      console.log(results);
      res.status(200).json({ likes: results });
    } else {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  });
};

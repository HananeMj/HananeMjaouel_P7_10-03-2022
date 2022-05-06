const client = require("../config/db");
const jwt = require("jsonwebtoken");

const updateLikes = (postid, res, inc) => {
  let insertQuery = `UPDATE posts SET likes = @idlike := likes ${inc} WHERE postid = ${
    post.id
  } ${inc === "-1" ? "AND likes > 0" : ""};`;
  client.query(insertQuery, [postid], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ "error like": err.message });
    }
    client.query(
      `SELECT likes FROM posts WHERE postid=${post.id}`,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(400).json({ "error like": err.message });
        }
        return res.status(200).json({ results });
      }
    );
  });
};

exports.likePost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const postId = req.params.postid;
  let selectQuery = `SELECT * FROM posts WHERE idpost='${postId}'`;
  client.query(selectQuery, (err, results) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (results.length === 0) {
      res.status(404).json({ message: "post introuvable" });
    }
    let selectQuery = `SELECT * FROM likes WHERE postid='${postId}' AND userid='${userId}'`;
    client.query(selectQuery, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        let insertLikeQuery = `INSERT INTO likes (postid, userid) VALUES '${postId}', '${userId}'`;

        client.query(insertLikeQuery, (err, results) => {
          if (!err) {
            res.status(200).json({ message: "like inséré" });
          }
          client.query(
            `SELECT COUNT(*) FROM likes WHERE postid='${postId}'`,
            (err, results) => {
              if (err) {
                res.status(500).json({ error: err.message });
              }
              const likesNumber = results.rows[0];
              let insertLikeQuery = `UPDATE posts SET likes ='${likesNumber}' WHERE idpost='${postId}'`;
              client.query(insertLikeQuery, (err, results) => {
                if (err) {
                  res.status(500).json({ error: err.message });
                }
                return res.status(200).json({ message: "post liké" });
              });
            }
          );
        });
      } else {
        let deleteQuery = `DELETE FROM likes WHERE postid= '${postId}' AND userid='${userId}'`;
        client.query(deleteQuery, (err, results) => {
          if (!err) {
            res.status(200).json({ message: "like supprimé de likes" });
          }
          client.query(
            `SELECT COUNT(*) FROM likes WHERE postid='${postId}' `,
            (err, results) => {
              if (err) {
                res.status(500).json({ error: err.message });
              }
              const likesNumber = results.rows.at(0);
              let updateQuery = `UPDATE posts SET likes='${likesNumber}' WHERE idpost='${postId}'`;
              client.query(updateQuery, (err, results) => {
                if (!err) {
                  return res
                    .status(200)
                    .json({ message: "like supprimé de posts" });
                }
              });
            }
          );
        });
      }
    });
  });
};

exports.getLikes = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const like = {
    idlike: req.body.idlike,
    postid: req.params.postid,
    userid: userId,
  };
  const postId = req.params.postid;
  if (like && like.userid == userId) {
    let insertQuery = `SELECT * FROM likes WHERE postid='${like.postid}'`;
    client.query(insertQuery, (err, results) => {
      if (err) {
        console.log(results);
        res.status(400).json({ error: err.message });
      } else {
        console.log(err);
        res.status(400).json({ likes: results });
      }
    });
  }
};
exports.likePosts = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const postId = req.params.postid;
  let deleteQuery = `DELETE FROM likes WHERE postid='${postId}', userid='${userId}' `;
  client.query(deleteQuery, (err, results) => {
    if (err) {
      results.status(500).json({ error: err.message });
    } else {
      let insertQuery = `INSERT INTO likes ( postid, userid) VALUES '${postId}', '${userId}'`;
      client.query(insertQuery, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({ message: "like/Dislike ok" });
        }
      });
      client.end();
    }
  });
};

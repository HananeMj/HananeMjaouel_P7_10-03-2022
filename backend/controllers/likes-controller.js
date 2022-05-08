const client = require("../config/db");
const jwt = require("jsonwebtoken");

exports.likePost = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const postId = req.params.postid;

  // verifier la bd s'il y a un like pour le user sur le post
  let selectQuery = `SELECT * FROM likes WHERE postid='${postId}' AND userid='${userId}'`;
  try {
    new Promise((resolve, reject) => {
      client.query(selectQuery, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: err.message });
        } else {
          resolve(results);
        }
      });
    }).then((results) => {
      const length = results.rowCount;
      console.log("length", length);
      if (length == 0) {
        let selectQuery = `INSERT INTO likes (postid, userid) VALUES ('${postId}', '${userId}')`;

        client.query(selectQuery, (err, results) => {
          if (err) {
            console.log(err);
            res.status(400).json({ error: err.message });
          }
          return res.status(200).json({ message: results.rowCount });
        });
      }
      if (length == 1) {
        let deleteQuery = `DELETE FROM likes WHERE postid= '${postId}' AND userid='${userId}'`;
        client.query(deleteQuery, (err, results) => {
          if (err) {
            console.log(err);
            res.status(400).json({ error: err.message });
          }
          return res.status(200).json({ message: length - results.rowCount });
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(408).json(error);
  }
};

exports.getLikes = (req, res) => {
  const postId = req.params.postid;
  let selectQuery = `SELECT userid FROM likes WHERE postid='${postId}'  `;
  client.query(selectQuery, (err, results) => {
    if (err) {
      console.log(err.message);
      res.status(404).json({ error: err.message });
    }
    res.status(200).json({
      likes: results, //.rowCount,
    });
  });
};

const client = require("../config/db");

exports.authAdmin = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const adminId = userId;
  let insertQuery = `SELECT isadmin FROM users WHERE id='${adminId}'`;
  client.query(insertQuery, (err, results, next) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (results[0].isadmin == true) {
        next();
      } else {
        res.status(400).json({
          message:
            "Vous n'avez pas les droits administrateur pour acceder à ce contenu !",
        });
      }
    }
  });
};

exports.authPost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const adminId = userId;
  let insertQuery = `SELECT isadmin FROM users WHERE id='${adminId}'`;
  client.query(insertQuery, (err, results, next) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (results[0].isadmin == true) {
        next();
      } else {
        const postId = req.params.id;
        let insertQuery = `SELECT userid FROM posts WHERE id= '${postId}'`;
        client.query(insertQuery, (err, results) => {
          if (err) {
            res.status(400).json({ error: err.message });
          } else if (results.length === 0) {
            res.status(404).json({ message: "Post inexistant" });
          } else {
            const postAdmin = results[0].userid;
            if (postAdmin === userId) {
              next();
            } else {
              res.status(403).json({
                message:
                  "Vous n'avez pas les droits administrateur pour acceder à ce contenu",
              });
            }
          }
        });
      }
    }
  });
};

exports.deleteUserAccount = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const user = req.params.id;
  let insertQuery = `SELECT isadmin FROM users WHERE id= '${userId}'`;
  client.query(insertQuery, (err, results, next) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      if (results[0] === true) {
        next();
      } else if (user === userId) {
        next();
      } else {
        res.status(403).json({
          message:
            "Vous n'avez pas les droits administrateur pour acceder à ce contenu",
        });
      }
    }
  });
};

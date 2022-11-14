const notFound = (req, res, next) => {
  return res.status(200).send("AdiBau --  Route not exist ...");
};

module.exports = notFound;
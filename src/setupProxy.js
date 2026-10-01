// Use the same server-side handler with `npm start` as in Netlify Functions.
const { handler } = require("../netlify/functions/reddit");

module.exports = function (app) {
  app.all("/api/reddit", async (req, res, next) => {
    try {
      const result = await handler({
        httpMethod: req.method,
        queryStringParameters: req.query,
      });
      res.status(result.statusCode).set(result.headers).send(result.body);
    } catch (error) {
      next(error);
    }
  });
};

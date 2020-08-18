exports.handler = (event, _context, callback) => {
  const headers = {
    "Access-Control-Allow-Origin": "https://www.netlify.com/",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  callback(null, {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      boop: true,
      event,
      _context,
      callback,
      faunaKey: process.env.FAUNADB_SERVER_SECRET,
    }),
  });
};

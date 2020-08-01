exports.handler = (event, _context, callback) => {
  console.log({ event });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      boop: true,
      faunaKey: process.env.FAUNADB_SERVER_SECRET,
    }),
  });
};

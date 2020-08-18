exports.handler = (event, _context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      boop: true,
      event,
      _context,
      callback,
    }),
  });
};

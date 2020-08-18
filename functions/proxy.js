exports.handler = (event, _context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      proxyFoo: true,
      event,
      _context,
      callback,
    }),
  });
};

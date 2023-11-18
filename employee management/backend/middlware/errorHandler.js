const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).send(`
    <img src="/error.gif" alt="Error" style="width: 100%; max-width: 500px; display: block; margin: 20px auto;">
    <div style="text-align: center; font-size: 18px; color: red;">
      <p>${err.message}</p>
    </div>
  `);
};

export default errorHandler ;

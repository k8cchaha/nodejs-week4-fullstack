const successHandle = (res, message, data = []) => {
  res
    .status(200)
    .json({
      status: "success",
      message: message,
      data
    })
    .end();
};

module.exports = successHandle;

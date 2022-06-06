const errorHandle = (res, err, message) => {
  res
    .status(400)
    .json({
      status: "false",
      message: message ? message : "欄位，或是 ID 有錯",
      error: err
    })
    .end();
};

module.exports = errorHandle;

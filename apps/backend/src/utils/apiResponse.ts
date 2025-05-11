export const successResponse = (res, data, message = "Success") =>
  res.status(200).json({ success: true, message, data });

export const errorResponse = (res, error, code = 500) =>
  res.status(code).json({ success: false, message: error }); 
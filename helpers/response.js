/**
 * Mengirim response sukses
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Pesan sukses
 * @param {Object} data - Data yang akan dikirim
 * @param {Object} meta - Metadata tambahan (opsional)
 */
function sendSuccess(res, statusCode, message, data, meta = {}) {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    ...meta
  });
}

/**
 * Mengirim response error
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Pesan error
 * @param {string} error - Detail error (opsional)
 */
function sendError(res, statusCode, message, error = null) {
  const response = {
    success: false,
    message
  };
  
  if (error) {
    response.error = error;
  }
  
  res.status(statusCode).json(response);
}

/**
 * Mengirim response untuk data tidak ditemukan
 * @param {Object} res - Express response object
 * @param {string} message - Pesan custom (opsional)
 */
function sendNotFound(res, message = 'Data tidak ditemukan') {
  sendError(res, 404, message);
}

/**
 * Mengirim response untuk validasi error
 * @param {Object} res - Express response object
 * @param {string} message - Pesan validasi error
 */
function sendValidationError(res, message) {
  sendError(res, 400, message);
}

/**
 * Mengirim response untuk server error
 * @param {Object} res - Express response object
 * @param {string} message - Pesan error
 * @param {Error} error - Error object (opsional)
 */
function sendServerError(res, message = 'Internal server error', error = null) {
  sendError(res, 500, message, error?.message);
}

module.exports = {
  sendSuccess,
  sendError,
  sendNotFound,
  sendValidationError,
  sendServerError
};
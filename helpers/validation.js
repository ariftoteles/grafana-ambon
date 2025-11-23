const { MESSAGES } = require('../config/constants');

/**
 * Validasi ID - memastikan ID adalah angka positif
 * @param {any} id - ID yang akan divalidasi
 * @returns {Object} { isValid: boolean, message: string|null }
 */
function validateId(id) {
  if (id === undefined || id === null) {
    return { isValid: true, message: null }; // ID opsional
  }
  
  if (isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return { 
      isValid: false, 
      message: MESSAGES.ERROR.INVALID_ID 
    };
  }
  
  return { isValid: true, message: null };
}

/**
 * Validasi request body - memastikan tidak kosong
 * @param {Object} body - Request body yang akan divalidasi
 * @returns {Object} { isValid: boolean, message: string|null }
 */
function validateRequestBody(body) {
  if (!body || Object.keys(body).length === 0) {
    return { 
      isValid: false, 
      message: MESSAGES.ERROR.EMPTY_BODY 
    };
  }
  
  return { isValid: true, message: null };
}

/**
 * Sanitasi data - menghapus field sistem yang tidak boleh diubah manual
 * @param {Object} data - Data yang akan disanitasi
 * @returns {Object} Data yang sudah dibersihkan
 */
function sanitizeData(data) {
  const { createdAt, updatedAt, ...cleanData } = data;
  return cleanData;
}

module.exports = {
  validateId,
  validateRequestBody,
  sanitizeData
};
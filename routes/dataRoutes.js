const express = require('express');
const router = express.Router();

// Import helpers dan constants
const { MESSAGES, HTTP_STATUS } = require('../config/constants');
const db = require('../helpers/database');
const validation = require('../helpers/validation');
const response = require('../helpers/response');

// GET /api/data - Mengambil semua data
router.get('/', (req, res) => {
  try {
    const database = db.readDatabase();
    response.sendSuccess(
      res, 
      HTTP_STATUS.OK, 
      MESSAGES.SUCCESS.DATA_RETRIEVED, 
      database.data,
      { total: database.data.length }
    );
  } catch (error) {
    response.sendServerError(res, 'Error mengambil data', error);
  }
});

// GET /api/data/:id - Mengambil data berdasarkan ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Validasi ID
    const idValidation = validation.validateId(id);
    if (!idValidation.isValid) {
      return response.sendValidationError(res, idValidation.message);
    }
    
    const { item } = db.findItemById(id);
    
    // if (!item) {
    //   return response.sendNotFound(res);
    // }
    
    response.sendSuccess(res, HTTP_STATUS.OK, MESSAGES.SUCCESS.DATA_RETRIEVED, item);
  } catch (error) {
    response.sendServerError(res, 'Error mengambil data', error);
  }
});

// GET /api/data/:id - Mengambil data berdasarkan ID
router.get('/:start_id/:end_id', (req, res) => {
  try {
    const { start_id, end_id } = req.params;
    
    // Validasi ID
    const startIdValidation = validation.validateId(start_id);
    if (!startIdValidation.isValid) {
      return response.sendValidationError(res, startIdValidation.message);
    }

    const endIdValidation = validation.validateId(end_id);
    if (!endIdValidation.isValid) {
      return response.sendValidationError(res, endIdValidation.message);
    }
    
    const { data } = db.findByRangeId(start_id, end_id);
    
    // if (!data || data.length === 0) {
    //   return response.sendNotFound(res);
    // }
    
    response.sendSuccess(res, HTTP_STATUS.OK, MESSAGES.SUCCESS.DATA_RETRIEVED, data);
  } catch (error) {
    response.sendServerError(res, 'Error mengambil data', error);
  }
});


// POST /api/data - Upsert data (insert jika ID belum ada, update jika sudah ada)
router.post('/', (req, res) => {
  try {
    const requestData = req.body;
    
    // Validasi request body
    const bodyValidation = validation.validateRequestBody(requestData);
    if (!bodyValidation.isValid) {
      return response.sendValidationError(res, bodyValidation.message);
    }
    
    const { id, ...otherFields } = requestData;
    
    // Validasi ID jika diberikan
    const idValidation = validation.validateId(id);
    if (!idValidation.isValid) {
      return response.sendValidationError(res, idValidation.message);
    }
    
    // Sanitasi data
    const cleanData = validation.sanitizeData(otherFields);
    
    let result;
    let isUpdate = false;
    
    if (id) {
      // Cek apakah ID sudah ada
      const { item } = db.findItemById(id);
      
      if (item) {
        // Update data yang sudah ada
        result = db.updateItem(id, cleanData);
        isUpdate = true;
      } else {
        // Insert dengan ID spesifik
        result = db.insertItem({ id: parseInt(id), ...cleanData });
      }
    } else {
      // Insert dengan ID auto-generate
      const newId = db.generateNewId();
      result = db.insertItem({ id: newId, ...cleanData });
    }
    
    if (result.success) {
      response.sendSuccess(
        res,
        isUpdate ? HTTP_STATUS.OK : HTTP_STATUS.CREATED,
        isUpdate ? MESSAGES.SUCCESS.DATA_UPDATED : MESSAGES.SUCCESS.DATA_CREATED,
        result.data,
        { operation: isUpdate ? 'update' : 'insert' }
      );
    } else {
      response.sendServerError(res, 'Error menyimpan data');
    }
  } catch (error) {
    response.sendServerError(res, 'Error memproses data', error);
  }
});

module.exports = router;
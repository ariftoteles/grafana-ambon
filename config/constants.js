module.exports = {
  PORT: process.env.PORT || 5000,
  DATABASE_FILENAME: 'database.json',
  
  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  },
  
  // Messages
  MESSAGES: {
    SUCCESS: {
      DATA_RETRIEVED: 'Data berhasil diambil',
      DATA_CREATED: 'Data berhasil ditambahkan',
      DATA_UPDATED: 'Data berhasil diupdate'
    },
    ERROR: {
      DATA_NOT_FOUND: 'Data tidak ditemukan',
      ENDPOINT_NOT_FOUND: 'Endpoint tidak ditemukan',
      INVALID_ID: 'ID harus berupa angka positif',
      EMPTY_BODY: 'Request body tidak boleh kosong',
      SERVER_ERROR: 'Internal server error',
      DATABASE_ERROR: 'Error mengakses database'
    }
  }
};
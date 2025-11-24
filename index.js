const express = require('express');

// Import helpers, routes, dan config
const { PORT, MESSAGES, HTTP_STATUS } = require('./config/constants');
const response = require('./helpers/response');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/items', dataRoutes);

// Route default
app.get('/', (req, res) => {
  response.sendSuccess(res, HTTP_STATUS.OK, 'Selamat datang di Grafana Service API', {
    endpoints: {
      'GET /ambon/items': 'Mengambil semua data',
      'GET /ambon/items/:id': 'Mengambil data berdasarkan ID',
      'GET /ambon/items/:start_id/:end_id': 'Mengambil data berdasarkan rentang ID',
      'POST /ambon/items': 'Upsert data dengan struktur fleksibel'
    },
    note: 'Struktur data fleksibel - hanya ID yang wajib. Field lain seperti name, email, description, dll bersifat opsional dan dinamis.',
    examples: {
      'insert_without_id': '{"name": "John", "email": "john@test.com"}',
      'insert_with_id': '{"id": 5, "title": "Task", "status": "pending"}',
      'update': '{"id": 1, "status": "completed", "priority": "high"}'
    }
  });
});

// Error handler untuk route yang tidak ditemukan
app.use((req, res) => {
  response.sendNotFound(res, MESSAGES.ERROR.ENDPOINT_NOT_FOUND);
});

// Import database helper untuk info startup
const db = require('./helpers/database');

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`API dokumentasi tersedia di http://localhost:${PORT}`);
  console.log(`Database path: ${db.getDatabasePath()}`);
  
  // Pastikan database terinisialisasi
  db.readDatabase();
});
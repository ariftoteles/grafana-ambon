# Grafana Service - Code Structure

Dokumentasi struktur kode yang telah direfactor untuk lebih rapi dan maintainable.

## 📁 Struktur Folder

```
grafana-service/
├── config/
│   └── constants.js          # Konstanta dan konfigurasi
├── helpers/
│   ├── database.js           # Helper untuk operasi database
│   ├── response.js           # Helper untuk response HTTP
│   └── validation.js         # Helper untuk validasi data
├── routes/
│   └── dataRoutes.js         # Routes untuk endpoint /api/data
├── database.json             # File database JSON
├── index.js                  # File utama server
├── package.json              # Konfigurasi npm
└── README.md                 # Dokumentasi API
```

## 📝 Penjelasan File

### `/config/constants.js`
Berisi semua konstanta yang digunakan di aplikasi:
- **PORT**: Port server
- **HTTP_STATUS**: HTTP status codes
- **MESSAGES**: Pesan-pesan response
- **DATABASE_FILENAME**: Nama file database

### `/helpers/database.js`
Helper untuk operasi database:
- `readDatabase()`: Membaca data dari file JSON
- `writeDatabase(data)`: Menulis data ke file JSON
- `findItemById(id)`: Mencari item berdasarkan ID
- `generateNewId()`: Generate ID baru
- `insertItem(data)`: Insert data baru
- `updateItem(id, data)`: Update data yang ada

### `/helpers/validation.js`
Helper untuk validasi input:
- `validateId(id)`: Validasi format ID
- `validateRequestBody(body)`: Validasi request body
- `sanitizeData(data)`: Membersihkan data dari field sistem

### `/helpers/response.js`
Helper untuk mengirim response HTTP:
- `sendSuccess(res, status, message, data, meta)`: Response sukses
- `sendError(res, status, message, error)`: Response error
- `sendNotFound(res, message)`: Response data tidak ditemukan
- `sendValidationError(res, message)`: Response validation error
- `sendServerError(res, message, error)`: Response server error

### `/routes/dataRoutes.js`
Berisi semua endpoint untuk `/api/data`:
- `GET /`: Mengambil semua data
- `GET /:id`: Mengambil data berdasarkan ID
- `POST /`: Upsert data (insert/update)

### `/index.js`
File utama server yang mengatur:
- Middleware Express
- Route mounting
- Error handling
- Server startup

## ✅ Keuntungan Refactoring

### 1. **Separation of Concerns**
- Database logic terpisah di `helpers/database.js`
- Validation logic terpisah di `helpers/validation.js` 
- Response handling terpisah di `helpers/response.js`
- Routes terpisah di `routes/dataRoutes.js`

### 2. **Reusability**
- Helper functions bisa digunakan ulang di berbagai endpoint
- Constants terpusat dan mudah diubah
- Response format konsisten

### 3. **Maintainability**
- Code lebih mudah dibaca dan dipahami
- Mudah untuk menambah endpoint baru
- Mudah untuk debugging dan testing

### 4. **Scalability**
- Struktur folder yang jelas untuk ekspansi
- Modular design memungkinkan penambahan fitur
- Easy to add middleware, authentication, etc.

## 🔧 Cara Menambah Endpoint Baru

1. **Tambah route baru** di `/routes/dataRoutes.js` atau buat file route baru
2. **Gunakan helper yang ada** untuk database dan validation
3. **Gunakan response helper** untuk konsistensi response
4. **Tambah konstanta baru** di `/config/constants.js` jika diperlukan

## 📚 Best Practices

- ✅ Selalu gunakan helper response untuk konsistensi
- ✅ Validasi input menggunakan helper validation
- ✅ Gunakan konstanta untuk pesan dan status codes
- ✅ Tambahkan JSDoc comments untuk dokumentasi
- ✅ Handle error dengan proper error handling
- ✅ Gunakan async/await untuk operasi asynchronous (jika diperlukan)
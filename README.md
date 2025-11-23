# Grafana Service API

Server Express.js dengan API REST yang menyimpan data ke file database.json dengan struktur data yang fleksibel.

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan server:
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### 1. GET /api/data
Mengambil semua data

**Response:**
```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "description": "Sample user",
      "createdAt": "2025-11-21T10:00:00.000Z",
      "updatedAt": "2025-11-21T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

### 2. GET /api/data/:id
Mengambil data berdasarkan ID

**Response:**
```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "description": "Sample user",
    "createdAt": "2025-11-21T10:00:00.000Z",
    "updatedAt": "2025-11-21T10:00:00.000Z"
  }
}
```

### 3. POST /api/data (Upsert)
Sistem upsert dengan struktur data fleksibel: jika ID belum ada maka data akan ditambahkan, jika ID sudah ada maka data akan diupdate.

**Catatan Penting:**
- Struktur data bersifat fleksibel - tidak ada field wajib kecuali ID (jika diberikan)
- Field bisa berupa name, email, description, atau field lain apa saja
- Setiap data akan otomatis mendapat `createdAt` dan `updatedAt`

**Request Body untuk insert (tanpa ID - auto generate):**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Request Body untuk insert dengan ID spesifik:**
```json
{
  "id": 5,
  "title": "Task Title",
  "status": "pending",
  "priority": "high"
}
```

**Request Body untuk update (dengan ID yang sudah ada):**
```json
{
  "id": 1,
  "status": "completed",
  "notes": "Task finished successfully"
}
```

**Contoh struktur data fleksibel lainnya:**
```json
{
  "id": 10,
  "product_name": "Laptop",
  "price": 15000000,
  "category": "Electronics",
  "in_stock": true
}
```

**Response untuk insert:**
```json
{
  "success": true,
  "message": "Data berhasil ditambahkan",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-11-21T10:00:00.000Z",
    "updatedAt": "2025-11-21T10:00:00.000Z"
  },
  "operation": "insert"
}
```

**Response untuk update:**
```json
{
  "success": true,
  "message": "Data berhasil diupdate",
  "data": {
    "id": 1,
    "name": "John Smith",
    "status": "completed",
    "notes": "Task finished successfully",
    "createdAt": "2025-11-21T10:00:00.000Z",
    "updatedAt": "2025-11-21T10:30:00.000Z"
  },
  "operation": "update"
}
```

## Contoh Penggunaan dengan curl

### Mengambil semua data:
```bash
curl http://localhost:3000/api/data
```

### Mengambil data berdasarkan ID:
```bash
curl http://localhost:3000/api/data/1
```

### Menambah data baru (tanpa ID):
```bash
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Menambah data dengan ID dan struktur custom:
```bash
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"id":5,"title":"Task Title","status":"pending","priority":"high"}'
```

### Update data yang sudah ada (hanya field yang diubah):
```bash
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"id":1,"status":"completed","notes":"Task finished"}'
```

### Contoh data produk:
```bash
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"product_name":"Laptop","price":15000000,"category":"Electronics"}'
```

## Database

Data disimpan dalam file `database.json` dengan struktur fleksibel:
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-11-21T10:00:00.000Z",
      "updatedAt": "2025-11-21T10:00:00.000Z"
    },
    {
      "id": 2,
      "title": "Task Title",
      "status": "pending",
      "priority": "high",
      "createdAt": "2025-11-21T10:05:00.000Z",
      "updatedAt": "2025-11-21T10:05:00.000Z"
    },
    {
      "id": 3,
      "product_name": "Laptop",
      "price": 15000000,
      "category": "Electronics",
      "in_stock": true,
      "createdAt": "2025-11-21T10:10:00.000Z",
      "updatedAt": "2025-11-21T10:10:00.000Z"
    }
  ]
}
```

**Catatan:**
- Setiap record pasti memiliki `id`, `createdAt`, dan `updatedAt`
- Field lain bersifat dinamis dan fleksibel sesuai kebutuhan
- Tidak ada validasi struktur field - bisa menyimpan field apa saja
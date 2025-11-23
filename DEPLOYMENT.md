# Grafana Service - Deployment Guide

## 🎯 Executable Distribution

Aplikasi ini dapat dikompilasi menjadi executable file yang dapat berjalan tanpa perlu menginstall Node.js atau dependencies lainnya.

## 🔧 Cara Build Executable

### Otomatis (Recommended)
```bash
# Windows
.\build-executable.bat

# PowerShell
.\build-executable.ps1
```

### Manual
```bash
# Install pkg globally (jika belum ada)
npm install -g pkg

# Build untuk Windows saja
npm run build-win

# Build untuk semua platform
npm run build-all

# Build untuk platform specific
npm run build-linux    # Linux
npm run build-mac      # macOS
```

## 📁 Output Files

Setelah build, folder `dist/` akan berisi:

### Windows
- `grafana-service.exe` - Executable utama (40MB+)
- `start-server.bat` - Script untuk menjalankan server
- `database.json` - File database
- `README.txt` - Dokumentasi pengguna

### Linux  
- `grafana-service` - Executable untuk Linux
- `database.json` - File database

### macOS
- `grafana-service` - Executable untuk macOS  
- `database.json` - File database

## 🚀 Cara Deploy

### 1. Deploy ke Windows
1. Copy folder `dist/` ke komputer target
2. Double-click `start-server.bat` ATAU
3. Buka Command Prompt, jalankan `grafana-service.exe`

### 2. Deploy ke Linux/macOS
1. Copy folder `dist/` ke komputer target
2. Beri permission execute:
   ```bash
   chmod +x grafana-service
   ```
3. Jalankan:
   ```bash
   ./grafana-service
   ```

## ⚙️ Konfigurasi Environment

Executable mendukung environment variables:

```bash
# Windows
set PORT=8080
grafana-service.exe

# Linux/macOS  
export PORT=8080
./grafana-service
```

## 🔒 Keamanan & Proteksi Source Code

### ✅ Advantages:
- **Source code ter-compile** - Tidak bisa dibaca langsung
- **Single file distribution** - Mudah didistribusikan
- **No dependencies required** - Tidak perlu install Node.js di target machine
- **Cross-platform** - Support Windows, Linux, macOS
- **Small footprint** - Satu executable file ~40MB

### ⚠️ Considerations:
- **File size** - Executable cukup besar (~40MB) karena include Node.js runtime
- **Startup time** - Slightly lebih lambat dari native Node.js
- **Memory usage** - Penggunaan memory bisa lebih tinggi

## 📦 Alternative Distribution Methods

### 1. Docker Container
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
```

### 2. PM2 Process Manager  
```bash
npm install -g pm2
pm2 start index.js --name grafana-service
pm2 save
pm2 startup
```

### 3. Windows Service (dengan node-windows)
```bash
npm install -g node-windows
# Setup as Windows Service
```

## 🧪 Testing Deployment

Setelah deploy, test endpoints:

```bash
# Health check
curl http://localhost:3000/

# Test API
curl http://localhost:3000/api/data

# Test POST
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","status":"active"}'
```

## 📋 Troubleshooting

### Port sudah digunakan
```bash
# Windows - cari process yang menggunakan port 3000
netstat -ano | findstr 3000

# Linux/macOS
lsof -i :3000
```

### Permission denied (Linux/macOS)
```bash
chmod +x grafana-service
```

### File database tidak terbaca
- Pastikan `database.json` ada di folder yang sama dengan executable
- Check file permissions

## 🔄 Update Process

Untuk update aplikasi:
1. Build executable baru dengan versi terbaru
2. Stop service lama
3. Replace executable file
4. Restart service
5. Database file akan tetap preserved
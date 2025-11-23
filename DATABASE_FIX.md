# Database Path Fix untuk Executable

## 🐛 Problem
Saat aplikasi dikompilasi menjadi executable menggunakan `pkg`, file `database.json` menjadi read-only karena ter-bundle di dalam executable. Ini menyebabkan error saat mencoba menulis data:

```
Error writing to database: Error: Cannot write to packaged file
```

## ✅ Solution
Mengubah logika path database di `helpers/database.js` untuk menggunakan lokasi yang bisa ditulis berdasarkan context aplikasi:

### Before (❌ Tidak work untuk executable)
```javascript
const DATABASE_PATH = path.join(__dirname, '..', DATABASE_FILENAME);
```

### After (✅ Work untuk executable dan source code)
```javascript
let DATABASE_PATH;

if (process.pkg) {
  // Jika running dari executable, gunakan folder yang sama dengan executable
  DATABASE_PATH = path.join(path.dirname(process.execPath), DATABASE_FILENAME);
} else {
  // Jika running dari source code, gunakan folder project
  DATABASE_PATH = path.join(__dirname, '..', DATABASE_FILENAME);
}
```

## 🔧 Implementasi

### 1. Auto-detect Execution Context
- `process.pkg` - terdeteksi jika running dari executable
- `process.execPath` - path ke executable file
- `__dirname` - path ke source folder (untuk development)

### 2. Auto-initialization Database
```javascript
function readDatabase() {
  try {
    // Pastikan file database ada, jika tidak buat yang baru
    if (!fs.existsSync(DATABASE_PATH)) {
      initializeDatabase();
    }
    
    const data = fs.readFileSync(DATABASE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('Database file not found or corrupted, creating new one');
    initializeDatabase();
    return { data: [] };
  }
}
```

### 3. Database Path Logging
```javascript
// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`Database path: ${db.getDatabasePath()}`);
  
  // Pastikan database terinisialisasi
  db.readDatabase();
});
```

## 📋 Benefits

### ✅ Cross-environment Compatibility
- **Development**: Database di project folder
- **Executable**: Database di folder executable
- **PM2/Production**: Database di working directory

### ✅ Auto-initialization  
- Database dibuat otomatis jika tidak ada
- No manual setup required
- Graceful error handling

### ✅ Path Transparency
- Database path ditampilkan saat startup
- Easy debugging dan troubleshooting
- Clear untuk user dan developer

## 🧪 Testing

### Development Mode
```bash
npm start
# Output: Database path: D:\project\grafana-service\database.json
```

### Executable Mode
```bash
.\grafana-service.exe  
# Output: Database path: D:\dist\database.json
```

### API Testing
```bash
# Test POST
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","status":"active"}'

# Test GET
curl http://localhost:3000/api/data
```

## 📦 Distribution Impact

### File Structure
```
dist/
├── grafana-service.exe     # Executable (40MB+)
├── database.json           # ✅ Writable database file  
├── start-server.bat        # Launcher script
└── README.txt              # User documentation
```

### User Experience
- ✅ No configuration needed
- ✅ Database auto-creates on first run
- ✅ Data persists between restarts
- ✅ Portable - copy entire folder

## 🔄 Migration Notes

### Existing Installations
- Old executable: Database fails to write
- New executable: Database works automatically
- No data loss - old data preserved if database.json exists

### Development to Production
- Same codebase works in both environments
- No environment-specific changes needed
- Consistent behavior across deployments
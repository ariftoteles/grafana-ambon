# PM2 Executable Management

## 🚀 Running Grafana Service Executable dengan PM2

### ✅ **Ya, grafana-service.exe BISA dijalankan dengan PM2!**

PM2 tidak hanya untuk Node.js scripts, tetapi juga bisa menjalankan executable files (.exe).

## 📋 Commands untuk Executable

### Menjalankan
```bash
npm run pm2:exe-start        # Start executable dengan PM2
```

### Management
```bash
npm run pm2:exe-stop         # Stop executable
npm run pm2:exe-restart      # Restart executable  
npm run pm2:exe-delete       # Remove dari PM2
npm run pm2:exe-status       # Cek status executable
```

### PM2 Direct Commands
```bash
pm2 start ecosystem.exe.config.json    # Start executable
pm2 stop grafana-exe                    # Stop 
pm2 restart grafana-exe                 # Restart
pm2 delete grafana-exe                  # Delete
pm2 status grafana-exe                  # Status
```

## ⚙️ Konfigurasi (ecosystem.exe.config.json)

```json
{
  "apps": [{
    "name": "grafana-exe",
    "script": "./dist/grafana-service.exe",
    "interpreter": "none",
    "instances": 1,
    "autorestart": true,
    "max_restarts": 3,
    "max_memory_restart": "150M"
  }]
}
```

### Key Points:
- **`interpreter: "none"`** - Penting untuk executable files
- **`script`** - Path ke .exe file
- **No logging** - Simplified untuk performance

## 🎯 Keunggulan PM2 untuk Executable

### ✅ **Process Management:**
- Auto-restart jika crash
- Memory monitoring  
- Process persistence
- Easy start/stop/restart

### ✅ **Production Ready:**
- Background execution
- Auto-boot on system restart
- Process monitoring
- Resource limits

### ✅ **Simple Commands:**
- Consistent interface
- Easy management
- Status monitoring

## 🔄 Comparison: PM2 vs Direct Running

| Feature | Direct .exe | PM2 |
|---------|-------------|-----|
| Auto-restart | ❌ | ✅ |
| Background | Manual | ✅ |  
| Memory limit | ❌ | ✅ |
| Easy management | ❌ | ✅ |
| Boot persistence | ❌ | ✅ |
| Status monitoring | ❌ | ✅ |

## 🛠️ Production Setup

### 1. Start Service
```bash
npm run pm2:exe-start
```

### 2. Save Configuration
```bash  
pm2 save
```

### 3. Auto-boot Setup
```bash
pm2 startup
```

### 4. Monitor
```bash
pm2 status
pm2 monit
```

## 📊 Monitoring

### Status Check:
```bash
npm run pm2:exe-status
```

### Output Example:
```
┌────┬─────────────┬──────┬──────┬───────────┬──────────┬──────────┐
│ id │ name        │ mode │ ↺    │ status    │ cpu      │ memory   │
├────┼─────────────┼──────┼──────┼───────────┼──────────┼──────────┤
│ 1  │ grafana-exe │ fork │ 0    │ online    │ 0%       │ 42.1mb   │
└────┴─────────────┴──────┴──────┴───────────┴──────────┴──────────┘
```

## 🎉 **Summary**

✅ **Grafana Service Executable dapat dijalankan dengan PM2**
✅ **Process management yang robust**  
✅ **Auto-restart dan monitoring**
✅ **Production-ready deployment**
✅ **Easy management dengan npm scripts**

**PM2 memberikan semua keuntungan process management untuk executable file, sama seperti Node.js applications!**
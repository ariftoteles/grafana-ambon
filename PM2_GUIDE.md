# PM2 Process Manager Guide

## 🚀 Quick Start

### Menjalankan dengan PM2
```bash
# Start in production mode
npm run pm2:start-prod

# Start in development mode  
npm run pm2:start-dev

# Or use PM2 manager script
.\pm2-manager.bat      # Windows batch
.\pm2-manager.ps1      # PowerShell
```

## 📋 Available Commands

### Basic Operations
```bash
npm run pm2:start      # Start with default config
npm run pm2:start-dev  # Start in development mode
npm run pm2:start-prod # Start in production mode
npm run pm2:stop       # Stop the service
npm run pm2:restart    # Restart the service
npm run pm2:reload     # Reload (zero-downtime restart)
npm run pm2:delete     # Remove from PM2
```

### Monitoring & Logs
```bash
npm run pm2:status     # Show process status
npm run pm2:logs       # Show real-time logs
npm run pm2:monit      # Open monitoring interface
```

### Direct PM2 Commands
```bash
pm2 list               # List all processes
pm2 info grafana-service # Detailed process info
pm2 logs grafana-service --lines 50 # Show last 50 log lines
pm2 flush              # Clear all logs
```

## ⚙️ Configuration (ecosystem.config.json)

### Environment Variables
- **Production**: PORT=3000, NODE_ENV=production
- **Development**: PORT=3000, NODE_ENV=development  
- **Staging**: PORT=3001, NODE_ENV=staging

### Process Settings
- **Instances**: 1 (single instance)
- **Max Memory**: 200MB (auto-restart if exceeded)
- **Auto Restart**: Yes
- **Max Restarts**: 10 attempts
- **Min Uptime**: 10 seconds before considering stable

### Logging
- **Error Log**: `./logs/err.log`
- **Output Log**: `./logs/out.log`  
- **Combined Log**: `./logs/combined.log`

## 🔧 Production Setup

### 1. Auto-start on System Boot
```bash
# Setup PM2 to start on boot
pm2 startup

# Save current process list
pm2 save

# Your processes will now start automatically on reboot
```

### 2. Process Persistence
```bash
# Save current processes
pm2 save

# Restore saved processes
pm2 resurrect
```

### 3. Monitoring
```bash
# Real-time monitoring
pm2 monit

# Web-based monitoring (optional)
pm2 plus
```

## 📊 Monitoring Features

### Real-time Stats
- CPU usage
- Memory consumption  
- Restart count
- Uptime
- Log output

### Process Management
- Auto-restart on crashes
- Memory limit enforcement
- Log rotation
- Cluster mode support (if needed)

## 🛠️ Troubleshooting

### Service Won't Start
```bash
# Check PM2 daemon
pm2 ping

# View detailed logs
pm2 logs grafana-service --err

# Check process info
pm2 info grafana-service
```

### High Memory Usage
```bash
# Check memory usage
pm2 status

# Restart to clear memory
pm2 restart grafana-service

# Check logs for memory leaks
pm2 logs grafana-service | grep -i memory
```

### Port Conflicts
```bash
# Check what's using port 3000
netstat -ano | findstr 3000

# Use different port
set PORT=8080
pm2 restart grafana-service --update-env
```

## 🔄 Update Deployment

### Zero-downtime Updates
```bash
# 1. Update your code
git pull origin main
npm install

# 2. Reload without downtime
pm2 reload grafana-service

# Or restart (brief downtime)
pm2 restart grafana-service
```

### Rollback
```bash
# If something goes wrong
git checkout previous-commit
pm2 restart grafana-service
```

## 📈 Performance Benefits

### vs Regular Node.js
✅ **Auto-restart** on crashes
✅ **Memory monitoring** and limits  
✅ **Log management** and rotation
✅ **Process persistence** across reboots
✅ **Zero-downtime** deployments
✅ **Built-in monitoring** tools

### vs Manual Process
✅ **Automatic recovery** from failures
✅ **Consistent environment** variables
✅ **Centralized logging**
✅ **Easy scaling** (if needed later)
✅ **Production-ready** process management

## 🎯 Best Practices

### Development
- Use `npm run pm2:start-dev` for development
- Check logs frequently: `npm run pm2:logs`
- Use `pm2 reload` for code updates

### Production  
- Use `npm run pm2:start-prod` for production
- Set up `pm2 startup` for auto-boot
- Monitor with `pm2 monit`
- Regularly check `pm2 status`

### Maintenance
- Clean logs periodically: `pm2 flush`
- Monitor memory usage
- Keep PM2 updated: `npm update -g pm2`
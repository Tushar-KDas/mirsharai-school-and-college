# Production Deployment Guide
## Mirsharai School and College (মিরসরাই স্কুল এন্ড কলেজ)

### 1. Production Requirements
- Node.js 18 LTS or 20 LTS
- Reverse Proxy: Nginx or Caddy with SSL (Let's Encrypt)
- Process Manager: PM2 or Docker Container
- Database: SQLite (for single-server setups) or PostgreSQL (recommended for high concurrent writes)

### 2. Deployment Steps

#### Step 1: Clone and Configure Environment
```bash
git clone <repository_url> mirsharai-school-and-college
cd mirsharai-school-and-college
cp .env.example .env
# Update JWT_SECRET and production domain in .env
```

#### Step 2: Install & Build
```bash
npm install --production=false
npx prisma generate
npx prisma db push
npm run prisma:seed # Run if initial bootstrap data is required
npm run build
```

#### Step 3: Run with PM2 Process Manager
```bash
npm install -g pm2
pm2 start npm --name "mirsharai-college" -- start -- -p 3000
pm2 save
pm2 startup
```

#### Step 4: Nginx Reverse Proxy Configuration
```nginx
server {
    listen 80;
    server_name mirsharaicollege.edu.bd www.mirsharaicollege.edu.bd;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name mirsharaicollege.edu.bd www.mirsharaicollege.edu.bd;

    ssl_certificate /etc/letsencrypt/live/mirsharaicollege.edu.bd/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mirsharaicollege.edu.bd/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Backup and Disaster Recovery
- **Database Backup:** Daily automated cron job copying `prisma/dev.db` (or `pg_dump` for Postgres) to secure off-site object storage.
```bash
# Example Daily SQLite Backup Cron
0 2 * * * cp /path/to/dev.db /backups/msc_backup_$(date +\%F).db
```

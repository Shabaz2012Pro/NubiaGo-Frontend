
#!/bin/bash

echo "🚀 Starting NubiaGO Production Deployment..."

# Check if this is the first run
if [ ! -f "server/node_modules/.package-lock.json" ]; then
    echo "📦 Installing backend dependencies..."
    cd server && npm install --production
    cd ..
fi

if [ ! -f "node_modules/.package-lock.json" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install --production
fi

# Build frontend
echo "🏗️ Building frontend..."
npm run build

# Start backend server
echo "🖥️ Starting backend server..."
cd server && npm start

#!/bin/bash

# GreenPulse AI - Production Setup Script

echo "🌱 Setting up GreenPulse AI Production Environment..."

# 1. Database Setup
echo "📦 Setting up PostgreSQL database..."
createdb greenpulse_db 2>/dev/null || echo "Database already exists"
psql greenpulse_db < ecosphere-ai/backend/database_schema.sql

# 2. Backend Setup
echo "⚙️ Setting up backend..."
cd ecosphere-ai/backend

python -m venv venv
source venv/bin/activate

pip install -r requirements.txt

# Create .env file
if [ ! -f .env ]; then
    cp ../../.env.example .env
    echo "✅ Created .env file - please update with your values"
fi

# 3. Frontend Setup
echo "🎨 Setting up frontend..."
cd ../frontend

npm install

if [ ! -f .env.local ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
    echo "✅ Created .env.local file"
fi

echo "
✅ Setup complete!

Next steps:
1. Update .env files with your configuration
2. Start backend: cd ecosphere-ai/backend && source venv/bin/activate && uvicorn main:app --reload
3. Start frontend: cd ecosphere-ai/frontend && npm run dev

Frontend: http://localhost:3000
Backend: http://localhost:8000
"

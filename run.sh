#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd fraud_dashboard || exit

echo "🚀 Starting Next.js app on 0.0.0.0:3000..."
npm run dev -- -H 0.0.0.0

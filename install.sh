#!/bin/bash

echo "🚀 Cloning repo..."
git clone https://github.com/hjenkins04/fraud_dashboard.git
cd fraud_dashboard || exit

echo "🧠 Installing NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$HOME/.nvm"
# Load nvm
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "⬇️ Installing Node.js LTS..."
nvm install --lts

echo "📦 Installing project dependencies..."
npm install

echo "✅ Done! Use './run.sh' to start the app."

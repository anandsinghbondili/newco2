#!/bin/bash

set -e

echo "🧪 Checking Python version..."
PYTHON_VERSION=$(python3 --version | cut -d " " -f 2)
if [[ "$PYTHON_VERSION" < "3.10" ]]; then
    echo "❌ Python >= 3.10 required. Current: $PYTHON_VERSION"
    exit 1
fi

echo "✅ Python version is OK: $PYTHON_VERSION"

echo "📦 Creating virtual environment (if not exists)..."
python3 -m venv .venv
source .venv/bin/activate

echo "⬆️ Upgrading pip, setuptools, wheel..."
pip install --upgrade pip setuptools wheel

echo "🛠 Installing build and hatch (optional but recommended)..."
pip install build hatch

echo "📄 Installing backend dependencies from pyproject.toml..."
pip install .

echo "🧪 Installing dev dependencies..."
pip install \
    pytest<8.0.0,>=7.4.3 \
    mypy<2.0.0,>=1.8.0 \
    ruff<1.0.0,>=0.2.2 \
    pre-commit<4.0.0,>=3.6.2 \
    types-passlib<2.0.0.0,>=1.7.7.20240106 \
    coverage<8.0.0,>=7.4.3

echo "✅ Backend setup complete."

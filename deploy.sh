#!/bin/bash

# Script de despliegue para Azure
# Compila la app y despliega solo la carpeta dist

echo "🏗️  Compilando aplicación..."
npm install
npm run build

echo "📂 Estructura para Azure"
# Azure desplegará solo dist/app_bibiotecainteligente

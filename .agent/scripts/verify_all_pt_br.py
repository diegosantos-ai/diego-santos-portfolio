#!/usr/bin/env python3
import sys
import subprocess
import argparse
from pathlib import Path
from datetime import datetime

class Cores:
    CABECALHO = '\033[95m'
    AZUL = '\033[94m'
    CIANO = '\033[96m'
    VERDE = '\033[92m'
    AMARELO = '\033[93m'
    VERMELHO = '\033[91m'
    FIM = '\033[0m'
    NEGRITO = '\033[1m'

def print_cabecalho(texto: str):
    print(f"\n{Cores.NEGRITO}{Cores.CIANO}{'='*70}{Cores.FIM}")
    print(f"{Cores.NEGRITO}{Cores.CIANO}{texto.center(70)}{Cores.FIM}")
    print(f"{Cores.NEGRITO}{Cores.CIANO}{'='*70}{Cores.FIM}\n")

def run_cmd(nome: str, comando: list):
    print(f"{Cores.AZUL}🔄 Executando: {nome}...{Cores.FIM}", end="\r")
    try:
        resultado = subprocess.run(comando, capture_output=True, text=True)
        if resultado.returncode == 0:
            print(f"{Cores.VERDE}✅ {nome}: PASSOU{Cores.FIM}      ")
            return True, resultado.stdout
        else:
            print(f"{Cores.VERMELHO}❌ {nome}: FALHOU{Cores.FIM}      ")
            return False, resultado.stderr
    except Exception as e:
        print(f"{Cores.VERMELHO}❌ {nome}: ERRO ({str(e)}){Cores.FIM}")
        return False, str(e)

def main():
    print_cabecalho("🚀 ESCUDO DE ESTABILIDADE NEXO - VERIFICAÇÃO GLOBAL")
    
    root = Path(__file__).parent.parent.parent.resolve()
    frontend = root / "frontend"
    backend = root
    
    sucesso_geral = True
    
    # 1. Segurança
    print(f"\n{Cores.NEGRITO}🛡️ CAMADA DE SEGURANÇA{Cores.FIM}")
    ok, err = run_cmd("Scan de Vulnerabilidades", ["python", str(root / ".agent/skills/vulnerability-scanner/scripts/security_scan.py"), str(root)])
    if not ok: sucesso_geral = False

    # 2. Frontend (Next.js)
    print(f"\n{Cores.NEGRITO}🎨 CAMADA FRONTEND (NEXT.JS){Cores.FIM}")
    if frontend.exists():
        # Tipagem
        ok, err = run_cmd("Verificação de Tipos (TSC)", ["powershell", "-Command", f"cd {frontend}; npx tsc --noEmit"])
        if not ok: 
            sucesso_geral = False
            print(f"{Cores.AMARELO}Dica: Verifique se todos os imports estão corretos.{Cores.FIM}")
        
        # Lint
        ok, err = run_cmd("Linting (ESLint)", ["powershell", "-Command", f"cd {frontend}; npm run lint"])
        if not ok: sucesso_geral = False
    else:
        print(f"{Cores.AMARELO}⚠️ Direitório frontend não encontrado.{Cores.FIM}")

    # 3. Backend (FastAPI)
    print(f"\n{Cores.NEGRITO}⚙️ CAMADA BACKEND (FASTAPI){Cores.FIM}")
    # Simples verificação de syntax/imports no backend (exemplo)
    ok, err = run_cmd("Check de Sintaxe Python", ["powershell", "-Command", "Get-ChildItem -Recurse -Filter *.py | ForEach-Object { python -m py_compile $_.FullName }"])
    if not ok: sucesso_geral = False

    print_cabecalho("RESULTADO FINAL")
    if sucesso_geral:
        print(f"{Cores.VERDE}{Cores.NEGRITO}✨ SISTEMA ÍNTEGRO - PRONTO PARA OPERAÇÃO ✨{Cores.FIM}")
        sys.exit(0)
    else:
        print(f"{Cores.VERMELHO}{Cores.NEGRITO}❌ FALHAS DETECTADAS - RESOLVA OS ERROS ACIMA ❌{Cores.FIM}")
        sys.exit(1)

if __name__ == "__main__":
    main()

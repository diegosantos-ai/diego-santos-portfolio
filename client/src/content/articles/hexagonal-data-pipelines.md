---
title: "Arquitetura Hexagonal em Pipelines de Dados"
date: "2026-02-18"
tags: ["Arquitetura", "Data Engineering", "Python", "Boas Práticas"]
excerpt: "Como aplicar Ports & Adapters para criar pipelines de dados testáveis, desacoplados e preparados para mudanças de tecnologia."
---

# Arquitetura Hexagonal para Data Engineers

Quando um pipeline de dados quebra em produção, o problema raramente é a query SQL. É o acoplamento. A query está presa em um script Jupyter. O script depende de uma planilha específica. E ninguém consegue testar nada isoladamente.

A **Arquitetura Hexagonal** (Ports & Adapters) resolve isso. E não é hype—é praticidade.

## O Problema: Scripts Acoplados

```python
# ❌ Jeito tradicional (quebrável)
def process_data():
    df = pd.read_excel("/mnt/data/input.xlsx")  # Acoplado ao filesystem
    df_clean = df.dropna()
    df_clean.to_parquet("s3://bucket/output.parquet")  # Acoplado ao S3
```

Problemas:
- **Não testável**: Como mockar o S3 em testes unitários?
- **Inflexível**: Quer trocar S3 por GCS? Refatora tudo.
- **Opaco**: Onde está a lógica de negócio vs infraestrutura?

## A Solução: Ports & Adapters

Separe em 3 camadas:

### 1. Domínio (Regras de Negócio)
O coração do sistema. Não sabe de onde vem os dados nem para onde vão.

```python
# domain/data_processor.py
from typing import Protocol
from dataclasses import dataclass

@dataclass
class RawData:
    id: int
    value: float

@dataclass  
class CleanData:
    id: int
    value: float
    category: str

class DataRepository(Protocol):
    """Port: contrato para leitura"""
    def read(self) -> list[RawData]: ...

class StorageRepository(Protocol):
    """Port: contrato para escrita"""
    def write(self, data: list[CleanData]) -> None: ...

class DataProcessor:
    """Lógica pura, sem acoplamento"""
    def __init__(self, reader: DataRepository, writer: StorageRepository):
        self.reader = reader
        self.writer = writer
    
    def process(self) -> None:
        raw = self.reader.read()
        clean = [self._transform(r) for r in raw if r.value > 0]
        self.writer.write(clean)
    
    def _transform(self, data: RawData) -> CleanData:
        category = "alto" if data.value > 100 else "baixo"
        return CleanData(data.id, data.value, category)
```

### 2. Adapters (Infraestrutura)
Implementações concretas dos Ports.

```python
# adapters/excel_reader.py
import pandas as pd
from domain.data_processor import DataRepository, RawData

class ExcelReader(DataRepository):
    """Adapter para ler Excel"""
    def __init__(self, filepath: str):
        self.filepath = filepath
    
    def read(self) -> list[RawData]:
        df = pd.read_excel(self.filepath)
        return [RawData(row.id, row.value) for _, row in df.iterrows()]

# adapters/s3_writer.py
import boto3
from domain.data_processor import StorageRepository, CleanData

class S3Writer(StorageRepository):
    """Adapter para escrever no S3"""
    def __init__(self, bucket: str, key: str):
        self.bucket = bucket
        self.key = key
        self.s3 = boto3.client("s3")
    
    def write(self, data: list[CleanData]) -> None:
        # Serializa e envia para S3
        ...
```

### 3. Composition Root (Wiring)
Onde tudo se conecta. Só aqui existe conhecimento de tecnologias específicas.

```python
# main.py
from domain.data_processor import DataProcessor
from adapters.excel_reader import ExcelReader
from adapters.s3_writer import S3Writer

def main():
    reader = ExcelReader("/data/input.xlsx")
    writer = S3Writer("my-bucket", "output/clean.parquet")
    
    processor = DataProcessor(reader, writer)
    processor.process()

if __name__ == "__main__":
    main()
```

## Benefícios na Prática

| Aspecto | Sem Hexagonal | Com Hexagonal |
|---------|--------------|---------------|
| **Testes** | Mockar S3 complexo | Injeção de FakeRepository |
| **Mudança de tech** | Refatoração grande | Novo adapter, domínio intacto |
| **Legibilidade** | Lógica misturada com I/O | Separação clara |
| **CI/CD** | Testes lentos (precisam S3) | Testes rápidos (in-memory) |

## Testando com Injeção de Dependências

```python
# tests/test_processor.py
from domain.data_processor import DataProcessor, RawData, CleanData

class FakeReader:
    def read(self):
        return [RawData(1, 50.0), RawData(2, 150.0)]

class FakeWriter:
    def __init__(self):
        self.written = []
    
    def write(self, data):
        self.written = data

def test_processor_filters_negative():
    reader = FakeReader()
    writer = FakeWriter()
    processor = DataProcessor(reader, writer)
    
    processor.process()
    
    assert len(writer.written) == 2
    assert writer.written[0].category == "baixo"
    assert writer.written[1].category == "alto"
```

> Zero mocks complexos. Zero dependências externas. Teste puro e rápido.

## Quando Usar?

- **Pipelines críticos**: Que não podem quebrar silenciosamente
- **Equipes grandes**: Onde múltiplos devs tocam o mesmo código
- **Mudanças frequentes**: Quando sabe que a fonte ou destino vão mudar
- **Testabilidade**: Quando precisa de testes unitários rápidos

## Conclusão

Arquitetura Hexagonal não é sobre over-engineering. É sobre **isolamento de responsabilidades**. No mundo de dados, onde fontes e destinos mudam constantemente, esse isolamento paga dividendos na manutenibilidade e confiança do pipeline.

O domínio é rei. A infraestrutura é substituível.

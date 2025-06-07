# 🏅 Sistema TAF-AI: Análise Inteligente de Teste de Aptidão Física

<p align="center">
  <img src="https://img.shields.io/github/v/release/[SEU_USUARIO_GITHUB]/[SEU_REPOSITORIO]?style=for-the-badge&logo=github" alt="Versão">
  <img src="https://img.shields.io/github/last-commit/[SEU_USUARIO_GITHUB]/[SEU_REPOSITORIO]?style=for-the-badge&logo=github" alt="Último Commit">
  <img src="https://img.shields.io/github/stars/[SEU_USUARIO_GITHUB]/[SEU_REPOSITORIO]?style=for-the-badge&logo=github" alt="Estrelas no GitHub">
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="Licença">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask">
  <img src="https://img.shields.io/badge/YOLO-00FFFF?style=for-the-badge&logo=yolo" alt="YOLOv8">
  <img src="https://img.shields.io/badge/OpenCV-27338e?style=for-the-badge&logo=opencv&logoColor=white" alt="OpenCV">
</p>

> **Missão:** Automatizar e qualificar a avaliação de testes de aptidão física (TAF) com a precisão da Inteligência Artificial, fornecendo feedback justo, consistente e baseado em dados.

---

## ✨ Visão Geral

Avaliações de testes físicos, como as de concursos públicos e academias, são frequentemente marcadas pela subjetividade, cansaço do avaliador e falta de consistência. O **Sistema TAF-AI** nasceu para resolver esse problema.

Este projeto é uma plataforma completa (full-stack) que utiliza **Visão Computacional** para analisar vídeos de exercícios. Um usuário pode enviar um vídeo realizando flexões, e a nossa IA, construída com **YOLOv8** e **OpenCV**, não apenas conta as repetições, mas avalia a **qualidade** de cada movimento, identificando se a amplitude correta foi atingida.

O resultado é um dashboard intuitivo, construído com **React** e **TypeScript**, onde avaliadores podem gerenciar candidatos, visualizar relatórios detalhados e ter uma base de dados concreta para avaliações justas e eficientes.

---

## 🎬 Demonstração da Plataforma

<p align="center">
  <em>(Substitua pela sua incrível demo em GIF!)</em>
  <br>
  <img src="https://placehold.co/800x450/2d3748/ffffff?text=Demonstra%C3%A7%C3%A3o+Completa+do+Fluxo" alt="Demonstração do Projeto" width="90%">
  <br>
  <sup>Fluxo completo: Gerenciamento de candidatos, análise de vídeo e visualização de resultados.</sup>
</p>

---

## 🚀 Funcionalidades Principais

- **🤖 Avaliação Precisa com IA:** Backend em **Python/Flask** que processa vídeos com **YOLOv8m**, aplicando regras de negócio para validar a forma e amplitude de cada repetição.
- **🖥️ Dashboard de Gerenciamento:** Interface moderna em **React** e **Shadcn/UI** para visualizar, pesquisar e filtrar todos os candidatos analisados.
- **📊 Relatórios Detalhados Individuais:** Para cada candidato, a plataforma exibe o vídeo original, o vídeo com a análise da IA sobreposta e um painel com todas as métricas de desempenho.
- **☁️ Sincronização com Google Drive:** Um script dedicado importa novos candidatos e vídeos diretamente de uma pasta compartilhada no Google Drive, automatizando o fluxo de trabalho.
- **🗄️ Persistência de Dados:** Todos os resultados são armazenados em um banco de dados **SQLite**, criando um histórico confiável e auditável.
- **🎥 Otimização de Vídeo para Web:** Utiliza **FFmpeg** para garantir que todos os vídeos sejam transcodificados para um formato de alta compatibilidade com navegadores.

---

## 🛠️ Ecossistema Tecnológico

| Categoria | Tecnologia |
| :--- | :--- |
| **Frontend** | `React`, `TypeScript`, `Vite`, `Tailwind CSS`, `Shadcn/UI`, `TanStack Query`, `Axios` |
| **Backend** | `Python`, `Flask`, `SQLite` |
| **IA & Visão Computacional** | `Ultralytics (YOLOv8)`, `OpenCV` |
| **Processamento de Vídeo** | `FFmpeg` |
| **Nuvem & APIs** | `Google Drive API` |
| **Ambiente e Qualidade** | `Node.js`, `NPM`, `Ambiente Virtual Python (venv)` |

---

## ⚙️ Instalação e Execução Local

Siga estes passos para ter a aplicação completa rodando na sua máquina.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v18+) e NPM
- [Python](https://www.python.org/) (v3.10+) e PIP
- **[FFmpeg](https://www.ffmpeg.org/download.html)** instalado e disponível no PATH do seu sistema.
- Credenciais da API do Google Drive (arquivo `google_credentials.json`).

### 1. Clonar o Repositório

```bash
git clone https://github.com/[SEU_USUARIO_GITHUB]/[SEU_REPOSITORIO].git
cd [NOME_DO_PROJETO]
```

### 2. Configurar o Backend

```bash
cd backend
python -m venv venv
# No Windows
venv\Scripts\activate
# No Mac/Linux
# source venv/bin/activate

pip install -r requirements.txt
```
> **Atenção:** Coloque seu arquivo `google_credentials.json` na pasta `backend` antes de prosseguir.

### 3. Criar e Popular o Banco de Dados
Este passo é essencial. Primeiro, crie o banco e depois sincronize com os vídeos do seu Google Drive.

```bash
# Ainda dentro da pasta 'backend' e com o venv ativado
# 1. Cria o arquivo de banco de dados vazio com a estrutura correta
python database.py

# 2. Roda a sincronização (isso vai demorar, pois vai baixar e analisar todos os vídeos)
python sync_drive.py
```

### 4. Configurar o Frontend

```bash
# A partir da raiz do projeto
cd frontend
npm install
```

### 5. Executar a Aplicação

Você precisará de **dois terminais** abertos.

- **Terminal 1: Iniciar o Backend**
  ```bash
  cd backend
  # Ative o venv se ainda não estiver ativado
  python app.py
  ```

- **Terminal 2: Iniciar o Frontend**
  ```bash
  cd frontend
  npm run dev
  ```

🎉 Agora, abra **[http://localhost:5173](http://localhost:5173)** (ou a porta que o Vite indicar) no seu navegador!

---

## 🗺️ Roadmap de Evolução

- [x] **Arquitetura Full-Stack:** Frontend React desacoplado de um Backend Python.
- [x] **Processamento com IA:** Análise de flexões com contagem de repetições.
- [x] **Lógica de Qualidade:** Diferenciação entre movimentos corretos e incorretos baseada em amplitude.
- [x] **Dashboard de Gerenciamento:** Visualização e busca de todos os candidatos.
- [x] **Página de Detalhes:** Relatório completo por candidato, com visualização de vídeos.
- [x] **Sincronização com Google Drive:** Pipeline automatizada para novos candidatos.
- [ ] **Fase 2: Expansão de Exercícios**
    - [ ] Análise de Abdominais (contagem e verificação de postura).
    - [ ] Análise de Barra Fixa (contagem e verificação de queixo acima da barra).
- [ ] **Fase 3: Recursos Avançados**
    - [ ] Sistema de Autenticação (Login para avaliadores).
    - [ ] Geração e Download de Relatórios em PDF.
    - [ ] Dashboard de progresso individual para cada candidato.

---

## 🤝 Contribuições
Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1.  Faça um Fork do projeto
2.  Crie sua Feature Branch (`git checkout -b feature/MinhaNovaFeature`)
3.  Faça o Commit de suas mudanças (`git commit -m 'Adiciona MinhaNovaFeature'`)
4.  Faça o Push para a Branch (`git push origin feature/MinhaNovaFeature`)
5.  Abra um Pull Request

---

## 📄 Licença
Distribuído sob a Licença MIT. Veja `LICENSE` para mais informações.

---

## 📬 Contato

**Raphael Lazzarini**

- **LinkedIn:** `https://www.linkedin.com/in/raphael-lazzarini-1a3a07245`
- **GitHub:** `https://github.com/raphalrez`
- **E-mail:** `raphaelderezende@gmail.com`

<br>

<p align="center">
  Feito com ❤️, Python e React
</p>
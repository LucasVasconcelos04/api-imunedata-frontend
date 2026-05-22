# ImuniData Frontend

Interface web do sistema ImuniData, desenvolvida em React com Vite. Permite cadastrar, listar, filtrar, editar e excluir registros de vacinação, além de importar dados via CSV e visualizar resumos agregados por estado.

---

## Repositório do Backend

A API Java + Spring Boot que alimenta este frontend está em um repositório separado:

[api-ImuneData](https://github.com/LucasVasconcelos04/api-ImuneData)

Para utilizar o sistema completo, é necessário clonar e executar ambos os projetos.

---

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Biblioteca | React 18 |
| Build Tool | Vite |
| HTTP Client | Axios |
| Linguagem | JavaScript |
| Estilização | CSS puro (Dark Mode) |

---

## Como executar

### Pré-requisitos

- Node.js 18+ instalado
- Backend rodando em `http://localhost:8080`

### Passos

1. Clone o repositório:
```bash
   git clone https://github.com/LucasVasconcelos04/api-imunedata-frontend.git
   cd api-imunedata-frontend
```

2. Instale as dependências:
```bash
   npm install
```

3. Execute a aplicação:
```bash
   npm run dev
```

4. Acesse no navegador: `http://localhost:5173`

---

## Funcionalidades

- **Listagem de registros** com tabela paginada e dados formatados em padrão brasileiro
- **Filtros combinados em tempo real** por vacina, estado (UF) e região geográfica
- **Cadastro de registros** via formulário com validação
- **Edição de registros** com botão de atualização desabilitado enquanto não há alterações
- **Exclusão de registros** com modal de confirmação
- **Importação de CSV** com feedback visual de sucesso ou erro
- **Resumo agregado por estado** com totalização de doses aplicadas
- **Navegação por abas** para organização das funcionalidades
- **Dark mode** com paleta de cores moderna

---

## Estrutura de Pastas

```
src/
├── components/         → Componentes reutilizáveis (Tabela, Filtros, Formulário, etc.)
├── pages/              → Página principal (Dashboard)
├── services/           → Camada de comunicação com a API (Axios)
├── App.jsx             → Componente raiz
├── App.css             → Estilos globais
└── main.jsx            → Ponto de entrada da aplicação
```

---

## Autores

- **Lucas Vasconcelos Gonçalves de Souza** — [GitHub](https://github.com/LucasVasconcelos04)

Trabalho desenvolvido para a disciplina ministrada pela Prof. Mestre Sirley Ambrosia Vitorio Addão, FATEC Ipiranga.

---

## Licença

Lucas Vasconcelos.

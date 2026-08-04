# Tricentis Shop - Testes E2E com Playwright

Um conjunto de testes end-to-end para a loja de exemplo Tricentis, implementado com Playwright e TypeScript.

## Descrição

Este repositório contém testes automatizados que validam fluxos da aplicação (login, navegação, busca de produtos e envio por email para amigo). O objetivo é servir como base para testes de regressão e demonstrar boas práticas com Playwright.

## Stack

- Linguagem: TypeScript
- Test runner: Playwright
- Configuração: `playwright.config.ts`

## Estrutura do projeto

- `pages/` — Páginas e helpers de Page Object
- `helpers/` — Decorators e utilitários para os testes
- `tests/` — Especificações (specs) de teste
- `playwright-report/` — Relatórios gerados (HTML)
- `test-results/` — Resultados de execução

Arquivos importantes:

- [playwright.config.ts](playwright.config.ts)
- [package.json](package.json)
- [pages/emailFriendPage.ts](pages/emailFriendPage.ts)

## Como executar

Pré-requisitos:

- Node.js (versão LTS recomendada)

Instalação:

```bash
npm install
npx playwright install
```

Executar os testes:

```bash
npx playwright test
```

Ver relatório HTML gerado:

```bash
npx playwright show-report
# ou abra diretamente: playwright-report/index.html
```

## Convenções

- Page Objects em `pages/` para separar lógica de interação.
- Specs curtos e focados em um fluxo por teste.

## Contribuição

1. Abra uma issue descrevendo a melhoria ou bug.
2. Abra um PR com mudanças pequenas e testes quando aplicável.

## Próximos passos

- Adicionar CI (GitHub Actions) para rodar os testes automaticamente.
- Publicar relatórios e screenshots como artefatos de build.

---

![React.js](https://img.shields.io/badge/React.js-15-blue?logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwindcss)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/status-beta-yellow)


# 🛍️ Produto E-commerce - Montink (Processo Seletivo)

Este projeto é uma página de produto para e-commerce desenvolvida em **React** com **Tailwind CSS**, criada como parte de um **processo seletivo** da empresa **Montink**.

---

## ✅ Funcionalidades

- **Imagens do Produto**
  - Imagem principal ocupa cerca de 35% da largura da tela.
  - Miniaturas abaixo da imagem principal.
  - Ao clicar nas miniaturas, a imagem principal é alterada.
  - Imagem principal cobre totalmente sua caixa, mantendo responsividade.

- **Título e Preço do Produto**
  - Exibição dinâmica com base nos dados do produto.

- **Seletores de Variantes de Produto**
  - Tamanho e Cor.
  - Gerados de maneira dinâmica a partir de arrays ou objetos.

- **Campo de Disponibilidade de Entrega**
  - Campo para digitar o CEP.
  - Consulta automática à API [ViaCEP](https://viacep.com.br/).
  - Exibe endereço completo caso o CEP exista.
  - Tratamento para CEP inválido.

- **Persistência das Ações do Usuário**
  - Todas as seleções (imagem, cor, tamanho) são salvas no `localStorage`.
  - Mantidas por **15 minutos** após a última interação.
  - Após este tempo, os dados expiram automaticamente.

---

## 🛠️ Tecnologias Utilizadas

- ⚛️ React
- 💨 Tailwind CSS
- 🟦 TypeScript
- 🐻 Zustand (Gerenciamento de Estado)
- 🌐 Fetch API (para integração com ViaCEP)
- 💾 localStorage (Persistência Temporária)

---

## 🚀 Como Executar o Projeto

```bash
git clone <URL_DO_REPOSITORIO>
cd <nome-da-pasta>
npm install
npm run dev
```

---

## 📐 Layout

- Design responsivo inspirado em grandes marketplaces como:
  - Mercado Livre
  - Shopee
  - Amazon
- Caixas de imagem e informações com largura máxima de **500px** cada.
- Ambas mantêm a mesma altura e largura mínima de **400px** em dispositivos médios.
- Container principal com largura máxima de **1100px**.

---

## ⚡ Inspiração e Considerações

- Foco na usabilidade e flexibilidade.
- Estrutura de componentes reutilizáveis.
- Persistência inteligente de dados.

---

## 📝 Observação

Este projeto faz parte do **processo seletivo** para a empresa **Montink**.

---

## 👤 Desenvolvedor

- **Nome:** [Flávio Santos]
- **Email:** [flavio.pasantos@outlook.com]
- **LinkedIn:** [https://linkedin.com/in/flaviopsantos](https://linkedin.com/in/flaviopsantos)

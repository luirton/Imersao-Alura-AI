# Desafio 3 - Lista de Tarefas (To-Do List) 📝

Projeto desenvolvido para o **Desafio 3** da **Imersão Alura AI**. Trata-se de uma aplicação web de lista de tarefas simples, visual e intuitiva, ideal para quem está iniciando os estudos em desenvolvimento de software com as tecnologias fundamentais da web: **HTML5**, **CSS3** e **JavaScript (Vanilla)**.

---

## ✨ Funcionalidades

- **Adicionar Tarefas:** Campo de entrada com validação simples (pressionando `Enter` ou clicando em "Adicionar").
- **Concluir Tarefas:** Alternância de conclusão via caixa de seleção (*checkbox*).
- **Diferenciação Visual Clara:**
  - **Pendentes:** Borda lateral azul e etiqueta `Pendente`.
  - **Concluídas:** Borda lateral verde, fundo verde suave, texto riscado e em itálico, além da etiqueta `✓ Concluída`.
- **Remover Tarefas:** Botão de exclusão individual (`✕`) para cada item.
- **Limpeza em Lote:** Botão para limpar todas as tarefas já concluídas de uma vez só.
- **Contador Dinâmico:** Exibição da quantidade de tarefas pendentes em tempo real.
- **Persistência de Dados (`localStorage`):** Todas as tarefas continuam salvas mesmo se o navegador for fechado ou a página recarregada.
- **Design Responsivo e Agradável:** Layout moderno em card centralizado, transições suaves e tipografia legível.

---

## 🚀 Como Executar

Por ser um projeto web puramente client-side, **não é necessária nenhuma instalação** (sem dependências de Node.js ou pacotes externos):

1. Clone o repositório ou navegue até a pasta do projeto.
2. Acesse a pasta `Desafio 3`.
3. Abra o arquivo `index.html` em qualquer navegador web moderno (Chrome, Edge, Firefox, Safari, Opera).

---

## 📁 Estrutura e Componentes

| Arquivo | Responsabilidade | Descrição |
|---|---|---|
| **`index.html`** | Estrutura | Elementos semânticos (`<header>`, `<main>`, `<form>`, `<input>`, `<ul>`). |
| **`style.css`** | Estilo & Visual | Layout com Flexbox, variáveis CSS (`:root`), cores acessíveis e diferenciação por estado. |
| **`app.js`** | Lógica & Estado | Manipulação do DOM, escutadores de eventos (`submit`, `click`), renderização e `localStorage`. |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Marcação semântica e acessível.
- **CSS3:** Flexbox, variáveis CSS, sombras e efeitos de transição.
- **JavaScript (Vanilla ES6+):** Funções de manipulação de array (`map`, `filter`, `push`), prevenção de XSS e armazenamento local via Web Storage API.

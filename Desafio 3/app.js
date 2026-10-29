/**
 * ====================================================================
 * APLICAÇÃO DE LISTA DE TAREFAS (TODO LIST)
 * 
 * Este arquivo contém a lógica da aplicação em JavaScript puro (Vanilla JS).
 * Ele é responsável por:
 * 1. Capturar ações do usuário (cliques, envio de formulário).
 * 2. Manipular a lista de tarefas (adicionar, alternar conclusão, remover).
 * 3. Salvar e carregar tarefas no navegador usando 'localStorage'.
 * 4. Atualizar a tela (o DOM - Document Object Model) sempre que os dados mudam.
 * ====================================================================
 */

// 1. SELEÇÃO DOS ELEMENTOS DO HTML
// Usamos 'document.getElementById' para pegar referências dos elementos da página
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const emptyState = document.getElementById('empty-state');
const clearCompletedBtn = document.getElementById('clear-completed');

// 2. ESTADO DA APLICAÇÃO
// As tarefas são salvas como uma lista de objetos: [{ id, text, completed }]
// Inicializamos buscando dados já salvos no navegador; se não houver nada, usamos uma lista vazia []
let tasks = JSON.parse(localStorage.getItem('minhas_tarefas')) || [
  { id: 1, text: "Aprender os conceitos básicos de HTML e CSS", completed: true },
  { id: 2, text: "Entender como o JavaScript manipula a tela", completed: false },
  { id: 3, text: "Criar meu primeiro projeto pessoal", completed: false }
];

// 3. FUNÇÃO PARA SALVAR NO LOCALSTORAGE
// O localStorage armazena dados em formato de texto. Usamos JSON.stringify para transformar o array em texto.
function saveTasks() {
  localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
}

// 4. FUNÇÃO PARA ATUALIZAR A INTERFACE (RENDERIZAÇÃO)
// Essa função é o coração visual do app: ela limpa a lista atual e desenha os itens com base no array 'tasks'
function render() {
  // Limpa o conteúdo atual da lista
  taskList.innerHTML = '';

  // Controla a visibilidade da mensagem de "lista vazia"
  if (tasks.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }

  // Cria um elemento <li> para cada tarefa
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : 'pending'}`;

    // Etiqueta visual indicando o estado (Pendente ou Concluída)
    const statusBadge = task.completed
      ? `<span class="status-badge completed">✓ Concluída</span>`
      : `<span class="status-badge pending">Pendente</span>`;

    // Estrutura interna de cada item
    li.innerHTML = `
      <div class="task-left">
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''} 
          data-id="${task.id}"
          title="${task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}"
        />
        <div class="task-content">
          <span class="task-text">${escapeHtml(task.text)}</span>
          ${statusBadge}
        </div>
      </div>
      <button class="delete-btn" data-id="${task.id}" title="Excluir tarefa">✕</button>
    `;

    taskList.appendChild(li);
  });

  // Atualiza o contador de pendências
  const pendingCount = tasks.filter(t => !t.completed).length;
  taskCount.textContent = pendingCount === 1 
    ? '1 tarefa pendente' 
    : `${pendingCount} tarefas pendentes`;
}

// 5. FUNÇÃO DE SEGURANÇA (PREVENÇÃO DE XSS)
// Garante que se o usuário digitar tags HTML, elas sejam tratadas apenas como texto simples
function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

// 6. FUNÇÃO: ADICIONAR TAREFA
function addTask(text) {
  const trimmed = text.trim();
  if (trimmed === '') return;

  const newTask = {
    id: Date.now(), // Usa o timestamp atual como um ID único
    text: trimmed,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  render();
}

// 7. FUNÇÃO: CONCLUIR / ALTERNAR TAREFA
function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  render();
}

// 8. FUNÇÃO: EXCLUIR TAREFA
function deleteTask(id) {
  // Filtra mantendo apenas as tarefas cujo ID seja diferente do excluído
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  render();
}

// 9. FUNÇÃO: LIMPAR TODAS CONCLUÍDAS
function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  render();
}

// 10. EVENT LISTENERS (ESCUTADORES DE EVENTOS DO USUÁRIO)

// Ao enviar o formulário (pressionar 'Enter' ou clicar no botão 'Adicionar')
todoForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Impede o recarregamento padrão da página
  addTask(taskInput.value);
  taskInput.value = ''; // Limpa o campo de texto
  taskInput.focus();   // Devolve o foco para o campo
});

// Delegação de eventos na lista (captura cliques nos checkboxes ou botões de deletar)
taskList.addEventListener('click', (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains('task-checkbox')) {
    toggleTask(id);
  } else if (e.target.classList.contains('delete-btn')) {
    deleteTask(id);
  }
});

// Ao clicar no botão "Limpar concluídas"
clearCompletedBtn.addEventListener('click', clearCompleted);

// 11. INICIALIZAÇÃO
// Renderiza a lista logo que o arquivo carrega
render();

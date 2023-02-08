import { PlusCircle, Trash, Circle } from 'phosphor-react';
import { FormEvent, useState, ChangeEvent } from 'react';
import styles from './App.module.css';
import logo from './assets/rocket-logo.svg';
import clipboard from './assets/clipboard.svg';
import './global.css';

interface Task {
  title: string;
  isFinished?: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitleTask, setNewTitleTask] = useState<string>('');

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTasks([...tasks, { title: newTitleTask }]);
    setNewTitleTask('');
  }
  function handleNewTaskChange(event: ChangeEvent<HTMLFormElement>) {
    setNewTitleTask(event?.target.value);
  }
  return (
    <>
      <header className={styles.header}>
        <div>
          <img src={logo} alt="" />
          <h1>
            to <span> do</span>
          </h1>
        </div>
        <form onSubmit={(event) => handleCreateNewTask(event)}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Adicione uma nova tarefa"
            value={newTitleTask}
            onChange={(event) => handleNewTaskChange(event)}
            required
          />
          <button type="submit">
            Criar <PlusCircle size={16} />
          </button>
        </form>
      </header>

      <main className={styles.container}>
        <header>
          <strong>
            Tarefas criadas <span>{tasks.length}</span>
          </strong>
          <strong>
            Concluídas <span>0 de {tasks.length}</span>
          </strong>
        </header>
        {!tasks.length ? (
          <div>
            <img src={clipboard} alt="" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <button>
                  <Circle size={20} color="#4EA8DE" />
                </button>
                <p>{task.title}</p>
                <button>
                  <Trash size={16} color="#808080" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

export default App;
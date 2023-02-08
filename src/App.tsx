import { PlusCircle, Trash, Circle, CheckCircle } from 'phosphor-react';
import { FormEvent, useState, ChangeEvent } from 'react';
import styles from './App.module.css';
import logo from './assets/rocket-logo.svg';
import clipboard from './assets/clipboard.svg';
import './global.css';

interface Task {
  id: string;
  title: string;
  isFinished?: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitleTask, setNewTitleTask] = useState<string>('');

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTasks([...tasks, { id: Date.now().toString(), title: newTitleTask }]);
    setNewTitleTask('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitleTask(event?.target.value);
  }

  function handleDeleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleTaskFinished(id: string) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isFinished: !task.isFinished };
        }
        return task;
      })
    );
  }

  const finishedTasks = tasks.filter((task) => task.isFinished).length;

  return (
    <>
      <header className={styles.header}>
        <div>
          <img src={logo} alt="" />
          <h1>
            to <span> do</span>
          </h1>
        </div>
        <form onSubmit={handleCreateNewTask}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Adicione uma nova tarefa"
            value={newTitleTask}
            onChange={handleNewTaskChange}
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
            Concluídas
            <span>
              {finishedTasks} de {tasks.length}
            </span>
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
                <button onClick={() => handleTaskFinished(task.id)}>
                  {task.isFinished ? (
                    <CheckCircle size={20} color="#5E60CE" />
                  ) : (
                    <Circle size={20} color="#4EA8DE" />
                  )}
                </button>
                <p
                  className={
                    !task.isFinished ? styles.title : styles.titleComplete
                  }
                >
                  {task.title}
                </p>
                <button onClick={() => handleDeleteTask(task.id)}>
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

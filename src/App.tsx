import { PlusCircle, Trash, Circle, CheckCircle } from 'phosphor-react';
import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import styles from './App.module.css';
import clipboard from './assets/clipboard.svg';
import './global.css';
import { Header } from './components/Header';

interface Task {
  id: string;
  title: string;
  isFinished?: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      return JSON.parse(storedTasks);
    } else {
      return [];
    }
  });
  const [newTitleTask, setNewTitleTask] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
      <Header
        handleCreateNewTask={handleCreateNewTask}
        newTitleTask={newTitleTask}
        handleNewTaskChange={handleNewTaskChange}
      />
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
            {tasks &&
              tasks
                .slice()
                .reverse()
                .map((task, index) => (
                  <li key={task.id}>
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
      <footer className={styles.footer}>
        Desenvolvido por
        <a href="https://giovanaraphaelli.vercel.app" target="_blank">
          @girapha
        </a>
      </footer>
    </>
  );
}

export default App;

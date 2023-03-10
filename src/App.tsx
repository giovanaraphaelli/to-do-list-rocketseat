import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './App.module.css';
import clipboard from './assets/clipboard.svg';
import { Header } from './components/Header';
import { TasksList } from './components/TasksList';
import './global.css';

export interface Task {
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

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function setUpdateTask(tasks: Task[]) {
    setTasks(tasks);
  }

  const finishedTasks = tasks.filter((task) => task.isFinished).length;

  return (
    <>
      <Header tasks={tasks} setUpdateTask={setUpdateTask} />

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
          <TasksList tasks={tasks} setUpdateTask={setUpdateTask} />
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

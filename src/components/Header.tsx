import { FormEvent, ChangeEvent, useState } from 'react';

import { PlusCircle } from 'phosphor-react';
import styles from './Header.module.css';
import logo from '../assets/rocket-logo.svg';
import { Task } from '../App';

interface HeaderProps {
  tasks: Task[];
  setUpdateTask: (tasks: Task[]) => void;
}

export function Header({ setUpdateTask, tasks }: HeaderProps) {
  const [newTitleTask, setNewTitleTask] = useState<string>('');

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUpdateTask([
      ...tasks,
      { id: Date.now().toString(), title: newTitleTask },
    ]);
    setNewTitleTask('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitleTask(event?.target.value);
  }
  return (
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
  );
}

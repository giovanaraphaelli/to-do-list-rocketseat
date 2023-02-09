import { FormEvent, ChangeEvent } from 'react';

import { PlusCircle } from 'phosphor-react';
import styles from './Header.module.css';
import logo from '../assets/rocket-logo.svg';

interface HeaderProps {
  handleCreateNewTask: (event: FormEvent<HTMLFormElement>) => void;
  handleNewTaskChange: (event: ChangeEvent<HTMLInputElement>) => void;
  newTitleTask: string;
}

export function Header({
  handleCreateNewTask,
  newTitleTask,
  handleNewTaskChange,
}: HeaderProps) {
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

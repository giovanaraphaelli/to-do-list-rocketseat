import { CheckCircle, Circle, Trash } from 'phosphor-react';
import { Task } from '../App';
import styles from './TasksList.module.css';

interface TasksListProps {
  tasks: Task[];
  setUpdateTask: (tasks: Task[]) => void;
}

export function TasksList({ tasks, setUpdateTask }: TasksListProps) {
  function handleDeleteTask(id: string) {
    setUpdateTask(tasks.filter((task) => task.id !== id));
  }

  function handleTaskFinished(id: string) {
    setUpdateTask(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isFinished: !task.isFinished };
        }
        return task;
      })
    );
  }
  return (
    <ul className={styles.taskslist}>
      {tasks
        .slice()
        .reverse()
        .map((task) => (
          <li key={task.id}>
            <button onClick={() => handleTaskFinished(task.id)}>
              {task.isFinished ? (
                <CheckCircle size={20} color="#5E60CE" />
              ) : (
                <Circle size={20} color="#4EA8DE" />
              )}
            </button>
            <p
              className={!task.isFinished ? styles.title : styles.titleComplete}
            >
              {task.title}
            </p>
            <button onClick={() => handleDeleteTask(task.id)}>
              <Trash size={16} color="#808080" />
            </button>
          </li>
        ))}
    </ul>
  );
}

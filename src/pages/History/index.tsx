import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";

import { Heading } from "../../components/Heading";

import { MainTemplate } from "../../templates/MainTemplates";
import DefaultButton from "../../components/DefaultButton";

import styles from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { showMessage } from "../../adapters/showMessage";
import { useEffect, useState } from "react";

export function Hystory() {
  const { state, dispatch } = useTaskContext();
  const [confirmClear, setConfirmClear] = useState(false);
  const temTasks = state.tasks.length > 0;

  const sortedTasks = [...state.tasks].sort((a, b) => {
    return b.startDate - a.startDate;
  });

  function handleResetHystory() {
    showMessage.dismiss();
    showMessage.confirm(
      "Tem certeza que deseja apagar o histórico ?",
      (confirmation) => {
        setConfirmClear(confirmation);
      },
    );
  }

  useEffect(() => {
    if (!confirmClear) return;

    console.log("Apagar historico");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfirmClear(false);
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClear, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            {temTasks && (
              <DefaultButton
                icon={<TrashIcon />}
                color="red"
                aria-label="Apagar todo o histórico"
                title="Apagar Histórico"
                onClick={handleResetHystory}
              />
            )}
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          {!temTasks ? (
            <div className={styles.noTasksWarning}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <p className={styles.warningTitle}>Nenhuma tarefa ativa</p>
                <p className={styles.warningDescription}>
                  Inicie uma tarefa para começar o pomodoro. Digite o nome da
                  tarefa e clique em iniciar.
                </p>
              </div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Tarefa</th>
                  <th>Duração</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task) => {
                  const taskTypeDictionary = {
                    workTime: "Foco",
                    shortBreakTime: "Descanso Curto",
                    longBreakTime: "Descanso Longo",
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Container>
    </MainTemplate>
  );
}

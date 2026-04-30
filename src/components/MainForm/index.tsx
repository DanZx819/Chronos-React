import DefaultInput from "../DefaultInput";
import Cycles from "../Cycle";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import DefaultButton from "../DefaultButton";
import { useState } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/showMessage";


export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const [taskName, setTaskName] = useState("");

  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  const nextCycle = getNextCycle(state.currentCycle);

  const nextCycleType = getNextCycleType(nextCycle);

  //Tips

  function handleStopTask() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    showMessage.dismiss();
    showMessage.error(`Tarefa interrompida ${state.activeTask?.name}`)
  }

  function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskName === null) return;
    const taskNameFormatada = taskName.trim();
    if (!taskNameFormatada) {
      showMessage.warn('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };
    showMessage.success(`Tarefa iniciada ${newTask.name}`)
    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

    
  }

  return (
    <form onSubmit={handleCreateNewTask} action="" className="form">
      <div className="formRow">
        <DefaultInput
          id="meuInput"
          type="text"
          labelText="Task"
          placeholder="Digite algo"
          defaultValue={lastTaskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
          disabled={state.activeTask === null ? false : true}
        />
      </div>

      {state.currentCycle > 0 ? (
        <>
          <div className="formRow">
            <Tips />
          </div>
          <div className="formRow">
            <Cycles />
          </div>
        </>
      ) : (
        <div className="formRow">
          <p>Inicie o pomodoro</p>
        </div>
      )}

      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
            type="submit"
            icon={<PlayCircleIcon />}
            color="green"
            key="0"
          />
        ) : (
          <DefaultButton
            aria-label="Parar tarefa atual"
            title="Parar tarefa atual"
            type="button"
            icon={<StopCircleIcon />}
            color="red"
            onClick={handleStopTask}
            key="1"
          />
        )}
      </div>
    </form>
  );
}

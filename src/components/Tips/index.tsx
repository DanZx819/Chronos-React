import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {
  const { state } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);
  
  const nextCycleType = getNextCycleType(nextCycle);
  const tipsNoWhenActiveTask = {
      workTime: <span>Proximo ciclo é de foco por {state.config.workTime} minutos</span>,
      shortBreakTime: <span>Próximo ciclo é de descanso curto {state.config.shortBreakTime}min</span>,
      longBreakTime: <span>Próximo ciclo é de descanso longo {state.config.longBreakTime}min</span>,
    }
    const tipsForWhenActiveTask = {
      
      workTime: <span>Foque por {state.config.workTime} minutos</span>,
      shortBreakTime: <span>Descanse por {state.config.shortBreakTime}min</span>,
      longBreakTime: <span>Descanse por  {state.config.longBreakTime}min</span>,
    }
  

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsNoWhenActiveTask[nextCycleType]}
    </>
  );
}

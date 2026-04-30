import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import styles from "./styles.module.css";

export default function Cycles() {
  const { state } = useTaskContext();

  const cycleSteps = Array.from({ length: state.currentCycle });

  const cycleDescripitonMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo'
  }

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleSteps.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
            key={nextCycle}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label={`Indicadorde ciclo de ${cycleDescripitonMap[nextCycleType]}`}
              title={`Indicadorde ciclo de ${cycleDescripitonMap[nextCycleType]}`}
            ></span>
          );
        })}
        {/* <span className={`${styles.cycleDot} ${styles.workTime}`}></span> */}
      </div>
    </div>
  );
}

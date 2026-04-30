import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/timerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem("state") || null;

    if (storageState === null) {
      return initialTaskState;
    }
    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

    

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    };
  });

  const playBeepRef = useRef<() => void | null>(null);

  useEffect(() => {
    if (!state.activeTask) return; // só ignora, não termina

    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }

    const worker = TimerWorkerManager.getInstance();

    worker.onmessage((e) => {
      const countDownSeconds = e.data;
      console.log(countDownSeconds);

      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }
        dispatch({
          type: TaskActionTypes.COMPLETE_TASK,
        });

        worker.terminate();
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });
    worker.postMessage(state);

    return () => {
      worker.terminate(); // termina na limpeza do useEffect
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeTask]);

  useEffect(() => {
    if (state.formattedSecondsRemaining != "00:00") {
      document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    } else {
      document.title = "Chronos Pomodoro";
    }
  }, [state.formattedSecondsRemaining]);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

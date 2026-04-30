import type { TaskModel } from "./TaskModel";

// Estado -> Componente -> Filhos

export type TaskStateModel = {
  tasks: TaskModel[]; // Histórico, MainForm
  secondsRemaining: number; // CountDown, Histórico, MainForm, Button
  formattedSecondsRemaining: string; // CountDown, Titulo
  activeTask: TaskModel | null; // CountDown, Histórico, MainForm, Button
  currentCycle: number; // 1 a 8
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};

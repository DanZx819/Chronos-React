import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";

import { Heading } from "../../components/Heading";
import DefaultButton from "../../components/DefaultButton";
import DefaultInput from "../../components/DefaultInput";
import { MainTemplate } from "../../templates/MainTemplates";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreaTimekInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveForm(e: React.SubmitEvent<HTMLFormElement>) {
    showMessage.dismiss();
    e.preventDefault();

    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreaTimekInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if (workTime < 1 || workTime > 99) {
      showMessage.error("Digite apenas números entre 1 e 99 para foco");
    } else if (shortBreakTime < 1 || shortBreakTime > 30) {
      showMessage.error(
        "Digite apenas números entre 1 e 30 para descanso curto",
      );
    } else if (longBreakTime < 1 || longBreakTime > 60) {
      showMessage.error(
        "Digite apenas números entre 1 e 60 para descanso longo",
      );
    } else if (
      isNaN(workTime) ||
      isNaN(shortBreakTime) ||
      isNaN(longBreakTime)
    ) {
      showMessage.error("Digite apenas números para todos os campos");
    } else {
      showMessage.success("Configuração salva com sucesso");
    }
    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: "center" }}>
          Modifique as configurações para tempo de foco, descanso curso e
          descanso longo.
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveForm} action="" className="form">
          <div className="formRow">
            <DefaultInput
              type="number"
              id="workTime"
              labelText="Foco"
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              maxLength={2}
            />
          </div>
          <div className="formRow">
            <DefaultInput
              type="number"
              id="shortBreakTime"
              labelText="Descanso curto"
              ref={shortBreaTimekInput}
              defaultValue={state.config.shortBreakTime}
              maxLength={2}
            />
          </div>
          <div className="formRow">
            <DefaultInput
              type="number"
              id="longBreakTime"
              labelText="Descanso longo"
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
              maxLength={2}
            />
          </div>
          <div className="formRow">
            <DefaultButton
              icon={<SaveIcon />}
              aria-label="Salvar configurações"
              title="Salvar configurações"
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}

import { useCallback } from "react";
import { useStringSearchParam } from "./useSearchParam";

const TRIGGER_MODAL_PARAM = "trigger_modal";

export function useTriggerSiteModal(modalName: string) {
  const [, setModalTriggered] = useStringSearchParam(TRIGGER_MODAL_PARAM);

  const triggerSiteModal = useCallback(() => {
    setModalTriggered(modalName);
  }, [modalName, setModalTriggered]);

  return triggerSiteModal;
}

export function useIsSiteModalTriggered(
  modalName: string
): [boolean, () => void] {
  const [modalTriggered, setModalTriggered] =
    useStringSearchParam(TRIGGER_MODAL_PARAM);

  const clearModalTriggered = useCallback(() => {
    setModalTriggered(undefined);
  }, [setModalTriggered]);

  return [modalTriggered === modalName, clearModalTriggered];
}

import { Controller } from "app/backend-types";
import { ControllersRouter } from "app/pages/controllers";
import {
  axesQueryParam,
  buttonsQueryParam,
  nameQueryParam,
} from "app/pages/controllers/queryParams";

export function getControllerShareUri({
  name,
  buttons,
  axes,
}: Controller): string {
  return `${window.location.protocol}//${
    window.location.host
  }${ControllersRouter.createUserController()}?${nameQueryParam.name}=${name}&${
    buttonsQueryParam.name
  }=${JSON.stringify(buttons)}&${axesQueryParam.name}=${JSON.stringify(axes)}`;
}

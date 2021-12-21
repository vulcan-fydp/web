import { Controller } from "backend-types";
import { ControllersRouter } from "pages/controllers";
import {
  axesQueryParam,
  buttonsQueryParam,
  nameQueryParam,
} from "pages/controllers/queryParams";

export function getControllerShareUri({
  name,
  buttons,
  axes,
}: Controller): string {
  return `${window.location.protocol}//${
    window.location.host
  }${ControllersRouter.createUserController()}?${
    nameQueryParam.name
  }=${nameQueryParam.config.encode(name)}&${
    buttonsQueryParam.name
  }=${buttonsQueryParam.config.encode(buttons)}&${
    axesQueryParam.name
  }=${axesQueryParam.config.encode(axes)}`;
}
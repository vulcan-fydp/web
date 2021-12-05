import { ControllerAxis, ControllerButton } from "backend-types";
import { QueryParamConfig, StringParam } from "serialize-query-params";

function TypedJsonParam<T>(): QueryParamConfig<T[]> {
  return {
    encode: (buttons) => JSON.stringify(buttons),
    decode: (buttonsJson) => {
      if (typeof buttonsJson !== "string") {
        return [];
      }

      return JSON.parse(buttonsJson);
    },
  };
}

type ControllerStudioQueryParam<D, D2 = D> = {
  name: string;
  config: QueryParamConfig<D, D2>;
};

export const nameQueryParam: ControllerStudioQueryParam<
  string | null | undefined
> = {
  name: "name",
  config: StringParam,
};

export const buttonsQueryParam: ControllerStudioQueryParam<
  (ControllerButton | null)[]
> = {
  name: "buttons",
  config: TypedJsonParam(),
};

export const axesQueryParam: ControllerStudioQueryParam<
  (ControllerAxis | null)[]
> = {
  name: "axes",
  config: TypedJsonParam(),
};

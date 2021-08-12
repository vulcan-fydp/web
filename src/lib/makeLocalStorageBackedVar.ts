import { makeVar, ReactiveVar } from "@apollo/client";

// Very big important note: idk if this actually works -> rudimentary testing implies yes
export function makeLocalStorageBackedVar(
  key: string
): ReactiveVar<string | null> {
  const defaultValue = localStorage.getItem(key);
  const backingReactiveVar = makeVar(defaultValue);
  const reactiveVar: ReactiveVar<string | null> = Object.assign(
    function (value?: string | null) {
      if (value !== undefined) {
        console.log("makeLocalStorageBackedVar", value);
        if (value === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, value);
        }

        return backingReactiveVar(value);
      }

      return backingReactiveVar();
    },
    {
      onNextChange: backingReactiveVar.onNextChange,
      attachCache: backingReactiveVar.attachCache,
      // If you look in the js source this field there but its not defined in the typescript interface.
      // If things are acting funky maybe this will fix it?
      // attach: backingReactiveVar.attachCache,
      forgetCache: backingReactiveVar.forgetCache,
    }
  );

  return reactiveVar;
}

import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

type EncodeFunction<T> = (value: T) => string;
type DecodeFunction<T> = (value: string) => T;

export function useSearchParam<T>(
  param: string,
  encode: EncodeFunction<T>,
  decode: DecodeFunction<T>,
  replace = true
): [T | undefined, (v: T | undefined) => void] {
  const [params, setParams] = useSearchParams();

  const encodedValue = useMemo(() => {
    return params.get(param);
  }, [params, param]);

  const decodedValue = useMemo(() => {
    if (encodedValue === null) {
      return undefined;
    }
    try {
      return decode(encodedValue);
    } catch {
      return undefined;
    }
  }, [decode, encodedValue]);

  const setParam = useCallback(
    (newValue: T | undefined) => {
      const newParams = new URLSearchParams(params.toString());
      if (newValue === undefined) {
        newParams.delete(param);
      } else {
        try {
          newParams.set(param, encode(newValue));
        } catch {}
      }
      setParams(newParams, { replace });
    },
    [encode, params, param, setParams, replace]
  );

  const returnValue: [T | undefined, (v: T | undefined) => void] =
    useMemo(() => {
      return [decodedValue, setParam];
    }, [decodedValue, setParam]);

  return returnValue;
}

const encodeString: EncodeFunction<string> = (value) => value;
const decodeString: DecodeFunction<string> = (value) => value;

export function useStringSearchParam(param: string, replace?: boolean) {
  return useSearchParam(param, encodeString, decodeString, replace);
}

const encodeJson = <T>(value: T) => JSON.stringify(value);
const decodeJson = <T>(value: string) => JSON.parse(value) as T;

export function useJsonSearchParam<T>(param: string, replace?: boolean) {
  return useSearchParam<T>(param, encodeJson, decodeJson, replace);
}

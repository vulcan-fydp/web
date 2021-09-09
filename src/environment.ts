function getBoolean(name: string): boolean {
  const value = process.env[`REACT_APP_${name}`];
  if (value === "true" || value === "1") {
    return true;
  } else if (value === "false" || value === "0") {
    return false;
  }

  throw new Error(
    `Environment variable REACT_APP_${name} is undefined or not a boolean value`
  );
}

export const environment = {
  useSecureProtocol: getBoolean("USE_SECURE_PROTOCOL"),
  env: process.env.NODE_ENV,
};

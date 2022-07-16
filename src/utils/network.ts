const unwrap = <T>(response: Promise<Response>) =>
  response.then((response) => response.json() as Promise<T>);

const params = (
  value: Record<string, unknown> | unknown,
  key?: string
): object[] => {
  // end case: if value is of primitive and key is defined, then return
  if (typeof value !== "object" && key) return [{ [key]: value }];
  // start case: if key is not provided, expand the object
  if (typeof value === "object")
    return Object.entries(value!).map(([key, value]) => params(value, key));
  // intermediate case: recursively call function
  return params(value, key);
};

const network = { unwrap, params };

export default network;

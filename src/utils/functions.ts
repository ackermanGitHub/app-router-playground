export const logDev = (string: string, value?: any) => {
  if (process.env.NODE_ENV !== 'production') console.log(string, value);
};

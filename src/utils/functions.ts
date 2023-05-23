export const logDev = (string: string, value?: any) => {
  if (process.env.NODE_ENV === 'production') return;
  if (value) {
    console.log(string, value);
  } else {
    console.log(string);
  }
};

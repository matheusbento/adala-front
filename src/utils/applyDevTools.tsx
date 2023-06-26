export default (devTools: any) =>
  devTools && process.env.NODE_ENV === 'development' ? devTools() : (f: any) => f;

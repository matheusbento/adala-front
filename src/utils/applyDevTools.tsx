export default (devTools: any) =>
  devTools && import.meta.env.NODE_ENV === 'development' ? devTools() : (f: any) => f;

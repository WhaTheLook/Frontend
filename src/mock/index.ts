export async function initMocks() {
  if (process.env.NODE_ENV !== 'development') {
      return;
  }
  const { worker } = await import('./worker');

  return worker.start();
}

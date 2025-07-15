import '@testing-library/jest-dom';
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});
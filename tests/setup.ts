import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Limpiar después de cada test
afterEach(() => {
  cleanup();
});

// Mock de variables de entorno
process.env.VITE_API_BASE_URL = 'http://localhost:3000/api';
process.env.GOOGLE_API_KEY = 'test-api-key';
process.env.POSTGRES_URL = 'postgresql://test:test@localhost:5432/test';

// Mock de fetch global
global.fetch = vi.fn();

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Mock de navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
    readText: vi.fn(() => Promise.resolve('')),
  },
});

// Silenciar console.error en tests (opcional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
       args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

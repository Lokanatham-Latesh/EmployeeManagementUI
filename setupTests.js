import "@testing-library/jest-dom";

beforeAll(() => {
  vi.stubGlobal("matchMedia", (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated API
    removeListener: vi.fn(), // Deprecated API
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

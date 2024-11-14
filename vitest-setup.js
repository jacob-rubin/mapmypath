import '@testing-library/jest-dom/vitest';
import './src/app.css';

// Optionally trigger a resize event to apply the mocked dimensions
window.dispatchEvent(new Event('resize'));

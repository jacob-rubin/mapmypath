import '@testing-library/jest-dom/vitest';
import './src/app.css';

import { vi } from 'vitest';

// Mock window dimensions for consistent snapshots
vi.stubGlobal('innerWidth', 500);
vi.stubGlobal('innerHeight', 500);

// Optionally trigger a resize event to apply the mocked dimensions
window.dispatchEvent(new Event('resize'));

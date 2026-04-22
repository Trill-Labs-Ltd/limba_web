const nextJest = require('next/jest.js')

/**
 * Jest configuration for limba_web.
 *
 * Uses next/jest so TypeScript + SWC + CSS/asset imports Just Work without
 * a manual Babel config. Tests live alongside source as *.test.tsx, or under
 * __tests__/ directories.
 */
const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(test).[jt]s?(x)',
  ],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/layout.tsx',
    '!app/**/page.tsx',
    '!**/node_modules/**',
  ],
}

module.exports = createJestConfig(customConfig)

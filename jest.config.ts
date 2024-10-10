export default {
      preset: 'ts-jest',
      testEnvironment: 'node',
      transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
      testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    };
    
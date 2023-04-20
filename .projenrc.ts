import { typescript } from 'projen';
import { NodePackageOptions, NpmAccess } from 'projen/lib/javascript';

const baseOptions: NodePackageOptions = {
  authorName: 'Joshua Marango',
  authorEmail: 'josh@beatsfront.com',
  authorOrganization: true,
  license: 'MIT',
  licensed: true,
};

const project = new typescript.TypeScriptAppProject({
  ...baseOptions,
  defaultReleaseBranch: 'main',
  packageName: '@nestdb/nestjs-dynamodb',
  description: 'Injects dynamodb models for nest components and controllers.',
  name: 'nestjs-dynamodb',
  projenrcTs: true,
  package: true,

  release: true,
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  npmTokenSecret: 'NPM_ACCESS_TOKEN',

  tsconfig: {
    compilerOptions: {
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
    },
  },

  jestOptions: {
    jestConfig: {
      globals: {
        'ts-jest': {
          tsconfig: {
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
          },
        },
      },
    },
  },

  npmignore: [
    '.gitattributes',
    '.projenrc.ts',
  ],

  /* Runtime dependencies of this module. */
  deps: [
    '@nestjs/common',
    '@nestjs/core',
    '@nestjs/mapped-types',
    'rxjs',
    'reflect-metadata',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
  ],

  /* Build dependencies for this module. */
  devDeps: [
    '@types/jest',
    'aws-sdk-client-mock',
    'aws-sdk-client-mock-jest',
  ],
});
project.synth();
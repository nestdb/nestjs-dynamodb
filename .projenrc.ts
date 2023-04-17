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
      skipLibCheck: true,
      declaration: true,
      sourceMap: false,
    },
    exclude: ['node_modules', 'dist'],
  },

  /* Runtime dependencies of this module. */
  deps: [
    '@aws/dynamodb-data-mapper',
    '@aws/dynamodb-data-mapper-annotations',
    '@aws/dynamodb-data-marshaller',
    '@nestjs/common',
    'aws-sdk',
    'is-class',
    'reflect-metadata',
  ],

  /* Build dependencies for this module. */
  devDeps: [],
});
project.synth();
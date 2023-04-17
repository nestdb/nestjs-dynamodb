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

  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  npmTokenSecret: 'NPM_ACCESS_TOKEN',

  /* Runtime dependencies of this module. */
  deps: [],

  /* Build dependencies for this module. */
  devDeps: [],
});
project.synth();
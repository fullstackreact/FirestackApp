export type ComponentExample = {
  key: string,
  module: Object,
};

const ComponentExamples: Array<ComponentExample> = [
  {
    key: 'Database',
    module: require('./Database')
  }
];

const Modules = {};

APIExamples.concat(ComponentExamples).forEach(Example => {
  Modules[Example.key] = Example.module;
});

const ExampleList = {
  ComponentExamples
};

module.exports = ExampleList;
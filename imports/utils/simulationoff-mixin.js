export const SimulationOffMixin = function simulationOffMixinConfiguration(methodOptions) {
  const runFunc = methodOptions.run;
  methodOptions.run = function simulationOffMixinRun(...args) {
    if (this.isSimulation) {
      return undefined;
    }
    return runFunc.call(this, ...args);
  };
  return methodOptions;
};

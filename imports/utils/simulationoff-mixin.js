export const SimulationOffMixin = function simulationOffMixinConfiguration(methodOptions) {
  const runFunc = methodOptions.run;
  methodOptions.run = function simulationOffMixinRun() {
    if (this.isSimulation) {
      return;
    }
    return runFunc.call(this, ...arguments);
  };
  return methodOptions;
};

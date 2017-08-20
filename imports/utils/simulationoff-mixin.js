export const SimulationOffMixin = function (methodOptions) {
  const runFunc = methodOptions.run;
  methodOptions.run = function () {
    if (this.isSimulation) {
      return;
    }
    return runFunc.call(this, ...arguments);
  };
  return methodOptions;
};

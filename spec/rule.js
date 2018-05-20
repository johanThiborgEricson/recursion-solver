function rule(rule) {
  return function() {
    return this.recursionSolver.solve("rule", this, rule, [], this);
  };
  
}

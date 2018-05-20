function rule(rule) {
  return function() {
    var key = "rule" + this.position + (this.parseSuccess ? "t" : "f");
    return this.recursionSolver.solve(key, this, rule, [], this);
  };
  
}

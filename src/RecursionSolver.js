function RecursionSolver() {
  this.stack = Object.create(null);
}

RecursionSolver.prototype.solve = function(key, progress, f, args, thisBinding) {
  var result;
  if(this.stack[key]){
    progress.onRecursion();
  } else {
    this.stack[key] = true;
    result = f.apply(thisBinding, args);
    delete this.stack[key];
  }
  return result;
};

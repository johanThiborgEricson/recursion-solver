function RecursionSolver() {
  this.stack = Object.create(null);
  this.memo = Object.create(null);
}

RecursionSolver.prototype.solve = function(key, progress, f, args, thisBinding) {
  var result;
  if(this.memo[key]){
    if(this.memo[key].list === this.isRecursive){
      result = f.apply(thisBinding, args);
    } else {
      result = this.memo[key].result;
      progress.recall(this.memo[key].progress);
    }
  } else {
    if(this.stack[key]){

      this.isRecursive = key;
      progress.onRecursion();
    } else {
      var backtrack = progress.backup();
      this.stack[key] = true;
      result = f.apply(thisBinding, args);
      this.memo[key] = {
        result: result,
        progress: progress.memoize(),
      };
      
      if(this.isRecursive === key){
        progress.restore(backtrack);
        result = f.apply(thisBinding, args);
        if(!progress.hasProgressed(this.memo[key].progress)){
          result = this.memo[key].result;
        }
      } else {
        this.memo[key].list = this.isRecursive;
      }
      
      delete this.stack[key];
    }
  }
  return result;
};
function RecursionSolver() {
  this.stack = Object.create(null);
  this.memo = Object.create(null);
  this.isRecursive = Object.create(null);
  this.currentRecursion = "";
}

RecursionSolver.prototype.solve = function(key, progress, f, args, thisBinding) {
  var result;
  if(this.memo[key]){
    if(this.memo[key].list[this.currentRecursion]){
      result = f.apply(thisBinding, args);
    } else {
      result = this.memo[key].result;
      progress.recall(this.memo[key].progress);
    }
  } else {
    if(this.stack[key]){
      this.isRecursive[key] = true;
      progress.onRecursion();
    } else {
      var backtrack = progress.backup();
      this.stack[key] = true;
      result = f.apply(thisBinding, args);
      this.memo[key] = {
        progress: progress.memoize(),
        result: result,
        list: Object.create(null),
      };
      
      if(this.isRecursive[key]){
        this.currentRecursion = key;
        var hasProgressed = true;
        while(hasProgressed){
          progress.restore(backtrack);
          var lastResult = f.apply(thisBinding, args);
          if(progress.hasProgressed(this.memo[key].progress)){
            this.memo[key].progress = progress.memoize();
            this.memo[key].result = lastResult;
          } else {
            result = this.memo[key].result;
            progress.recall(this.memo[key].progress);
            hasProgressed = false;
          }
        }
      } else {
        Object.assign(this.memo[key].list, this.isRecursive);
      }
      delete this.stack[key];
    }
  }
  return result;
};
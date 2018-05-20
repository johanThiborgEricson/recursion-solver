function Parser(input) {
  this.input = input;
  this.recursionSolver = new RecursionSolver();
  this.parseSuccess = true;
  this.position = 0;
}

Parser.prototype.accept = function(substring) {
  var result;
  if(substring === this.input.substr(this.position, substring.length)){
    this.position += substring.length;
    result = substring;
  } else {
    this.parseSuccess = false;
  }
  return result;
};

Parser.prototype.backup = function() {
  return {
    position: this.position,
    parseSuccess: this.parseSuccess,
  };
  
};

Parser.prototype.restore = function(backup) {
  this.position = backup.position;
  this.parseSuccess = backup.parseSuccess;
};

Parser.prototype.memoize = Parser.prototype.backup;

Parser.prototype.recall = Parser.prototype.restore;

Parser.prototype.doIterate = function() {
  return this.parseSuccess;
};

Parser.prototype.hasProgressed = function(backup) {
  return this.parseSuccess && (this.position > backup.position);
};

Parser.prototype.onRecursion = function() {
  this.parseSuccess = false;
};
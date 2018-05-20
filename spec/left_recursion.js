describe("A left recursion", function() {
  it("must have a base case", function() {
    var parser = new Parser("base case");
    parser.leftRecursion = rule(function() {
      this.leftRecursion();
      return this.accept("base case");
    });
    
    expect(parser.leftRecursion()).toBe("base case");
  });
  
  it("fails the parser on recursion", function() {
    var parser = new Parser("");
    spyOn(parser, "onRecursion");
    parser.leftRecursive = rule(function() {
      this.leftRecursive();
    });
    
    parser.leftRecursive();
    expect(parser.onRecursion).toHaveBeenCalled();
  });
  
  it("can recurse once", function() {
    var parser = new Parser("ab");
    parser.abs = rule(function() {
      var backtrack = this.position;
      var result = this.abs();
      if(this.parseSuccess) {
        result += this.accept("b");
      } else {
        this.parseSuccess = true;
        this.position = backtrack;
        result = this.accept("a");
      }
      return result;
    });
    
    expect(parser.abs()).toBe("ab");
  });
  
});

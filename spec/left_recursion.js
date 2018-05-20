describe("A left recursion", function() {
  
  Parser.prototype.abs = rule(function() {
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
    expect(parser.abs()).toBe("ab");
  });
  
  it("can recurse repeatedly", function() {
    var parser = new Parser("abb");
    expect(parser.abs()).toBe("abb");
  });
  
});

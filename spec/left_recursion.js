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
  
});

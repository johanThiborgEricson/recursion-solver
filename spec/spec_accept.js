describe("An accepted string", function() {
  it("is returned", function() {
    var parser = new Parser("a string");
    expect(parser.accept("a string")).toBe("a string");
  });
  
  it("might be rejected", function() {
    var parser = new Parser("humbug");
    expect(parser.accept("a string")).toBe(undefined);
    expect(parser.parseSuccess).toBe(false);
  });
  
  it("must not be all", function() {
    var parser = new Parser("a string and humbug");
    expect(parser.accept("a string")).toBe("a string");
  });
  
  it("begins where the last ended", function() {
    var parser = new Parser("ab");
    parser.accept("a");
    expect(parser.accept("b")).toBe("b");
  });
  
});

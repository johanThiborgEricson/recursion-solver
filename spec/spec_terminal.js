describe("An accepted string", function() {
  it("is returned", function() {
    var parser = new Parser("a string");
    expect(Parser.accept("a string")).toBe("a string");
  });
  
});

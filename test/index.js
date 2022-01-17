const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const { expect } = require("chai")

function transformCode(code) {
  const ast = parser.parse(code);
  traverse(ast, {
    MemberExpression(path) {
      if (path.type === "MemberExpression" && path.node.object.name === "console" && path.node.property.name === "debug") {
        path.parentPath.remove()
      }
    }
  })
  return generator(ast).code
}


describe("babel plugin test case", function () {
  it("basic statement", function () {
    const code = 'console.debug("debug")'
    const transformedCode = transformCode(code)
    expect(transformedCode).to.equal('')
  })

  it("function statement", function () {
    const code =
      `function test(){
  const a=1;
  const b=2;
  const c = a+b;
  console.debug('debug')
}`
    const transformedCode = transformCode(code)

    expect(transformedCode).to.equal(
      `function test() {
  const a = 1;
  const b = 2;
  const c = a + b;
}`)
  })

  it("condition statement", function () {
    const code =
      `if(a+b===3){
        console.debug('debug')
      }
`
    const transformedCode = transformCode(code)
    expect(transformedCode).to.equal(
      `if (a + b === 3) {}`)
  })
})

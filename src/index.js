module.exports = function () {
  return {
    name: "babel-plugin-remove-console-debug",
    visitor: {
      MemberExpression(path, state) {
        let { enable } = state.opts
        if (enable === undefined) {
          enable = process.env.NODE_ENV === "production"
        }
        if (enable && path.type === "MemberExpression" && path.node.object.name === "console" && path.node.property.name === "debug") {
          path.parentPath.remove()
        }
      }
    }
  }
}
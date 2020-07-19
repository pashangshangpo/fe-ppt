export default md => {
  const configMatch = md.match(/^-{3,} *\n+([\w\W]+?)\n+-{3,}/)
  const rules = []

  if (configMatch) {
    md = md.substring(configMatch[0].length)

    configMatch[1].split('\n').forEach(config => {
      const [, name, value] = config.match(/^(.+?): *(.+)$/) || []

      if (!name) {
        return
      }

      rules.push({
        name,
        value
      })
    })
  }

  return {
    md,
    rules
  }
}

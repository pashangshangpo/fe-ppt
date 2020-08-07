/**
 * 模块化PPT
 *
 * --- var ---
 */

const forReg = (reg, str, cb) => {
  let match = null

  while ((match = reg.exec(str)) !== null) {
    cb(match)
  }
}

export default md => {
  const match = md.match(/--- *var *---\n+([\w\W]+?)\n+?---/)

  if (!match) {
    return md
  }

  md = md.replace(match[0], '')

  forReg(/@((.*?)\(([\w\W]*?\n|[\w\W]*?)\))/g, md, funMath => {
    const [matchStr, fun] = funMath
    let buildRes = eval(`${match[1]};${fun}`)

    if (Array.isArray(buildRes)) {
      buildRes = buildRes.join('\n')
    }

    buildRes = buildRes.trim()

    md = md.replace(matchStr, buildRes)
  })

  return md.trim()
}

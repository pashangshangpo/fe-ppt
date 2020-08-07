/**
 * 模块化PPT
 *
 * --- var ---
 */
import { getFileCode } from '$api'

const forReg = (reg, str, cb) => {
  let match = null

  while ((match = reg.exec(str)) !== null) {
    cb(match)
  }
}

const getMdVar = md => {
  const match = md.match(/--- *var *---\n+([\w\W]+?)\n+?---/)

  if (!match) {
    return {
      md,
    }
  }

  return {
    md: md.replace(match[0], ''),
    funCode: match[1],
  }
}

const getFunCodes = funs => {
  const promiseAll = []

  for (let fun of funs) {
    const url = fun.value

    promiseAll.push(getFileCode(url))
  }

  return Promise.all(promiseAll)
}

export default (md, funs) => {
  const mdVar = getMdVar(md)

  return getFunCodes(funs)
    .then(funCodes => {
      if (mdVar.funCode) {
        funCodes.push(mdVar.funCode)
      }

      return funCodes.join(';')
    })
    .then(funCode => {
      md = mdVar.md

      forReg(/@((.*?)\(([\w\W]*?\n|[\w\W]*?)\))/g, md, funMath => {
        const [matchStr, fun] = funMath
        let buildRes = eval(`${funCode};${fun}`)

        if (Array.isArray(buildRes)) {
          buildRes = buildRes.join('\n')
        }

        buildRes = buildRes.trim()

        md = md.replace(matchStr, buildRes)
      })

      return md.trim()
    })
}

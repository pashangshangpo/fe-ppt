const { Octokit } = require('@octokit/core')

const octokit = new Octokit({
  auth: `c40ed33807f0339dfa25dd37cfd66589367af062`
})

module.exports = html => {
  return octokit.request('POST /gists', {
    public: false,
    files: {
      'index.html': {
        content: html
      }
    }
  })
  .then(res => res.data)
  .then(res => res.files['index.html'].raw_url)
}

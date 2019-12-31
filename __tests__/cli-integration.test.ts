const { system, filesystem } = require('gluegun')

const src = filesystem.path(__dirname, '..')

const cli = async cmd => {
  // let escapedSrc = src.replace(/(\s+)/g, '\\$1')

  console.log('VIEW SRC', { src })
  console.log(
    'VIEW system.run',
    'node ' + filesystem.path(src, 'bin', 'create-project') + ` ${cmd}`
  )

  system.run(
    'node ' + filesystem.path(src, 'bin', 'create-project') + ` ${cmd}`
  )
}
test('outputs version', async () => {
  const output = await cli('--version')
  console.log('VIEW VERSION OUTPUT', { output })
  expect(output).toContain('0.0.1')
})

test('outputs help', async () => {
  const output = await cli('--help')
  console.log('VIEW help OUTPUT', { output })
  expect(output).toContain('0.0.1')
})

test('generates file', async () => {
  const output = await cli('generate foo')
  console.log('VIEW GENERATES FILE OUTPUT', { output })

  expect(output).toContain('Generated file at models/foo-model.ts')
  const foomodel = filesystem.read('models/foo-model.ts')

  expect(foomodel).toContain(`module.exports = {`)
  expect(foomodel).toContain(`name: 'foo'`)

  // cleanup artifact
  filesystem.remove('models')
})

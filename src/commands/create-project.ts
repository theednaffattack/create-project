import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'create-project',
  run: async toolbox => {
    const { filesystem, print, prompt } = toolbox
    const endConfig = {
      opt1: {
        option: 'TS: GQL: Backend',
        originTemplate: `${process.cwd()}/src/templates/project-templates/backend`
      },
      opt2: {
        option: 'TS: GQL: Frontend',
        originTemplate: `${process.cwd()}/src/templates/project-templates/frontend`
      }
    }
    let endSelect = {
      type: 'select',
      name: 'endChoice',
      message: 'Select a project type',
      choices: [endConfig.opt1.option, endConfig.opt2.option]
    }
    print.info("Let's get a project started.")
    const { endChoice } = await prompt.ask(endSelect)

    if (endChoice === endConfig.opt1.option) {
      filesystem.copy(
        endConfig.opt1.originTemplate,
        `${filesystem.cwd()}/newSrc`
      )
    }
    if (endChoice === endConfig.opt2.option) {
      filesystem.copy(
        endConfig.opt2.originTemplate,
        `${filesystem.cwd()}/newSrc`
      )
    }
  }
}

module.exports = command

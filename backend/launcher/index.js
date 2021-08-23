const appPath = `./${process.env.LAUNCHER_NAME}`

if (!appPath) {
  throw new Error('Launcher name not found')
}

require(appPath)

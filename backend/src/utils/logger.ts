import chalk from 'chalk'

const logger = {
    info: (...content: any[]) => {
        let currentDate = new Date().toISOString()
        let log = chalk.blue(`${currentDate} [INFO] ~ ${content.join(' ')}`)
        console.log(log)
    },
    warning: (...content: any[]) => {
        let currentDate = new Date().toISOString()
        let log = chalk.yellow(`${currentDate} [INFO] ~ ${content.join(' ')}`)
        console.warn(log)
    },
    error: (...content: any[]) => {
        let currentDate = new Date().toISOString()
        let log = chalk.red.bold(`${currentDate} [INFO] ~ ${content.join(' ')}`)
        console.error(log)
    },
}
export default logger
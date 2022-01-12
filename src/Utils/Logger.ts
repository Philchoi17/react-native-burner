class Logger {
  debug(...msg: any) {
    console.log('DEBUG:', ...msg)
  }
  warn(...msg: any) {
    console.warn('WARN:', ...msg)
  }
  info(...msg: any) {
    console.info('INFO:', ...msg)
  }
  err(...msg: any) {
    console.error('ERR:', ...msg)
  }
}

export default new Logger()

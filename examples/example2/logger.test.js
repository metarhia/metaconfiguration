({
  enabled: true,
  keepDays: 100,
  writeInterval: Duration('3s'),
  writeBuffer: 64 * 1024,
  toFile: [
    'system',
    'fatal',
    'error',
    'warn',
    'info',
    'debug',
    'access',
    'slow',
  ],
  toStdout: ['system', 'fatal', 'error', 'warn', 'debug'],
});

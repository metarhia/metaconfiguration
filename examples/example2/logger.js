({
  enabled: true,
  keepDays: 100,
  writeInterval: duration('3s'),
  writeBuffer: 64 * 1024,
  toStdout: ['system', 'fatal', 'error'],
});

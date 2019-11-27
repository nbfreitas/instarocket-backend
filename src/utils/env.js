function env(name, defaultValue) {
  return process.env[name] || defaultValue;
}

module.exports = {
  env,
};

const config = {
  PORT: process.env.PORT || 9000,
  IP: process.env.IP || "localhost",
  REVERSE_PROXY_PORT: process.env.DOCKER_PORT || 9000,
  DOMAIN: "https://compfast.yagizyazicilar.com"
}
module.exports = config

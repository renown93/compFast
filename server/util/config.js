const config = {
  PORT: process.env.PORT || 8081,
  IP: process.env.IP || "localhost",
  REVERSE_PROXY_PORT: process.env.DOCKER_PORT || 9000
}
module.exports = config

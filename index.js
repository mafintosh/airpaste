var mdns = require('multicast-dns')
var address = require('network-address')
var duplexify = require('duplexify')
var once = require('once')
var net = require('net')

module.exports = function (name) {
  name = 'airpaste-' + (name || 'global')

  var dns = mdns()
  var stream = duplexify()
  var interval

  var pipe = once(function (socket) {
    clearInterval(interval)
    server.close()
    dns.destroy()
    socket.setKeepAlive(true)
    stream.setReadable(socket)
    stream.setWritable(socket)
  })

  var server = net.createServer(pipe)

  server.listen(0, function () {
    var port = server.address().port
    var addr = address()
    var me = addr + ':' + port

    dns.on('response', function (response) {
      response.answers.forEach(function (a) {
        var id = a.data.target + ':' + a.data.port
        if (a.type !== 'SRV' || a.name !== name || me === id) return
        if (me < id) return
        pipe(net.connect(a.data.port, a.data.target))
      })
    })

    dns.on('query', function (query) {
      query.questions.forEach(function (q) {
        if (q.name !== name) return
        dns.respond({
          answers: [{
            type: 'SRV',
            ttl: 5,
            name: name,
            data: {port: port, target: addr}
          }]
        })
      })
    })

    var query = function () {
      dns.query({
        questions: [{
          name: name,
          type: 'SRV'
        }]
      })
    }

    interval = setInterval(query, 5000)
    query()
  })

  return stream
}

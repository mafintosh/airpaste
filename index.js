var mdns = require('multicast-dns')()
var address = require('network-address')
var duplexify = require('duplexify')
var net = require('net')

module.exports = function (name) {
  name = 'airpaste-' + (name || 'global')

  var stream = duplexify()

  var pipe = function (socket) {
    clearInterval(interval)
    server.close()
    mdns.destroy()
    stream.setReadable(socket)
    stream.setWritable(socket)
  }

  var server = net.createServer(pipe)
  var interval

  server.listen(0, function () {
    var port = server.address().port
    var addr = address()
    var me = addr + ':' + port

    mdns.on('response', function (response) {
      response.answers.forEach(function (a) {
        var id = a.data.target + ':' + a.data.port
        if (a.type !== 'SRV' || a.name !== name || me === id) return
        if (me < id) return
        pipe(net.connect(a.data.port, a.data.target))
      })
    })

    mdns.on('query', function (query) {
      mdns.respond({
        answers: [{
          type: 'SRV',
          ttl: 5,
          name: name,
          data: {port: port, target: addr}
        }]
      })
    })

    var query = function () {
      mdns.query({
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

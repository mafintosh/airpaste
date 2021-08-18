# airpaste

A 1-1 network pipe that auto discovers other peers using mdns

```
npm install -g airpaste
```

## Usage

On one machine run

```
echo hello world | airpaste
```

On another one run

```
airpaste
```

If the two machines are on the same network the second one will now print `hello world`.
Optionally you can provide an pipe name as the second argument

```
echo only streams to test | airpaste test
```

That way the output only gets send to another user doing `airpaste test`

## Sharing files

You can use airpaste to share files across the network by piping them to/from airpaste

On one machine do

```
airpaste < my.file
```

On another

```
airpaste > my.file
```

Since airpaste just outputs to stdout you can also do stuff like piping movies/music to mplayer (or any other program that supports streaming to stdin)

On one machine

```
airpaste | mplayer -
```

On another

```
airpaste < movie.mp4
```

## API

You can also use this module from node

``` js
var airpaste = require('airpaste')
var stream = airpaste()

process.stdin.pipe(stream).pipe(process.stdout)
```

Optionally you can pass a namespace to `airpaste()`

## Security Note

Data moves over the network without encryption and could be captured. Only intended for use on trusted networks.

## License

MIT

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

## License

MIT

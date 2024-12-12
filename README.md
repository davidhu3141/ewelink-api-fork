# ewelink-api
> eWeLink API for JavaScript


## "my build"

```sh
npm i # first download
npm run build # smaller
npm run build-dev # with line-break
```

ignore the 'Conflicting' warning.

---

The exported object is called `requireEwelink` so that in browser you can use

```html
<script>
const ewelink = requireEwelink // instead of require('ewelink') or `MyLibrary.ewelink`
// ... you code
</script>
```

which mimics the commonJS style `const ewelink = require('ewelink')`

<br>

## Key features
* can run on browsers, node scripts or serverless environment
* set on/off devices
* get power consumption on devices like Sonoff POW
* listen for devices events
* using zeroconf (LAN mode), no internet connection required


## Installation
```sh
npm install ewelink-api
```


## Usage
Check library documentation and examples at https://github.com/skydiver/ewelink-api/tree/master/docs
# MMM-Plantower

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Magic Mirror 2 module for displaying Plantower sensor measurements.

Module uses [hazyair-plantower](https://github.com/hazyair/hazyair-plantower) project for obtaining measurements from various Plantower models.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Plantower',
            config: {
                device: 'PMS5003ST',
                source: '/dev/serial0'
            }
        }
    ]
}
```

## Configuration options

| Option           | Description|
|------------------|-----------|
| `device`         | *Required* Device model. Please take a look at external dependecy of this module: [hazyair-plantower](https://github.com/hazyair/hazyair-plantower#supported-device-models)|
| `source`         | *Required* Device source. Eg. `/dev/ttyUSB0` or `/dev/serial0` for UART using GPIO <br><br>**Type:** `String`|
| `updateInterval` | *Optional* Update interval <br><br>**Type:** `int`(milliseconds) <br>Default 10000 milliseconds (10 seconds)|
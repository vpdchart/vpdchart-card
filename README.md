# VPD Chart card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

A VPD chart custom card for Home Assistant Lovelace. The card loads the chart form vpdchart.com and sends the sensor data for air humidity, air temperature and canopy temperature to automatically calculate VPD when the values change.

![VPD Chart Card](/vpdchart-card.png)

## Installation

1. Install via [HACS](https://hacs.xyz/).
2. Add to resources:
   ```yaml
   url: /hacsfiles/vpdchart-card/vpdchart-card.js
   type: module
   ```

<details>
   <summary>Manual install</summary>
1. Download the simple-thermostat.js file and store it in your configuration/www/ HASS folder

2. Add to resources:

```yaml
url: /local/vpdchart-card.js
type: module
```

</details>

## Configuration
Add a card with the following configuration to any of your Lovelace views.
```yaml
type: custom:vpdchart-card
title: Veg tent
crop: Cannabis
air_rh: sensor.h5179_2869_humidity
air_temp: sensor.h5179_2869_temperature
leaf_temp: sensor.h5179_2869_temperature
leaf_temp_offset: -2
```

### Available configuration options:
| Name             | Type    | Default      | Description                                  |
| ---------------- | ------- | ------------ | -------------------------------------------- |
| type             | string  | **Required** | `custom:vpdchart-card`                       |
| title            | string  | **Optional** | Card title                                   |
| crop             | string  | **Required** | `Cannabis\|Tomatoes\|Leafy greens\|Cucumber` |
| air_rh           | string  | **Required** | A humidity sensor entity id                  |
| air_temp         | string  | **Required** | A temperature sensor entity id               |
| leaf_temp        | string  | **Required** | A temperature sensor entity id               |
| leaf_temp_offset | number  | **Required** | An offset applied to the leaf_temp defined sensor. This is degrees C or F. Temperature unit is taken from HASS settings (Settings > General > Unit System) |
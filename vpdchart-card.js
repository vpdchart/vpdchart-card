class VpdchartCard extends HTMLElement {

    crops = {
      "cannabis": 0,
      "tomatoes": 1,
      "leafy greens": 5,
      "cucumber": 6
    }
  
    set hass(hass) {
      const airRh = this.config.air_rh;
      const airRhState = hass.states[airRh];
      const airRhVal = airRhState ? airRhState.state : "unavailable";
      const airTemp = this.config.air_temp;
      const airTempState = hass.states[airTemp];
      const airTempVal = airTempState ? airTempState.state : "unavailable";
      const leafTemp = this.config.leaf_temp;
      const leafTempState = hass.states[leafTemp];
      const leafTempVal = leafTempState ? leafTempState.state : "unavailable";
      const tempUnit = airTempState.attributes.unit_of_measurement.replace("°","");
  
      const crop = this.config.crop.toLowerCase();
      const cropId = this.crops[crop];
  
      if (!this.iframe) {
        let chartTitle = "";
        if (this.config.title) {
          chartTitle = this.config.title;
        }
        this.innerHTML = `
          <style>
            ha-card {
              height: 100%;
              overflow:hidden;
            }
              #root {
              width: 100%;
              position: relative;
            }
              #root iframe {
              border: none;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
            #root div {
              position: absolute;
              top: 0;
              left: 0;
              padding: 0 16px;
            }
            </style>
          <ha-card header="${chartTitle}">
            <div id="root" style="padding-top: 100.00%;">
                <iframe sandbox="allow-forms allow-modals allow-popups allow-pointer-lock allow-same-origin allow-scripts" allowfullscreen="true" src="https://vpdchart.com/ha.html#C,50,25,23,0"></iframe>
              <div>
                <p>The chart doesn't render, because some sensors are unavailable:</p>
                <p>${airRhState.attributes.friendly_name}: ${airRhVal}</p>
                <p>${airTempState.attributes.friendly_name}: ${airTempVal}</p>
                <p>${leafTempState.attributes.friendly_name}: ${leafTempVal}</p>
                </div>
              </div>
          </ha-card>
        `;
        this.iframe = this.querySelector('#root > iframe');
        this.div = this.querySelector('#root > div');
      }
  
      if ( (airRhVal == "unavailable") || (airTempVal == "unavailable") || (leafTempVal == "unavailable") ) {
        this.iframe.style.display = "none";
        this.div.style.display = "";
      } else {
        const realLeafTempVal = parseFloat(leafTempVal) + (this.config.leaf_temp_offset ? parseFloat(this.config.leaf_temp_offset) : 0);
        this.iframe.src = "https://vpdchart.com/ha.html#" + tempUnit + "," + airRhVal + "," + airTempVal + "," + realLeafTempVal + "," + cropId;
        this.iframe.style.display = "";
        this.div.style.display = "none";
      }
    }
  
    setConfig(config) {
      if (!config.crop) {
        throw new Error('You need to define crop');
      } else {
        const crop = config.crop.toLowerCase();
        if (!(crop in this.crops)) {
            throw new Error('You need to define crop as "Cannabis", "Tomatoes", "Leafy greens" or "Cucumber"');
        }
      }
      if (!config.air_rh) {
        throw new Error('You need to define air_rh');
      }
      if (!config.air_temp) {
        throw new Error('You need to define air_temp');
      }
      if (!config.leaf_temp) {
        throw new Error('You need to define leaf_temp');
      }
      this.config = config;
    }
  
    getCardSize() {
      return 3;
    }
  }
  
  customElements.define('vpdchart-card', VpdchartCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "vpdchart-card",
    name: "VPD Chart",
    preview: false,
    description: "The VPD chart by vpdchart.com"
  });

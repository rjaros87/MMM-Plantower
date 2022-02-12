/* global Module */

/* Magic Mirror
 * Module: MMM-Plantower
 *
 * By rjaros87
 * MIT Licensed.
 */

Module.register("MMM-Plantower", {
    defaults: {
        updateInterval: 10000,
        retryDelay: 10000
    },

    requiresVersion: "2.1.0", // Required version of MagicMirror

    start: function() {
        this.data.header = this.translate("DATA_HEADER");
        var self = this;
        var dataNotification = null;

        // Schedule update timer.
        setInterval(function() {
            self.getData();
        }, this.config.updateInterval);
    },

    getData: function() {
        Log.debug("Get Plantower data");
        this.sendSocketNotification(TOPICS.GET_MEASUREMENT, {});
    },

    getDom: function() {
        var self = this;

        var wrapper = document.createElement("div");

        // Data from helper
        if (this.dataNotification) {
            var temperature = this.dataNotification["temperature"];
            var humidity = this.dataNotification["humidity"];
            var formaldehyde = this.dataNotification["formaldehyde"];
            var pm1 = this.dataNotification["concentration_pm1.0_normal"];
            var pm2n5 = this.dataNotification["concentration_pm2.5_normal"];
            var pm10 = this.dataNotification["concentration_pm10_normal"];

            var wrapperDataNotification = document.createElement("div");

            //TODO: move to template file. Add css + carousel of fields
            var markup = `
            <table class="small"><tbody>
            <tr><td>Temperature</td><td class="bright">${temperature.value}</td><td class="unit align-left">${temperature.unit}</td></tr>
            <tr><td>Humidity</td><td class="bright">${humidity.value}</td><td class="unit align-left">${humidity.unit}</td></tr>
            <tr><td>Formaldehyde</td><td class="bright">${formaldehyde.value}</td><td class="unit align-left">${formaldehyde.unit}</td></tr>
            <tr><td>PM 1.0</td><td class="bright">${pm1.value}</td><td class="unit align-left">${pm1.unit}</td></tr>
            <tr><td>PM 2.5</td><td class="bright">${pm2_5.value}</td><td class="unit align-left">${pm2_5.unit}</td></tr>
            <tr><td>PM 10</td><td class="bright">${pm10.value}</td><td class="unit align-left">${pm10.unit}</td></tr>
            </tbody></table>
            `;

            wrapperDataNotification.innerHTML = markup;
            wrapper.appendChild(wrapperDataNotification);
        }
        return wrapper;
    },

    getScripts: function() {
        return [
            "topics.js"
        ];
    },

    getStyles: function () {
        return [
            "MMM-Plantower.css",
        ];
    },

    getTranslations: function() {
        return {
            en: "translations/en.json",
            pl: "translations/pl.json"
        };
    },

    socketNotificationReceived: function (notification, payload) {
        Log.info("Got notification", notification, payload);
        switch(notification) {
        case TOPICS.PUSH_MEASUREMENT:
            Log.debug(TOPICS.PUSH_MEASUREMENT, payload);
            this.dataNotification = payload;
            this.updateDom();
            break;
        case TOPICS.GET_CONFIG:
            Log.debug("send cfg", this.config);
            this.sendSocketNotification(TOPICS.PUSH_CONFIG, this.config);
            break;
        }
    }
});
/* Magic Mirror
 * Node Helper: MMM-Plantower
 *
 * By rjaros87
 * MIT Licensed.
 */
var PT = require("hazyair-plantower");
var NodeHelper = require("node_helper");
var TOPICS = require("./topics.js");

module.exports = NodeHelper.create({
    start: function() {
        this.PlanTower = null;
        this.config = null;
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("Got notification:", notification, payload);
        switch(notification) {
        case TOPICS.PUSH_CONFIG:
            console.debug("Push config");
            if (this.config == null) {
                this.config = payload;
                this.setUpPlanTower();
            }
            break;

        case TOPICS.GET_MEASUREMENT:
            console.debug("Get measurements");
            var self = this;
            if (this.PlanTower == null) {
                console.error("Missing PlanTower object. ", this.PlanTower, "Going to re-fetch config");
                this.sendSocketNotification(TOPICS.GET_CONFIG, {});
            } else {
                this.PlanTower.read().then(function(data) {
                    console.debug("Going to send data: ", data);
                    self.sendSocketNotification(TOPICS.PUSH_MEASUREMENT, data);
                });
            }

            break;
        }
    },

    setUpPlanTower: function() {
        if (this.config == null || this.config.device == null || this.config.source == null) {
            console.error("Missing require property, check README.md: ", this.config);
        } else {
            this.PlanTower = new PT(this.config.device, this.config.source);
        }
    }
});
module.exports = class Bike {
    constructor(chassi, battery, engineOn) {
        this.chassi = chassi,
        this.battery = battery,
        this.engineOn = engineOn

        this.collectTelemetry()
        this.sendTelemetry()
    }

    turnOn () {
        if (this.engineOn == true) {
            console.log('Engine already On!')
        } else {
            this.engineOn = true
            console.log('Engine On')
        }
    }

    collectTelemetry () {
        const { id, soc } = this.battery

        this.telemetry = {
            chassi: this.chassi,
            battery: {
                id: id,
                charge: soc
            },
            engineOn: this.engineOn
        }
    }

    sendTelemetry () {
        this.telemetryData = JSON.stringify(this.telemetry)
        return this.telemetryData
    }
}
const keyGen = require('keygen')

const Bike = require('../Bike/Index')
const Battery = require('../Battery/Index')


module.exports = class Factory {
    constructor() {
        this.keyGen()
        this.createBattery()
        this.createBike()
        this.insertBattery()
    }

    keyGen () {
        this.bikeChassi = keyGen.url(17)
        const randomNumber = Math.random() * 1000
        this.batteryID = parseInt(randomNumber)
    }

    createBike () {
        this.bike = new Bike(this.bikeChassi, this.battery, false)
        console.log('New bike created: ', this.bike)
    }

    createBattery () {
        this.battery = new Battery(this.batteryID, 100)
        console.log('New battery created: ', this.battery)
    }

    insertBattery () {
        this.bike.battery = this.battery
        console.log('Battery Inserted')
    }

    removeBattery () {
        this.bike.battery = null
        console.log('Battery Removed')
    }
}

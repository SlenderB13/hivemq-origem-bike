require('dotenv').config()
const mqtt = require('mqtt')
const Factory = require('./classes/Factory/Index')

class App {
    constructor() {
        this.createFactory()
        this.initializeMQTTClient()
        this.subscribeOnTopic()
        this.sendMessage()
        this.publishMessage()
    }
    
    createFactory () {
        this.factory = new Factory()
    }

    initializeMQTTClient () {
        const options = {
            host: process.env.HOST,
            port: parseInt(process.env.PORT),
            protocol: process.env.PROTOCOL,
            username: process.env.USER_NAME,
            password: process.env.KEY 
        }

        //initialize the MQTT client
        this.client = mqtt.connect(options);

        //setup the callbacks
        this.client.on('connect', function () {
            console.log('Connected');
        });

        this.client.on('error', function (error) {
            console.log(error);
        });
    }

    subscribeOnTopic () {
        // subscribe to topic 'my/test/topic'
        this.topic = `bike/telemetry/${this.factory.bike.chassi}`
        this.client.subscribe(this.topic);
    }

    sendMessage () {
        this.client.on('message', function (topic, message) {
            //Called each time a message is received
            console.log('Received message:', topic, message.toString());
        });
    }

    publishMessage () {
        // publish message 'Hello' to topic 'my/test/topic'
        this.client.publish(this.topic, this.factory.bike.telemetryData);
    }
}

new App()
import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {DeviceMotion, AccelerationData, Geolocation, SQLite} from 'ionic-native';

var accX = [];
var accY = [];
var accZ = [];

var longitudeArr = [];
var latitudeArr = [];
var altitudeArr = [];

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    accelerometerX:string = "0";
    accelerometerY:string = "0";
    accelerometerZ:string = "0";

    longitude:string = "0";
    latitude:string = "0";
    altitude:string = "0";

    timeInterval:any;
    geoInterval:any;
    subscription:any;

    frequency:number = 1;
    minutes:number = 1;
    seconds:number = 0;

    showMinutes:string = "01:";
    showSeconds:string = "00";

    constructor(public navCtrl:NavController, platform : Platform) {
        platform.ready().then(() => {
            
        });

    }

    recordAccelerationStart() {
        this.subscription = DeviceMotion.watchAcceleration({frequency: this.frequency}).subscribe((acceleration:AccelerationData) => {
            this.accelerometerX = String((acceleration.x).toFixed(2));
            this.accelerometerY = String((acceleration.y).toFixed(2));
            this.accelerometerZ = String((acceleration.z).toFixed(2));
            this.pushDataAcc();
        });
    }

    startCoordinates() {
        this.geoInterval = setInterval(() => {
            Geolocation.getCurrentPosition().then((position) => {
                if(position.coords.latitude != null)
                    this.latitude = String((position.coords.latitude).toFixed(5));
                if(position.coords.longitude != null)
                    this.longitude = String((position.coords.longitude).toFixed(5));
                if(position.coords.altitude != null)
                    this.altitude = String((position.coords.altitude).toFixed(5));

                this.pushDataLoc();
            }).catch((err) => {
                console.log(err.message);
            });
        }, this.frequency)
    }

    pushDataAcc(){
        accX.push(this.accelerometerX);
        accY.push(this.accelerometerY);
        accZ.push(this.accelerometerZ);
    }

    pushDataLoc(){
        longitudeArr.push(this.longitude);
        latitudeArr.push(this.latitude);
        altitudeArr.push(this.altitude);
    }

    startB() {
        this.startCoordinates();
        this.recordAccelerationStart();
        this.showTime();
    }

    stopB() {
        clearInterval(this.timeInterval);
        clearInterval(this.geoInterval);
        this.subscription.unsubscribe();
        this.showMinutes = "vége";
        this.showSeconds = "";
        this.accelerometerX = "0";
        this.accelerometerY = "0";
        this.accelerometerZ = "0";

        this.longitude = "0";
        this.latitude= "0";
        this.altitude = "0";

        accX = [];
        accY = [];
        accZ = [];
        longitudeArr = [];
        latitudeArr = [];
        altitudeArr = [];
    }

    showTime(){
        this.showMinutes = "01:";
        this.showSeconds = "00";
        this.minutes = 1;
        this.seconds = 0;
        this.timeInterval = setInterval(() => {
            if(this.minutes < 10){
                this.showMinutes = "0" + String(this.minutes) + ":";
            }else{
                this.showMinutes =  String(this.minutes) + ":";
            }
            if(this.seconds < 10){
                this.showSeconds= "0" + String(this.seconds);
            }else{
                this.showSeconds =   String(this.seconds);
            }

            if(this.seconds > 0){
                this.seconds -= 1;

            }else{
                this.seconds = 59;
                this.minutes -= 1;
            }

            if(this.minutes == 0 && this.seconds == 0){

                console.log(accX);
                console.log(accY);
                console.log(accZ);
                console.log(longitudeArr);
                console.log(latitudeArr);
                console.log(altitudeArr);

                this.stopB();
            }
        }, 1000)
    }
}

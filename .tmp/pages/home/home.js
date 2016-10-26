import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DeviceMotion, Geolocation } from 'ionic-native';
var accX = [];
var accY = [];
var accZ = [];
var longitudeArr = [];
var latitudeArr = [];
var altitudeArr = [];
export var HomePage = (function () {
    function HomePage(navCtrl, platform) {
        this.navCtrl = navCtrl;
        this.accelerometerX = "0";
        this.accelerometerY = "0";
        this.accelerometerZ = "0";
        this.longitude = "0";
        this.latitude = "0";
        this.altitude = "0";
        this.frequency = 1;
        this.minutes = 1;
        this.seconds = 0;
        this.showMinutes = "01:";
        this.showSeconds = "00";
        platform.ready().then(function () {
        });
    }
    HomePage.prototype.recordAccelerationStart = function () {
        var _this = this;
        this.subscription = DeviceMotion.watchAcceleration({ frequency: this.frequency }).subscribe(function (acceleration) {
            _this.accelerometerX = String((acceleration.x).toFixed(2));
            _this.accelerometerY = String((acceleration.y).toFixed(2));
            _this.accelerometerZ = String((acceleration.z).toFixed(2));
            _this.pushDataAcc();
        });
    };
    HomePage.prototype.startCoordinates = function () {
        var _this = this;
        this.geoInterval = setInterval(function () {
            Geolocation.getCurrentPosition().then(function (position) {
                if (position.coords.latitude != null)
                    _this.latitude = String((position.coords.latitude).toFixed(5));
                if (position.coords.longitude != null)
                    _this.longitude = String((position.coords.longitude).toFixed(5));
                if (position.coords.altitude != null)
                    _this.altitude = String((position.coords.altitude).toFixed(5));
                _this.pushDataLoc();
            }).catch(function (err) {
                console.log(err.message);
            });
        }, this.frequency);
    };
    HomePage.prototype.pushDataAcc = function () {
        accX.push(this.accelerometerX);
        accY.push(this.accelerometerY);
        accZ.push(this.accelerometerZ);
    };
    HomePage.prototype.pushDataLoc = function () {
        longitudeArr.push(this.longitude);
        latitudeArr.push(this.latitude);
        altitudeArr.push(this.altitude);
    };
    HomePage.prototype.startB = function () {
        this.startCoordinates();
        this.recordAccelerationStart();
        this.showTime();
    };
    HomePage.prototype.stopB = function () {
        clearInterval(this.timeInterval);
        clearInterval(this.geoInterval);
        this.subscription.unsubscribe();
        this.showMinutes = "vége";
        this.showSeconds = "";
        this.accelerometerX = "0";
        this.accelerometerY = "0";
        this.accelerometerZ = "0";
        this.longitude = "0";
        this.latitude = "0";
        this.altitude = "0";
        accX = [];
        accY = [];
        accZ = [];
        longitudeArr = [];
        latitudeArr = [];
        altitudeArr = [];
    };
    HomePage.prototype.showTime = function () {
        var _this = this;
        this.showMinutes = "01:";
        this.showSeconds = "00";
        this.minutes = 1;
        this.seconds = 0;
        this.timeInterval = setInterval(function () {
            if (_this.minutes < 10) {
                _this.showMinutes = "0" + String(_this.minutes) + ":";
            }
            else {
                _this.showMinutes = String(_this.minutes) + ":";
            }
            if (_this.seconds < 10) {
                _this.showSeconds = "0" + String(_this.seconds);
            }
            else {
                _this.showSeconds = String(_this.seconds);
            }
            if (_this.seconds > 0) {
                _this.seconds -= 1;
            }
            else {
                _this.seconds = 59;
                _this.minutes -= 1;
            }
            if (_this.minutes == 0 && _this.seconds == 0) {
                console.log(accX);
                console.log(accY);
                console.log(accZ);
                console.log(longitudeArr);
                console.log(latitudeArr);
                console.log(altitudeArr);
                _this.stopB();
            }
        }, 1000);
    };
    HomePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-home',
                    templateUrl: 'home.html'
                },] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = [
        { type: NavController, },
        { type: Platform, },
    ];
    return HomePage;
}());

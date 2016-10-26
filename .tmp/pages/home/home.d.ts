import { NavController, Platform } from 'ionic-angular';
export declare class HomePage {
    navCtrl: NavController;
    accelerometerX: string;
    accelerometerY: string;
    accelerometerZ: string;
    longitude: string;
    latitude: string;
    altitude: string;
    timeInterval: any;
    geoInterval: any;
    subscription: any;
    frequency: number;
    minutes: number;
    seconds: number;
    showMinutes: string;
    showSeconds: string;
    constructor(navCtrl: NavController, platform: Platform);
    recordAccelerationStart(): void;
    startCoordinates(): void;
    pushDataAcc(): void;
    pushDataLoc(): void;
    startB(): void;
    stopB(): void;
    showTime(): void;
}

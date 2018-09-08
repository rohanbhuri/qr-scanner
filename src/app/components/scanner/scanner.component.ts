import { Component, OnInit } from '@angular/core';
import QrScanner from "../../../assets/lib/qr-scanner/qr-scanner.min.js";

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  constraints = window['constraints'] = {
    audio: false,
    video: true
  };
  stream;
  decodedQr = "";
  error;
  message;
  constructor() {

  }

  ngOnInit() {
    navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
      this.stream = stream;
      this.handleSuccess();
    }).catch(error => {
      this.handleError(error);
    })
  }

  handleSuccess() {
    const video = document.querySelector('video');
    const videoTracks = this.stream.getVideoTracks();
    console.log('Got stream with constraints:', this.constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    window['stream'] = this.stream; // make variable available to browser console
    video.srcObject = this.stream;
    this.message = "Put QR-Code in front of the camera, the decoded result will be shown below";
    const qrScanner = new QrScanner(video, result => {
      console.log('decoded qr code:', result)
      this.decodedQr = result
    });
  }

  handleError(error) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      let v = this.constraints.video;
      this.errorMsg(`The resolution ${v['width'].exact}x${v['height'].exact} px is not supported by your device.`, undefined);
    } else if (error.name === 'PermissionDeniedError') {
      this.errorMsg('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.', undefined);
    }
    this.errorMsg(`Camera error: ${error.name}`, error);
  }

  errorMsg(msg, error) {
    this.error = msg;
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }

}

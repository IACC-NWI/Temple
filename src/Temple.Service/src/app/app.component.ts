import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Message } from 'primeng/primeng';

declare var Ultima: any;

@Component({
    selector: 'iacc-main-app',
    templateUrl: 'app/app.html',
})
export class AppComponent implements AfterViewInit {
    error: string;
    layoutCompact: boolean = true;
    layoutMode: string = 'static';
    darkMenu: boolean = false;
    profileMode: string = 'inline';
    growlermessages: Message[] = [];
    constructor(
        private el: ElementRef ) {
        // statusMessagingService.itErrored$.subscribe(e => this.onError(e));
        // statusMessagingService.itSucceeded$.subscribe(e => this.onSuccess(e));
    }

    ngAfterViewInit() {
        Ultima.init(this.el.nativeElement);
    }

    // onError(error: ErrorBroadcastModel) {
    //    this.growlermessages.push({
    //        severity: 'error',
    //        summary: error.summary,
    //        detail: error.details
    //    });
    // }
    // onSuccess(message: any) {
    //    this.growlermessages.push({
    //        severity: 'info',
    //        summary: message.summary,
    //        detail: message.details
    //    });
    // }

}

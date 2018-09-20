import { Component, OnInit} from '@angular/core';
import { NotificationService } from 'platform-commons';

@Component({
  selector: 'codepipeline-notification',
  template: `
  <amexio-notification
        [data]="_notificationService.errorData"
        [vertical-position]="'top'"
        [horizontal-position]="'right'"
        [close-on-escape] ="true"
        [background-color]="'red'"
        [auto-dismiss-msg]="true"
        [auto-dismiss-msg-interval]="6000">
        <ng-template #amexioNotificationTemp let-data="data" >
            <amexio-box  padding="true" [box-width]="'350px'">           
              <amexio-label font-color="white">{{_notificationService.title}}</amexio-label><br/>            
              <amexio-label font-color="white" *ngFor="let msgObj of data.data" >{{msgObj}}</amexio-label><br/>
            </amexio-box>
        </ng-template>
      </amexio-notification>
<amexio-notification
        [data]="_notificationService.successData"
        [vertical-position]="'top'"
        [horizontal-position]="'right'"
        [close-on-escape] ="true"
        [background-color]="'green'"
        [auto-dismiss-msg]="true"
        [auto-dismiss-msg-interval]="6000">
        <ng-template #amexioNotificationTemp let-data="data" >
           <amexio-box [box-width]="'350px'">
              <amexio-label font-color="white" >{{data}}</amexio-label><br/>
          </amexio-box>
        </ng-template>
      </amexio-notification>
    <amexio-notification
        [data]="_notificationService.warningData"
        [vertical-position]="'top'"
        [horizontal-position]="'right'"
        [close-on-escape] ="true"
        [background-color]="'orange'"
        [foreground-color]="'black'"
        [auto-dismiss-msg]="true"
        [auto-dismiss-msg-interval]="6000">
        <ng-template #amexioNotificationTemp let-data="data" >
          <amexio-box>
              <amexio-image [icon-class]="'	fa fa-exclamation-triangle'" style="font-size: 25px;">
              </amexio-image> &nbsp;&nbsp;
          
              <amexio-label font-color="white" >{{data}}</amexio-label><br/>
            </amexio-box>
        </ng-template>
      </amexio-notification>

      <amexio-notification
        [data]="_notificationService.infoData"
        [vertical-position]="'top'"
        [horizontal-position]="'right'"
        [close-on-escape] ="true"
        [background-color]="'yellow'"
        [foreground-color]="'black'"
        [auto-dismiss-msg]="true"
        [auto-dismiss-msg-interval]="6000">
        <ng-template #amexioNotificationTemp let-data="data" >
          <amexio-box [box-width]="'350px'" >
            <amexio-image [icon-class]="'	fa fa-info-circle fa-2x'" >
            </amexio-image> &nbsp;&nbsp;
            <amexio-label size="small-bold" font-color="black">{{data}}</amexio-label>
          </amexio-box>
        </ng-template>
      </amexio-notification>
`
})
export class CodePipelineNotificationComponent implements OnInit {
  constructor(public _notificationService: NotificationService) {}
  ngOnInit() {}
}

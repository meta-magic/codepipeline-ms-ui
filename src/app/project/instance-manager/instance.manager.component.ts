/**
 * Created by Ashwini on 20/2/18.
 */
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'platform-commons';
@Component({
  selector: 'instance-ui',
  styles: [
    `
.green {
    color: green!important;
   
}
.red {
    color: red!important;
   
}
.yellow {
    color: yellow!important;
    
}
  
.instanceManagement .input-control{
  padding:0px !important;
}`
  ],
  template: `
    <amexio-row>
    <amexio-column [size]=12>
    <amexio-card [header]="true"
[footer]="false"
[show]="true"
[body-height]="82">
    <amexio-header class="instanceManagement">
    <amexio-row>
     <amexio-column  size="1">   
     <amexio-image  style="padding-right:10px;"[icon-class]="'fa fa-refresh fa-lg'"
              [tooltip]="'Reload'" (onClick)="getInstanceData()">
              </amexio-image>  
    </amexio-column>   
    <amexio-column size="4">
              Refresh Time:
  </amexio-column>
    <amexio-column size="2">
    <amexio-number-input  [(ngModel)]="refreshtime" (change)="onChange()"  [has-label]="false"
    [min-value]="1"
     [min-error-msg]="'time can not be less than 1 min'">
   </amexio-number-input>
    </amexio-column>
    <amexio-column size="1">
    min
    </amexio-column>
        <amexio-column size="4">
    </amexio-column>
            </amexio-row>      
    </amexio-header>
    <amexio-body>
    <amexio-row>
        <amexio-column [size] ="12" >
            <amexio-datagrid  title="Instance Management"
                [data]="intsanceData"
                [page-size] = "10"
                [height]="300"
                [enable-data-filter]="true">
         <amexio-data-table-column [data-index]="'instanceId'" [width]="25"
         [data-type]="'string'" [hidden]="false" [text]="'ID'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'instanceName'" [width]="25"
         [data-type]="'string'" [hidden]="false" [text]="' Name'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'instanceType'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'Type'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'availabilityZone'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'Availability Zone'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'instanceState'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'State'">
          <ng-template #amexioBodyTmpl let-row="row">
           <a class="fa fa-circle fa-lg"
          [ngClass]="{'green': row.instanceState=='running' , 'yellow': row.instanceState =='stopping' || row.instanceState =='pending' , 'red' : row.instanceState=='stopped'}"></a>
            &nbsp;{{row.instanceState}} 
        </ng-template>
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'publicDNS'" [width]="25"
         [data-type]="'string'" [hidden]="false" [text]="'Public DNS'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'publicIpAddress'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'Public IP'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'keyName'" [width]="15"
         [data-type]="'string'" [hidden]="true" [text]="'Key Name'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'subnetId'" [width]="15"
         [data-type]="'string'" [hidden]="true" [text]="'Subnet ID'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'vpcId'" [width]="15"
         [data-type]="'string'" [hidden]="true" [text]="'VPC ID'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'launchTime'" [width]="15"
         [data-type]="'string'" [hidden]="true" [text]="'Launch Time'">
        </amexio-data-table-column>
        <amexio-data-table-column [width]="15"
                    [data-index]="'instanceAction'"
                    [data-type]="'string'" [hidden]="false"
                    [text]="'Action'">
                    <ng-template #amexioBodyTmpl let-column let-row="row">
                    <span>
                    <ng-container *ngIf="row.instanceState=='stopped'">
<amexio-image style="color:green;" [icon-class]="'fa fa-play-circle fa-2x'"
              [tooltip]="'Start'" (onClick)="onStart(row)">
</amexio-image>
                    </ng-container> 
                    <ng-container *ngIf="row.instanceState=='running'">
                   <amexio-image style="color:red;" [icon-class]="'fa fa-stop-circle fa-2x'"
              [tooltip]="'Stop'" (onClick)="onStop(row)">
                 </amexio-image>
                    </ng-container>
                    </span>
                    </ng-template>
                </amexio-data-table-column>
            </amexio-datagrid>
        </amexio-column>
    </amexio-row>
    </amexio-body>
</amexio-card>
    </amexio-column>
    <amexio-notification [data]="messageArray" [vertical-position]="'top'" [horizontal-position]="'right'" [auto-dismiss-msg]="true" [auto-dismiss-msg-interval]="4000">
        </amexio-notification>
    </amexio-row>
    <amexio-dialogue [show-dialogue]="isValidateForm" [message-type]="'error'" [closable]="true" [title]="'Error'" [type]="'alert'" [custom]="true" (close)="isValidateForm = !isValidateForm">
<amexio-body>
    <ol>
        <li *ngFor="let msgObj of validationMsgArray let index=index">{{msgObj}}</li>
    </ol>
</amexio-body>
<amexio-action>
    <amexio-button type="primary" (onClick)="okErrorBtnClick()" [label]="'Ok'">
    </amexio-button>
</amexio-action>
</amexio-dialogue>   


  `
})
export class InstanceUIComponent implements OnInit {
  intsanceData: any;
  messageArray: any[];
  validationMsgArray: any = [];
  isValidateForm: boolean = false;
  timeintrval: any;
  refreshInterval: any;
  refreshtime: number;
  serverFlag: boolean;
  constructor(private http: HttpClient, public cdf: ChangeDetectorRef) {
    //refreshtime is in min
    this.refreshtime = 1;
    this.getInstanceData();
    this.intsanceData = [];
    this.messageArray = [];
  }

  ngOnInit() {
    this.instanceMethodCall(this.refreshtime);
    console.log('data', this.refreshInterval);
  }

  ngOnDestroy() {
    clearInterval(this.timeintrval);
  }
  onChange() {
    if (this.refreshtime >= 0.5) {
      clearInterval(this.timeintrval);
      this.instanceMethodCall(this.refreshtime);
    } else {
      this.validationMsgArray.push('time can not be less than 1 min');
      this.isValidateForm = true;
    }
  }

  instanceMethodCall(data: any) {
    this.refreshInterval = null;
    this.refreshInterval = data * 60000;
    this.timeintrval = setInterval(() => {
      console.log('interval', this.refreshInterval);
      this.cdf.detectChanges();
      if (this.serverFlag) {
        this.getInstanceData();
      }
    }, this.refreshInterval);
  }
  okErrorBtnClick() {
    this.isValidateForm = false;
    this.validationMsgArray = [];
  }
  onStop(row: any) {
    if (row.instanceState === 'stopping' || row.instanceState === 'stopped') {
      this.messageArray.push('Instance is already stopping/stopped');
    } else {
      let response: any;
      const requestJson = {
        instanceId: row.instanceId
      };

      this.http
        .post('/api/user/InstanceManager/stopInstance', requestJson)
        .subscribe(
          res => {
            response = res;
          },
          err => {
            this.validationMsgArray.push('Unable to connect to server');
            this.isValidateForm = true;
          },
          () => {
            if (response.success) {
              this.getInstanceData();
              this.messageArray.push(response.successMessage);
            } else {
              this.validationMsgArray.push(response.errorMessage);
              this.isValidateForm = true;
            }
          }
        );
    }
  }

  onStart(row: any) {
    if (row.instanceState === 'running' || row.instanceState === 'pending') {
      this.messageArray.push('Instance is already running/pending');
    } else {
      let response: any;
      const requestJson = {
        instanceId: row.instanceId
      };

      this.http
        .post('/api/user/InstanceManager/startInstance', requestJson)
        .subscribe(
          res => {
            response = res;
          },
          err => {
            this.validationMsgArray.push('Unable to connect to server');
            this.isValidateForm = true;
          },
          () => {
            if (response.success) {
              this.messageArray.push(response.successMessage);
              this.getInstanceData();
            } else {
              this.validationMsgArray.push(response.errorMessage);
              this.isValidateForm = true;
            }
          }
        );
    }
  }
  /*  onStartStop(row:any){
    if(row.instanceState === 'stopping' || row.instanceState === 'running'){
      this.messageArray.push('Instance is already Stopping/pending ')
      this.onStart(row.instanceId);
    }else if(row.instanceState === 'running'){
      this.onStop(row.instanceId);
    }else if(row.instanceState === 'stopped'){
      this.onStart(row.instanceId);
    }
  }  */

  getInstanceData() {
    let instancResponse: any;
    this.serverFlag = true;
    this.http.get('/api/pipeline/Instance/findAllInstances').subscribe(
      response => {
        instancResponse = response;
      },
      error => {
        this.validationMsgArray.push('Unable to connect to server');
        this.isValidateForm = true;
        this.serverFlag = false;
      },
      () => {
        if (instancResponse.success) {
          this.intsanceData = instancResponse.response;
        } else {
          this.validationMsgArray.push(instancResponse.errorMessage);
          this.isValidateForm = true;
        }
      }
    );
  }
}

/**
 * Created by Ashwini on 20/2/18.
 */
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'platform-commons';
import { NotificationComponent } from '../notification.component';
import { NotificationService } from 'platform-commons';
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
     [min-error-msg]="'time can not be less than 30 sec'">
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
                [enable-data-filter]="false">
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
         <amexio-data-table-column [data-index]="'logout'" [width]="15"
         [data-type]="'string'" [hidden]="true" [text]="'Logout'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'login'" [width]="15"
         [data-type]="'string'" [hidden]="true" [text]="'Login'">
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
   <app-notification></app-notification>
    </amexio-row>


  `
})
export class InstanceUIComponent implements OnInit {
  intsanceData: any;
  msgData: any[];
  timeintrval: any;
  refreshInterval: any;
  refreshtime: number;
  serverFlag: boolean;
  constructor(
    private http: HttpClient,
    public cdf: ChangeDetectorRef,
    public _notificationService: NotificationService
  ) {
    //refreshtime is in min
    this.refreshtime = 1;
    this.getInstanceData();
    this.intsanceData = [];
    this.msgData = [];
  }

  ngOnInit() {
    this.instanceMethodCall(this.refreshtime);
  }

  ngOnDestroy() {
    clearInterval(this.timeintrval);
  }
  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.msgData;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }
  onChange() {
    if (this.refreshtime >= 0.5) {
      clearInterval(this.timeintrval);
      this.instanceMethodCall(this.refreshtime);
    } else {
      this.msgData.push('time can not be less than 30 sec');
      this._notificationService.showWarningData(this.msgData);
    }
  }

  instanceMethodCall(data: any) {
    this.refreshInterval = null;
    this.refreshInterval = data * 60000;
    this.timeintrval = setInterval(() => {
      this.cdf.detectChanges();
      if (this.serverFlag) {
        this.getInstanceData();
      }
    }, this.refreshInterval);
  }
  // okErrorBtnClick() {
  //   this.isValidateForm = false;
  //   this.validationMsgArray = [];
  // }
  onStop(row: any) {
    if (row.instanceState === 'stopping' || row.instanceState === 'stopped') {
      this.msgData.push('Instance is already stopping/stopped');
      this._notificationService.showWarningData(this.msgData);
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
            this.msgData.push('Unable to connect to server');
            this.createErrorData();
          },
          () => {
            if (response.success) {
              this.getInstanceData();
              this.msgData.push(response.successMessage);
              this._notificationService.showSuccessData(this.msgData);
            } else {
              this.msgData.push(response.errorMessage);
              // this.isValidateForm = true;
              this.createErrorData();
            }
          }
        );
    }
  }

  onStart(row: any) {
    if (row.instanceState === 'running' || row.instanceState === 'pending') {
      this.msgData.push('Instance is already running/pending');
      this._notificationService.showWarningData(this.msgData);
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
            this.msgData.push('Unable to connect to server');
            // this.isValidateForm = true;
            this.createErrorData();
          },
          () => {
            if (response.success) {
              this.msgData.push(response.successMessage);
              this._notificationService.showSuccessData(this.msgData);
              this.getInstanceData();
            } else {
              this.msgData.push(response.errorMessage);
              // this.isValidateForm = true;
              this.createErrorData();
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
        this.msgData.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.serverFlag = false;
      },
      () => {
        if (instancResponse.success) {
          this.intsanceData = instancResponse.response;
        } else {
          this.msgData.push(instancResponse.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
        }
      }
    );
  }
}

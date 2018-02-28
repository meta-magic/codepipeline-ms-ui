/**
 * Created by Ashwini on 20/2/18.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
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
    
}`
  ],
  template: `
    <amexio-row>
    <amexio-column [size]=12>
    <amexio-card [header]="true"
[footer]="false"
[show]="true">
    <amexio-header>
        Instance Management
    </amexio-header>
    <amexio-body>
    <amexio-row>
        <amexio-column [size] ="12" >
            <amexio-datagrid  title="Instance"
                [data]="intsanceData"
                [page-size] = "10"
                [height]="200"
                [enable-data-filter]="true">
         <amexio-data-table-column [data-index]="'instanceId'" [width]="18"
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
         [data-type]="'string'" [hidden]="false" [text]="'Launch Time'">
        </amexio-data-table-column>
        <amexio-data-table-column [width]="15"
                    [data-index]="'instanceAction'"
                    [data-type]="'string'" [hidden]="false"
                    [text]="'Action'">
                    <ng-template #amexioBodyTmpl let-column let-row="row">
                    <span>
                    
                    <amexio-button [type]="'success'" [size]="'small'" [tooltip]="'Start'" [icon]="'fa fa-play-circle'" (onClick)="onStart(row)"></amexio-button>
                    <amexio-button [type]="'danger'" [size]="'small'" [tooltip]="'Stop'" [icon]="'fa fa-stop-circle'" (onClick)="onStop(row)"></amexio-button> 
                    
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


  `
})
export class InstanceUIComponent implements OnInit {
  intsanceData: any;
  messageArray: any[];
  timeintrval: any;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.getInstanceData();
    this.intsanceData = [];
    this.messageArray = [];
  }

  ngOnInit() {
    this.instanceMethodCall();
  }

  ngOnDestroy() {
    clearInterval(this.timeintrval);
  }

  instanceMethodCall() {
    this.timeintrval = setInterval(() => {
      this.getInstanceData();
    }, 60000);
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
            this.messageArray.push('Unable to connect to server');
          },
          () => {
            if (response.success) {
              this.getInstanceData();
              this.messageArray.push(response.successMessage);
            } else {
              this.messageArray.push(response.errorMessage);
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
            this.messageArray.push('Unable to connect to server');
          },
          () => {
            if (response.success) {
              this.messageArray.push(response.successMessage);
              this.getInstanceData();
            } else {
              this.messageArray.push(response.errorMessage);
            }
          }
        );
    }
  }

  getInstanceData() {
    let instancResponse: any;

    this.http.get('/api/pipeline/Instance/findAllInstances').subscribe(
      response => {
        instancResponse = response;
      },
      error => {
        this.messageArray.push('Unable to connect to server');
      },
      () => {
        if (instancResponse.success) {
          this.intsanceData = instancResponse.response;
        } else {
          this.messageArray.push(instancResponse.errorMessage);
        }
      }
    );
  }
}

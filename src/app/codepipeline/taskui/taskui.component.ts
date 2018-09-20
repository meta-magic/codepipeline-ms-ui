/**
 * Created by Ashwini on 15/2/18.
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'platform-commons';
import { NotificationService } from 'platform-commons';
@Component({
  selector: 'task-ui',
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
  .blue {
    color: blue!important;    
  }

.node-style {
white-space: nowrap;
display: inline; }
     
       `
  ],

  template: `
   <amexio-row>
    <amexio-column [size]=12>
                       <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
      <div class="task-ui">
    <amexio-card [header]="true"
[footer]="false"
[show]="true"
[body-height]="82">
        <amexio-header class="instanceManagement" style="display: block!important;">
          
          <div style="display: flex;justify-content: space-between;">
              <div>Task Status</div>
              <div></div>
            <div class="tas-header">
              <amexio-image [icon-class]="'fa fa-refresh 2x'" [tooltip]="'Reload'" (onClick)="getTaskDetails()"></amexio-image>     
               <!--<amexio-label style="display: inline;">Refresh Time:</amexio-label>
               <amexio-label style="display: inline;float: right;">min</amexio-label>
              <amexio-number-input  [(ngModel)]="refreshtime" (change)="onChange()"  [has-label]="false"
                                    [min-value]="1"
                                    [min-error-msg]="'time can not be less than 30 sec'">
              </amexio-number-input>-->
            </div>
          </div>
        </amexio-header>
    <amexio-body>
  <amexio-row>
  <amexio-column [size] =12 >
   <amexio-datagrid
   [data]="taskData"
   [page-size] = "10"
   [global-filter]="false" 
   [enable-data-filter]="false">
    <amexio-data-table-column [data-index]="'type'"
      [data-type]="'string'" [hidden]="false"
      [text]="'Type'">
    </amexio-data-table-column>
    <amexio-data-table-column [data-index]="'boundedContext'"
      [data-type]="'string'" [hidden]="false"
      [text]="'Bounded Context'">
    </amexio-data-table-column>
    <amexio-data-table-column [data-index]="'domain'"
      [data-type]="'string'" [hidden]="false"
      [text]="'Module'">
    </amexio-data-table-column>
    <amexio-data-table-column [data-index]="'taskName'"
      [data-type]="'string'" [hidden]="false"
      [text]="'Task Name'">
    </amexio-data-table-column>
      <amexio-data-table-column [data-index]="'Date'"
      [data-type]="'string'" [hidden]="false"
      [text]="'Date'">
    </amexio-data-table-column>
    <amexio-data-table-column [data-index]="'Time'"
      [data-type]="'string'" [hidden]="false"
      [text]="'Time'">
    </amexio-data-table-column>
    <amexio-data-table-column [data-index]="'status'"
      [data-type]="'string'" [hidden]="false"
      [text]="'Status'">
      <ng-template #amexioBodyTmpl let-row="row">
      <a class="fa fa-circle fa-lg"
     [ngClass]="{'yellow': row.statusCode==0 , 'blue': row.statusCode ==1 , 'green': row.statusCode ==5 , 'red' : row.statusCode ==3}"></a>
       &nbsp;{{row.status}} 
   </ng-template>
    </amexio-data-table-column>
    <amexio-data-table-column [data-index]="'statusCode'"
      [data-type]="'string'" [hidden]="true"
      [text]="'Status Code'">
    </amexio-data-table-column>
    <amexio-data-table-column [data-index]="'statusMessage'"
      [data-type]="'string'" [hidden]="true"
      [text]="'Status Message'">
    </amexio-data-table-column>
    <amexio-data-table-column [data-index]="'errorMessage'"
      [data-type]="'string'" [hidden]="true"
      [text]="'Error Message'">
    </amexio-data-table-column>
   </amexio-datagrid>
   </amexio-column>
 </amexio-row>
 </amexio-body>
 </amexio-card>
      </div>
 </amexio-column>
 </amexio-row>
 <codepipeline-notification></codepipeline-notification>
 
 `
})
export class TaskUIComponent implements OnInit {
  taskData: any;
  msgData: any = [];
  timeintrval: any;
  refreshInterval: any;
  refreshtime: number;
  serverFlag: boolean;
  constructor(
    private http: HttpClient,
    public _notificationService: NotificationService,
    public loaderService: LoaderService
  ) {
    this.refreshtime = 1;
    this.taskData = [];
  }

  //Initialized Method
  ngOnInit() {
    // this.taskMethodCall(this.refreshtime);
    this.getTaskDetails();
  }

  //Method to Clear interval
  ngOnDestroy() {
    // clearInterval(this.timeintrval);
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
    // if (this.refreshtime >= 0.5) {
    //   clearInterval(this.timeintrval);
    //   this.taskMethodCall(this.refreshtime);
    // } else {
    //   this.msgData.push('time can not be less than 30 sec');
    //   // this.isValidateForm = true;
    //   this._notificationService.showWarningData(this.msgData);
    // }
    this.getTaskDetails();
  }

  //Method To Get All Tasks Details
  getTaskDetails() {
    this.taskData = [];
    this.msgData = [];
    let taskResponse: any;
    this.serverFlag = true;
    this.loaderService.showLoader();
    this.http.get('/api/pipeline/task/findAll').subscribe(
      response => {
        taskResponse = response;
      },
      error => {
        this.msgData.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.serverFlag = false;
        this.loaderService.hideLoader();
      },
      () => {
        if (taskResponse.success) {
          let task = taskResponse.response;
          this.loaderService.hideLoader();
          this.iterateData(task);
        } else {
          this.msgData.push(taskResponse.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
          this.loaderService.hideLoader();
        }
      }
    );
  }

  iterateData(data: any) {
    this.taskData = [];
    data.forEach((obj: any) => {
      let date = new Date(obj.auditDetails.updatedDate);
      const actualCreatedDate = date.toLocaleDateString();
      const actualTime = date.toLocaleTimeString();
      const obj1 = {
        type: obj.type,
        boundedContext: obj.boundedContext,
        domain: obj.domain,
        taskName: obj.taskName,
        status: obj.status,
        statusCode: obj.statusCode,
        statusMessage: obj.statusMessage,
        errorMessage: obj.errorMessage,
        Date: actualCreatedDate,
        Time: actualTime
      };
      this.taskData.push(obj1);
    });
  }

  //Method to AUto Reload
  taskMethodCall(data: any) {
    this.refreshInterval = null;
    this.refreshInterval = data * 60000;
    this.timeintrval = setInterval(() => {
      if (this.serverFlag) {
        this.getTaskDetails();
      }
    }, this.refreshInterval);
  }

}

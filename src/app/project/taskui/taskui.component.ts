/**
 * Created by rashmi on 15/2/18.
 */
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'platform-commons';
import { HttpClient } from '@angular/common/http';

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
  
       `
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
              [tooltip]="'Reload'" (onClick)="getTaskDetails()">
              </amexio-image>  
            </amexio-column>   
     <amexio-column size="5">
     Refresh Time:
         </amexio-column>
    <amexio-column size="2">
    <div class="instanceManagement">
    <amexio-number-input  [(ngModel)]="refreshtime" (change)="onChange()"  [has-label]="false">
   </amexio-number-input>
   </div>
    </amexio-column>
        <amexio-column size="4">
    </amexio-column>

    
            </amexio-row>      

    </amexio-header>
    <amexio-body>
  <amexio-row>
  <amexio-column [size] =12 >
   <amexio-datagrid
   [enable-column-fiter]="true"
   title="Task Status"
   [data]="taskData"
   [page-size] = "10">
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
      [text]="'Domain'">
    </amexio-data-table-column>
    <amexio-data-table-column [data-index]="'taskName'"
      [data-type]="'string'" [hidden]="false"
      [text]="'Task Name'">
    </amexio-data-table-column>
    <amexio-data-table-column [data-index]="'status'"
      [data-type]="'string'" [hidden]="false"
      [text]="'Status'">
      <ng-template #amexioBodyTmpl let-row="row">
      <a class="fa fa-circle fa-lg"
     [ngClass]="{'yellow': row.statusCode==0 , 'blue': row.statusCode ==1 , 'green': row.statusCode ==2 , 'red' : row.statusCode ==3}"></a>
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
 </amexio-column>
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
export class TaskUIComponent implements OnInit {
  timeinterval: any;
  taskData: any;
  isValidateForm: boolean = false;
  validationMsgArray: any = [];
  refreshInterval: any;
  refreshtime: number;
  serverFlag: boolean;
  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.refreshtime = 1;
    this.getTaskDetails();
    this.taskData = [];
  }

  //Initialized Method
  ngOnInit() {
    this.taskMethodCall(this.refreshtime);
  }

  //Method to Clear interval
  ngOnDestroy() {
    clearInterval(this.timeinterval);
  }

  onChange() {
    console.log('data', this.refreshInterval);
    this.taskMethodCall(this.refreshtime);
  }

  //Method to AUto Reload
  taskMethodCall(data: any) {
    this.refreshInterval = data * 60000;
    this.timeinterval = setInterval(() => {
      if (this.serverFlag) {
        this.getTaskDetails();
      }
    }, this.refreshInterval);
  }

  // To Close Window
  okErrorBtnClick() {
    this.isValidateForm = false;
  }

  //Method To Get All Tasks Details
  getTaskDetails() {
    let taskResponse: any;
    this.http.get('/api/pipeline/task/findAll').subscribe(
      response => {
        taskResponse = response;
      },
      error => {
        this.validationMsgArray.push('Unable to connect to server');
        this.isValidateForm = true;
        this.serverFlag = false;
      },
      () => {
        if (taskResponse.success) {
          this.taskData = taskResponse.response;
        } else {
          this.validationMsgArray.push(taskResponse.errorMessage);
          this.isValidateForm = true;
        }
      }
    );
  }
}

/**
 * Created by pratik on 15/2/18.
 */
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'platform-commons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'task-ui',
  styles: [
    `
  .taskStatusBlue {
    background-color: lightblue;
    color: black;
    font-size:16px }
  .taskStatusYellow {
    background-color: lightyellow;
    color: black;
    font-size:16px }
  .taskStatusGreen  {
    background-color: lightgreen;
    color: black;
    font-size:16px}
  .taskStatusRed {
    background-color: lightcoral;
    color: black;
    font-size:16px }
       `
  ],
  template: `
  <amexio-row>
  <amexio-column [size] =12 >
   <amexio-datagrid
   [enable-column-fiter]="true"
   title="Task Status"
   [http-method]="'get'"
   [http-url]="'/api/pipeline/task/findAll'"
   [data-reader]="'response'"
  
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
    <a [ngClass]="{'taskStatusBlue': row.statusCode == 0  ,'taskStatusYellow': row.statusCode == 1, 'taskStatusGreen' : row.statusCode == 2,'taskStatusRed'  : row.statusCode == 3 }">{{row.status}}</a>  
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


 `
})
export class TaskUIComponent implements OnInit {
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  ngOnInit() {}
}

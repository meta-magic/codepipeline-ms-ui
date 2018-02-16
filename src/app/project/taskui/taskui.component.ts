/**
 * Created by pratik on 15/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-ui',
  template: `
   <amexio-card>
     <amexio-header>Task UI</amexio-header>
     <amexio-body>
       <div style="height: 300px">
        Task UI Here
       </div>
     </amexio-body>
   </amexio-card>

 `
})
export class TaskUIComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

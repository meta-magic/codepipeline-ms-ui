/**
 * Created by pratik on 15/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'instance-ui',
  template: `
    <amexio-card>
      <amexio-header>Instance UI</amexio-header>
      <amexio-body>
        <div style="height: 300px">
          Instance UI Here
        </div>
      </amexio-body>
    </amexio-card>

  `
})
export class InstanceUIComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

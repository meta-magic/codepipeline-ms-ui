import { Component } from '@angular/core';

@Component({
  selector: 'project-demo-app',
  template: `
    <amexio-nav [title]="'CodePipeLine UI'">
      <amexio-nav-item position-center><a routerLink="task-ui">TaskUI</a> </amexio-nav-item>
      <amexio-nav-item position-center><a routerLink="instance-manager">Instace Manager</a> </amexio-nav-item>
      <amexio-nav-item position-center>
        <amexio-image [icon-class]="'fa fa-cog fa-1x'"
                      [tooltip]="'Settings'">
        </amexio-image>
      </amexio-nav-item>
    </amexio-nav>
    <div style="padding: 88px 10px 20px 0px;">
      <router-outlet></router-outlet>
    </div>

  `
})
export class DemoComponent {}

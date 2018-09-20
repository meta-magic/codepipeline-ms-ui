import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ComponentFactoryResolver
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'platform-commons';
import { CookieService } from 'platform-commons';
import { NotificationService } from 'platform-commons';
@Component({
  selector: 'sourceCode',
  //language=Angular2HTML
  template: `
     <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
<amexio-tab-view [closable]="false">
    <amexio-tab title="Git Configuration" [disabled]="gitdisabledFlag" [active]="gitActiveTab">

        <amexio-form [form-name]="'validateForm'" [body-height]="80" [header]="false" [show-error]="true" [footer-align]="'right'">
            <amexio-form-body>
                <amexio-row>
                    <amexio-column [size]="12">
                        <amexio-radio-group [field-label]="'Git Repository Type'" [allow-blank]="false" name="gitModel.repositoryType" [display-field]="'repositoryTypeName'"
                            [value-field]="'repositoryType'" [horizontal]="true" [data-reader]="'response.data'" [data]="respositoryTypeData"
                            [default-value]="gitModel.repositoryType"
                            (onSelection)="setSelectedRepository($event)">
                        </amexio-radio-group>
                    </amexio-column>
                    <amexio-column [size]="12">
                        <amexio-text-input #rUrl [(ngModel)]="gitModel.repositoryUrl" [field-label]="'Git Repository URL'" name="gitModel.repositoryUrl"
                            [place-holder]="'https://github.com/meta-magic/demoapp.git'" [enable-popover]="true" (onBlur)="onBlurCheck(rUrl)"
                            [pattern]="'/((http|https):\/\/)?[A-Za-z0-9\.-]{3,}\.[A-Za-z]{2}/'" [allow-blank]="false" error-msg="Please Enter Repository URL"
                            [icon-feedback]="true">
                        </amexio-text-input>
                    </amexio-column>
                </amexio-row>

            </amexio-form-body>
            <amexio-form-action>

                <amexio-button [label]="'save'" [type]="'primary'" [tooltip]="'Save'" [size]="'default'" [icon]="'fa fa-save'" [disabled]="false"
                      [loading]="SaveasyncFlag"
  [form-bind]="'validateForm'" (onClick)="onSave()">
                </amexio-button>


            </amexio-form-action>

        </amexio-form>

    </amexio-tab>
    <amexio-tab title="Action" [disabled]="tabdisabledFlag" [active]="actionActiveTab">
        <amexio-card [header]="false" [footer]="false" [footer-align]="'right'" [body-height]="80">
            <amexio-body>
                <amexio-row>
                    <amexio-column [size]="12">
                        <amexio-radio-group [field-label]="'Git Repository Type'" [allow-blank]="false" name="initailiseDataModel.repositoryType" [display-field]="'repositoryTypeName'"
                            [value-field]="'repositoryType'" [horizontal]="true" [data-reader]="'response.data'" [data]="respositoryTypeData"
                            [default-value]="initailiseDataModel.repositoryType"  disabled="true" (onSelection)="setInitailizeRepository($event)" >
                        </amexio-radio-group>
                    </amexio-column>
                    <amexio-column [size]="12">
                        <amexio-text-input #rUrl [(ngModel)]="initailiseDataModel.repositoryUrl" [field-label]="'Git Repository URL'" name="initailiseDataModel.repositoryUrl"
                            [place-holder]="'https://github.com/meta-magic/demoapp.git'" [enable-popover]="true" (onBlur)="onBlurCheck(rUrl)"
                            [pattern]="'/((http|https):\/\/)?[A-Za-z0-9\.-]{3,}\.[A-Za-z]{2}/'" [allow-blank]="false" error-msg="Please Enter Repository URL"
                            [disabled]="URLDisabled" [icon-feedback]="true">
                        </amexio-text-input>
                    </amexio-column>
                </amexio-row>
                <amexio-fieldset [collapsible]="false" title="Initialise">

                    <amexio-row>
                        <amexio-column [size]="4">
                           <amexio-box border-color ="blue" border="left" padding="true" background-color="blue">
  <amexio-label>$ git clone repository-url</amexio-label>
</amexio-box>
                        </amexio-column>
<amexio-column [size]="4">
 <amexio-box border-color ="blue" border="left" padding="true" background-color="blue">
  <amexio-label>$ git init</amexio-label>
</amexio-box>
                        </amexio-column>
                        <amexio-column [size]="2">
                        <amexio-checkbox [disabled]="true"  [field-label]="'Clone/Push'"
                        [(ngModel)]="checkWithDisable">
</amexio-checkbox>
                        </amexio-column>
                        <amexio-column [size]="2">
                            <amexio-button (onClick)="onInitialize()"  [disabled]="initailizeDisable" [label]="'Initialize'" [type]="'primary'" [tooltip]="'Initialize'" [size]="'default'">
                            </amexio-button>
                        </amexio-column>

                    </amexio-row>
                </amexio-fieldset>
                <amexio-fieldset [collapsible]="true" title="Commit All">

                    <amexio-row>
                        <amexio-column [size]="10">
                            <amexio-text-input [field-label]="'comment'" name="commitMessage" [place-holder]="'Enter commit message'" [error-msg]="'Please enter comment'"
                              [(ngModel)]="commitAllDataClass.commitMessage"  [icon-feedback]="true" [allow-blank]="false" [enable-popover]="true">
                            </amexio-text-input>
                        </amexio-column>
                        <amexio-column [size]="2" style="padding-top:33px;">
                            <amexio-button (onClick)="onCommit()" [label]="'Push'" [type]="'primary'" [tooltip]="'Push'" [size]="'default'" [disabled]="false">
                            </amexio-button>
                        </amexio-column>

                    </amexio-row>
                </amexio-fieldset>
                 <amexio-fieldset [collapsible]="true" title="Pull">

                    <amexio-row>
                        <amexio-column [size]="10">
                            <amexio-box border-color ="blue" border="left" padding="true" background-color="blue">
  <amexio-label>$ git pull</amexio-label>
</amexio-box>
                        </amexio-column>
                        <amexio-column [size]="2">
                        
                            <amexio-button (onClick)="onPull()" [label]="'Pull'" [type]="'primary'" [tooltip]="'Pull'" [size]="'default'" [disabled]="false">
                            </amexio-button>
                                                </amexio-column>

                    </amexio-row>
                </amexio-fieldset>

            </amexio-body>

        </amexio-card>
    </amexio-tab>

</amexio-tab-view>
<amexio-window [show-window]="showInitializeWindow" (close)="closeInitializeWindow()" type="window"
                             [closable]="true" [footer]="true">
                <amexio-header> Initialize </amexio-header>
                <amexio-body>
                  
                  <amexio-row>
                    <amexio-column [size]="6">
                      <amexio-textarea-input [field-label]="'User name or email address'" name="repositoryUsername"
                                             [(ngModel)]="initailiseDataModel.repositoryUsername"
                                             [place-holder]="'Enter GitHub user name or email address'"
                                             [error-msg]="'Please enter user name'" [icon-feedback]="true" [rows]="'1'"
                                             [columns]="'2'" [allow-blank]="false"
                                             [enable-popover]="true"></amexio-textarea-input>
                    </amexio-column>
                    <amexio-column [size]="6">
                      <amexio-password-input [enable-popover]="true" [(ngModel)]="initailiseDataModel.repositoryPassword"
                                             [field-label]="'Password '" name="Password"
                                             [place-holder]="'Enter GitHub Password'" [allow-blank]="false"
                                             [error-msg]="'Please enter Password'"
                                             [icon-feedback]="true"></amexio-password-input>
                    </amexio-column>
                  </amexio-row>
                </amexio-body>
                <amexio-action>
                  <amexio-button (onClick)="closeInitializeWindow()" label="Cancel" type="white"
                                 [icon]="'fa fa-remove'"></amexio-button>
                  <amexio-button (onClick)="validateAndInitialize()" label="Initailise" type="green"
                                 [icon]="'fa fa fa-arrow-circle-up'"></amexio-button>
                </amexio-action>
              </amexio-window>
 <amexio-window [show-window]="showCommitAllWindow" (close)="closeCommitAllWindow()" type="window"
                             [closable]="true" [footer]="true">
                <amexio-header> Commit Changes</amexio-header>
                <amexio-body>
                  
                  <amexio-row>
                    <amexio-column [size]="6">
                      <amexio-textarea-input [field-label]="'User name or email address'" name="repositoryUsername"
                                             [(ngModel)]="commitAllDataClass.repositoryUsername"
                                             [place-holder]="'Enter GitHub user name or email address'"
                                             [error-msg]="'Please enter user name'" [icon-feedback]="true" [rows]="'1'"
                                             [columns]="'2'" [allow-blank]="false"
                                             [enable-popover]="true"></amexio-textarea-input>
                    </amexio-column>
                    <amexio-column [size]="6">
                      <amexio-password-input [enable-popover]="true" [(ngModel)]="commitAllDataClass.repositoryPassword"
                                             [field-label]="'Password '" name="Password"
                                             [place-holder]="'Enter GitHub Password'" [allow-blank]="false"
                                             [error-msg]="'Please enter Password'"
                                             [icon-feedback]="true"></amexio-password-input>
                    </amexio-column>
                  </amexio-row>
                </amexio-body>
                <amexio-action>
                  <amexio-button (onClick)="closeCommitAllWindow()" label="Cancel" type="white"
                                 [icon]="'fa fa-remove'"></amexio-button>
                  <amexio-button (onClick)="validateAndCommit()" label="Commit Changes" type="green"
                                 [icon]="'fa fa fa-arrow-circle-up'"></amexio-button>
                </amexio-action>
              </amexio-window>

              <amexio-window [show-window]="showPullWindow" (close)="closePullWindow()" type="window"
                             [closable]="true" [footer]="true">
                <amexio-header> Pull changes</amexio-header>
                <amexio-body>
                  
                  <amexio-row>
                    <amexio-column [size]="6">
                      <amexio-textarea-input [field-label]="'User name or email address'" name="pullDataClass.repositoryUsername"
                                             [(ngModel)]="pullDataClass.repositoryUsername"
                                             [place-holder]="'Enter GitHub user name or email address'"
                                             [error-msg]="'Please enter user name'" [icon-feedback]="true" [rows]="'1'"
                                             [columns]="'2'" [allow-blank]="false"
                                             [enable-popover]="true"></amexio-textarea-input>
                    </amexio-column>
                    <amexio-column [size]="6">
                      <amexio-password-input [enable-popover]="true" [(ngModel)]="pullDataClass.repositoryPassword"
                                             [field-label]="'Password '" name="pullDataClass.repositoryPassword"
                                             [place-holder]="'Enter GitHub Password'" [allow-blank]="false"
                                             [error-msg]="'Please enter Password'"
                                             [icon-feedback]="true"></amexio-password-input>
                    </amexio-column>
                  </amexio-row>
                </amexio-body>
                <amexio-action>
                  <amexio-button (onClick)="closePullWindow()" label="Cancel" type="white"
                                 [icon]="'fa fa-remove'"></amexio-button>
                  <amexio-button (onClick)="validateAndPull()" label="Pull" type="green"
                                 [icon]="'fa fa fa-arrow-circle-down'"></amexio-button>
                </amexio-action>
              </amexio-window>
               <codepipeline-notification></codepipeline-notification>

 <amexio-dialogue [show-dialogue]="warningdialogue" [closable]="false" [title]="'Info'" [custom]="true" (close)="warningdialogue = !warningdialogue"
                   [type]="'alert'">
    <amexio-body>
      Please Initailise repository before Push/Pull.
    </amexio-body>
    <amexio-action>
      <amexio-button type="primary" (onClick)="okWarningBtnClick()" [label]="'Ok'">
      </amexio-button>
    </amexio-action>
  </amexio-dialogue>

            `,
  styles: [
    `
      .panel-panel{
        height:488px!important;
      }
    `
  ]
})
export class SourceCodeComponent implements OnInit {
  gitModel: GitModel;
  initailiseDataModel: InitializeDataModel;
  commitAllDataClass: CommitAllDataClass;
  pullDataClass: PullDataClass;

  checkWithDisable: boolean = true;
  gitdisabledFlag: boolean;
  gitActiveTab: boolean = true;
  actionActiveTab: boolean;
  respositoryTypeData: any;
  tabdisabledFlag: boolean;
  showCommitAllWindow: boolean = false;
  showInitializeWindow: boolean = false;
  showPullWindow: boolean = false;
  SaveasyncFlag: boolean = false;
  warningdialogue: boolean;
  // repositoryInitialized:boolean;
  validationMsgArray: any;
  URLDisabled: boolean;
  initailizeDisable: boolean;
  msgData: any = [];

  constructor(
    public http: HttpClient,
    private cookie: CookieService,
    public loaderService: LoaderService,
    public _notificationService: NotificationService,
    public cdf: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.gitModel = new GitModel();
    this.initailiseDataModel = new InitializeDataModel();
    this.commitAllDataClass = new CommitAllDataClass();
    this.pullDataClass = new PullDataClass();
    this.respositoryTypeData = {
      response: {
        data: [
          {
            repositoryTypeName: 'Public',
            repositoryType: '1',
            disabled: false
          },
          {
            repositoryTypeName: 'Private',
            repositoryType: '2',
            disabled: false
          }
        ]
      }
    };
  }
  ngOnInit() {
    this.syncMappedRepositoryURL();
  }
  createInvalidCompErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Invalid Component', errorData);
  }
  syncMappedRepositoryURL() {
    let responseData: any;
    let firstCommit: boolean;
    this.http.get('/api/project/project/findRepositoryByProjectUUID').subscribe(
      response => {
        responseData = response;
      },
      err => {},
      () => {
        if (responseData.success) {
          if (responseData.response) {
            if (
              responseData.response.repositioryDetails == '' ||
              responseData.response.repositioryDetails == null
            ) {
              this.gitActiveTab = true;
              this.tabdisabledFlag = true;
              this.actionActiveTab = false;
              this.gitdisabledFlag = false;
            } else {
              this.tabdisabledFlag = false;
              this.gitActiveTab = false;
              this.actionActiveTab = true;
              this.gitdisabledFlag = true;
              this.initailiseDataModel.repositoryUrl =
                responseData.response.repositioryDetails.repositoryUrl;
              this.initailiseDataModel.repositoryType =
                responseData.response.repositioryDetails.repositoryType;
              this.URLDisabled = true;
              this.respositoryTypeData.response.data.disabled = true;
              if (responseData.response.repositioryDetails.isInitialize) {
                this.initailizeDisable = true;
              }
            }
          }
        } else {
          // repository is not present i.e firstCommit = true
          this.tabdisabledFlag = true;
        }
      }
    );
  }

  onBlurCheck(rUrl: any) {
    this.msgData = [];
    if (rUrl != null && rUrl.isComponentValid) {
    } else {
      this.msgData.push('Repository URL is not valid ,Please check');
      this._notificationService.showWarningData(this.msgData);
    }
  }
  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }
  setSelectedRepository(data: any) {
    this.gitModel.repositoryType = data.repositoryType;
  }
  setInitailizeRepository(data: any) {
    this.initailiseDataModel.repositoryType = data.repositoryType;
  }
  onSave() {
    let response: any;
    this.SaveasyncFlag = true;
    this.loaderService.showLoader();
    let requestOption = {
      repositoryUrl: this.gitModel.repositoryUrl,
      repositoryType: this.gitModel.repositoryType,
      isInitialize: this.gitModel.isInitialize
    };
    this.http
      .post('/api/project/project/updaterepository', requestOption)
      .subscribe(
        resp => {
          response = resp;
        },
        error => {
          this.validationMsgArray.push('Unable to connect to server');
          this.createErrorData();
          this.SaveasyncFlag = false;
          this.loaderService.hideLoader();
        },
        () => {
          if (response.success) {
            this.msgData.push(response.successMessage);
            this._notificationService.showSuccessData(this.msgData);
            this.syncMappedRepositoryURL();
            this.resetData();
            this.SaveasyncFlag = false;
            this.loaderService.hideLoader();
          } else {
            this.loaderService.hideLoader();
          }
        }
      );
  }
  resetData() {
    this.gitModel.repositoryUrl = '';
    this.gitModel.repositoryType = '';
  }
  onCommit() {
    if (this.initailizeDisable) {
      this.showCommitAllWindow = true;
    } else {
      this.warningdialogue = true;
    }
  }
  closeCommitAllWindow() {
    this.commitAllDataClass.repositoryUsername = '';
    this.commitAllDataClass.repositoryPassword = '';
    this.showCommitAllWindow = false;
  }

  onCommitAllChangesClick() {
    let response: any;
    this.loaderService.showLoader();
    let requestOption = {
      username: this.commitAllDataClass.repositoryUsername,
      password: this.commitAllDataClass.repositoryPassword,
      repositoryURL: this.initailiseDataModel.repositoryUrl,
      commitMessage: this.commitAllDataClass.commitMessage
    };
    this.http
      .post('/api/pipeline/SourceCodeSharing/commitAll', requestOption)
      .subscribe(
        resp => {
          response = resp;
        },
        error => {
          this.validationMsgArray.push('Unable to connect to server');
          this.createErrorData();
          this.loaderService.hideLoader();
        },
        () => {
          if (response.success) {
            this.commitAllDataClass.commitMessage = '';
            this.closeCommitAllWindow();
            this.loaderService.hideLoader();
            this.msgData = [];
            this.msgData.push(response.successMessage);
            this._notificationService.showSuccessData(this.msgData);
          } else {
            this.loaderService.hideLoader();
          }
        }
      );
  }
  closeInitializeWindow() {
    this.initailiseDataModel.repositoryUsername = '';
    this.initailiseDataModel.repositoryPassword = '';
    this.showInitializeWindow = false;
  }

  validateAndInitialize() {
    console.log('in initailise');
    this.validationMsgArray = [];
    if (this.initailiseDataModel.repositoryType == '') {
      this.validationMsgArray.push('Please Select  repository type');
    }
    if (this.initailiseDataModel.repositoryUrl == '') {
      this.validationMsgArray.push('Please enter valid repositoryUrl');
    }
    if (
      this.initailiseDataModel.repositoryUsername == null ||
      this.initailiseDataModel.repositoryUsername == ''
    ) {
      this.validationMsgArray.push('Please enter valid user name');
    }
    if (
      this.initailiseDataModel.repositoryPassword == null ||
      this.initailiseDataModel.repositoryPassword == ''
    ) {
      this.validationMsgArray.push('Please enter valid repositoryPassword');
    }
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      this.createInvalidCompErrorData();
      return;
    } else {
      this.onInitializeChangesClick();
    }
  }
  validateAndCommit() {
    console.log('in commit');
    this.validationMsgArray = [];
    if (this.initailiseDataModel.repositoryType == '') {
      this.validationMsgArray.push('Please Select  repository type');
    }
    if (this.initailiseDataModel.repositoryUrl == '') {
      this.validationMsgArray.push('Please enter valid repositoryUrl');
    }
    if (
      this.commitAllDataClass.repositoryUsername == null ||
      this.commitAllDataClass.repositoryUsername == ''
    ) {
      this.validationMsgArray.push('Please enter valid user name');
    }
    if (
      this.commitAllDataClass.repositoryPassword == null ||
      this.commitAllDataClass.repositoryPassword == ''
    ) {
      this.validationMsgArray.push('Please enter valid repositoryPassword');
    }
    if (
      this.commitAllDataClass.commitMessage == null ||
      this.commitAllDataClass.commitMessage == ''
    ) {
      this.validationMsgArray.push('Please enter commit message');
    }
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      this.createInvalidCompErrorData();
      return;
    } else {
      this.onCommitAllChangesClick();
    }
  }
  validateAndPull() {
    console.log('in pull');
    this.validationMsgArray = [];
    if (this.initailiseDataModel.repositoryType == '') {
      this.validationMsgArray.push('Please Select  repository type');
    }
    if (this.initailiseDataModel.repositoryUrl == '') {
      this.validationMsgArray.push('Please enter valid repositoryUrl');
    }
    if (
      this.pullDataClass.repositoryUsername == null ||
      this.pullDataClass.repositoryUsername == ''
    ) {
      this.validationMsgArray.push('Please enter valid user name');
    }
    if (
      this.pullDataClass.repositoryPassword == null ||
      this.pullDataClass.repositoryPassword == ''
    ) {
      this.validationMsgArray.push('Please enter valid repositoryPassword');
    }
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      this.createInvalidCompErrorData();
      return;
    } else {
      this.onPullChangesClick();
    }
  }
  onInitializeChangesClick() {
    this.validationMsgArray = [];
    let response: any;
    this.loaderService.showLoader();
    this.http
      .post(
        '/api/project/sourcecodecommit/initialize',
        this.initailiseDataModel
      )
      .subscribe(
        resp => {
          response = resp;
        },
        error => {
          this.validationMsgArray.push('Unable to connect to server');
          this.createErrorData();
          this.loaderService.hideLoader();
        },
        () => {
          if (response.success) {
            this.closeInitializeWindow();
            this.loaderService.hideLoader();
            this.msgData = [];
            this.msgData.push(
              'Initailise process started,please check the status in Task Details'
            );
            this._notificationService.showSuccessData(this.msgData);
            this.initailizeDisable = true;
          } else {
            this.loaderService.hideLoader();
          }
        }
      );
  }
  onInitialize() {
    this.validationMsgArray = [];
    if (this.initailiseDataModel.repositoryType == '') {
      this.validationMsgArray.push('Please Select  repository type');
    }
    if (this.initailiseDataModel.repositoryUrl == '') {
      this.validationMsgArray.push('Please enter valid repositoryUrl');
    }
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      this.createInvalidCompErrorData();
      return;
    } else {
      this.showInitializeWindow = true;
    }
  }

  onPull() {
    if (this.initailizeDisable) {
      this.showPullWindow = true;
    } else {
      this.warningdialogue = true;
    }
  }
  okWarningBtnClick() {
    this.warningdialogue = false;
  }
  closePullWindow() {
    this.pullDataClass.repositoryPassword = '';
    this.pullDataClass.repositoryUsername = '';
    this.showPullWindow = false;
  }

  onPullChangesClick() {
    this.validationMsgArray = [];
    let response: any;
    this.loaderService.showLoader();
    let requestOption = {
      username: this.pullDataClass.repositoryUsername,
      password: this.pullDataClass.repositoryPassword
    };
    this.http
      .post('/api/pipeline/SourceCodeSharing/pull', requestOption)
      .subscribe(
        resp => {
          response = resp;
        },
        error => {
          this.validationMsgArray = [];
          this.validationMsgArray.push('Unable to connect to server');
          this.createErrorData();
          this.loaderService.hideLoader();
        },
        () => {
          if (response.success) {
            this.closePullWindow();
            this.loaderService.hideLoader();
            this.msgData = [];
            this.msgData.push(response.successMessage);
            this._notificationService.showSuccessData(this.msgData);
          } else {
            this.loaderService.hideLoader();
          }
        }
      );
  }
}
export class GitModel {
  repositoryType: string;
  repositoryUrl: string;

  isInitialize: false;
  constructor() {
    this.repositoryUrl = '';
    this.repositoryType = '1';
    this.isInitialize = false;
  }
}
export class InitializeDataModel {
  repositoryType: string;
  repositoryUrl: string;
  repositoryUsername: string;
  repositoryPassword: string;
  isInitialize: boolean;

  constructor() {
    this.repositoryUrl = '';
    this.repositoryType = '';
    this.repositoryPassword = '';
    this.repositoryUsername = '';
    this.isInitialize = true;
  }
}
export class CommitAllDataClass {
  commitMessage: string;
  repositoryUsername: string;
  repositoryPassword: string;
  constructor() {
    this.commitMessage = '';
    this.repositoryPassword = '';
    this.repositoryUsername = '';
  }
}
export class PullDataClass {
  repositoryUsername: string;
  repositoryPassword: string;
  constructor() {
    this.repositoryPassword = '';
    this.repositoryUsername = '';
  }
}

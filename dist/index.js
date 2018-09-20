import { ChangeDetectorRef, Component, ComponentFactoryResolver, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexioWidgetModule } from 'amexio-ng-extensions';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService, LoaderService, NotificationService, PlatformCommmonsModule } from 'platform-commons';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TaskUIComponent = (function () {
    function TaskUIComponent(http$$1, _notificationService, loaderService) {
        this.http = http$$1;
        this._notificationService = _notificationService;
        this.loaderService = loaderService;
        this.msgData = [];
        this.refreshtime = 1;
        this.taskData = [];
    }
    //Initialized Method
    /**
     * @return {?}
     */
    TaskUIComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // this.taskMethodCall(this.refreshtime);
        this.getTaskDetails();
    };
    //Method to Clear interval
    /**
     * @return {?}
     */
    TaskUIComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // clearInterval(this.timeintrval);
    };
    /**
     * @return {?}
     */
    TaskUIComponent.prototype.createErrorData = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ errorData = [];
        var /** @type {?} */ errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.msgData;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    /**
     * @return {?}
     */
    TaskUIComponent.prototype.onChange = /**
     * @return {?}
     */
    function () {
        // if (this.refreshtime >= 0.5) {
        //   clearInterval(this.timeintrval);
        //   this.taskMethodCall(this.refreshtime);
        // } else {
        //   this.msgData.push('time can not be less than 30 sec');
        //   // this.isValidateForm = true;
        //   this._notificationService.showWarningData(this.msgData);
        // }
        this.getTaskDetails();
    };
    //Method To Get All Tasks Details
    /**
     * @return {?}
     */
    TaskUIComponent.prototype.getTaskDetails = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.taskData = [];
        this.msgData = [];
        var /** @type {?} */ taskResponse;
        this.serverFlag = true;
        this.loaderService.showLoader();
        this.http.get('/api/pipeline/task/findAll').subscribe(function (response) {
            taskResponse = response;
        }, function (error) {
            _this.msgData.push('Unable to connect to server');
            // this.isValidateForm = true;
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.serverFlag = false;
            _this.loaderService.hideLoader();
        }, function () {
            if (taskResponse.success) {
                var /** @type {?} */ task = taskResponse.response;
                _this.loaderService.hideLoader();
                _this.iterateData(task);
            }
            else {
                _this.msgData.push(taskResponse.errorMessage);
                // this.isValidateForm = true;
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.loaderService.hideLoader();
            }
        });
    };
    /**
     * @param {?} data
     * @return {?}
     */
    TaskUIComponent.prototype.iterateData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        this.taskData = [];
        data.forEach(function (obj) {
            var /** @type {?} */ date = new Date(obj.auditDetails.updatedDate);
            var /** @type {?} */ actualCreatedDate = date.toLocaleDateString();
            var /** @type {?} */ actualTime = date.toLocaleTimeString();
            var /** @type {?} */ obj1 = {
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
            _this.taskData.push(obj1);
        });
    };
    //Method to AUto Reload
    /**
     * @param {?} data
     * @return {?}
     */
    TaskUIComponent.prototype.taskMethodCall = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        this.refreshInterval = null;
        this.refreshInterval = data * 60000;
        this.timeintrval = setInterval(function () {
            if (_this.serverFlag) {
                _this.getTaskDetails();
            }
        }, this.refreshInterval);
    };
    TaskUIComponent.decorators = [
        { type: Component, args: [{
                    selector: 'task-ui',
                    styles: [
                        "\n    .green {\n      color: green!important;\n     \n  }\n  .red {\n      color: red!important;\n     \n  }\n  .yellow {\n      color: yellow!important;\n      \n  }\n  .blue {\n    color: blue!important;    \n  }\n\n.node-style {\nwhite-space: nowrap;\ndisplay: inline; }\n     \n       "
                    ],
                    template: "\n   <amexio-row>\n    <amexio-column [size]=12>\n                       <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n      <div class=\"task-ui\">\n    <amexio-card [header]=\"true\"\n[footer]=\"false\"\n[show]=\"true\"\n[body-height]=\"82\">\n        <amexio-header class=\"instanceManagement\" style=\"display: block!important;\">\n          \n          <div style=\"display: flex;justify-content: space-between;\">\n              <div>Task Status</div>\n              <div></div>\n            <div class=\"tas-header\">\n              <amexio-image [icon-class]=\"'fa fa-refresh 2x'\" [tooltip]=\"'Reload'\" (onClick)=\"getTaskDetails()\"></amexio-image>     \n               <!--<amexio-label style=\"display: inline;\">Refresh Time:</amexio-label>\n               <amexio-label style=\"display: inline;float: right;\">min</amexio-label>\n              <amexio-number-input  [(ngModel)]=\"refreshtime\" (change)=\"onChange()\"  [has-label]=\"false\"\n                                    [min-value]=\"1\"\n                                    [min-error-msg]=\"'time can not be less than 30 sec'\">\n              </amexio-number-input>-->\n            </div>\n          </div>\n        </amexio-header>\n    <amexio-body>\n  <amexio-row>\n  <amexio-column [size] =12 >\n   <amexio-datagrid\n   [data]=\"taskData\"\n   [page-size] = \"10\"\n   [global-filter]=\"false\" \n   [enable-data-filter]=\"false\">\n    <amexio-data-table-column [data-index]=\"'type'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Type'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'boundedContext'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Bounded Context'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'domain'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Module'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'taskName'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Task Name'\">\n    </amexio-data-table-column>\n      <amexio-data-table-column [data-index]=\"'Date'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Date'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'Time'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Time'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'status'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Status'\">\n      <ng-template #amexioBodyTmpl let-row=\"row\">\n      <a class=\"fa fa-circle fa-lg\"\n     [ngClass]=\"{'yellow': row.statusCode==0 , 'blue': row.statusCode ==1 , 'green': row.statusCode ==5 , 'red' : row.statusCode ==3}\"></a>\n       &nbsp;{{row.status}} \n   </ng-template>\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'statusCode'\"\n      [data-type]=\"'string'\" [hidden]=\"true\"\n      [text]=\"'Status Code'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'statusMessage'\"\n      [data-type]=\"'string'\" [hidden]=\"true\"\n      [text]=\"'Status Message'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'errorMessage'\"\n      [data-type]=\"'string'\" [hidden]=\"true\"\n      [text]=\"'Error Message'\">\n    </amexio-data-table-column>\n   </amexio-datagrid>\n   </amexio-column>\n </amexio-row>\n </amexio-body>\n </amexio-card>\n      </div>\n </amexio-column>\n </amexio-row>\n <codepipeline-notification></codepipeline-notification>\n \n "
                },] },
    ];
    /** @nocollapse */
    TaskUIComponent.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: NotificationService, },
        { type: LoaderService, },
    ]; };
    return TaskUIComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InstanceUIComponent = (function () {
    function InstanceUIComponent(http$$1, cdf, _notificationService) {
        this.http = http$$1;
        this.cdf = cdf;
        this._notificationService = _notificationService;
        //refreshtime is in min
        this.refreshtime = 1;
        this.getInstanceData();
        this.intsanceData = [];
        this.msgData = [];
    }
    /**
     * @return {?}
     */
    InstanceUIComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.instanceMethodCall(this.refreshtime);
    };
    /**
     * @return {?}
     */
    InstanceUIComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        clearInterval(this.timeintrval);
    };
    /**
     * @return {?}
     */
    InstanceUIComponent.prototype.createErrorData = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ errorData = [];
        var /** @type {?} */ errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.msgData;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    /**
     * @return {?}
     */
    InstanceUIComponent.prototype.onChange = /**
     * @return {?}
     */
    function () {
        if (this.refreshtime >= 0.5) {
            clearInterval(this.timeintrval);
            this.instanceMethodCall(this.refreshtime);
        }
        else {
            this.msgData.push('time can not be less than 30 sec');
            this._notificationService.showWarningData(this.msgData);
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    InstanceUIComponent.prototype.instanceMethodCall = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        this.refreshInterval = null;
        this.refreshInterval = data * 60000;
        this.timeintrval = setInterval(function () {
            _this.cdf.detectChanges();
            if (_this.serverFlag) {
                _this.getInstanceData();
            }
        }, this.refreshInterval);
    };
    // okErrorBtnClick() {
    //   this.isValidateForm = false;
    //   this.validationMsgArray = [];
    // }
    /**
     * @param {?} row
     * @return {?}
     */
    InstanceUIComponent.prototype.onStop = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        var _this = this;
        if (row.instanceState === 'stopping' || row.instanceState === 'stopped') {
            this.msgData.push('Instance is already stopping/stopped');
            this._notificationService.showWarningData(this.msgData);
        }
        else {
            var /** @type {?} */ response_1;
            var /** @type {?} */ requestJson = {
                instanceId: row.instanceId
            };
            this.http
                .post('/api/user/InstanceManager/stopInstance', requestJson)
                .subscribe(function (res) {
                response_1 = res;
            }, function (err) {
                _this.msgData.push('Unable to connect to server');
                _this.createErrorData();
            }, function () {
                if (response_1.success) {
                    _this.getInstanceData();
                    _this.msgData.push(response_1.successMessage);
                    _this._notificationService.showSuccessData(_this.msgData);
                }
                else {
                    _this.msgData.push(response_1.errorMessage);
                    // this.isValidateForm = true;
                    // this.isValidateForm = true;
                    _this.createErrorData();
                }
            });
        }
    };
    /**
     * @param {?} row
     * @return {?}
     */
    InstanceUIComponent.prototype.onStart = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        var _this = this;
        if (row.instanceState === 'running' || row.instanceState === 'pending') {
            this.msgData.push('Instance is already running/pending');
            this._notificationService.showWarningData(this.msgData);
        }
        else {
            var /** @type {?} */ response_2;
            var /** @type {?} */ requestJson = {
                instanceId: row.instanceId
            };
            this.http
                .post('/api/user/InstanceManager/startInstance', requestJson)
                .subscribe(function (res) {
                response_2 = res;
            }, function (err) {
                _this.msgData.push('Unable to connect to server');
                // this.isValidateForm = true;
                // this.isValidateForm = true;
                _this.createErrorData();
            }, function () {
                if (response_2.success) {
                    _this.msgData.push(response_2.successMessage);
                    _this._notificationService.showSuccessData(_this.msgData);
                    _this.getInstanceData();
                }
                else {
                    _this.msgData.push(response_2.errorMessage);
                    // this.isValidateForm = true;
                    // this.isValidateForm = true;
                    _this.createErrorData();
                }
            });
        }
    };
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
    /**
     * @return {?}
     */
    InstanceUIComponent.prototype.getInstanceData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ instancResponse;
        this.serverFlag = true;
        this.http.get('/api/pipeline/Instance/findAllInstances').subscribe(function (response) {
            instancResponse = response;
        }, function (error) {
            _this.msgData.push('Unable to connect to server');
            // this.isValidateForm = true;
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.serverFlag = false;
        }, function () {
            if (instancResponse.success) {
                _this.intsanceData = instancResponse.response;
            }
            else {
                _this.msgData.push(instancResponse.errorMessage);
                // this.isValidateForm = true;
                // this.isValidateForm = true;
                _this.createErrorData();
            }
        });
    };
    InstanceUIComponent.decorators = [
        { type: Component, args: [{
                    selector: 'instance-ui',
                    styles: [
                        "\n.green {\n    color: green!important;\n   \n}\n.red {\n    color: red!important;\n   \n}\n.yellow {\n    color: yellow!important;\n    \n}\n  \n.instanceManagement .input-control{\n  padding:0px !important;\n}"
                    ],
                    template: "\n    <amexio-row>\n    <amexio-column [size]=12>\n    <amexio-card [header]=\"true\"\n[footer]=\"false\"\n[show]=\"true\"\n[body-height]=\"82\">\n    <amexio-header class=\"instanceManagement\">\n    <amexio-row>\n     <amexio-column  size=\"1\">   \n     <amexio-image  style=\"padding-right:10px;\"[icon-class]=\"'fa fa-refresh fa-lg'\"\n              [tooltip]=\"'Reload'\" (onClick)=\"getInstanceData()\">\n              </amexio-image>  \n    </amexio-column>   \n    <amexio-column size=\"4\">\n              Refresh Time:\n  </amexio-column>\n    <amexio-column size=\"2\">\n    <amexio-number-input  [(ngModel)]=\"refreshtime\" (change)=\"onChange()\"  [has-label]=\"false\"\n    [min-value]=\"1\"\n     [min-error-msg]=\"'time can not be less than 30 sec'\">\n   </amexio-number-input>\n    </amexio-column>\n    <amexio-column size=\"1\">\n    min\n    </amexio-column>\n        <amexio-column size=\"4\">\n    </amexio-column>\n            </amexio-row>      \n    </amexio-header>\n    <amexio-body>\n    <amexio-row>\n        <amexio-column [size] =\"12\" >\n            <amexio-datagrid  title=\"Instance Management\"\n                [data]=\"intsanceData\"\n                [page-size] = \"10\"\n                [height]=\"300\"\n                [enable-data-filter]=\"false\">\n         <amexio-data-table-column [data-index]=\"'instanceId'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'ID'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'instanceName'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"' Name'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'instanceType'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Type'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'availabilityZone'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Availability Zone'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'instanceState'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'State'\">\n          <ng-template #amexioBodyTmpl let-row=\"row\">\n           <a class=\"fa fa-circle fa-lg\"\n          [ngClass]=\"{'green': row.instanceState=='running' , 'yellow': row.instanceState =='stopping' || row.instanceState =='pending' , 'red' : row.instanceState=='stopped'}\"></a>\n            &nbsp;{{row.instanceState}} \n        </ng-template>\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'publicDNS'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Public DNS'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'publicIpAddress'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Public IP'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'keyName'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Key Name'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'subnetId'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Subnet ID'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'vpcId'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'VPC ID'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'launchTime'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Launch Time'\">\n        </amexio-data-table-column>\n         <amexio-data-table-column [data-index]=\"'logout'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Logout'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'login'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Login'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [width]=\"15\"\n                    [data-index]=\"'instanceAction'\"\n                    [data-type]=\"'string'\" [hidden]=\"false\"\n                    [text]=\"'Action'\">\n                    <ng-template #amexioBodyTmpl let-column let-row=\"row\">\n                    <span>\n                    <ng-container *ngIf=\"row.instanceState=='stopped'\">\n<amexio-image style=\"color:green;\" [icon-class]=\"'fa fa-play-circle fa-2x'\"\n              [tooltip]=\"'Start'\" (onClick)=\"onStart(row)\">\n</amexio-image>\n                    </ng-container> \n                    <ng-container *ngIf=\"row.instanceState=='running'\">\n                   <amexio-image style=\"color:red;\" [icon-class]=\"'fa fa-stop-circle fa-2x'\"\n              [tooltip]=\"'Stop'\" (onClick)=\"onStop(row)\">\n                 </amexio-image>\n                    </ng-container>\n                    </span>\n                    </ng-template>\n                </amexio-data-table-column>\n            </amexio-datagrid>\n        </amexio-column>\n    </amexio-row>\n    </amexio-body>\n</amexio-card>\n    </amexio-column>\n   <codepipeline-notification></codepipeline-notification>\n    </amexio-row>\n\n\n  "
                },] },
    ];
    /** @nocollapse */
    InstanceUIComponent.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: ChangeDetectorRef, },
        { type: NotificationService, },
    ]; };
    return InstanceUIComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SourceCodeComponent = (function () {
    function SourceCodeComponent(http$$1, cookie, loaderService, _notificationService, cdf, componentFactoryResolver) {
        this.http = http$$1;
        this.cookie = cookie;
        this.loaderService = loaderService;
        this._notificationService = _notificationService;
        this.cdf = cdf;
        this.componentFactoryResolver = componentFactoryResolver;
        this.checkWithDisable = true;
        this.gitActiveTab = true;
        this.showCommitAllWindow = false;
        this.showInitializeWindow = false;
        this.showPullWindow = false;
        this.SaveasyncFlag = false;
        this.msgData = [];
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
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.syncMappedRepositoryURL();
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.createInvalidCompErrorData = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ errorData = [];
        var /** @type {?} */ errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Invalid Component', errorData);
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.syncMappedRepositoryURL = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ responseData;
        this.http.get('/api/project/project/findRepositoryByProjectUUID').subscribe(function (response) {
            responseData = response;
        }, function (err) { }, function () {
            if (responseData.success) {
                if (responseData.response) {
                    if (responseData.response.repositioryDetails == '' ||
                        responseData.response.repositioryDetails == null) {
                        _this.gitActiveTab = true;
                        _this.tabdisabledFlag = true;
                        _this.actionActiveTab = false;
                        _this.gitdisabledFlag = false;
                    }
                    else {
                        _this.tabdisabledFlag = false;
                        _this.gitActiveTab = false;
                        _this.actionActiveTab = true;
                        _this.gitdisabledFlag = true;
                        _this.initailiseDataModel.repositoryUrl =
                            responseData.response.repositioryDetails.repositoryUrl;
                        _this.initailiseDataModel.repositoryType =
                            responseData.response.repositioryDetails.repositoryType;
                        _this.URLDisabled = true;
                        _this.respositoryTypeData.response.data.disabled = true;
                        if (responseData.response.repositioryDetails.isInitialize) {
                            _this.initailizeDisable = true;
                        }
                    }
                }
            }
            else {
                // repository is not present i.e firstCommit = true
                // repository is not present i.e firstCommit = true
                _this.tabdisabledFlag = true;
            }
        });
    };
    /**
     * @param {?} rUrl
     * @return {?}
     */
    SourceCodeComponent.prototype.onBlurCheck = /**
     * @param {?} rUrl
     * @return {?}
     */
    function (rUrl) {
        this.msgData = [];
        if (rUrl != null && rUrl.isComponentValid) {
        }
        else {
            this.msgData.push('Repository URL is not valid ,Please check');
            this._notificationService.showWarningData(this.msgData);
        }
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.createErrorData = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ errorData = [];
        var /** @type {?} */ errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    SourceCodeComponent.prototype.setSelectedRepository = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.gitModel.repositoryType = data.repositoryType;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    SourceCodeComponent.prototype.setInitailizeRepository = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.initailiseDataModel.repositoryType = data.repositoryType;
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.onSave = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ response;
        this.SaveasyncFlag = true;
        this.loaderService.showLoader();
        var /** @type {?} */ requestOption = {
            repositoryUrl: this.gitModel.repositoryUrl,
            repositoryType: this.gitModel.repositoryType,
            isInitialize: this.gitModel.isInitialize
        };
        this.http
            .post('/api/project/project/updaterepository', requestOption)
            .subscribe(function (resp) {
            response = resp;
        }, function (error) {
            _this.validationMsgArray.push('Unable to connect to server');
            _this.createErrorData();
            _this.SaveasyncFlag = false;
            _this.loaderService.hideLoader();
        }, function () {
            if (response.success) {
                _this.msgData.push(response.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.syncMappedRepositoryURL();
                _this.resetData();
                _this.SaveasyncFlag = false;
                _this.loaderService.hideLoader();
            }
            else {
                _this.loaderService.hideLoader();
            }
        });
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.resetData = /**
     * @return {?}
     */
    function () {
        this.gitModel.repositoryUrl = '';
        this.gitModel.repositoryType = '';
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.onCommit = /**
     * @return {?}
     */
    function () {
        if (this.initailizeDisable) {
            this.showCommitAllWindow = true;
        }
        else {
            this.warningdialogue = true;
        }
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.closeCommitAllWindow = /**
     * @return {?}
     */
    function () {
        this.commitAllDataClass.repositoryUsername = '';
        this.commitAllDataClass.repositoryPassword = '';
        this.showCommitAllWindow = false;
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.onCommitAllChangesClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ response;
        this.loaderService.showLoader();
        var /** @type {?} */ requestOption = {
            username: this.commitAllDataClass.repositoryUsername,
            password: this.commitAllDataClass.repositoryPassword,
            repositoryURL: this.initailiseDataModel.repositoryUrl,
            commitMessage: this.commitAllDataClass.commitMessage
        };
        this.http
            .post('/api/pipeline/SourceCodeSharing/commitAll', requestOption)
            .subscribe(function (resp) {
            response = resp;
        }, function (error) {
            _this.validationMsgArray.push('Unable to connect to server');
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (response.success) {
                _this.commitAllDataClass.commitMessage = '';
                _this.closeCommitAllWindow();
                _this.loaderService.hideLoader();
                _this.msgData = [];
                _this.msgData.push(response.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
            }
            else {
                _this.loaderService.hideLoader();
            }
        });
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.closeInitializeWindow = /**
     * @return {?}
     */
    function () {
        this.initailiseDataModel.repositoryUsername = '';
        this.initailiseDataModel.repositoryPassword = '';
        this.showInitializeWindow = false;
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.validateAndInitialize = /**
     * @return {?}
     */
    function () {
        console.log('in initailise');
        this.validationMsgArray = [];
        if (this.initailiseDataModel.repositoryType == '') {
            this.validationMsgArray.push('Please Select  repository type');
        }
        if (this.initailiseDataModel.repositoryUrl == '') {
            this.validationMsgArray.push('Please enter valid repositoryUrl');
        }
        if (this.initailiseDataModel.repositoryUsername == null ||
            this.initailiseDataModel.repositoryUsername == '') {
            this.validationMsgArray.push('Please enter valid user name');
        }
        if (this.initailiseDataModel.repositoryPassword == null ||
            this.initailiseDataModel.repositoryPassword == '') {
            this.validationMsgArray.push('Please enter valid repositoryPassword');
        }
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            this.createInvalidCompErrorData();
            return;
        }
        else {
            this.onInitializeChangesClick();
        }
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.validateAndCommit = /**
     * @return {?}
     */
    function () {
        console.log('in commit');
        this.validationMsgArray = [];
        if (this.initailiseDataModel.repositoryType == '') {
            this.validationMsgArray.push('Please Select  repository type');
        }
        if (this.initailiseDataModel.repositoryUrl == '') {
            this.validationMsgArray.push('Please enter valid repositoryUrl');
        }
        if (this.commitAllDataClass.repositoryUsername == null ||
            this.commitAllDataClass.repositoryUsername == '') {
            this.validationMsgArray.push('Please enter valid user name');
        }
        if (this.commitAllDataClass.repositoryPassword == null ||
            this.commitAllDataClass.repositoryPassword == '') {
            this.validationMsgArray.push('Please enter valid repositoryPassword');
        }
        if (this.commitAllDataClass.commitMessage == null ||
            this.commitAllDataClass.commitMessage == '') {
            this.validationMsgArray.push('Please enter commit message');
        }
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            this.createInvalidCompErrorData();
            return;
        }
        else {
            this.onCommitAllChangesClick();
        }
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.validateAndPull = /**
     * @return {?}
     */
    function () {
        console.log('in pull');
        this.validationMsgArray = [];
        if (this.initailiseDataModel.repositoryType == '') {
            this.validationMsgArray.push('Please Select  repository type');
        }
        if (this.initailiseDataModel.repositoryUrl == '') {
            this.validationMsgArray.push('Please enter valid repositoryUrl');
        }
        if (this.pullDataClass.repositoryUsername == null ||
            this.pullDataClass.repositoryUsername == '') {
            this.validationMsgArray.push('Please enter valid user name');
        }
        if (this.pullDataClass.repositoryPassword == null ||
            this.pullDataClass.repositoryPassword == '') {
            this.validationMsgArray.push('Please enter valid repositoryPassword');
        }
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            this.createInvalidCompErrorData();
            return;
        }
        else {
            this.onPullChangesClick();
        }
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.onInitializeChangesClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.validationMsgArray = [];
        var /** @type {?} */ response;
        this.loaderService.showLoader();
        this.http
            .post('/api/project/sourcecodecommit/initialize', this.initailiseDataModel)
            .subscribe(function (resp) {
            response = resp;
        }, function (error) {
            _this.validationMsgArray.push('Unable to connect to server');
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (response.success) {
                _this.closeInitializeWindow();
                _this.loaderService.hideLoader();
                _this.msgData = [];
                _this.msgData.push('Initailise process started,please check the status in Task Details');
                _this._notificationService.showSuccessData(_this.msgData);
                _this.initailizeDisable = true;
            }
            else {
                _this.loaderService.hideLoader();
            }
        });
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.onInitialize = /**
     * @return {?}
     */
    function () {
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
        }
        else {
            this.showInitializeWindow = true;
        }
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.onPull = /**
     * @return {?}
     */
    function () {
        if (this.initailizeDisable) {
            this.showPullWindow = true;
        }
        else {
            this.warningdialogue = true;
        }
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.okWarningBtnClick = /**
     * @return {?}
     */
    function () {
        this.warningdialogue = false;
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.closePullWindow = /**
     * @return {?}
     */
    function () {
        this.pullDataClass.repositoryPassword = '';
        this.pullDataClass.repositoryUsername = '';
        this.showPullWindow = false;
    };
    /**
     * @return {?}
     */
    SourceCodeComponent.prototype.onPullChangesClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.validationMsgArray = [];
        var /** @type {?} */ response;
        this.loaderService.showLoader();
        var /** @type {?} */ requestOption = {
            username: this.pullDataClass.repositoryUsername,
            password: this.pullDataClass.repositoryPassword
        };
        this.http
            .post('/api/pipeline/SourceCodeSharing/pull', requestOption)
            .subscribe(function (resp) {
            response = resp;
        }, function (error) {
            _this.validationMsgArray = [];
            _this.validationMsgArray.push('Unable to connect to server');
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (response.success) {
                _this.closePullWindow();
                _this.loaderService.hideLoader();
                _this.msgData = [];
                _this.msgData.push(response.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
            }
            else {
                _this.loaderService.hideLoader();
            }
        });
    };
    SourceCodeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'sourceCode',
                    //language=Angular2HTML
                    template: "\n     <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n<amexio-tab-view [closable]=\"false\">\n    <amexio-tab title=\"Git Configuration\" [disabled]=\"gitdisabledFlag\" [active]=\"gitActiveTab\">\n\n        <amexio-form [form-name]=\"'validateForm'\" [body-height]=\"80\" [header]=\"false\" [show-error]=\"true\" [footer-align]=\"'right'\">\n            <amexio-form-body>\n                <amexio-row>\n                    <amexio-column [size]=\"12\">\n                        <amexio-radio-group [field-label]=\"'Git Repository Type'\" [allow-blank]=\"false\" name=\"gitModel.repositoryType\" [display-field]=\"'repositoryTypeName'\"\n                            [value-field]=\"'repositoryType'\" [horizontal]=\"true\" [data-reader]=\"'response.data'\" [data]=\"respositoryTypeData\"\n                            [default-value]=\"gitModel.repositoryType\"\n                            (onSelection)=\"setSelectedRepository($event)\">\n                        </amexio-radio-group>\n                    </amexio-column>\n                    <amexio-column [size]=\"12\">\n                        <amexio-text-input #rUrl [(ngModel)]=\"gitModel.repositoryUrl\" [field-label]=\"'Git Repository URL'\" name=\"gitModel.repositoryUrl\"\n                            [place-holder]=\"'https://github.com/meta-magic/demoapp.git'\" [enable-popover]=\"true\" (onBlur)=\"onBlurCheck(rUrl)\"\n                            [pattern]=\"'/((http|https)://)?[A-Za-z0-9.-]{3,}.[A-Za-z]{2}/'\" [allow-blank]=\"false\" error-msg=\"Please Enter Repository URL\"\n                            [icon-feedback]=\"true\">\n                        </amexio-text-input>\n                    </amexio-column>\n                </amexio-row>\n\n            </amexio-form-body>\n            <amexio-form-action>\n\n                <amexio-button [label]=\"'save'\" [type]=\"'primary'\" [tooltip]=\"'Save'\" [size]=\"'default'\" [icon]=\"'fa fa-save'\" [disabled]=\"false\"\n                      [loading]=\"SaveasyncFlag\"\n  [form-bind]=\"'validateForm'\" (onClick)=\"onSave()\">\n                </amexio-button>\n\n\n            </amexio-form-action>\n\n        </amexio-form>\n\n    </amexio-tab>\n    <amexio-tab title=\"Action\" [disabled]=\"tabdisabledFlag\" [active]=\"actionActiveTab\">\n        <amexio-card [header]=\"false\" [footer]=\"false\" [footer-align]=\"'right'\" [body-height]=\"80\">\n            <amexio-body>\n                <amexio-row>\n                    <amexio-column [size]=\"12\">\n                        <amexio-radio-group [field-label]=\"'Git Repository Type'\" [allow-blank]=\"false\" name=\"initailiseDataModel.repositoryType\" [display-field]=\"'repositoryTypeName'\"\n                            [value-field]=\"'repositoryType'\" [horizontal]=\"true\" [data-reader]=\"'response.data'\" [data]=\"respositoryTypeData\"\n                            [default-value]=\"initailiseDataModel.repositoryType\"  disabled=\"true\" (onSelection)=\"setInitailizeRepository($event)\" >\n                        </amexio-radio-group>\n                    </amexio-column>\n                    <amexio-column [size]=\"12\">\n                        <amexio-text-input #rUrl [(ngModel)]=\"initailiseDataModel.repositoryUrl\" [field-label]=\"'Git Repository URL'\" name=\"initailiseDataModel.repositoryUrl\"\n                            [place-holder]=\"'https://github.com/meta-magic/demoapp.git'\" [enable-popover]=\"true\" (onBlur)=\"onBlurCheck(rUrl)\"\n                            [pattern]=\"'/((http|https)://)?[A-Za-z0-9.-]{3,}.[A-Za-z]{2}/'\" [allow-blank]=\"false\" error-msg=\"Please Enter Repository URL\"\n                            [disabled]=\"URLDisabled\" [icon-feedback]=\"true\">\n                        </amexio-text-input>\n                    </amexio-column>\n                </amexio-row>\n                <amexio-fieldset [collapsible]=\"false\" title=\"Initialise\">\n\n                    <amexio-row>\n                        <amexio-column [size]=\"4\">\n                           <amexio-box border-color =\"blue\" border=\"left\" padding=\"true\" background-color=\"blue\">\n  <amexio-label>$ git clone repository-url</amexio-label>\n</amexio-box>\n                        </amexio-column>\n<amexio-column [size]=\"4\">\n <amexio-box border-color =\"blue\" border=\"left\" padding=\"true\" background-color=\"blue\">\n  <amexio-label>$ git init</amexio-label>\n</amexio-box>\n                        </amexio-column>\n                        <amexio-column [size]=\"2\">\n                        <amexio-checkbox [disabled]=\"true\"  [field-label]=\"'Clone/Push'\"\n                        [(ngModel)]=\"checkWithDisable\">\n</amexio-checkbox>\n                        </amexio-column>\n                        <amexio-column [size]=\"2\">\n                            <amexio-button (onClick)=\"onInitialize()\"  [disabled]=\"initailizeDisable\" [label]=\"'Initialize'\" [type]=\"'primary'\" [tooltip]=\"'Initialize'\" [size]=\"'default'\">\n                            </amexio-button>\n                        </amexio-column>\n\n                    </amexio-row>\n                </amexio-fieldset>\n                <amexio-fieldset [collapsible]=\"true\" title=\"Commit All\">\n\n                    <amexio-row>\n                        <amexio-column [size]=\"10\">\n                            <amexio-text-input [field-label]=\"'comment'\" name=\"commitMessage\" [place-holder]=\"'Enter commit message'\" [error-msg]=\"'Please enter comment'\"\n                              [(ngModel)]=\"commitAllDataClass.commitMessage\"  [icon-feedback]=\"true\" [allow-blank]=\"false\" [enable-popover]=\"true\">\n                            </amexio-text-input>\n                        </amexio-column>\n                        <amexio-column [size]=\"2\" style=\"padding-top:33px;\">\n                            <amexio-button (onClick)=\"onCommit()\" [label]=\"'Push'\" [type]=\"'primary'\" [tooltip]=\"'Push'\" [size]=\"'default'\" [disabled]=\"false\">\n                            </amexio-button>\n                        </amexio-column>\n\n                    </amexio-row>\n                </amexio-fieldset>\n                 <amexio-fieldset [collapsible]=\"true\" title=\"Pull\">\n\n                    <amexio-row>\n                        <amexio-column [size]=\"10\">\n                            <amexio-box border-color =\"blue\" border=\"left\" padding=\"true\" background-color=\"blue\">\n  <amexio-label>$ git pull</amexio-label>\n</amexio-box>\n                        </amexio-column>\n                        <amexio-column [size]=\"2\">\n                        \n                            <amexio-button (onClick)=\"onPull()\" [label]=\"'Pull'\" [type]=\"'primary'\" [tooltip]=\"'Pull'\" [size]=\"'default'\" [disabled]=\"false\">\n                            </amexio-button>\n                                                </amexio-column>\n\n                    </amexio-row>\n                </amexio-fieldset>\n\n            </amexio-body>\n\n        </amexio-card>\n    </amexio-tab>\n\n</amexio-tab-view>\n<amexio-window [show-window]=\"showInitializeWindow\" (close)=\"closeInitializeWindow()\" type=\"window\"\n                             [closable]=\"true\" [footer]=\"true\">\n                <amexio-header> Initialize </amexio-header>\n                <amexio-body>\n                  \n                  <amexio-row>\n                    <amexio-column [size]=\"6\">\n                      <amexio-textarea-input [field-label]=\"'User name or email address'\" name=\"repositoryUsername\"\n                                             [(ngModel)]=\"initailiseDataModel.repositoryUsername\"\n                                             [place-holder]=\"'Enter GitHub user name or email address'\"\n                                             [error-msg]=\"'Please enter user name'\" [icon-feedback]=\"true\" [rows]=\"'1'\"\n                                             [columns]=\"'2'\" [allow-blank]=\"false\"\n                                             [enable-popover]=\"true\"></amexio-textarea-input>\n                    </amexio-column>\n                    <amexio-column [size]=\"6\">\n                      <amexio-password-input [enable-popover]=\"true\" [(ngModel)]=\"initailiseDataModel.repositoryPassword\"\n                                             [field-label]=\"'Password '\" name=\"Password\"\n                                             [place-holder]=\"'Enter GitHub Password'\" [allow-blank]=\"false\"\n                                             [error-msg]=\"'Please enter Password'\"\n                                             [icon-feedback]=\"true\"></amexio-password-input>\n                    </amexio-column>\n                  </amexio-row>\n                </amexio-body>\n                <amexio-action>\n                  <amexio-button (onClick)=\"closeInitializeWindow()\" label=\"Cancel\" type=\"white\"\n                                 [icon]=\"'fa fa-remove'\"></amexio-button>\n                  <amexio-button (onClick)=\"validateAndInitialize()\" label=\"Initailise\" type=\"green\"\n                                 [icon]=\"'fa fa fa-arrow-circle-up'\"></amexio-button>\n                </amexio-action>\n              </amexio-window>\n <amexio-window [show-window]=\"showCommitAllWindow\" (close)=\"closeCommitAllWindow()\" type=\"window\"\n                             [closable]=\"true\" [footer]=\"true\">\n                <amexio-header> Commit Changes</amexio-header>\n                <amexio-body>\n                  \n                  <amexio-row>\n                    <amexio-column [size]=\"6\">\n                      <amexio-textarea-input [field-label]=\"'User name or email address'\" name=\"repositoryUsername\"\n                                             [(ngModel)]=\"commitAllDataClass.repositoryUsername\"\n                                             [place-holder]=\"'Enter GitHub user name or email address'\"\n                                             [error-msg]=\"'Please enter user name'\" [icon-feedback]=\"true\" [rows]=\"'1'\"\n                                             [columns]=\"'2'\" [allow-blank]=\"false\"\n                                             [enable-popover]=\"true\"></amexio-textarea-input>\n                    </amexio-column>\n                    <amexio-column [size]=\"6\">\n                      <amexio-password-input [enable-popover]=\"true\" [(ngModel)]=\"commitAllDataClass.repositoryPassword\"\n                                             [field-label]=\"'Password '\" name=\"Password\"\n                                             [place-holder]=\"'Enter GitHub Password'\" [allow-blank]=\"false\"\n                                             [error-msg]=\"'Please enter Password'\"\n                                             [icon-feedback]=\"true\"></amexio-password-input>\n                    </amexio-column>\n                  </amexio-row>\n                </amexio-body>\n                <amexio-action>\n                  <amexio-button (onClick)=\"closeCommitAllWindow()\" label=\"Cancel\" type=\"white\"\n                                 [icon]=\"'fa fa-remove'\"></amexio-button>\n                  <amexio-button (onClick)=\"validateAndCommit()\" label=\"Commit Changes\" type=\"green\"\n                                 [icon]=\"'fa fa fa-arrow-circle-up'\"></amexio-button>\n                </amexio-action>\n              </amexio-window>\n\n              <amexio-window [show-window]=\"showPullWindow\" (close)=\"closePullWindow()\" type=\"window\"\n                             [closable]=\"true\" [footer]=\"true\">\n                <amexio-header> Pull changes</amexio-header>\n                <amexio-body>\n                  \n                  <amexio-row>\n                    <amexio-column [size]=\"6\">\n                      <amexio-textarea-input [field-label]=\"'User name or email address'\" name=\"pullDataClass.repositoryUsername\"\n                                             [(ngModel)]=\"pullDataClass.repositoryUsername\"\n                                             [place-holder]=\"'Enter GitHub user name or email address'\"\n                                             [error-msg]=\"'Please enter user name'\" [icon-feedback]=\"true\" [rows]=\"'1'\"\n                                             [columns]=\"'2'\" [allow-blank]=\"false\"\n                                             [enable-popover]=\"true\"></amexio-textarea-input>\n                    </amexio-column>\n                    <amexio-column [size]=\"6\">\n                      <amexio-password-input [enable-popover]=\"true\" [(ngModel)]=\"pullDataClass.repositoryPassword\"\n                                             [field-label]=\"'Password '\" name=\"pullDataClass.repositoryPassword\"\n                                             [place-holder]=\"'Enter GitHub Password'\" [allow-blank]=\"false\"\n                                             [error-msg]=\"'Please enter Password'\"\n                                             [icon-feedback]=\"true\"></amexio-password-input>\n                    </amexio-column>\n                  </amexio-row>\n                </amexio-body>\n                <amexio-action>\n                  <amexio-button (onClick)=\"closePullWindow()\" label=\"Cancel\" type=\"white\"\n                                 [icon]=\"'fa fa-remove'\"></amexio-button>\n                  <amexio-button (onClick)=\"validateAndPull()\" label=\"Pull\" type=\"green\"\n                                 [icon]=\"'fa fa fa-arrow-circle-down'\"></amexio-button>\n                </amexio-action>\n              </amexio-window>\n               <codepipeline-notification></codepipeline-notification>\n\n <amexio-dialogue [show-dialogue]=\"warningdialogue\" [closable]=\"false\" [title]=\"'Info'\" [custom]=\"true\" (close)=\"warningdialogue = !warningdialogue\"\n                   [type]=\"'alert'\">\n    <amexio-body>\n      Please Initailise repository before Push/Pull.\n    </amexio-body>\n    <amexio-action>\n      <amexio-button type=\"primary\" (onClick)=\"okWarningBtnClick()\" [label]=\"'Ok'\">\n      </amexio-button>\n    </amexio-action>\n  </amexio-dialogue>\n\n            ",
                    styles: [
                        "\n      .panel-panel{\n        height:488px!important;\n      }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    SourceCodeComponent.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: CookieService, },
        { type: LoaderService, },
        { type: NotificationService, },
        { type: ChangeDetectorRef, },
        { type: ComponentFactoryResolver, },
    ]; };
    return SourceCodeComponent;
}());
var GitModel = (function () {
    function GitModel() {
        this.repositoryUrl = '';
        this.repositoryType = '1';
        this.isInitialize = false;
    }
    return GitModel;
}());
var InitializeDataModel = (function () {
    function InitializeDataModel() {
        this.repositoryUrl = '';
        this.repositoryType = '';
        this.repositoryPassword = '';
        this.repositoryUsername = '';
        this.isInitialize = true;
    }
    return InitializeDataModel;
}());
var CommitAllDataClass = (function () {
    function CommitAllDataClass() {
        this.commitMessage = '';
        this.repositoryPassword = '';
        this.repositoryUsername = '';
    }
    return CommitAllDataClass;
}());
var PullDataClass = (function () {
    function PullDataClass() {
        this.repositoryPassword = '';
        this.repositoryUsername = '';
    }
    return PullDataClass;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CodePipelineNotificationComponent = (function () {
    function CodePipelineNotificationComponent(_notificationService) {
        this._notificationService = _notificationService;
    }
    /**
     * @return {?}
     */
    CodePipelineNotificationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    CodePipelineNotificationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'codepipeline-notification',
                    template: "\n  <amexio-notification\n        [data]=\"_notificationService.errorData\"\n        [vertical-position]=\"'top'\"\n        [horizontal-position]=\"'right'\"\n        [close-on-escape] =\"true\"\n        [background-color]=\"'red'\"\n        [auto-dismiss-msg]=\"true\"\n        [auto-dismiss-msg-interval]=\"6000\">\n        <ng-template #amexioNotificationTemp let-data=\"data\" >\n            <amexio-box  padding=\"true\" [box-width]=\"'350px'\">           \n              <amexio-label font-color=\"white\">{{_notificationService.title}}</amexio-label><br/>            \n              <amexio-label font-color=\"white\" *ngFor=\"let msgObj of data.data\" >{{msgObj}}</amexio-label><br/>\n            </amexio-box>\n        </ng-template>\n      </amexio-notification>\n<amexio-notification\n        [data]=\"_notificationService.successData\"\n        [vertical-position]=\"'top'\"\n        [horizontal-position]=\"'right'\"\n        [close-on-escape] =\"true\"\n        [background-color]=\"'green'\"\n        [auto-dismiss-msg]=\"true\"\n        [auto-dismiss-msg-interval]=\"6000\">\n        <ng-template #amexioNotificationTemp let-data=\"data\" >\n           <amexio-box [box-width]=\"'350px'\">\n              <amexio-label font-color=\"white\" >{{data}}</amexio-label><br/>\n          </amexio-box>\n        </ng-template>\n      </amexio-notification>\n    <amexio-notification\n        [data]=\"_notificationService.warningData\"\n        [vertical-position]=\"'top'\"\n        [horizontal-position]=\"'right'\"\n        [close-on-escape] =\"true\"\n        [background-color]=\"'orange'\"\n        [foreground-color]=\"'black'\"\n        [auto-dismiss-msg]=\"true\"\n        [auto-dismiss-msg-interval]=\"6000\">\n        <ng-template #amexioNotificationTemp let-data=\"data\" >\n          <amexio-box>\n              <amexio-image [icon-class]=\"'\tfa fa-exclamation-triangle'\" style=\"font-size: 25px;\">\n              </amexio-image> &nbsp;&nbsp;\n          \n              <amexio-label font-color=\"white\" >{{data}}</amexio-label><br/>\n            </amexio-box>\n        </ng-template>\n      </amexio-notification>\n\n      <amexio-notification\n        [data]=\"_notificationService.infoData\"\n        [vertical-position]=\"'top'\"\n        [horizontal-position]=\"'right'\"\n        [close-on-escape] =\"true\"\n        [background-color]=\"'yellow'\"\n        [foreground-color]=\"'black'\"\n        [auto-dismiss-msg]=\"true\"\n        [auto-dismiss-msg-interval]=\"6000\">\n        <ng-template #amexioNotificationTemp let-data=\"data\" >\n          <amexio-box [box-width]=\"'350px'\" >\n            <amexio-image [icon-class]=\"'\tfa fa-info-circle fa-2x'\" >\n            </amexio-image> &nbsp;&nbsp;\n            <amexio-label size=\"small-bold\" font-color=\"black\">{{data}}</amexio-label>\n          </amexio-box>\n        </ng-template>\n      </amexio-notification>\n"
                },] },
    ];
    /** @nocollapse */
    CodePipelineNotificationComponent.ctorParameters = function () { return [
        { type: NotificationService, },
    ]; };
    return CodePipelineNotificationComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var routes = [
    {
        path: 'task-ui',
        component: TaskUIComponent
    },
    {
        path: 'instance-manager',
        component: InstanceUIComponent
    },
    {
        path: 'gitConfiguration',
        component: SourceCodeComponent
    }
];
var CodePipeLineMsUiModule = (function () {
    function CodePipeLineMsUiModule() {
    }
    /**
     * @return {?}
     */
    CodePipeLineMsUiModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: CodePipeLineMsUiModule,
            providers: []
        };
    };
    CodePipeLineMsUiModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        AmexioWidgetModule,
                        HttpClientModule,
                        PlatformCommmonsModule.forRoot(),
                        RouterModule.forChild(routes)
                    ],
                    declarations: [
                        TaskUIComponent,
                        InstanceUIComponent,
                        CodePipelineNotificationComponent,
                        SourceCodeComponent
                    ],
                    exports: [
                        TaskUIComponent,
                        InstanceUIComponent,
                        CodePipelineNotificationComponent,
                        SourceCodeComponent
                    ]
                },] },
    ];
    return CodePipeLineMsUiModule;
}());

export { CodePipeLineMsUiModule, TaskUIComponent, InstanceUIComponent, SourceCodeComponent, GitModel, InitializeDataModel, CommitAllDataClass, PullDataClass, CodePipelineNotificationComponent };

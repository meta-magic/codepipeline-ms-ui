"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by Ashwini on 20/2/18.
 */
var core_1 = require("@angular/core");
var InstanceUIComponent = (function () {
    function InstanceUIComponent(http, cdf, _notificationService) {
        this.http = http;
        this.cdf = cdf;
        this._notificationService = _notificationService;
        //refreshtime is in min
        this.refreshtime = 1;
        this.getInstanceData();
        this.intsanceData = [];
        this.msgData = [];
    }
    InstanceUIComponent.prototype.ngOnInit = function () {
        this.instanceMethodCall(this.refreshtime);
    };
    InstanceUIComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.timeintrval);
    };
    InstanceUIComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.msgData;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    InstanceUIComponent.prototype.onChange = function () {
        if (this.refreshtime >= 0.5) {
            clearInterval(this.timeintrval);
            this.instanceMethodCall(this.refreshtime);
        }
        else {
            this.msgData.push('time can not be less than 30 sec');
            this._notificationService.showWarningData(this.msgData);
        }
    };
    InstanceUIComponent.prototype.instanceMethodCall = function (data) {
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
    InstanceUIComponent.prototype.onStop = function (row) {
        var _this = this;
        if (row.instanceState === 'stopping' || row.instanceState === 'stopped') {
            this.msgData.push('Instance is already stopping/stopped');
            this._notificationService.showWarningData(this.msgData);
        }
        else {
            var response_1;
            var requestJson = {
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
                    _this.createErrorData();
                }
            });
        }
    };
    InstanceUIComponent.prototype.onStart = function (row) {
        var _this = this;
        if (row.instanceState === 'running' || row.instanceState === 'pending') {
            this.msgData.push('Instance is already running/pending');
            this._notificationService.showWarningData(this.msgData);
        }
        else {
            var response_2;
            var requestJson = {
                instanceId: row.instanceId
            };
            this.http
                .post('/api/user/InstanceManager/startInstance', requestJson)
                .subscribe(function (res) {
                response_2 = res;
            }, function (err) {
                _this.msgData.push('Unable to connect to server');
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
    InstanceUIComponent.prototype.getInstanceData = function () {
        var _this = this;
        var instancResponse;
        this.serverFlag = true;
        this.http.get('/api/pipeline/Instance/findAllInstances').subscribe(function (response) {
            instancResponse = response;
        }, function (error) {
            _this.msgData.push('Unable to connect to server');
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
                _this.createErrorData();
            }
        });
    };
    return InstanceUIComponent;
}());
InstanceUIComponent = __decorate([
    core_1.Component({
        selector: 'instance-ui',
        styles: [
            "\n.green {\n    color: green!important;\n   \n}\n.red {\n    color: red!important;\n   \n}\n.yellow {\n    color: yellow!important;\n    \n}\n  \n.instanceManagement .input-control{\n  padding:0px !important;\n}"
        ],
        template: "\n    <amexio-row>\n    <amexio-column [size]=12>\n    <amexio-card [header]=\"true\"\n[footer]=\"false\"\n[show]=\"true\"\n[body-height]=\"82\">\n    <amexio-header class=\"instanceManagement\">\n    <amexio-row>\n     <amexio-column  size=\"1\">   \n     <amexio-image  style=\"padding-right:10px;\"[icon-class]=\"'fa fa-refresh fa-lg'\"\n              [tooltip]=\"'Reload'\" (onClick)=\"getInstanceData()\">\n              </amexio-image>  \n    </amexio-column>   \n    <amexio-column size=\"4\">\n              Refresh Time:\n  </amexio-column>\n    <amexio-column size=\"2\">\n    <amexio-number-input  [(ngModel)]=\"refreshtime\" (change)=\"onChange()\"  [has-label]=\"false\"\n    [min-value]=\"1\"\n     [min-error-msg]=\"'time can not be less than 30 sec'\">\n   </amexio-number-input>\n    </amexio-column>\n    <amexio-column size=\"1\">\n    min\n    </amexio-column>\n        <amexio-column size=\"4\">\n    </amexio-column>\n            </amexio-row>      \n    </amexio-header>\n    <amexio-body>\n    <amexio-row>\n        <amexio-column [size] =\"12\" >\n            <amexio-datagrid  title=\"Instance Management\"\n                [data]=\"intsanceData\"\n                [page-size] = \"10\"\n                [height]=\"300\"\n                [enable-data-filter]=\"false\">\n         <amexio-data-table-column [data-index]=\"'instanceId'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'ID'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'instanceName'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"' Name'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'instanceType'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Type'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'availabilityZone'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Availability Zone'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'instanceState'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'State'\">\n          <ng-template #amexioBodyTmpl let-row=\"row\">\n           <a class=\"fa fa-circle fa-lg\"\n          [ngClass]=\"{'green': row.instanceState=='running' , 'yellow': row.instanceState =='stopping' || row.instanceState =='pending' , 'red' : row.instanceState=='stopped'}\"></a>\n            &nbsp;{{row.instanceState}} \n        </ng-template>\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'publicDNS'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Public DNS'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'publicIpAddress'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Public IP'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'keyName'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Key Name'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'subnetId'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Subnet ID'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'vpcId'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'VPC ID'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'launchTime'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Launch Time'\">\n        </amexio-data-table-column>\n         <amexio-data-table-column [data-index]=\"'logout'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Logout'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'login'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'Login'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [width]=\"15\"\n                    [data-index]=\"'instanceAction'\"\n                    [data-type]=\"'string'\" [hidden]=\"false\"\n                    [text]=\"'Action'\">\n                    <ng-template #amexioBodyTmpl let-column let-row=\"row\">\n                    <span>\n                    <ng-container *ngIf=\"row.instanceState=='stopped'\">\n<amexio-image style=\"color:green;\" [icon-class]=\"'fa fa-play-circle fa-2x'\"\n              [tooltip]=\"'Start'\" (onClick)=\"onStart(row)\">\n</amexio-image>\n                    </ng-container> \n                    <ng-container *ngIf=\"row.instanceState=='running'\">\n                   <amexio-image style=\"color:red;\" [icon-class]=\"'fa fa-stop-circle fa-2x'\"\n              [tooltip]=\"'Stop'\" (onClick)=\"onStop(row)\">\n                 </amexio-image>\n                    </ng-container>\n                    </span>\n                    </ng-template>\n                </amexio-data-table-column>\n            </amexio-datagrid>\n        </amexio-column>\n    </amexio-row>\n    </amexio-body>\n</amexio-card>\n    </amexio-column>\n   <codepipeline-notification></codepipeline-notification>\n    </amexio-row>\n\n\n  "
    })
], InstanceUIComponent);
exports.InstanceUIComponent = InstanceUIComponent;

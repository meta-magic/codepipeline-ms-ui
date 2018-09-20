/**
 * Created by Ashwini on 15/2/18.
 */
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'platform-commons';
import { NotificationService } from 'platform-commons';
export declare class TaskUIComponent implements OnInit {
    private http;
    _notificationService: NotificationService;
    loaderService: LoaderService;
    taskData: any;
    msgData: any;
    timeintrval: any;
    refreshInterval: any;
    refreshtime: number;
    serverFlag: boolean;
    constructor(http: HttpClient, _notificationService: NotificationService, loaderService: LoaderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    createErrorData(): void;
    onChange(): void;
    getTaskDetails(): void;
    iterateData(data: any): void;
    taskMethodCall(data: any): void;
}

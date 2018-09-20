/**
 * Created by Ashwini on 20/2/18.
 */
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'platform-commons';
export declare class InstanceUIComponent implements OnInit {
    private http;
    cdf: ChangeDetectorRef;
    _notificationService: NotificationService;
    intsanceData: any;
    msgData: any[];
    timeintrval: any;
    refreshInterval: any;
    refreshtime: number;
    serverFlag: boolean;
    constructor(http: HttpClient, cdf: ChangeDetectorRef, _notificationService: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    createErrorData(): void;
    onChange(): void;
    instanceMethodCall(data: any): void;
    onStop(row: any): void;
    onStart(row: any): void;
    getInstanceData(): void;
}

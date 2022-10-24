﻿'use strict';
angular.module("config-restangular", ['restangular'])
.config(restangularConfig);

function restangularConfig(RestangularProvider) {
   
    RestangularProvider.setBaseUrl('http://192.168.9.41:9069/api/'); //PH
    //RestangularProvider.setDefaultHeaders({ "Content-Type": "application/json;charset=utf-8" });
    RestangularProvider.setDefaultHeaders({ "Accept-Language": "tr-TR" });
    //RestangularProvider.setPlainByDefault(true);
    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        var extractedData;
        if (operation === "getList" && data && data.Items) {
            extractedData = data.Items;
            extractedData.paging =
            {
                pageCount: data.PageCount,
                pageNo: data.PageNo,
                pageSize: data.PageSize,
                totalRecordCount: data.TotalRecordCount
            };
            return extractedData;
        } else {
            if (data != null) {
            extractedData = data;
            return extractedData;
            }
        }
    });
};
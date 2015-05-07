/*
* MothersMilk
* Copyright (C) 2013 Regents of the University of Colorado.
*
* This program is free software; you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 2
* of the License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/


cbbApp.factory('participantService', function($http, $q, cbbConstants) {
    var participantServiceInstance = {};

    /**
     *  add the participant
     */

    var loginStatus = "false";

    var languageStatus = "true";

    participantServiceInstance.numberOfUnread = 0;

    participantServiceInstance.globalLoginStatus = false;

    participantServiceInstance.ppStatus = "false";

    participantServiceInstance.registerDate = "";

    participantServiceInstance.textMessage_ID = 0;

    participantServiceInstance.message = "";

    participantServiceInstance.textMessage_inflag = 0;

    participantServiceInstance.textMessage_inb = 0;

    participantServiceInstance.messageArray = '';

    participantServiceInstance.spanishMessageArray = '';


    participantServiceInstance.userID = undefined;

    participantServiceInstance.totalPoints = 0;

    participantServiceInstance.nextBadgeToEarn = 1;

    participantServiceInstance.pointsToEarnNextBadge = 0;

    participantServiceInstance.textMessagesIDsArray = [];

    participantServiceInstance.favoriteTextMessagesIDsArray = [];

    participantServiceInstance.weeklyMinutes = undefined;

    participantServiceInstance.monthlyMinutes = undefined;

    participantServiceInstance.daysEnrolled = undefined;

    participantServiceInstance.goalsDaysPerWeek = 2;

    participantServiceInstance.goalsMinutesPerDay = 10;

    participantServiceInstance.logMinutes = undefined;

    participantServiceInstance.earnedNewBadge = false;

    participantServiceInstance.babyName = undefined;

    participantServiceInstance.statusBadge = [
        [150, false],
        [400, false],
        [700, false],
        [1000, false],
        [1500, false],
        [2000, false],
        [2500, false],
        [3000, false],
        [3500, false],
        [4000, false],
        [4500, false],
        [5000, false]
    ];

    participantServiceInstance.setBabyName = function(name) {
        participantServiceInstance.babyName = name;
    }

    participantServiceInstance.getBabyName = function() {
        return participantServiceInstance.babyName;
    }

    participantServiceInstance.getUserID = function () {
        return participantServiceInstance.userID;
    }

    participantServiceInstance.setUserID = function (id) {
        participantServiceInstance.userID = id;
    }

    participantServiceInstance.getEarnedNewBadge = function () {
        return participantServiceInstance.earnedNewBadge;
    }

    participantServiceInstance.setEarnedNewBadge = function (status) {
        participantServiceInstance.earnedNewBadge = status;
    }

    participantServiceInstance.getLogMinutes = function () {
        return participantServiceInstance.logMinutes;
    }

    participantServiceInstance.setLogMinutes = function (minutes) {
        participantServiceInstance.logMinutes = minutes;
    }

    participantServiceInstance.getGoalsDays = function () {
        return participantServiceInstance.goalsDaysPerWeek;
    }

    participantServiceInstance.getGoalsMinutes = function () {
        return participantServiceInstance.goalsMinutesPerDay;
    }

    participantServiceInstance.setGoalsDays = function (days) {
        participantServiceInstance.goalsDaysPerWeek = days;
    }

    participantServiceInstance.setGoalsMinutes = function (minutes) {
        participantServiceInstance.goalsMinutesPerDay = minutes;
    }

    participantServiceInstance.getPointsToEarnNextBadge = function () {
        return participantServiceInstance.pointsToEarnNextBadge;
    }

    participantServiceInstance.setPointsToEarnNextBadge = function (points) {
        participantServiceInstance.pointsToEarnNextBadge = points;
    }

    participantServiceInstance.getNextBadgeToEarn = function () {
        return participantServiceInstance.nextBadgeToEarn;
    }

    participantServiceInstance.setNextBadgeToEarn = function (number) {
        participantServiceInstance.nextBadgeToEarn = number;
    }

    participantServiceInstance.getTotalPointsEarned = function () {
        return participantServiceInstance.totalPoints;
    }

    participantServiceInstance.setTotalPointsEarned = function (points) {
        participantServiceInstance.totalPoints = points;
    }

    participantServiceInstance.getTextMessageID = function() {
        return participantServiceInstance.textMessage_ID;
    }

    participantServiceInstance.getMessage = function() {
        return participantServiceInstance.message;
    }

    participantServiceInstance.getTextMessageInFlag = function() {
        return participantServiceInstance.textMessage_inflag;
    }

    participantServiceInstance.getTextMessageInb = function() {
        return participantServiceInstance.textMessage_inb;
    }

    participantServiceInstance.getMessageArray = function() {
        return participantServiceInstance.messageArray;
    }

    participantServiceInstance.getSpanishMessageArray = function() {
        return participantServiceInstance.spanishMessageArray;
    }

    participantServiceInstance.getRegisterDate = function() {
        return participantServiceInstance.registerDate;
    }

    participantServiceInstance.getppStatus = function() {
        return participantServiceInstance.ppStatus;
    }

    participantServiceInstance.setppStatus = function(statusPP) {
        participantServiceInstance.ppStatus = statusPP;
    }

    participantServiceInstance.getUnreadTextStatus = function()  {
        return participantServiceInstance.numberOfUnread;
    }

    participantServiceInstance.setUnreadTextStatus = function(totalUnread)  {
        participantServiceInstance.numberOfUnread = totalUnread;
    }

    participantServiceInstance.getLoginStatus = function() {
        return participantServiceInstance.globalLoginStatus;
    }

    participantServiceInstance.setLoginStatus = function(loginStatusID) {
        //window.alert(participantServiceInstance.globalLoginStatus);
        loginStatus = loginStatusID;
        participantServiceInstance.globalLoginStatus = loginStatusID;
        //window.alert(participantServiceInstance.globalLoginStatus);
    }

    participantServiceInstance.setLanguageStatus = function(languageStatusID) {
        languageStatus = languageStatusID;
    }

    participantServiceInstance.getLanguageStatus = function() {
        //window.alert(languageStatus);
        return languageStatus;
    }

    participantServiceInstance.add = function(participant) {
        //Creating a deferred object
        var deferred = $q.defer();
        window.alert("inside service");
        //Calling Web API to fetch shopping cart items
        $http.post('/', angular.toJson(participant)).success(function(data){
             window.alert("success");
            //Passing data to deferred's resolve function on successful completion
            deferred.resolve(data);
        }).error(function(response) {
                window.alert("failure");
                //Sending a friendly error message in case of failure
                deferred.reject(response);
            });

        //Returning the promise object
        return deferred.promise;
    };

    /**
     *  add more functions as appropriate
     */

    return participantServiceInstance;

})


//    Minisats - JS Front-end Component
//    Copyright (C) 2013  Carlos Killpack, minisats_maker
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU Affero General Public License as
//    published by the Free Software Foundation, either version 3 of the
//    License, or (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU Affero General Public License for more details.
//
//    You should have received a copy of the GNU Affero General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.

//window.addEvent('domready', function () {
    var Amount = new Class({
        initialize: function (value, denomination) {
            var self = this;
            // Denomination names and values relative to BTC and Satoshi
            this.btc = {
                "name": "Bitcoin",
                "value": 1
            };
            this.satoshi = {
                "name": "Satoshi",
                get value () { return self.btc.value / 100000000; }
            };
            this.kiloSatoshi = {
                "name": "κSatoshi",
                get value () { return self.satoshi.value * 1000; }
            };
            this.megaSatoshi = {
                "name": "MSatoshi",
                get value () { return self.kiloSatoshi.value * 1000; }
            };
            this.milliSatoshi = {
                "name": "mSatoshi",
                get value () { return self.satoshi.value / 1000; }
            };
            this.microSatoshi = {
                "name": "µSatoshi",
                get value () { return self.milliSatoshi.value / 1000; }
            };
            
        }
    });
//});

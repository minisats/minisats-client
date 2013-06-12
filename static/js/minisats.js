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

window.addEvent('domready', function () {
    var Amount = new Class({
        initialize: function (value, denomination) {
            var self = this;
            //this.value = value;
            //this.denimination = denomination; //#TODO: Check if this is a valid denomination
            // Denomination names and values relative to BTC and Satoshi
            this.bitcoin = {
                "name": "Bitcoin",
                "value": (function _toBTC (value, denomination) {
                    var chart = {
                        bitcoin: 1,
                        satoshi: 100000000,           // 100 000 000
                        kilosatoshi: 100000000000,    // 100 000 000 000
                        megasatoshi: 100000000000000, // 100 000 000 000 000
                        millisatoshi: 0.001,
                        microsatoshi: 0.000001
                    };
                    return value * chart[denomination];
                })(value, denomination)
            };
            this.satoshi = {
                "name": "Satoshi",
                get value () { return self.btc.value / 100000000; }
            };
            this.kilosatoshi = {
                "name": "kSatoshi",
                get value () { return self.satoshi.value * 1000; }
            };
            this.megasatoshi = {
                "name": "MSatoshi",
                get value () { return self.kiloSatoshi.value * 1000; }
            };
            this.millisatoshi = {
                "name": "mSatoshi",
                get value () { return self.satoshi.value / 1000; }
            };
            this.microsatoshi = {
                "name": "&micro;Satoshi",
                get value () { return self.milliSatoshi.value / 1000; }
            };
        },
        list: function () {
            var self = this,
                list = [];
            Object.keys(self).each(function (el) {
                if (self.hasOwnProperty(el) && !el.match(/(\$c|c)aller/)) {
                    self[el].slug = el;
                    list.append([self[el]]);
                }
            });
            console.log(list);
            return list;
        }
    });
    $$('.select_denomination').render(
    {'amounts': new Amount(1, 'bitcoin').list()},
    {
        'option': {
            'amount<-amounts': {
                '.': 'amount.name',
                '@value': 'amount.slug'
            }
        }
    });
});

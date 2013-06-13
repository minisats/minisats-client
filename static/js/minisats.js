/*    Minisats - JS Front-end Component
 *    Copyright (C) 2013  Carlos Killpack, minisats_maker
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Affero General Public License as
 *    published by the Free Software Foundation, either version 3 of the
 *    License, or (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

/**
 *
**/
var Amount = new Class({
        initialize: function (value, denomination) {
            var self = this;
            // Denomination names and values relative to BTC and Satoshi
            this.bitcoin = {
                "name": "Bitcoin",
                "value": (function _toBTC (value, denomination) {
                    var chart = {
                        bitcoin:      1,
                        satoshi:      100000000,       // 100 000 000
                        kilosatoshi:  100000000000,    // 100 000 000 000
                        megasatoshi:  100000000000000, // 100 000 000 000 000
                        millisatoshi: 0.001,
                        microsatoshi: 0.000001
                        // nanosatoshis are too small for JavaScript to remember
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
            return list;
        }
    });
/**
 * Set up the UI once the DOM is ready
**/
window.addEvent('domready', function () {
    /**
     * Injects the Bitcoin denominations supported by Amount
     * into the .select_denomination selection boxes.
     *
     * See Pure.js documentation for more information <http://beebole.com/pure/>
    **/
    $$('.select_denomination').render(
    {'amounts': new Amount(1, 'bitcoin').list()},
    {'option': {
        'amount<-amounts': {
            '.': 'amount.name',
                '@value': 'amount.slug'
            }
        }
    });
    /**
     * Injects strings from i18l file for the detected locale
    **/
    $$('');
    /**
     * #user event handler
    **/
    $$('.user.card').addEvents({
        submit: function (e) {
            e.preventDefault();
            var req = new Request({
                url: 'get_account.php',
                method: 'post',
                noCache: true,
                onSuccess: function (res) {
                // Just copied from the old client, I don't know what the hell kind
                // of format the response this is supposed to be in.
                    if (res[0] == 'e') {
                        console.error(res.substring(1));
                        $('depositID').set('html', 'You don\'t have an balance, please deposit some Bitcoin.');
                        $('user_next').setProperty('href', '#action.deposit');
                    } else if (res[0] == 's') {
                        res = res.substring(1).split(',');
                        $('balance').set('html', res[0]);
                        $('depositID').set('html', parseFloat(res[1]));
                    }
                }
            });
            req.send({'id_address': e.target.getChildren('#userAddress').get('value')[0]});
        }
    });
    /**
     * #action.deposit event handler
    **/
    $$('.card.action.deposit').addEvents({
        submit: function (e) {
            e.preventDefault();
            $('confirm').store('commandData', {
                command: 'withdraw',
                rValue: e.target.getChildren('#depositAmount').get('value')[0],
                denomination: e.target.getChildren('#depositDenomination').get('value')[0]
            }); console.log($('confirm').retrieve('commandData'));
        }
    });
});

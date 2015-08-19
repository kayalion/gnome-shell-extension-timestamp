/**
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

const St = imports.gi.St;
const GLib = imports.gi.GLib;
const Main = imports.ui.main;
const Lang = imports.lang;

let timestampProvider;

const TimestampProvider = new Lang.Class({
    Name: 'TimestampProvider',

    _init: function() {
        this.id = "timestamp";
    },

    getInitialResultSet: function(terms) {
        let timestamp = terms.join('');
        if (!isNaN(parseFloat(timestamp)) && isFinite(timestamp)) {
            try {
                let dateTime = GLib.DateTime.new_from_unix_utc(timestamp);
                let dateFormatted = dateTime.format("%Y-%m-%d\n%H:%M:%S %Z");

                this.searchSystem.setResults(this, [{
                    'id': 0,
                    'name': dateFormatted,
                    'description': dateFormatted,
                    'createIcon': function(size) {
                      return new St.Icon({
                          icon_size: size,
                          icon_name: 'preferences-desktop-locale'
                      });
                }}]);
            } catch(exp) {
                this.searchSystem.setResults(this, []);
            }
        } else {
            this.searchSystem.setResults(this, []);
        }
    },

    getSubsearchResultSet: function(prevResults, terms) {
        return this.getInitialResultSet(terms);
    },

    getResultMetas: function(result, callback) {
        callback(result);
    },

    filterResults: function(results, max) {
        return results;
    },

    activateResult: function(resultId) {

    },

    launchSearch: function(terms) {

    },

    createResultObject: function(resultMeta, terms) {
        return null;
    },
});

function init() {
    timestampProvider = new TimestampProvider();
}

function enable() {
    Main.overview.addSearchProvider(timestampProvider);
}

function disable() {
    Main.overview.removeSearchProvider(timestampProvider);
}

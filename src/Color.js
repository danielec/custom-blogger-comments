/**
 * Custom Blogger Comments - Allow RTF in Blogger Comments
 *   Copyright (C) 2013  Daniele Corti - <daniele@corti.me>
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */


//Namespace for functions
if (!this.cbc)
	this.cbc = {};

if (!this.cbc.translations)
	this.cbc.translations = [];

this.cbc.translations.push({
	'\\[color=([\\w\\#]+)\\]' : function(text, m) {
		if (m == null)
			return text;
		var index = m.index;
		var length = m[0].length;
		var matchstr = m[1];

		var result = text.substr(0, index);
		result += '<span style="color: ' + matchstr + '">';
		result += text.substr(index + length);
		return result;
	}
});

this.cbc.translations.push({
	'\\[\\\/color\\]' : function(text, m) {
		if (m == null)
			return text;
		var index = m.index;
		var length = m[0].length;

		var result = text.substr(0, index);
		result += '</span>';
		result += text.substr(index + length);
		return result;
	}
});
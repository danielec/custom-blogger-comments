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
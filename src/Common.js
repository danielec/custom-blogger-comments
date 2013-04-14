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
if(!this.cbc)
	this.cbc = {};

/**
 * From: http://stackoverflow.com/questions/3763080/javascript-add-events-cross-browser-function-implementation-use-attachevent-add
 */
this.cbc.AddEvent = function(html_element, event_name, event_function) 
{       
   if(html_element.attachEvent) //Internet Explorer
      html_element.attachEvent("on" + event_name, function() {event_function.call(html_element);}); 
   else if(html_element.addEventListener) //Firefox & company
      html_element.addEventListener(event_name, event_function, false); //don't need the 'call' trick because in FF everything already works in the right way          
};

/**
 *From: http://stackoverflow.com/questions/5085567/hasclass-with-javascript-or-site-with-jquery-to-javascript-translation 
 */
this.cbc.hasClass = function( target, className ) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}



/**
 * Filled by translators
 * 
 * Translator:
 * 		{
 * 			key: funct
 * 		}
 * 
 * Where key: string - with the match for the RegularExpression - e.g. \[color=([\w\#]+)\]
 * Where funct: Function - function(text, m){} with
 * 		text: the text where a match is exec
 * 		m: the match result
 * 		return: the manipulated text
 * 
 * Example:
 * 
 * 	{
 * 		'\\[color=([\\w\\#]+)\\]' : function(text, m){
 * 			if(m == null) return text;
 * 			var index = m.index;
 * 			var length = m[0].length;
 * 			var matchstr = m[1];
 * 
 * 			var result = text.substr(0, index);
 * 			result += '<span style="color: '+matchstr+'">';
 * 			result += text.substr(index+length);
 * 			return result;
 * 		}
 * }
 * 
 * Note: Remembre to use \\ for backslash
 * 
 */
if(!this.cbc.translations)
	this.cbc.translations = [];

this.cbc.applyTranslates = function(){
	if(document.getElementById && document.getElementsByTagName){
		var container = document.getElementById('comments');
		var pels = container.getElementsByTagName("p");
		for(var i = 0; i < pels.length; i++){
			var el = pels[i];
			if(this.cbc.hasClass(el, 'comment-content')){
				//This is a comment content container
				var html = el.innerHTML;
				for(var j = 0; j < this.cbc.translations.length; j++){
					html = this.cbc.matchAndTranslate(html, this.cbc.translations[j]);
				}
				el.innerHTML = html;
			}
		}
	}
};


this.cbc.matchAndTranslate = function(html, obj){
	if(!obj) return html;
	var key = null, funct = null;
	for(var k in obj){
		key = k;
		funct = obj[k];
	}
	
	if(!key || !funct || !funct.call) return html;
	
	do{
		var re = new RegExp(key);
		var m = re.exec(html);
		
		html = funct.call(this, html, m); 
	}while(m != null);
	
	return html;
}


this.cbc.AddEvent(window, 'load', this.cbc.applyTranslates);

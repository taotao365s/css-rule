/**
* jQuery CSS Rule v1.0.0
* Central function to add CSS rules to the page
* Based on code from Stack Overflow: http://stackoverflow.com/questions/4232557/jquery-css-write-into-the-style-tag
*/

(function($) {
	$.cssRule = function(selector, rules, context) {
		var stylesheet;
		context = context || document;

		if (typeof context.styleSheets == 'object') {
			if (context.styleSheets.length) {
				stylesheet = context.styleSheets[context.styleSheets.length - 1];
			} else {
				if (context.createStyleSheet) {
					stylesheet = context.createStyleSheet();
				} else {
					context.getElementsByTagName('head')[0].appendChild(context.createElement('style'));
					stylesheet = context.styleSheets[context.styleSheets.length - 1];
				}
			}
			
			// Convert string selector to array
			if (typeof selector == 'string') {
				selector = selector.split(',');
			}
			
			// Convert object-based rules to standard format
			if (typeof rules == 'object') {
				var ruleList = [];
				for (var rule in rules) {
					ruleList.push('' + rule + ': ' + rules[rule] + ';');
				}
				rules = ruleList.join(' ');
			}
			
			if (stylesheet.addRule) {
				for (var i = 0; i < selector.length; ++i) {
					stylesheet.addRule(selector[i], rules);
				}
			} else {
				stylesheet.insertRule(selector.join(',') + '{' + rules + '}', stylesheet.cssRules.length);  
			}
		}
	}
})(jQuery);

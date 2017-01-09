/*\
title: $:/plugins/tobibeer/join/filter.js
type: application/javascript
module-type: filteroperator

A filter to seamlessly join input titles

@preserve
\*/

(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
The join filter function...
*/
exports.join = function(source,operator,options) {
	// Default join options
	var join = {
			// No separator, prefix or suffix
			sep:"",
			prefix:"",
			suffix:"",
			// No trimming
			trim:0,
			// Just the title
			template:"%title%"
		},
		// Init results
		results = [],
		// Regex for title
		reTITLE =/\%title\%/mgi,
		// The regex for join options
		reVAR = /^\s*([\$\w\d\-\_\/]*):((?:.|[\r\n])*)/;
	// Each
	$tw.utils.each(
		// Operand item, split via "\"
		(operator.operand || "").split("\\"),
		function(arg) {
			var match;
			// Skip empty
			if(arg.trim() !== "") {
				// Test for make option
				match = reVAR.exec(arg);
				// Is option?
				if(match) {
					// Check option, ignore case
					switch (match[1].toLowerCase()) {
						case "trim":
							join.trim = (match[2]||"").trim() === "each" ? 2 : 1;
							break;
						case "sep":
						case "prefix":
						case "suffix":
							join[match[1].toLowerCase()] = match[2];
							break;
						default:
							console.log("tobibeer/join: unknown option in operand: ",match[1]);
					}
				// Otherwise use as template
				} else {
					// Save as make expression
					join.template = arg;
				}
			}
		}
	);
	// Loop input titles
	source(function(tiddler,title) {
		// Add item using title template while replacing...
		var add = join.template.replace(
				// The title placeholder
				reTITLE,
				// With the title, trimmed if desired
				join.trim === 2 ? title.trim() : title
			);
		// Trim each?
		if(join.trim === 2) {
			// Also trim template
			add = add.trim();
		}
		// Add to results...
		results.push(add);
	});
	// Join result string
	results = results.join(join.sep);
	// Are we trimming?
	if(join.trim) {
		// Cut off blanks
		results = results.trim();
	}
	// Add prefix and suffix
	results = join.prefix + results + join.suffix;
	// Return result
	return [results];
};

})();
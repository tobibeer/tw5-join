/*\
title: $:/plugins/tobibeer/join/filter.js
type: application/javascript
module-type: filteroperator

A filter to seamlessly join input titles

@preserve
\*/
(function(){"use strict";exports.join=function(e,t,i){var r={sep:"",prefix:"",suffix:"",trim:0,template:"%title%"},s=[],a=/\%title\%/gim,f=/^\s*([\$\w\d\-\_\/]*):(.*)$/;$tw.utils.each((t.operand||"").split("\\"),function(e){var t;if(e.trim()!==""){t=f.exec(e);if(t){switch(t[1].toLowerCase()){case"trim":r.trim=(t[2]||"").trim()==="each"?2:1;break;case"sep":case"prefix":case"suffix":r[t[1].toLowerCase()]=t[2];break}}else{r.template=e}}});e(function(e,t){var i=r.template.replace(a,r.trim===2?t.trim():t);if(r.trim===2){i=i.trim()}s.push(i)});s=s.join(r.sep);if(r.trim){s=s.trim()}s=r.prefix+s+r.suffix;return[s]}})();
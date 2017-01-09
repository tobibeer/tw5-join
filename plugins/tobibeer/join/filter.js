/*\
title: $:/plugins/tobibeer/join/filter.js
type: application/javascript
module-type: filteroperator

A filter to seamlessly join input titles

@preserve
\*/
(function(){"use strict";exports.join=function(e,i,t){var r={sep:"",prefix:"",suffix:"",trim:0,template:"%title%"},s=[],n=/\%title\%/gim,o=/^\s*([\$\w\d\-\_\/]*):((?:.|[\r\n])*)/;$tw.utils.each((i.operand||"").split("\\"),function(e){var i;if(e.trim()!==""){i=o.exec(e);if(i){switch(i[1].toLowerCase()){case"trim":r.trim=(i[2]||"").trim()==="each"?2:1;break;case"sep":case"prefix":case"suffix":r[i[1].toLowerCase()]=i[2];break;default:console.log("tobibeer/join: unknown option in operand: ",i[1])}}else{r.template=e}}});e(function(e,i){var t=r.template.replace(n,r.trim===2?i.trim():i);if(r.trim===2){t=t.trim()}s.push(t)});s=s.join(r.sep);if(r.trim){s=s.trim()}s=r.prefix+s+r.suffix;return[s]}})();
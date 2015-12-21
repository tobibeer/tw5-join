/*\
title: test-tobibeer/join-filter.js
type: application/javascript
tags: [[$:/tags/test-spec]]

Tests the join filter.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

describe("test join filter", function() {

	// Create a wiki
	var wiki = new $tw.Wiki({}),
		fakeWidget = {getVariable: function() {return "foo";}};
	$tw.wiki = wiki;
	// Tests
	it("simple join", function() {
		expect(wiki.filterTiddlers(
			"A B C +[join[]]"
		,fakeWidget).join(",")).toBe("ABC");
	});
	it("preserve white-space", function() {
		expect(wiki.filterTiddlers(
			"[[ A ]] [[ B ]] [[ C ]] +[join[]]"
		,fakeWidget).join(",")).toBe(" A  B  C ");
	});
	it("trim result", function() {
		expect(wiki.filterTiddlers(
			"[[ A ]] [[ B ]] [[ C ]] +[join[trim:yes]]"
		,fakeWidget).join(",")).toBe("A  B  C");
	});
	it("trim all titles", function() {
		expect(wiki.filterTiddlers(
			"[[ A ]] [[ B ]] [[ C ]] +[join[trim:each]]"
		,fakeWidget).join(",")).toBe("ABC");
	});
	it("custom separator", function() {
		expect(wiki.filterTiddlers(
			"[[A]] [[B]] [[C]] +[join:[sep:-]]"
		,fakeWidget).join(",")).toBe("A-B-C");
	});
	it("custom separator, trimming each", function() {
		expect(wiki.filterTiddlers(
			"[[ A ]] [[ B ]] [[ C ]] +[join:[trim:each\\sep:+]]"
		,fakeWidget).join(",")).toBe("A+B+C");
	});
	it("custom separator with spurious white-space, trimming each", function() {
		expect(wiki.filterTiddlers(
			"[[ A ]] [[ B ]] [[ C ]] +[join:[sep:- \\trim:each]]"
		,fakeWidget).join(",")).toBe("A- B- C");
	});
	it("custom title pattern", function() {
		expect(wiki.filterTiddlers(
			"[[A]] [[B]] [[C]] +[join:[0%title%1]]"
		,fakeWidget).join(",")).toBe("0A10B10C1");
	});
	it("custom title pattern, trim result", function() {
		expect(wiki.filterTiddlers(
			"[[ A ]] [[ B ]] [[ C ]] +[join[%title%\\trim:yes]]"
		,fakeWidget).join(",")).toBe("A  B  C");
	});
	it("custom title pattern, preserve white-space", function() {
		expect(wiki.filterTiddlers(
			"[[ A ]] [[ B ]] [[ C ]] +[join:[ %title% \\trim:each]]"
		,fakeWidget).join(",")).toBe("ABC");
	});
	it("final prefix", function() {
		expect(wiki.filterTiddlers(
			"A B C +[join:[prefix:+]]"
		,fakeWidget).join(",")).toBe("+ABC");
	});
	it("final suffix", function() {
		expect(wiki.filterTiddlers(
			"A B C +[join:[suffix:+]]"
		,fakeWidget).join(",")).toBe("ABC+");
	});
	it("final prefix, suffix and custom template, separator, trimmed", function() {
		expect(wiki.filterTiddlers(
			"[[ A]] [[ B ]] [[C ]] +[join:[X%title%X\\prefix:start:\\suffix::end\\sep:-\\trim:each]]"
		,fakeWidget).join(",")).toBe("start:XAX-XBX-XCX:end");
	});
});

})();

"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[4118],{5765:e=>{function s(e){!function(e){function s(e){return RegExp(/([ \t])/.source+"(?:"+e+")"+/(?=[\s;]|$)/.source,"i")}e.languages.csp={directive:{pattern:/(^|[\s;])(?:base-uri|block-all-mixed-content|(?:child|connect|default|font|frame|img|manifest|media|object|prefetch|script|style|worker)-src|disown-opener|form-action|frame-(?:ancestors|options)|input-protection(?:-(?:clip|selectors))?|navigate-to|plugin-types|policy-uri|referrer|reflected-xss|report-(?:to|uri)|require-sri-for|sandbox|(?:script|style)-src-(?:attr|elem)|upgrade-insecure-requests)(?=[\s;]|$)/i,lookbehind:!0,alias:"property"},scheme:{pattern:s(/[a-z][a-z0-9.+-]*:/.source),lookbehind:!0},none:{pattern:s(/'none'/.source),lookbehind:!0,alias:"keyword"},nonce:{pattern:s(/'nonce-[-+/\w=]+'/.source),lookbehind:!0,alias:"number"},hash:{pattern:s(/'sha(?:256|384|512)-[-+/\w=]+'/.source),lookbehind:!0,alias:"number"},host:{pattern:s(/[a-z][a-z0-9.+-]*:\/\/[^\s;,']*/.source+"|"+/\*[^\s;,']*/.source+"|"+/[a-z0-9-]+(?:\.[a-z0-9-]+)+(?::[\d*]+)?(?:\/[^\s;,']*)?/.source),lookbehind:!0,alias:"url",inside:{important:/\*/}},keyword:[{pattern:s(/'unsafe-[a-z-]+'/.source),lookbehind:!0,alias:"unsafe"},{pattern:s(/'[a-z-]+'/.source),lookbehind:!0,alias:"safe"}],punctuation:/;/}}(e)}e.exports=s,s.displayName="csp",s.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_csp.fac6e518.chunk.js.map
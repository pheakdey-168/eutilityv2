/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'banhji-accounting-icon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'b-chat': '&#xe901;',
		'b-add': '&#xe900;',
		'b-close': '&#xe902;',
		'b-full': '&#xe903;',
		'b-mini': '&#xe904;',
		'b-modul': '&#xe905;',
		'b-search': '&#xe906;',
		'b-transation': '&#xe907;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/b-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());

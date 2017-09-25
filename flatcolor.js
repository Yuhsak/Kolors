function deploy() {

	var body = document.querySelector('#container');
	body.innerHTML = '';
	var basec = document.querySelector('#rgb').value;

	var baseColor = new Kolor(basec);
	var baseHue = Math.round(baseColor.hsl.h);
	var unit = 35;

	var hue = baseHue % unit;
	var hues = [];

	while(hue < 360){
		hues.push(hue);
		hue += unit;
	}

	var rows = hues.map(h => {
		var row = document.createElement('div');
		row.setAttribute('class', 'row');
		Array(3).fill(0).forEach((z,i) => {
			var n = (i-1)*2/10;
			var c =
				i==0
					? new Kolor({h: h, s: baseColor.hsl.s, l: baseColor.hsl.l}).lighten(n)
				: i==1
					? new Kolor({h: h, s: baseColor.hsl.s, l: baseColor.hsl.l})
				: new Kolor({h: h, s: baseColor.hsl.s, l: baseColor.hsl.l}).brighten(n);
			var card = document.createElement('div');
			card.setAttribute('class', 'card');
			card.setAttribute('style', 'background-color: #' + c.rgb + '; color: #fff;' + (c.rgb==baseColor.rgb ? ' font-weight: bold; color: #000;' : ''));
			card.innerHTML = '[ ' + Math.round(c.hsl.h) + ', ' + Math.round(c.hsl.s) + ', ' + Math.round(c.hsl.l) + ' ]<br />#' + c.rgb;
			row.appendChild(card);
		});

		return row;
	});

	rows.forEach(r => body.appendChild(r));

}

document.addEventListener('DOMContentLoaded', deploy);
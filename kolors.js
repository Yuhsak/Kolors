const rgbToHsl = rgb => {
	const [r,g,b] = rgb =
		(rgb => rgb.length < 6 ? [rgb[0]+rgb[0], rgb[1]+rgb[1], rgb[2]+rgb[2]] : [rgb[0]+rgb[1], rgb[2]+rgb[3], rgb[4]+rgb[5]])
		((rgb => /#/.test(rgb) ? rgb.match(/#(.*?)$/)[1] : rgb)(rgb))
		.map(hex => parseInt(hex, 16))
	const h =
		(h => h<0 ? h+360 : h)
		(((a,b,max,min,fix=0) => 60 * ((a - b) / (max - min)) + fix)
		(...(r > g ? g > b ? [g,b,r,b] : [g,b,r,g] : g > b ? b > r ? [b,r,g,r,120] : [b,r,g,b,120] : b > r ? r > g ? [r,g,b,g,240] : [r,g,b,r, 240] : [0,0,0,0]))) || 0
	const [s,l] = ( ([s,l]) => [s*100||0,l/255*100])(((r,g,b) => ((max, min) => [(max + min)/2 <= 127 ? (max-min)/(max+min) : (max-min)/(510-max-min), (max + min)/2])(Math.max(r,g,b), Math.min(r,g,b)))(r,g,b))
	return {h,s,l}
}

const hslToRgb = ({h,s,l}) => {
	const [max, min] = l < 50
		? [2.55 * (l + l * (s / 100)), 2.55 * (l - l * (s / 100))]
		: [2.55 * (l + (100 - l) * (s / 100)), 2.55 * (l - (100-l) * (s / 100))]
	return ((rgb) => rgb.map(c => Math.round(c).toString(16)))
		(h <= 60 ?
			[max, (h / 60) * (max - min) + min, min]:
		h <= 120 ?
			[((120 - h) / 60) * (max - min) + min, max, min]:
		h <= 180 ?
			[min, max, ((h - 120) / 60) * (max - min) + min]:
		h <= 240 ?
			[min, ((240 - h) / 60) * (max - min) + min, max]:
		h <= 300 ?
			[((h - 240) / 60) * (max - min) + min, min, max]:
		h <= 360 ?
			[max, min, ((360 - h) / 60) * (max - min) + min]:
			[0,0,0])
		.map(c => c.length == 1 ? '0'+c : c)
		.join('')
}

class Kolor {

	constructor(arg) {
		if(typeof(arg) == 'string'){
			this.rgb = (rgb => rgb.length < 6 ? [rgb[0]+rgb[0], rgb[1]+rgb[1], rgb[2]+rgb[2]] : [rgb[0]+rgb[1], rgb[2]+rgb[3], rgb[4]+rgb[5]])
						((rgb => /#/.test(rgb) ? rgb.match(/#(.*?)$/)[1] : rgb)(arg)).join('')
			this.hsl = rgbToHsl(this.rgb)
		} else if(typeof(arg) == 'object') {
			this.rgb = hslToRgb(arg)
			this.hsl = arg
		}
	}

	warmen(n) {
		return this.hue(n*-1)
	}

	colden(n) {
		return this.hue(n)
	}

	brighten(n) {
		return this.saturate(n)
	}

	dullen(n) {
		return this.saturate(n*-1)
	}

	lighten(n) {
		return this.luminance(n)
	}

	darken(n) {
		return this.luminance(n*-1)
	}

	hue(n) {
		return this.update('h', n)
	}

	saturate(n) {
		return this.update('s', n)
	}

	luminance(n) {
		return this.update('l', n)
	}

	update(p='l', n=0.1) {
		this.hsl[p] = this.hsl[p] * (1.0+(n||0))
		Object.keys(this.hsl).forEach(k => this.hsl[k] = k=='h' ? this.hsl[k]<360 ? this.hsl[k]>=0 ? this.hsl[k] : 0 : 360 : (k=='s'||k=='l') ? this.hsl[k]<100 ? this.hsl[k]>=0 ? this.hsl[k] : 0 : 100 : null )
		this.rgb = hslToRgb(this.hsl)
		return this
	}
	
	get rgbDecimal() {
		const r = parseInt(this.rgb[0] + this.rgb[1], 16)
		const g = parseInt(this.rgb[2] + this.rgb[3], 16)
		const b = parseInt(this.rgb[4] + this.rgb[5], 16)
		return [r,g,b]
	}

	get value() {
		return this.rgb
	}

	toString() {
		return this.rgb
	}

}

module.exports = Kolor

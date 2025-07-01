const core = document.querySelector('#core');
const width = core.clientWidth;
const height = core.clientHeight;

Number.prototype.toPixel = function () {
	return `${this}px`;
};

Number.prototype.divide = function (divisor) {
	return this / divisor;
};

const barHeight = (time, waveLength, amplitude) => {
	return (Math.sin((time * (Math.PI * 2)) / waveLength) * amplitude * 2) / 2 + amplitude;
};

const waves = [
	{ waveLength: width / 4, amplitude: height / 2 },
	{ waveLength: width / 8, amplitude: height / 3 },
	{ waveLength: width / 5, amplitude: height / 2.5 },
	{ waveLength: width / 2, amplitude: height / 8 },
];

for (i = 0; i < width; i++) {
	const bar = document.createElement('div');
	bar.classList.add('bar');

	bar.style.height = waves
		.reduce((acc, wave) => acc + barHeight(i, wave.waveLength, wave.amplitude), 0)
		.divide(waves.length)
		.toPixel();

	bar.style.left = i.toPixel();
	core.append(bar);
}

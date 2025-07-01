Number.prototype.toPixel = function () {
	return `${this}px`;
};

Number.prototype.divide = function (divisor) {
	return this / divisor;
};

const barHeight = (x, waveLength, amplitude) => {
	return (Math.sin((x * (Math.PI * 2)) / waveLength) * amplitude * 2) / 2 + amplitude;
};

const paint = (container, waves, time) => {
	for (i = 0; i < width; i++) {
		const bar = document.createElement('div');
		bar.classList.add('bar');

		bar.style.height = waves
			.reduce(
				(acc, wave) =>
					acc +
					barHeight(
						i + wave.direction * wave.speed * time,
						wave.waveLength,
						wave.amplitude,
					),
				0,
			)
			.divide(waves.length)
			.toPixel();

		bar.style.left = i.toPixel();
		container.append(bar);
	}
};

const core = document.querySelector('#core');
const width = core.clientWidth;
const height = core.clientHeight;

// Direction: 1=right, -1=left
const waves = [
	{ waveLength: width / 4, amplitude: height / 2, direction: 1, speed: 10 },
	{ waveLength: width / 8, amplitude: height / 3, direction: 1, speed: 20 },
	{ waveLength: width / 5, amplitude: height / 2.5, direction: -1, speed: 15 },
	{ waveLength: width / 2, amplitude: height / 8, direction: 1, speed: 13 },
];

paint(core, waves);
let time = 0;
setInterval(() => {
	core.innerHTML = '';
	time += 0.1;
	paint(core, waves, time);
}, 100);

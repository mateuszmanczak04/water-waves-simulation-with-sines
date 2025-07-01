Number.prototype.toPixel = function () {
	return `${this}px`;
};

Number.prototype.divide = function (divisor) {
	return this / divisor;
};

const barHeight = (x, waveLength, amplitude) => {
	// Add 10px at the end to avoid waves hitting the bottom edge
	return (Math.sin((x * (Math.PI * 2)) / waveLength) * amplitude * 2) / 2 + amplitude + 10;
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

const controls = document.querySelector('#controls');
const wave1Checkbox = document.querySelector('#controls #wave1');
const wave2Checkbox = document.querySelector('#controls #wave2');
const wave3Checkbox = document.querySelector('#controls #wave3');

wave1Checkbox.addEventListener('change', (e) => {
	waves[0].enabled = e.target.checked;
});
wave2Checkbox.addEventListener('change', (e) => {
	waves[1].enabled = e.target.checked;
});

wave3Checkbox.addEventListener('change', (e) => {
	waves[2].enabled = e.target.checked;
});

const core = document.querySelector('#core');
const width = core.clientWidth;
const height = core.clientHeight;

// Direction: 1=right, -1=left
const waves = [
	{
		waveLength: width / 4,
		amplitude: height / 4.2,
		direction: 1,
		speed: 3,
		enabled: wave1Checkbox.checked,
	},
	{
		waveLength: width / 3.8,
		amplitude: height / 2.7,
		direction: 1,
		speed: 4,
		enabled: wave2Checkbox.checked,
	},
	{
		waveLength: width / 5.3,
		amplitude: height / 2.4,
		direction: -1,
		speed: 5,
		enabled: wave3Checkbox.checked,
	},
];

paint(core, waves);
let time = 0;
setInterval(() => {
	core.innerHTML = '';
	time += 0.1;
	paint(
		core,
		waves.filter((w) => w.enabled),
		time,
	);
}, 30);

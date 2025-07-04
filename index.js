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
const wave1Range = document.querySelector('#controls #wave1-length');
const wave1AmplitudeRange = document.querySelector('#controls #wave1-amplitude');
const wave1SpeedRange = document.querySelector('#controls #wave1-speed');
const wave1DirectionSelect = document.querySelector('#controls #wave1-direction');

const wave2Checkbox = document.querySelector('#controls #wave2');
const wave2Range = document.querySelector('#controls #wave2-length');
const wave2AmplitudeRange = document.querySelector('#controls #wave2-amplitude');
const wave2SpeedRange = document.querySelector('#controls #wave2-speed');
const wave2DirectionSelect = document.querySelector('#controls #wave2-direction');

const wave3Checkbox = document.querySelector('#controls #wave3');
const wave3Range = document.querySelector('#controls #wave3-length');
const wave3AmplitudeRange = document.querySelector('#controls #wave3-amplitude');
const wave3SpeedRange = document.querySelector('#controls #wave3-speed');
const wave3DirectionSelect = document.querySelector('#controls #wave3-direction');

wave1Checkbox.addEventListener('change', (e) => {
	waves[0].enabled = e.target.checked;
});

wave1Range.addEventListener('input', (e) => {
	const value = Number(event.target.value);
	waves[0].waveLength = value;
});

wave1AmplitudeRange.addEventListener('input', (e) => {
	const value = Number(event.target.value);
	waves[0].amplitude = value;
});

wave1SpeedRange.addEventListener('input', (e) => {
	const value = Number(event.target.value);
	waves[0].speed = value;
});

wave1DirectionSelect.addEventListener('input', (e) => {
	waves[0].direction = Number(e.target.value);
});

wave2Checkbox.addEventListener('change', (e) => {
	waves[1].enabled = e.target.checked;
});

wave2Range.addEventListener('input', (e) => {
	const value = Number(event.target.value);
	waves[1].waveLength = value;
});

wave2AmplitudeRange.addEventListener('input', (e) => {
	const value = Number(event.target.value);
	waves[1].amplitude = value;
});

wave2SpeedRange.addEventListener('input', (e) => {
	const value = Number(event.target.value);
	waves[1].speed = value;
});

wave2DirectionSelect.addEventListener('input', (e) => {
	waves[1].direction = Number(e.target.value);
});

wave3Range.addEventListener('input', (e) => {
	const value = Number(event.target.value);
	waves[2].waveLength = value;
});

wave3Checkbox.addEventListener('change', (e) => {
	waves[2].enabled = e.target.checked;
});

wave3AmplitudeRange.addEventListener('input', (e) => {
	const value = Number(event.target.value);
	waves[2].amplitude = value;
});

wave3SpeedRange.addEventListener('input', (e) => {
	const value = Number(event.target.value);
	waves[2].speed = value;
});

wave3DirectionSelect.addEventListener('input', (e) => {
	waves[2].direction = Number(e.target.value);
});

const core = document.querySelector('#core');
const width = core.clientWidth;
const height = core.clientHeight;

// Direction: 1=right, -1=left
const waves = [
	{
		waveLength: Number(wave1Range.value),
		amplitude: Number(wave1AmplitudeRange.value),
		direction: Number(wave1DirectionSelect.value),
		speed: Number(wave1SpeedRange.value),
		enabled: wave1Checkbox.checked,
	},
	{
		waveLength: Number(wave2Range.value),
		amplitude: Number(wave2AmplitudeRange.value),
		direction: Number(wave2DirectionSelect.value),
		speed: Number(wave2SpeedRange.value),
		enabled: wave2Checkbox.checked,
	},
	{
		waveLength: Number(wave3Range.value),
		amplitude: Number(wave3AmplitudeRange.value),
		direction: Number(wave3DirectionSelect.value),
		speed: Number(wave3SpeedRange.value),
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

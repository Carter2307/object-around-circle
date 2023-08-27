export default class Range {
	constructor(defaulValue, step) {
		this.value = defaulValue | 50;
		this.range = this.createRange();
		this.grapper = this.createGrapper();
		this.range.appendChild(this.grapper);
		this.pos = { current: 0, target: 0 };
		this.step = step | 2;
		this.eventHandler();
	}

	onInput = new Event("oninput");

	triggerInputEvent() {
		const event = new CustomEvent("oninput", { detail: this.value });
		this.range.dispatchEvent(event);
	}

	createRange() {
		const element = Object.assign(document.createElement("div"), {
			className: "range",
		});

		element.setAttribute("value", this.value);

		return element;
	}

	createGrapper() {
		const element = Object.assign(document.createElement("div"), {
			className: "range-grapper",
		});

		return element;
    }
    
    changeStep(step) {
        this.step = step
        this.eventHandler()
    }

	//Events handler callback
	onPointerMove = (e) => {
		e.preventDefault();
		e.stopPropagation();
        this.pos.target = e.clientX;
        
		const distance = this.pos.target - this.pos.current;
		if (distance !== 0) {
			if (distance > 0) {
				this.value += this.step;
			} else {
				this.value -= this.step;
            }
            console.log(this.step)
			this.triggerInputEvent();
		}

		this.pos.current = this.pos.target;
		//console.log(Math.round(this.lerp(0, 100, this.value)));
	};

	onPointerDown = (e) => {
		e.stopPropagation();
		this.pos.current = e.clientX;
		document.body.style.cursor = "ew-resize";
		window.addEventListener("pointerup", this.onPointerUp);
		window.addEventListener("pointermove", this.onPointerMove);
	};

	lerp(min, max, value) {
		if (value <= min) return min;
		if (value >= max) return max;
		return value;
	}

	onPointerUp = (e) => {
		e.preventDefault();
		e.stopPropagation();

		this.pos.current = e.clientX;
		//changer le style du curseur css
		document.body.style.cursor = "default";
		window.removeEventListener("pointerdown", this.onPointerDown);
		window.removeEventListener("pointermove", this.onPointerMove);
		this.eventHandler();
	};

	eventHandler() {
		window.addEventListener("pointerdown", this.onPointerDown);
	}
}

import MathLive from "mathlive/dist/mathlive.js";

let options = {
	smartMode: true,
	virtualKeyboardMode: "manual",
	virtualKeyboardLayout: "qwertz",
	virtualKeyboardTheme: "material",
	virtualKeyboards: "all",
	onContentDidChange: (mf) => {
		const latex = mf.$text();
		console.log(latex);
	},
	inlineShortcuts: {
		"minus": "-",
		"-": "-",
		"plus": "+",
		"/": "\\frac",
		"super 1": "^1",
		"super 2": "^2",
		"super 3": "^3",
		"super 4": "^4",
		"super 5": "^5",
		"super 6": "^6",
		"super 7": "^7",
		"super 8": "^8",
		"super 9": "^8",
	},
};

export default {
	options: options,
	register: function(Quill) {
		let Embed = Quill.import("blots/embed");

		class MathLiveBlot extends Embed {
			static create(content) {
				let node = super.create();

				node.setAttribute("contenteditable", false);

				let span = document.createElement("span");

				node.appendChild(span);
				console.log(node);

				node.MathLiveField = MathLive.makeMathField(span, options);

				node.MathLiveField.$latex(content);

				node.addEventListener("click", function() {
					node.MathLiveField.$focus();
				});

				return node;
			}

			static value(node) {
				return node.MathLiveField.$latex();
			}
		}

		MathLiveBlot.blotName = "mathLive";
		MathLiveBlot.tagName = "span";
		MathLiveBlot.className = "mathLiveBlot";

		Quill.register(MathLiveBlot);
	},
};

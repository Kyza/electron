const babel = require("@babel/core");
const path = require("path");
const getModule = require("./getModule");
const hashCacheBabel = require("./hashCacheBabel");

const targets = {
	electron: process.versions.electron,
	node: process.versions.node,
};

module.exports = (code) => {
	return hashCacheBabel.sync(code, babel.transformSync, code, {
		targets,
		presets: [
			[
				getModule("@babel/preset-env"),
				{
					targets,
				},
			],
			getModule("@babel/preset-react"),
		],
		plugins: [
			getModule("@babel/plugin-proposal-class-properties"),
			[
				getModule("babel-plugin-module-resolver"),
				{
					alias: {
						kernel: path.resolve(__dirname, "..", "core"),
					},
				},
			],
		],
	});
};

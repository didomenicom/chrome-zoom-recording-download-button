const fs = require("fs");
const path = require("path");

const ChromeExtension = require("crx");

const packageJson = require("../package.json");

const crx = new ChromeExtension({
	privateKey: fs.readFileSync(path.join(__dirname, "../", `private_key`, `${packageJson.name}.pem`)),
});

crx.load(path.join(__dirname, "../", `src`))
	.then((crx) => {
		return crx.pack();
	})
	.then((crxBuffer) => {
		const resultPath = path.join(__dirname, "../", `${packageJson.name}.crx`);

		fs.writeFile(resultPath, crxBuffer, (err, result) => {
			if (err) {
				console.log("error", err);
			} else {
				console.log("success");
			}
		});
	});

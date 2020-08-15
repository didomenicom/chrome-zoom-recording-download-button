const fs = require("fs");
const path = require("path");

const archiver = require("archiver");
const archive = archiver("zip");
const ChromeExtension = require("crx");

const packageJson = require("../package.json");

const removeFile = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.unlink(filePath, (err) => {
			if (err) throw err;
			console.log(`\t${filePath} was deleted`);
			resolve();
		});
	});
};

// Main program starts here
Promise.resolve()
	.then(async () => {
		console.log("Checking for existing archive...");

		await removeFile(path.join(__dirname, "../", `${packageJson.name}.zip`));
		await removeFile(path.join(__dirname, "../", `${packageJson.name}.crx`));
	})
	.then(() => {
		console.log("Creating new zip file...");

		const output = fs.createWriteStream(path.join(__dirname, "../", `${packageJson.name}.zip`));

		output.on("close", () => {
			console.log(archive.pointer() + " total bytes");
			console.log("Archive Created.");
		});

		archive.on("error", (err) => {
			throw err;
		});

		archive.pipe(output);

		archive.directory(path.join(__dirname, "../", "src/"), false).finalize();
	})
	.then(() => {
		console.log("Creating new .crx file...");
		const crx = new ChromeExtension({
			privateKey: fs.readFileSync(path.join(__dirname, "../", `private_key`, `${packageJson.name}.pem`)),
		});

		crx.load(path.join(__dirname, "../", "src"))
			.then((crx) => {
				return crx.pack();
			})
			.then((crxBuffer) => {
				const resultPath = path.join(__dirname, "../", `${packageJson.name}.crx`);

				fs.writeFile(resultPath, crxBuffer, (err, result) => {
					if (err) {
						console.log("error", err);
					} else {
						console.log("CRX Created.");
					}
				});
			});
	});

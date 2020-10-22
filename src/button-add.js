window.addEventListener("load", function (e) {
	// Check if there is already a download button
	var downloadButtonExists = document.getElementsByClassName("download");

	if (!downloadButtonExists || downloadButtonExists.length === 0) {
		// Get the source video URL
		var sourceVideoObj = document.getElementsByTagName("video")[0];
		var sourceVideoUrl = sourceVideoObj.getAttribute("src");

		var matches = sourceVideoUrl.match(/(.*)\?(.*)/);

		if (matches.length > 1) {
			var url = matches[1];
			var params = matches[2].split("&");

			// Generate the download button
			var recordingDownloadForm = document.createElement("form");
			recordingDownloadForm.setAttribute("method", "get");
			recordingDownloadForm.setAttribute("action", url);

			// Add all of the hidden fields
			if (params.length > 0) {
				for (var i = 0; i < params.length; i++) {
					var setMatch = params[i].match(/(.*)=(.*)/);

					if (setMatch.length > 1) {
						var hiddenInputField = document.createElement("input");
						hiddenInputField.setAttribute("type", "hidden");
						hiddenInputField.setAttribute("name", setMatch[1]);
						hiddenInputField.value = setMatch[2];

						recordingDownloadForm.innerHTML = recordingDownloadForm.innerHTML + hiddenInputField.outerHTML;
					}
				}
			}

			// Add the download button
			var recordingDownloadButton = document.createElement("button");
			recordingDownloadButton.setAttribute("id", "recording-download-button");
			recordingDownloadButton.setAttribute("type", "submit");
			recordingDownloadButton.innerHTML = "Download";
			recordingDownloadButton.style.top = "0px";
			recordingDownloadButton.style.right = "0px";
			recordingDownloadButton.style.position = "fixed";
			recordingDownloadButton.style.padding = "20px";
			recordingDownloadButton.style.backgroundColor = "#ffffff";
			recordingDownloadButton.style.zIndex = "100";
			recordingDownloadButton.style.border = "0px";
			recordingDownloadButton.style.borderBottomLeftRadius = "5px";
			recordingDownloadButton.style.borderBottom = "1px solid #cccccc";
			recordingDownloadButton.style.borderLeft = "1px solid #cccccc";

			recordingDownloadForm.innerHTML = recordingDownloadForm.innerHTML + recordingDownloadButton.outerHTML;

			// Insert it in the page
			var appDiv = document.getElementById("app");
			appDiv.insertAdjacentHTML("afterbegin", recordingDownloadForm.outerHTML);
		}
	}
});

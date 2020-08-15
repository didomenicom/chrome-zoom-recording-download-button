window.addEventListener("load", function (e) {
	// Check if there is already a download button
	var downloadButtonExists = document.getElementsByClassName("download");

	if (!downloadButtonExists) {
		// Get the source video URL
		var sourceVideoObj = document.getElementsByTagName("video")[0];
		var sourceVideoUrl = sourceVideoObj.getAttribute("src");

		// Generate the download button
		var recordingDownloadForm = document.createElement("form");
		recordingDownloadForm.setAttribute("method", "get");
		recordingDownloadForm.setAttribute("action", sourceVideoUrl);

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

		recordingDownloadForm.innerHTML = recordingDownloadButton.outerHTML;

		// Insert it in the page
		var appDiv = document.getElementById("app");
		appDiv.insertAdjacentHTML("afterbegin", recordingDownloadForm.outerHTML);
	}
});

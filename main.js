const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", function (e) {
  e.preventDefault(); // preventing form from submitting.
  downloadBtn.innerText = "Downloading file....";
  fetchFile(fileInput.value);
});

function fetchFile(url) {
  // fetching file & returning response as blob
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      // url.createObjectURL creates a url of passed object
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement("a");
      aTag.href = tempUrl;
      aTag.download = url.replace(/.*[\\\/]/, "");
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      URL.revokeObjectURL(tempUrl);
      downloadBtn.innerText = "Downloading File";
    })
    .catch(function () {
      downloadBtn.innerText = "Downloading File";

      alert("Failed to download file !");
    });
}

const params = new URLSearchParams(location.search);
const url = params.get("url");

if (!url) {
    document.body.innerHTML = "URL belirtilmedi.";
} else if (url.includes(".m3u8")) {
    playHLS(url);
} else {
    video.src = url;
}

export default (function() {
    const _createPromiseWithXHR = (method, url, data = null) => {
        return new Promise((res, rej) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.responseType = "json";
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        res(xhr.response);
                    } else {
                        rej(new Error(xhr.status));
                    }
                }
            };
            xhr.send(data);
        });
    };

    const _createParam = (data) => {
        return (typeof data === "string")
            ? data
            : Object.keys(data)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
            .join("&");
    };

    const get = url => _createPromiseWithXHR("GET", url);
    const post = (url, data) => _createPromiseWithXHR("POST", url, _createParam(data));
    const put = (url, data) => _createPromiseWithXHR("PUT", url, _createParam(data));
    const del = (url) => _createPromiseWithXHR("DELETE", url);

    return { get, post, put, del };
})();

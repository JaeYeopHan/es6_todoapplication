const _createParam = (data) => {
    return (typeof data === "string")
        ? data
        : Object.keys(data)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
        .join("&");
};

const _FETCH = (method, url, body = null) => {
    return fetch(url, {method, body, headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    })}).then(res => {
        return res.json();
    });
}

export const get = (url) => _FETCH("GET", url);
export const post = (url, data) => _FETCH("POST", url, _createParam(data));
export const put = (url, data) => _FETCH("PUT", url, _createParam(data));
export const del = (url) => _FETCH("DELETE", url);

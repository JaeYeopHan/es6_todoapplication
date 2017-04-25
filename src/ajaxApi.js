const get = url => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "json";
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    res(xhr.response);
                } else {
                    rej(new Error(xhr.status));
                }
            }
        };
        xhr.send();
    });
};

const post = (url, data) => {
    return new Promise((res, rej) => {
        const params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
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
        xhr.send(params);
    });
};

const put = (url, data) => {
    return new Promise((res, rej) => {
        const params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
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
        xhr.send(params);
    });
};

const del = (url) => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
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
        xhr.send();
    });
};

export const ajaxApi = {
    get, post, put, del
};

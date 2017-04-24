const get = url => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.responseType = "json";
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    res(xhr.response);
                } else {
                    rej(xhr.status);
                }
            }
        };
        xhr.send();
    });
};

export const ajaxApi = {
    get
};

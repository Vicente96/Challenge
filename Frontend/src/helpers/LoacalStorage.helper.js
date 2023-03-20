const getLocalStorageItem = key => {
    return window.localStorage.getItem(key);
};

const setLocalStorageItem = (key, value) => {
    window.localStorage.setItem(key, value);
};

const removeLocalStorageItem = key => {
    window.localStorage.removeItem(key);
};

export { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem };
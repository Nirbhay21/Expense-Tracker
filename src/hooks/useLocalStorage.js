import { useState } from "react";

export function useLocalStorage(key, initialData) {
    const [data, setData] = useState(() => {
        const existingData = JSON.parse(localStorage.getItem(key));
        if (!existingData) {
            localStorage.setItem(key, JSON.stringify(initialData));
        }
        return existingData || initialData;
    });

    const updateLocalStorage = (newData) => {
        if (typeof newData === "function") {
            localStorage.setItem(key, JSON.stringify(newData(data)));
        } else {
            localStorage.setItem(key, JSON.stringify(newData));
        }
        setData(newData);
    }

    return [data, updateLocalStorage];
}
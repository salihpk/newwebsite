import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
    const [stored, setStored] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(stored));
        } catch {
            // storage full or blocked — fail silently
        }
    }, [key, stored]);

    return [stored, setStored];
}

import { newId, display } from './utils.js';

const requestAccess = async () => {
    if (typeof document.requestStorageAccess !== 'function') {
        console.error('Storage access method not provided');
        return;
    }
    try {
        let hasAccess = await document.hasStorageAccess();
        console.log('Has storage access:', hasAccess);
        if (!hasAccess) {
            // Need to request storage access on FireFox
            console.log('Trying to request storage access.');
            await document.requestStorageAccess();
            hasAccess = await document.hasStorageAccess();
            console.log('Has storage access:', hasAccess);
        }
    } catch (error) {
        console.error('Failed to request storage access:', error);
    }
};

const storages = {
    cookie: {
        // 3rd-party cookie
        // - Fails in Safari with default config
        get() {
            return document.cookie.replace(/(?:(?:^|.*;\s*)AdFluxTrackId\s*\=\s*([^;]*).*$)|^.*$/, '$1');
        },
        set(trackId) {
            // "SameSite=None" is used to allow 3rd-party cookie access
            // White "Secure" is used to allow "SameSite=None". (HTTPS required)
            document.cookie = `AdFluxTrackId=${trackId}; Max-Age=630720000; SameSite=None; Secure`;
        },
    },
    localStorage: {
        // localStorage
        // - Fails in most browsers
        get() {
            return localStorage.getItem('AdFluxTrackId');
        },
        set(trackId) {
            localStorage.setItem('AdFluxTrackId', trackId);
        },
    },
};

document.addEventListener('DOMContentLoaded', async () => {
    await requestAccess();
    for (const storage in storages) {
        let newGenerated = false;
        let trackId = storages[storage].get();
        if (!trackId) {
            trackId = newId();
            storages[storage].set(trackId);
            newGenerated = true;
        }

        let msg = `TrackId (${storage}): ${trackId}`;
        if (newGenerated) {
            msg += ' (New)';
        }
        display(msg);
    }
});

document.addEventListener('click', requestAccess);

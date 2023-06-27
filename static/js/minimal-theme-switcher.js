/*!
 * Minimal theme switcher
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2023 - Licensed under MIT
 */

const themeSwitcher = {
    // Config
    _scheme: "auto",
    buttonsTarget: "input[data-theme-switcher]",
    rootAttribute: "data-theme",
    localStorageKey: "picoPreferredColorScheme",

    // Init
    init() {
        this.scheme = this.schemeFromLocalStorage;
        this.initSwitchers();
        this.setSwitchInitialPosition();
    },

    // Get color scheme from local storage
    get schemeFromLocalStorage() {
        if (typeof window.localStorage !== "undefined") {
            if (window.localStorage.getItem(this.localStorageKey) !== null) {
                return window.localStorage.getItem(this.localStorageKey);
            }
        }
        return this._scheme;
    },

    // Preferred color scheme
    get preferredColorScheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    },

    // Init switchers
    // Init switchers
    initSwitchers() {
        const checkbox = document.querySelector(this.buttonsTarget);
        checkbox.addEventListener(
            "change",
            (event) => {
                // Set scheme
                this.scheme = event.target.checked ? "dark" : "light";
            },
            false
        );
    },

    // Set scheme
    set scheme(scheme) {
        if (scheme == "auto") {
            this.preferredColorScheme == "dark" ? (this._scheme = "dark") : (this._scheme = "light");
        } else if (scheme == "dark" || scheme == "light") {
            this._scheme = scheme;
        }
        this.applyScheme();
        this.schemeToLocalStorage();
    },

    // Get scheme
    get scheme() {
        return this._scheme;
    },

    // Apply scheme
    applyScheme() {
        document.querySelector("html").setAttribute(this.rootAttribute, this.scheme);
    },

    // Store scheme to local storage
    schemeToLocalStorage() {
        if (typeof window.localStorage !== "undefined") {
            window.localStorage.setItem(this.localStorageKey, this.scheme);
        }
    },

    // Set the initial position of the switch based on the current scheme
    setSwitchInitialPosition() {
        // const checkbox = document.querySelector(this.buttonsTarget);
        // checkbox.checked = (this.scheme === "dark") ? true : false;
    },
};

// Init
themeSwitcher.init();

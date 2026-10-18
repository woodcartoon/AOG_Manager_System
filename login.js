/* ==========================================================================
   AOG Manager — login behaviour
   Entrance choreography, field feedback, and the exit transition.
   ========================================================================== */

(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var form       = document.getElementById("loginForm");
    var email      = document.getElementById("email");
    var password   = document.getElementById("password");
    var formError  = document.getElementById("formError");
    var capsHint   = document.getElementById("capsHint");
    var revealBtn  = document.getElementById("revealPassword");
    var submitBtn  = document.getElementById("submitBtn");

    /* ---- Entrance: one staggered reveal, then the page settles ---------- */
    function stageEntrance() {
        if (!reduceMotion) {
            var steps = [].slice.call(
                document.querySelectorAll(".panel__head, .form > *, .panel__foot")
            );
            steps.forEach(function (el, i) {
                el.style.transitionDelay = (140 + i * 70) + "ms";
            });
        }

        requestAnimationFrame(function () {
            document.body.classList.add("is-ready");
        });

        // Delays are one-shot; clear them so later state changes aren't lagged.
        window.setTimeout(function () {
            document.querySelectorAll("[style*='transition-delay']").forEach(function (el) {
                el.style.transitionDelay = "";
            });
        }, 1600);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", stageEntrance);
    } else {
        stageEntrance();
    }

    /* ---- Field feedback -------------------------------------------------- */

    function clearError(input) {
        input.closest(".field").classList.remove("is-invalid");
        formError.hidden = true;
    }

    function markInvalid(input) {
        var field = input.closest(".field");
        field.classList.add("is-invalid");

        if (!reduceMotion) {
            field.classList.remove("shake");
            void field.offsetWidth;          // restart the animation
            field.classList.add("shake");
            field.addEventListener("animationend", function handler() {
                field.classList.remove("shake");
                field.removeEventListener("animationend", handler);
            });
        }
    }

    [email, password].forEach(function (input) {
        input.addEventListener("input", function () { clearError(input); });
    });

    /* Caps lock warning — only while the password field has focus. */
    password.addEventListener("keyup", function (e) {
        if (typeof e.getModifierState === "function") {
            capsHint.hidden = !e.getModifierState("CapsLock");
        }
    });

    password.addEventListener("blur", function () { capsHint.hidden = true; });

    /* Show / hide password */
    revealBtn.addEventListener("click", function () {
        var showing = password.type === "text";
        password.type = showing ? "password" : "text";
        revealBtn.setAttribute("aria-pressed", String(!showing));
        revealBtn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
        password.focus();
    });

    /* ---- Submit ---------------------------------------------------------- */

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        var missing = [email, password].filter(function (input) {
            return input.value.trim() === "";
        });

        if (missing.length) {
            e.preventDefault();
            missing.forEach(markInvalid);
            formError.textContent = missing.length === 2
                ? "Enter your email address and password to continue."
                : "Enter your " + (missing[0] === email ? "email address" : "password") + " to continue.";
            formError.hidden = false;
            missing[0].focus();
            return;
        }

        // Let the button show work in progress while the request runs.
        setLoading(true);

        try {
            if (!window.AogFirebase || typeof window.AogFirebase.signIn !== "function") {
                throw new Error("Firebase client bundle is unavailable. Close the app and restart it with npm start from the project folder.");
            }
            await window.AogFirebase.signIn(email.value.trim(), password.value);
            document.body.classList.add("is-leaving");
            window.setTimeout(function () {
                window.location.href = "index.html";
            }, reduceMotion ? 0 : 240);
        } catch (error) {
            setLoading(false);
            markInvalid(password);
            formError.textContent = getSignInError(error);
            formError.hidden = false;
            password.select();
        }
    });

    function getSignInError(error) {
        if (error && (error.code === "auth/invalid-credential" ||
                error.code === "auth/user-not-found" || error.code === "auth/wrong-password")) {
            return "That email address and password do not match.";
        }
        if (error && error.code === "auth/network-request-failed") {
            return "Firebase could not be reached. Check your internet connection, VPN, firewall, or proxy.";
        }
        if (error && error.code === "auth/operation-not-allowed") {
            return "Email/Password sign-in is disabled. Enable it in Firebase Console under Authentication > Sign-in method.";
        }
        if (error && (error.code === "auth/api-key-not-valid" ||
                error.code === "auth/invalid-api-key")) {
            return "The Firebase API key is invalid. Check the Firebase app configuration.";
        }
        if (error && error.code === "auth/invalid-email") {
            return "Enter a valid email address.";
        }
        if (error && error.code === "auth/user-disabled") {
            return "This Firebase Authentication account is disabled. Contact your administrator.";
        }
        if (error && error.code === "auth/too-many-requests") {
            return "Too many sign-in attempts. Please wait and try again.";
        }
        var errorCode = error && typeof error.code === "string" ? error.code : "unknown";
        var errorName = error && typeof error.name === "string" ? error.name : "Error";
        var errorMessage = error && typeof error.message === "string"
            ? error.message.replace(/\s+/g, " ").trim().slice(0, 160)
            : "No additional error details were provided.";
        return "Firebase sign-in failed (" + errorCode + "; " + errorName + "): " + errorMessage;
    }

    function setLoading(on) {
        submitBtn.classList.toggle("is-loading", on);
        submitBtn.querySelector(".btn__label").textContent = on ? "Signing in" : "Sign in";
    }

    document.querySelectorAll("a[data-transition]").forEach(function (link) {
        link.addEventListener("click", function (e) {
            if (reduceMotion || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
                return;
            }
            e.preventDefault();
            document.body.classList.add("is-leaving");
            window.setTimeout(function () {
                window.location.href = link.getAttribute("href");
            }, 240);
        });
    });

    /* Returning via the back button shouldn't land on a faded-out page. */
    window.addEventListener("pageshow", function () {
        document.body.classList.remove("is-leaving");
    });
})();
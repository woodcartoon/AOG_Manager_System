/* ==========================================================================
   AOG Manager — login behaviour
   Entrance choreography, field feedback, and the exit transition.
   ========================================================================== */

(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var form       = document.getElementById("loginForm");
    var username   = document.getElementById("username");
    var password   = document.getElementById("password");
    var formError  = document.getElementById("formError");
    var capsHint   = document.getElementById("capsHint");
    var revealBtn  = document.getElementById("revealPassword");
    var submitBtn  = document.getElementById("submitBtn");

    /* ---- Entrance: one staggered reveal, then the page settles ---------- */
    const AdminPortalusername = "AOGadmin";
    const AdminPortalpassword = "JESUSISKING";
    
    
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

    [username, password].forEach(function (input) {
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

    var isAdminPortal = document.body.classList.contains("admin");

    form.addEventListener("submit", function (e) {
        var missing = [username, password].filter(function (input) {
            return input.value.trim() === "";
        });

        if (missing.length) {
            e.preventDefault();
            missing.forEach(markInvalid);
            formError.textContent = missing.length === 2
                ? "Enter your username and password to continue."
                : "Enter your " + (missing[0] === username ? "username" : "password") + " to continue.";
            formError.hidden = false;
            missing[0].focus();
            return;
        }

        // Let the button show work in progress while the request runs.
        setLoading(true);

        // Inside Electron, go through the preload bridge instead of posting the
        // form (a file:// page has nowhere to post to).
        if (window.aog && typeof window.aog.login === "function") {
            e.preventDefault();

            window.aog.login({
                username: username.value.trim(),
                password: password.value,
                portal: isAdminPortal ? "admin" : "manager"
            }).then(function (result) {
                if (result && result.ok) {
                    var destination = result.role === "admin" ? "Admin.html" : "index.html";
                    document.body.classList.add("is-leaving");
                    window.setTimeout(function () {
                        window.location.href = destination;
                    }, reduceMotion ? 0 : 240);
                    return;
                }

                setLoading(false);
                markInvalid(password);
                formError.textContent = (result && result.message) ||
                    "That username and password don't match. Try again.";
                formError.hidden = false;
                password.select();
            }).catch(function () {
                setLoading(false);
                formError.textContent = "Something went wrong signing in. Try again.";
                formError.hidden = false;
            });
        }
    });

    function setLoading(on) {
        submitBtn.classList.toggle("is-loading", on);
        submitBtn.querySelector(".btn__label").textContent = on ? "Signing in" : "Sign in";
    }

    /* ---- Exit transition (admin portal, and any [data-transition] link) --- */

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
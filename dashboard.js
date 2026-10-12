/* ==========================================================================
   AOG Manager — member portal (index.html)
   Local data store (localStorage) with view/edit/add/delete via a side
   drawer. Swap `loadMembers` / `persistMembers` for real API calls whenever
   the PHP + MySQL back end is ready — everything else stays the same.
   ========================================================================== */

(function () {
    "use strict";

    var STORAGE_KEY = "aog_members";
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var ROLES = [
        { id: "pastor",     label: "Pastor",       varName: "--role-pastor" },
        { id: "usher",      label: "Usher",        varName: "--role-usher" },
        { id: "worshiper",  label: "Worshiper",    varName: "--role-worshiper" },
        { id: "band",       label: "Band",         varName: "--role-band" },
        { id: "sound",      label: "Sound crew",   varName: "--role-sound" }
    ];

    function roleLabel(id) {
        var r = ROLES.filter(function (r) { return r.id === id; })[0];
        return r ? r.label : id;
    }

    function roleColorVar(id) {
        var r = ROLES.filter(function (r) { return r.id === id; })[0];
        return r ? getComputedStyle(document.documentElement).getPropertyValue(r.varName).trim() : "";
    }

    /* ---- Seed data (first run only) --------------------------------------- */

    function seedMembers() {
        var today = new Date().toISOString().slice(0, 10);
        return [
            { id: "m1", firstName: "Samuel",  lastName: "Nkosi",    role: "pastor",    phone: "082 111 2233", email: "samuel.nkosi@example.com",  joinDate: "2014-03-02", active: true,  checkedIn: true,  attendanceCount: 312, lastAttended: today },
            { id: "m2", firstName: "Grace",   lastName: "Mokoena",  role: "pastor",    phone: "082 222 3344", email: "grace.mokoena@example.com",  joinDate: "2016-06-11", active: true,  checkedIn: false, attendanceCount: 245, lastAttended: "2026-09-13" },
            { id: "m3", firstName: "Thabo",   lastName: "Dlamini",  role: "usher",     phone: "071 333 4455", email: "thabo.dlamini@example.com",  joinDate: "2019-01-20", active: true,  checkedIn: true,  attendanceCount: 180, lastAttended: today },
            { id: "m4", firstName: "Lindiwe", lastName: "Zulu",     role: "usher",     phone: "071 444 5566", email: "lindiwe.zulu@example.com",   joinDate: "2021-09-05", active: true,  checkedIn: false, attendanceCount: 96,  lastAttended: "2026-09-13" },
            { id: "m5", firstName: "Naledi",  lastName: "Khumalo",  role: "worshiper", phone: "083 555 6677", email: "naledi.khumalo@example.com", joinDate: "2018-11-14", active: true,  checkedIn: true,  attendanceCount: 201, lastAttended: today },
            { id: "m6", firstName: "Sipho",   lastName: "Ndlovu",   role: "worshiper", phone: "083 666 7788", email: "sipho.ndlovu@example.com",   joinDate: "2022-02-27", active: false, checkedIn: false, attendanceCount: 40,  lastAttended: "2026-06-21" },
            { id: "m7", firstName: "Precious",lastName: "Sithole",  role: "band",      phone: "084 777 8899", email: "precious.sithole@example.com", joinDate: "2017-05-09", active: true, checkedIn: true,  attendanceCount: 265, lastAttended: today },
            { id: "m8", firstName: "Kagiso",  lastName: "Molefe",   role: "band",      phone: "084 888 9900", email: "kagiso.molefe@example.com",  joinDate: "2020-08-16", active: true,  checkedIn: false, attendanceCount: 128, lastAttended: "2026-09-13" },
            { id: "m9", firstName: "Andile",  lastName: "Mahlangu", role: "sound",     phone: "072 999 0011", email: "andile.mahlangu@example.com",joinDate: "2015-12-01", active: true,  checkedIn: true,  attendanceCount: 288, lastAttended: today },
            { id: "m10", firstName: "Zanele", lastName: "Cele",     role: "sound",     phone: "072 000 1122", email: "zanele.cele@example.com",    joinDate: "2023-04-18", active: true,  checkedIn: false, attendanceCount: 52,  lastAttended: "2026-09-13" }
        ];
    }

    function loadMembers() {
        try {
            var raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (err) { /* fall through to seed data */ }
        var seeded = seedMembers();
        persistMembers(seeded);
        return seeded;
    }

    function persistMembers(list) {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        } catch (err) { /* storage unavailable — state still holds for this session */ }
    }

    var members = loadMembers();

    /* ---- State -------------------------------------------------------------- */

    var state = {
        search: "",
        team: "all",       // "all" or a role id
        editingId: null,   // member id currently open in the drawer, or null
        mode: "view"        // "view" | "edit" | "add"
    };

    var firstStatsRender = true;

    /* ---- Elements ------------------------------------------------------------ */

    var el = {
        search: document.getElementById("searchInput"),
        addBtn: document.getElementById("addMemberBtn"),
        teamFilters: document.getElementById("teamFilters"),
        list: document.getElementById("membersList"),
        empty: document.getElementById("membersEmpty"),
        count: document.getElementById("membersCount"),
        statTotal: document.getElementById("statTotal"),
        statActive: document.getElementById("statActive"),
        statCheckedIn: document.getElementById("statCheckedIn"),
        newServiceBtn: document.getElementById("newServiceBtn"),

        overlay: document.getElementById("drawerOverlay"),
        drawer: document.getElementById("memberDrawer"),
        drawerTitle: document.getElementById("drawerTitle"),
        drawerAvatar: document.getElementById("drawerAvatar"),
        drawerClose: document.getElementById("drawerClose"),
        form: document.getElementById("memberForm"),
        error: document.getElementById("drawerError"),

        firstName: document.getElementById("fieldFirstName"),
        lastName: document.getElementById("fieldLastName"),
        role: document.getElementById("fieldRole"),
        phone: document.getElementById("fieldPhone"),
        email: document.getElementById("fieldEmail"),
        address: document.getElementById("fieldAddress"),
        joinDate: document.getElementById("fieldJoinDate"),
        active: document.getElementById("fieldActive"),
        checkedIn: document.getElementById("fieldCheckedIn"),
        attendanceBlock: document.getElementById("attendanceBlock"),
        attendanceCount: document.getElementById("fieldAttendanceCount"),
        lastAttended: document.getElementById("fieldLastAttended"),

        editBtn: document.getElementById("editBtn"),
        saveBtn: document.getElementById("saveBtn"),
        cancelBtn: document.getElementById("cancelBtn"),
        deleteBtn: document.getElementById("deleteBtn")
    };

    /* Populate the role <select> once. */
    ROLES.forEach(function (r) {
        var opt = document.createElement("option");
        opt.value = r.id;
        opt.textContent = r.label;
        el.role.appendChild(opt);
    });

    /* ---- Rendering: team filter chips ----------------------------------------- */

    function renderTeamFilters() {
        var frag = document.createDocumentFragment();

        function makeChip(id, label, colorVar) {
            var count = id === "all" ? members.length
                : members.filter(function (m) { return m.role === id; }).length;

            var chip = document.createElement("button");
            chip.type = "button";
            chip.className = "chip" + (state.team === id ? " is-active" : "");
            if (colorVar) chip.style.setProperty("--chip-color", colorVar);
            chip.innerHTML =
                (colorVar ? '<span class="chip__dot"></span>' : "") +
                "<span>" + label + "</span>" +
                '<span class="chip__count">' + count + "</span>";
            chip.addEventListener("click", function () {
                state.team = id;
                render();
            });
            return chip;
        }

        frag.appendChild(makeChip("all", "All teams", null));
        ROLES.forEach(function (r) {
            frag.appendChild(makeChip(r.id, r.label, roleColorVar(r.id)));
        });

        el.teamFilters.innerHTML = "";
        el.teamFilters.appendChild(frag);
    }

    /* ---- Rendering: member rows ------------------------------------------------ */

    function initials(m) {
        return (m.firstName.charAt(0) + m.lastName.charAt(0)).toUpperCase();
    }

    function matchesFilters(m) {
        var teamOk = state.team === "all" || m.role === state.team;
        var q = state.search.trim().toLowerCase();
        var searchOk = !q || (m.firstName + " " + m.lastName).toLowerCase().indexOf(q) !== -1;
        return teamOk && searchOk;
    }

    function renderMembers() {
        var visible = members.filter(matchesFilters);

        el.count.textContent = visible.length + (visible.length === 1 ? " member" : " members") +
            (state.team !== "all" ? " · " + roleLabel(state.team) : "");

        el.list.innerHTML = "";
        el.empty.hidden = visible.length !== 0;

        var frag = document.createDocumentFragment();

        visible
            .slice()
            .sort(function (a, b) {
                return (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName);
            })
            .forEach(function (m) {
                var row = document.createElement("div");
                row.className = "member-row";
                row.setAttribute("role", "listitem");
                row.tabIndex = 0;
                row.dataset.id = m.id;

                var color = roleColorVar(m.role);

                row.innerHTML =
                    '<span class="member-row__avatar" style="--avatar-color:' + color + '">' + initials(m) + '</span>' +
                    '<span class="member-row__name">' +
                        "<strong>" + m.firstName + " " + m.lastName + "</strong>" +
                        '<span class="member-row__role"><span class="chip__dot" style="--chip-color:' + color + '"></span>' + roleLabel(m.role) + "</span>" +
                    "</span>" +
                    '<span class="member-row__status' + (m.active ? "" : " is-inactive") + '">' + (m.active ? "Active" : "Inactive") + "</span>" +
                    '<label class="member-row__checkin" title="Signed in this service">' +
                        '<span class="mini-toggle">' +
                            '<input type="checkbox"' + (m.checkedIn ? " checked" : "") + " data-checkin-id=\"" + m.id + "\">" +
                            '<span class="mini-toggle__track"></span>' +
                        "</span>" +
                    "</label>" +
                    '<svg class="member-row__chevron" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>';

                frag.appendChild(row);
            });

        el.list.appendChild(frag);
    }

    /* ---- Rendering: stats ------------------------------------------------------ */

    function animateCount(elNode, to) {
        if (reduceMotion || firstStatsRender === false) {
            elNode.textContent = to;
            return;
        }
        var from = 0;
        var duration = 500;
        var start = null;

        function step(ts) {
            if (start === null) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            elNode.textContent = Math.round(from + (to - from) * progress);
            if (progress < 1) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }

    function renderStats() {
        var total = members.length;
        var active = members.filter(function (m) { return m.active; }).length;
        var checkedIn = members.filter(function (m) { return m.checkedIn; }).length;

        animateCount(el.statTotal, total);
        animateCount(el.statActive, active);
        animateCount(el.statCheckedIn, checkedIn);

        firstStatsRender = false;
    }

    function render() {
        renderTeamFilters();
        renderMembers();
        renderStats();
    }

    /* ---- Check-in toggle (direct from the row, no drawer needed) -------------- */

    el.list.addEventListener("click", function (e) {
        var checkbox = e.target.closest("input[data-checkin-id]");
        if (checkbox) {
            e.stopPropagation();
            toggleCheckIn(checkbox.getAttribute("data-checkin-id"), checkbox.checked);
            return;
        }
        var row = e.target.closest(".member-row");
        if (row) openDrawer(row.dataset.id, "view");
    });

    el.list.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        var row = e.target.closest(".member-row");
        if (row) {
            e.preventDefault();
            openDrawer(row.dataset.id, "view");
        }
    });

    function toggleCheckIn(id, isChecked) {
        var m = findMember(id);
        if (!m) return;

        if (isChecked && !m.checkedIn) {
            m.attendanceCount += 1;
            m.lastAttended = new Date().toISOString().slice(0, 10);
        } else if (!isChecked && m.checkedIn) {
            m.attendanceCount = Math.max(0, m.attendanceCount - 1);
        }
        m.checkedIn = isChecked;

        persistMembers(members);
        renderStats();

        // If this member's drawer happens to be open, keep it in sync.
        if (state.editingId === id) {
            el.checkedIn.checked = m.checkedIn;
            el.attendanceCount.textContent = m.attendanceCount;
            el.lastAttended.textContent = m.lastAttended || "—";
        }
    }

    /* ---- Search ------------------------------------------------------------- */

    el.search.addEventListener("input", function () {
        state.search = el.search.value;
        renderMembers();
    });

    /* ---- Start next service: clears check-in marks for the next gathering --- */

    el.newServiceBtn.addEventListener("click", function () {
        if (!window.confirm("Start the next service? Everyone's sign-in mark will be cleared.")) return;
        members.forEach(function (m) { m.checkedIn = false; });
        persistMembers(members);
        render();
    });

    /* ---- Drawer: find / open / close ----------------------------------------- */

    function findMember(id) {
        return members.filter(function (m) { return m.id === id; })[0] || null;
    }

    function setFieldsDisabled(disabled) {
        [el.firstName, el.lastName, el.role, el.phone, el.email, el.address, el.joinDate, el.active]
            .forEach(function (f) { f.disabled = disabled; });
    }

    function fillForm(m) {
        el.firstName.value = m ? m.firstName : "";
        el.lastName.value = m ? m.lastName : "";
        el.role.value = m ? m.role : ROLES[0].id;
        el.phone.value = m ? m.phone : "";
        el.email.value = m ? m.email : "";
        el.address.value = m ? (m.address || "") : "";
        el.joinDate.value = m ? m.joinDate : new Date().toISOString().slice(0, 10);
        el.active.checked = m ? m.active : true;
        el.checkedIn.checked = m ? m.checkedIn : false;
        el.attendanceCount.textContent = m ? m.attendanceCount : 0;
        el.lastAttended.textContent = (m && m.lastAttended) ? m.lastAttended : "—";
        el.drawerAvatar.textContent = m ? initials(m) : "+";
        el.drawerAvatar.style.setProperty("--avatar-color", m ? roleColorVar(m.role) : "");
    }

    function setMode(mode) {
        state.mode = mode;
        var isAdd = mode === "add";
        var isEdit = mode === "edit" || isAdd;

        el.drawerTitle.textContent = isAdd ? "Add member" : (isEdit ? "Edit member" : "Member");
        setFieldsDisabled(!isEdit);
        el.attendanceBlock.hidden = isAdd;
        el.deleteBtn.hidden = isAdd;

        el.editBtn.hidden = isEdit;
        el.saveBtn.hidden = !isEdit;
        el.cancelBtn.hidden = !isEdit;

        el.error.hidden = true;
        if (isEdit) window.setTimeout(function () { el.firstName.focus(); }, isAdd ? 260 : 0);
    }

    function openDrawer(id, mode) {
        state.editingId = id;
        var m = id ? findMember(id) : null;
        fillForm(m);
        setMode(mode || "view");

        el.overlay.hidden = false;
        // Two frames so the transform transition actually runs.
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                el.overlay.classList.add("is-open");
            });
        });
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        el.overlay.classList.remove("is-open");
        document.body.style.overflow = "";
        var finish = function () {
            el.overlay.hidden = true;
            state.editingId = null;
        };
        if (reduceMotion) finish();
        else window.setTimeout(finish, 280);
    }

    el.addBtn.addEventListener("click", function () { openDrawer(null, "add"); });
    el.drawerClose.addEventListener("click", closeDrawer);
    el.overlay.addEventListener("click", function (e) { if (e.target === el.overlay) closeDrawer(); });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !el.overlay.hidden) closeDrawer();
    });

    el.editBtn.addEventListener("click", function () { setMode("edit"); });

    el.cancelBtn.addEventListener("click", function () {
        if (state.mode === "add") { closeDrawer(); return; }
        fillForm(findMember(state.editingId));
        setMode("view");
    });

    el.deleteBtn.addEventListener("click", function () {
        var m = findMember(state.editingId);
        if (!m) return;
        if (!window.confirm("Remove " + m.firstName + " " + m.lastName + " from the roll? This can't be undone.")) return;
        members = members.filter(function (x) { return x.id !== m.id; });
        persistMembers(members);
        closeDrawer();
        render();
    });

    /* ---- Save (create or update) ---------------------------------------------- */

    el.form.addEventListener("submit", function (e) {
        e.preventDefault();

        var firstName = el.firstName.value.trim();
        var lastName = el.lastName.value.trim();

        if (!firstName || !lastName) {
            el.error.textContent = "Enter a first and last name.";
            el.error.hidden = false;
            (firstName ? el.lastName : el.firstName).focus();
            return;
        }

        if (state.mode === "add") {
            var fresh = {
                id: "m" + Date.now(),
                firstName: firstName,
                lastName: lastName,
                role: el.role.value,
                phone: el.phone.value.trim(),
                email: el.email.value.trim(),
                address: el.address.value.trim(),
                joinDate: el.joinDate.value || new Date().toISOString().slice(0, 10),
                active: el.active.checked,
                checkedIn: el.checkedIn.checked,
                attendanceCount: 0,
                lastAttended: null
            };
            members.push(fresh);
            persistMembers(members);
            closeDrawer();
            render();
            return;
        }

        var m = findMember(state.editingId);
        if (!m) return;

        m.firstName = firstName;
        m.lastName = lastName;
        m.role = el.role.value;
        m.phone = el.phone.value.trim();
        m.email = el.email.value.trim();
        m.address = el.address.value.trim();
        m.joinDate = el.joinDate.value || m.joinDate;
        m.active = el.active.checked;
        m.checkedIn = el.checkedIn.checked;

        persistMembers(members);
        fillForm(m);
        setMode("view");
        render();
    });

    /* ---- Sign out: fade before navigating, matching the login pages ----------- */

    document.querySelectorAll("a[data-transition]").forEach(function (link) {
        link.addEventListener("click", function (e) {
            if (reduceMotion || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            document.body.style.transition = "opacity 220ms ease";
            document.body.style.opacity = "0";
            window.setTimeout(function () { window.location.href = link.getAttribute("href"); }, 220);
        });
    });

    /* ---- Go ---------------------------------------------------------------- */

    render();
})();
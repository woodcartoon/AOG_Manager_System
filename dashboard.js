/* ==========================================================================
   AOG Manager — member portal (index.html), backed by Firebase SQL Connect.
   ========================================================================== */

(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ROLES = [];
    var members = [];
    var orgId = null;
    var canManageMembers = false;
    var memberships = [];

    function roleLabel(id) {
        var r = ROLES.filter(function (r) { return r.id === id; })[0];
        return r ? r.label : "Unassigned team";
    }

    function roleColorVar(id) {
        var r = ROLES.filter(function (r) { return r.id === id; })[0];
        return r ? getComputedStyle(document.documentElement).getPropertyValue(r.varName).trim() : "";
    }

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
        organizationSelect: document.getElementById("organizationSelect"),
        status: document.getElementById("cloudStatus"),
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

    function setServingTeams(teams) {
        var colors = ["--role-pastor", "--role-usher", "--role-worshiper", "--role-band", "--role-sound", "--role-member"];
        ROLES = teams.map(function (team, index) {
            return {
                id: team.id,
                label: team.name,
                varName: colors[index % colors.length]
            };
        });

        el.role.replaceChildren();
        ROLES.forEach(function (team) {
            var option = document.createElement("option");
            option.value = team.id;
            option.textContent = team.label;
            el.role.appendChild(option);
        });
    }

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
            if (colorVar) {
                var dot = document.createElement("span");
                dot.className = "chip__dot";
                chip.appendChild(dot);
            }
            var text = document.createElement("span");
            text.textContent = label;
            chip.appendChild(text);
            var countBadge = document.createElement("span");
            countBadge.className = "chip__count";
            countBadge.textContent = count;
            chip.appendChild(countBadge);
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

                var avatar = document.createElement("span");
                avatar.className = "member-row__avatar";
                avatar.style.setProperty("--avatar-color", color);
                avatar.textContent = initials(m);

                var name = document.createElement("span");
                name.className = "member-row__name";
                var fullName = document.createElement("strong");
                fullName.textContent = m.firstName + " " + m.lastName;
                var role = document.createElement("span");
                role.className = "member-row__role";
                var roleDot = document.createElement("span");
                roleDot.className = "chip__dot";
                roleDot.style.setProperty("--chip-color", color);
                role.appendChild(roleDot);
                role.appendChild(document.createTextNode(roleLabel(m.role)));
                name.appendChild(fullName);
                name.appendChild(role);

                var status = document.createElement("span");
                status.className = "member-row__status" + (m.active ? "" : " is-inactive");
                status.textContent = m.active ? "Active" : "Inactive";

                var attendance = document.createElement("span");
                attendance.className = "member-row__checkin";
                attendance.title = "Recorded attendances";
                attendance.textContent = m.attendanceCount + " visits";

                var chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                chevron.setAttribute("class", "member-row__chevron");
                chevron.setAttribute("viewBox", "0 0 24 24");
                var chevronLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                chevronLine.setAttribute("points", "9 6 15 12 9 18");
                chevron.appendChild(chevronLine);
                row.append(avatar, name, status, attendance, chevron);

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
        var checkedIn = members.reduce(function (sum, m) { return sum + m.attendanceCount; }, 0);

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

    /* ---- Member selection ---------------------------------------------------- */

    el.list.addEventListener("click", function (e) {
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

    /* ---- Search ------------------------------------------------------------- */

    el.search.addEventListener("input", function () {
        state.search = el.search.value;
        renderMembers();
    });

    /* ---- Start next service: clears check-in marks for the next gathering --- */

    el.newServiceBtn.hidden = true;
    el.checkedIn.closest(".toggle").hidden = true;

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
        el.deleteBtn.hidden = isAdd || !canManageMembers;

        el.editBtn.hidden = isEdit || !canManageMembers;
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

    el.deleteBtn.addEventListener("click", async function () {
        var m = findMember(state.editingId);
        if (!m) return;
        if (!window.confirm("Remove " + m.firstName + " " + m.lastName + " from the roll? This can't be undone.")) return;
        el.deleteBtn.disabled = true;
        try {
            await window.AogFirebase.removeMember({ id: m.id, orgId: orgId });
            await refreshMembers();
            closeDrawer();
            render();
        } catch (error) {
            el.error.textContent = getOperationError(error);
            el.error.hidden = false;
        } finally {
            el.deleteBtn.disabled = false;
        }
    });

    /* ---- Save (create or update) ---------------------------------------------- */

    el.form.addEventListener("submit", async function (e) {
        e.preventDefault();

        var firstName = el.firstName.value.trim();
        var lastName = el.lastName.value.trim();

        if (!firstName || !lastName) {
            el.error.textContent = "Enter a first and last name.";
            el.error.hidden = false;
            (firstName ? el.lastName : el.firstName).focus();
            return;
        }

        if (!orgId || !el.role.value) {
            el.error.textContent = "This organization has no serving teams yet. Ask an administrator to add a team before saving members.";
            el.error.hidden = false;
            return;
        }

        var memberValues = {
            orgId: orgId,
            servingTeamId: el.role.value,
            firstName: firstName,
            lastName: lastName,
            email: el.email.value.trim() || null,
            phone: el.phone.value.trim() || null,
            address: el.address.value.trim() || null,
            joinDate: el.joinDate.value || null,
            active: el.active.checked
        };
        el.saveBtn.disabled = true;
        try {
            if (state.mode === "add") {
                await window.AogFirebase.addMember(memberValues);
                await refreshMembers();
                closeDrawer();
            } else {
                var current = findMember(state.editingId);
                if (!current) return;
                await window.AogFirebase.saveMember(Object.assign({}, memberValues, { id: current.id }));
                await refreshMembers();
                fillForm(findMember(current.id));
                setMode("view");
            }
            render();
        } catch (error) {
            el.error.textContent = getOperationError(error);
            el.error.hidden = false;
        } finally {
            el.saveBtn.disabled = false;
        }
    });

    async function refreshMembers() {
        var records = await window.AogFirebase.getMembers(orgId);
        members = records.map(function (record) {
            return {
                id: record.id,
                firstName: record.firstName,
                lastName: record.lastName,
                role: record.servingTeam ? record.servingTeam.id : "",
                phone: record.phone || "",
                email: record.email || "",
                address: record.address || "",
                joinDate: record.joinDate || "",
                active: record.active,
                attendanceCount: Number(record.servicesAttendedCount || 0),
                lastAttended: record.lastAttendedDate ? record.lastAttendedDate.slice(0, 10) : null
            };
        });
    }

    function getOperationError(error) {
        return error && error.message
            ? "Firebase could not save this change: " + error.message
            : "Firebase could not save this change. Check your connection and permissions.";
    }

    async function initializeCloudData() {
        el.addBtn.disabled = true;
        el.status.hidden = false;
        el.status.textContent = "Connecting to Firebase…";
        try {
            var user = await window.AogFirebase.getCurrentUser();
            if (!user) {
                window.location.replace("login.html");
                return;
            }

            var organizations = await window.AogFirebase.getOrganizations();
            if (!organizations.length) {
                el.status.textContent = "Your Firebase account is signed in, but it is not assigned to an organization yet. Ask an administrator to finish the one-time organization setup.";
                return;
            }

            memberships = organizations;
            organizations.forEach(function (membership) {
                var option = document.createElement("option");
                option.value = membership.org.id;
                option.textContent = membership.org.name;
                el.organizationSelect.appendChild(option);
            });
            el.organizationSelect.hidden = organizations.length < 2;
            el.organizationSelect.addEventListener("change", function () {
                loadOrganization(el.organizationSelect.value);
            });
            await loadOrganization(organizations[0].org.id);
        } catch (error) {
            el.status.textContent = getOperationError(error);
            el.addBtn.disabled = true;
        }
    }

    async function loadOrganization(selectedOrgId) {
        orgId = selectedOrgId;
        state.team = "all";
        state.search = "";
        el.search.value = "";
        var membership = memberships.filter(function (item) {
            return item.org.id === selectedOrgId;
        })[0];
        canManageMembers = !!membership && (membership.role === "ADMIN" || membership.role === "TEAM_LEAD");
        el.addBtn.hidden = !canManageMembers;
        el.addBtn.disabled = true;
        el.status.hidden = false;
        el.status.textContent = "Loading organization data from Firebase…";
        try {
            var teams = await window.AogFirebase.getServingTeams(orgId);
            setServingTeams(teams);
            await refreshMembers();
            el.status.hidden = true;
            el.addBtn.disabled = !teams.length;
            if (!teams.length && canManageMembers) {
                el.status.hidden = false;
                el.status.textContent = "This organization has no serving teams yet. Add a serving team before creating members.";
            }
            el.empty.textContent = members.length
                ? "No one matches that search or team. Try a different name, or clear the filter."
                : "No members are in this cloud database yet. Use Add member to create the first record.";
            render();
        } catch (error) {
            el.status.textContent = getOperationError(error);
        }
    }

    /* ---- Sign out: fade before navigating, matching the login pages ----------- */

    var logoutLink = document.getElementById("logoutBtn");
    logoutLink.addEventListener("click", async function (e) {
        e.preventDefault();
        try {
            await window.AogFirebase.signOut();
            window.location.href = "login.html";
        } catch (error) {
            el.status.hidden = false;
            el.status.textContent = getOperationError(error);
        }
    });

    document.querySelectorAll("a[data-transition]:not(#logoutBtn)").forEach(function (link) {
        link.addEventListener("click", function (e) {
            if (reduceMotion || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            document.body.style.transition = "opacity 220ms ease";
            document.body.style.opacity = "0";
            window.setTimeout(function () { window.location.href = link.getAttribute("href"); }, 220);
        });
    });

    /* ---- Go ---------------------------------------------------------------- */

    initializeCloudData();
})();
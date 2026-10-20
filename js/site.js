(function () {
  "use strict";

  const navigationItems = [
    ["Home", "index.html", "home"],
    ["Live Roles", "live-roles.html", "roles"],
    ["How It Works", "how-it-works.html", "process"],
    ["Our Team", "our-team.html", "team"],
    ["For Employers", "for-employers.html", "employers"],
    ["Contact", "contact.html", "contact"]
  ];
  const CONTACT_CONFIG = {
    candidateEmail: "",
    employerEmail: ""
  };
  const page = document.body.dataset.page || "";
  const headerRoot = document.getElementById("site-header");
  const footerRoot = document.getElementById("site-footer");

  if (headerRoot) {
    headerRoot.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Primax Talent Connectors home">
            <span class="brand-mark" aria-hidden="true"><span></span><i>↗</i></span>
            <span class="brand-name">PRIMAX<small>TALENT CONNECTORS</small></span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation"><span class="menu-lines" aria-hidden="true"></span><span class="sr-only">Open navigation menu</span></button>
          <nav class="primary-nav" id="primary-navigation" aria-label="Main navigation">
            ${navigationItems.map(function (item) {
              return `<a href="${item[1]}"${page === item[2] ? ' aria-current="page"' : ""}>${item[0]}</a>`;
            }).join("")}
          </nav>
          <a class="header-cta" href="contact.html#candidate-form">Join the Network <span aria-hidden="true">↗</span></a>
        </div>
      </header>`;
    const menuToggle = headerRoot.querySelector(".menu-toggle");
    const navigation = headerRoot.querySelector(".primary-nav");
    menuToggle.addEventListener("click", function () {
      const open = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.querySelector(".sr-only").textContent = open ? "Close navigation menu" : "Open navigation menu";
      navigation.classList.toggle("is-open", open);
    });
    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.querySelector(".sr-only").textContent = "Open navigation menu";
        navigation.classList.remove("is-open");
      }
    });
  }

  if (footerRoot) {
    footerRoot.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-main">
          <div class="footer-brand-block">
            <a class="brand brand-footer" href="index.html" aria-label="Primax Talent Connectors home">
              <span class="brand-mark" aria-hidden="true"><span></span><i>↗</i></span>
              <span class="brand-name">PRIMAX<small>TALENT CONNECTORS</small></span>
            </a>
            <p>Connecting Exceptional Talent<br>to Exceptional Opportunities.</p>
            <span class="remote-note"><span aria-hidden="true">●</span> 100% remote team</span>
          </div>
          <div class="footer-links"><h2>Explore</h2><a href="live-roles.html">Live Roles</a><a href="how-it-works.html">How It Works</a><a href="our-team.html">Our Team</a></div>
          <div class="footer-links"><h2>Connect</h2><a href="for-employers.html">For Employers</a><a href="contact.html">Contact</a><a href="contact.html#candidate-form">Get in touch</a></div>
          <div class="footer-links"><h2>Information</h2><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></div>
        </div>
        <div class="container footer-bottom"><p>© 2026 Primax Talent Connectors. All rights reserved.</p><p>We connect candidates with hiring companies. We are not the employer.</p></div>
      </footer>`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function roleCard(role) {
    const salary = role.salary ? `<span>${escapeHtml(role.salary)}</span>` : "";
    return `<article class="role-card">
      <div class="role-card-top"><span class="role-sample">Example role</span><span class="role-level">${escapeHtml(role.level)}</span></div>
      <p class="role-category">${escapeHtml(role.industry)} <span aria-hidden="true">·</span> ${escapeHtml(role.function)}</p>
      <h3><button class="role-title-button" type="button" data-role-id="${escapeHtml(role.id)}">${escapeHtml(role.title)}</button></h3>
      <p class="role-summary">${escapeHtml(role.summary)}</p>
      <div class="role-meta"><span>${escapeHtml(role.workType)}</span>${salary}</div>
      <button class="role-card-link" type="button" data-role-id="${escapeHtml(role.id)}">View role details <span aria-hidden="true">→</span></button>
    </article>`;
  }

  const roles = window.PRIMAX_ROLES || [];
  const roleLists = document.querySelectorAll("[data-role-list]");
  roleLists.forEach(function (root) {
    if (root.dataset.roleList === "featured") root.innerHTML = roles.slice(0, 6).map(roleCard).join("");
  });

  const roleDialog = document.createElement("dialog");
  roleDialog.className = "role-dialog";
  roleDialog.setAttribute("aria-label", "Role details and application interest");
  roleDialog.innerHTML = `<div class="role-dialog-head"><span class="role-sample">Demonstration content · not a verified vacancy</span><button class="dialog-close" type="button" aria-label="Close role details">×</button></div><div class="role-dialog-content"></div>`;
  document.body.appendChild(roleDialog);

  function roleListItems(items) {
    return items.map(function (item) { return `<li>${escapeHtml(item)}</li>`; }).join("");
  }

  function openRole(roleId) {
    const role = roles.find(function (item) { return item.id === roleId; });
    if (!role) return;
    roleDialog.querySelector(".role-dialog-content").innerHTML = `<p class="eyebrow">${escapeHtml(role.industry)} · ${escapeHtml(role.function)}</p>
      <h2 id="role-dialog-title">${escapeHtml(role.title)}</h2>
      <div class="role-detail-meta"><span>${escapeHtml(role.level)}</span><span>${escapeHtml(role.workType)}</span>${role.salary ? `<span>${escapeHtml(role.salary)}</span>` : ""}</div>
      <p class="role-detail-description">${escapeHtml(role.description)}</p>
      <h3>Responsibilities</h3><ul>${roleListItems(role.responsibilities)}</ul>
      <h3>Requirements</h3><ul>${roleListItems(role.requirements)}</ul>
      <div class="notice notice-demo"><p>This example is not a current vacancy. This static site cannot receive or store applications. Please use the verified Primax Talent Connectors contact address when it is confirmed.</p></div>
      <form class="role-application" data-local-form novalidate>
        <h3>Application interest</h3><p>Use this sample form to see the intended fields. Information is not sent or saved.</p>
        <div class="form-grid">
          <div class="field"><label for="role-app-name">Full name <span aria-hidden="true">*</span></label><input id="role-app-name" name="name" autocomplete="name" required></div>
          <div class="field"><label for="role-app-email">Email <span aria-hidden="true">*</span></label><input id="role-app-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="role-app-cv">CV (PDF or DOC, max 5 MB)</label><input id="role-app-cv" name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" data-file-limit="5242880"><span class="field-hint" data-file-feedback>Accepted: PDF, DOC, DOCX. Maximum size: 5 MB.</span></div>
          <div class="field"><label for="role-app-linkedin">LinkedIn URL</label><input id="role-app-linkedin" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/..."></div>
        </div>
        <button class="button button-green" type="submit">Register interest</button><p class="form-feedback" role="status" aria-live="polite"></p>
      </form>`;
    roleDialog.showModal();
  }

  document.addEventListener("click", function (event) {
    const trigger = event.target.closest("[data-role-id]");
    if (trigger) openRole(trigger.dataset.roleId);
  });
  roleDialog.querySelector(".dialog-close").addEventListener("click", function () { roleDialog.close(); });
  roleDialog.addEventListener("click", function (event) {
    if (event.target === roleDialog) roleDialog.close();
  });

  const filterForm = document.getElementById("role-filters");
  const resultsRoot = document.getElementById("role-results");
  if (filterForm && resultsRoot) {
    const filterFields = [["level-filter", "level"], ["industry-filter", "industry"], ["function-filter", "function"], ["work-type-filter", "workType"]];
    filterFields.forEach(function (field) {
      const select = document.getElementById(field[0]);
      Array.from(new Set(roles.map(function (role) { return role[field[1]]; }))).sort().forEach(function (value) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
      });
    });
    const empty = document.getElementById("role-empty");
    const count = document.getElementById("role-count");
    const updateRoles = function () {
      const query = filterForm.elements.search.value.trim().toLocaleLowerCase();
      const filters = filterFields.map(function (field) { return [field[1], document.getElementById(field[0]).value]; });
      const matches = roles.filter(function (role) {
        const searchable = [role.title, role.level, role.industry, role.function, role.workType, role.summary, role.description].join(" ").toLocaleLowerCase();
        return (!query || searchable.includes(query)) && filters.every(function (filter) {
          return !filter[1] || role[filter[0]] === filter[1];
        });
      });
      resultsRoot.innerHTML = matches.map(roleCard).join("");
      count.textContent = matches.length + (matches.length === 1 ? " example role" : " example roles");
      empty.hidden = matches.length !== 0;
      resultsRoot.hidden = matches.length === 0;
    };
    filterForm.addEventListener("input", updateRoles);
    filterForm.addEventListener("change", updateRoles);
    filterForm.addEventListener("reset", function () { window.setTimeout(updateRoles, 0); });
    updateRoles();
  }

  const teamRoot = document.getElementById("team-list");
  if (teamRoot && window.PRIMAX_TEAM_PLACEHOLDERS) {
    const team = window.PRIMAX_TEAM_PLACEHOLDERS;
    const teamFilter = document.getElementById("practice-filter");
    const count = document.getElementById("team-count");
    const more = document.getElementById("load-more-team");
    let shown = 24;
    let selectedPractice = "";
    Array.from(new Set(team.map(function (profile) { return profile.practice; }))).sort().forEach(function (practice) {
      const option = document.createElement("option");
      option.value = practice;
      option.textContent = practice;
      teamFilter.appendChild(option);
    });
    function renderTeam() {
      const filtered = team.filter(function (profile) { return !selectedPractice || profile.practice === selectedPractice; });
      const visible = filtered.slice(0, shown);
      teamRoot.innerHTML = visible.map(function (profile) {
        const number = String(profile.number).padStart(2, "0");
        return `<article class="team-card"><div class="team-placeholder-art" aria-hidden="true"><span>${number}</span><i>↗</i></div><div class="team-card-body"><span class="placeholder-tag">Profile placeholder</span><h3>${escapeHtml(profile.name)}</h3><p>${escapeHtml(profile.title)}</p><span class="team-practice">${escapeHtml(profile.practice)}</span></div></article>`;
      }).join("");
      count.textContent = "Showing " + visible.length + " of " + filtered.length + " placeholder profiles.";
      more.hidden = visible.length >= filtered.length;
    }
    teamFilter.addEventListener("change", function () {
      selectedPractice = teamFilter.value;
      shown = 24;
      renderTeam();
    });
    more.addEventListener("click", function () {
      shown += 6;
      renderTeam();
    });
    renderTeam();
  }

  function validateFile(input) {
    const feedback = input.parentElement.querySelector("[data-file-feedback]");
    const file = input.files && input.files[0];
    input.setCustomValidity("");
    if (!file) {
      if (feedback) feedback.textContent = "Accepted: PDF, DOC, DOCX. Maximum size: 5 MB.";
      return true;
    }
    if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
      input.setCustomValidity("Choose a PDF, DOC, or DOCX file.");
      if (feedback) feedback.textContent = "Unsupported file type. Choose PDF, DOC, or DOCX.";
      return false;
    }
    const maxBytes = Number(input.dataset.fileLimit || 5242880);
    if (file.size > maxBytes) {
      input.setCustomValidity("The file must be 5 MB or smaller.");
      if (feedback) feedback.textContent = "This file is larger than the 5 MB limit.";
      return false;
    }
    if (feedback) feedback.textContent = file.name + " · " + (file.size / (1024 * 1024)).toFixed(2) + " MB. The file will remain in the browser and may need to be attached manually when you send your email.";
    return true;
  }

  function formatFormValue(form, field) {
    if (!field || !field.name || field.disabled) return null;
    if (field.type === "button" || field.type === "submit" || field.type === "reset" || field.type === "hidden") return null;
    const label = field.labels && field.labels.length ? field.labels[0].textContent.replace(/\*\s*$/, "").trim() : field.name;
    let value = "";
    if (field.type === "checkbox") {
      value = field.checked ? "Yes" : "No";
    } else if (field.type === "file") {
      value = field.files && field.files.length ? field.files[0].name : "No file selected";
    } else {
      value = field.value.trim();
    }
    if (!value || value === "No" && field.type === "checkbox" && !field.checked) return null;
    return label + ": " + value;
  }

  function buildMailtoLink(form, recipientEmail, subject) {
    const lines = [subject, "", "Submitted from the Primax Talent Connectors website:"];
    Array.from(form.elements).forEach(function (element) {
      const entry = formatFormValue(form, element);
      if (entry) lines.push(entry);
    });
    lines.push("", "Note: This email was prepared in the browser. Uploaded CV files cannot be attached reliably through mailto, so the file may need to be attached manually before sending.");
    const body = lines.join("\n");
    return "mailto:" + encodeURIComponent(recipientEmail) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  document.addEventListener("change", function (event) {
    if (event.target.matches('input[type="file"][data-file-limit]')) validateFile(event.target);
  });
  document.addEventListener("submit", function (event) {
    const form = event.target.closest("[data-local-form]");
    if (!form) return;
    event.preventDefault();
    const feedback = form.querySelector(".form-feedback");
    feedback.classList.remove("is-success", "is-error");
    const filesValid = Array.from(form.querySelectorAll('input[type="file"][data-file-limit]')).every(validateFile);
    const fieldsValid = form.reportValidity();
    if (!filesValid || !fieldsValid) {
      feedback.textContent = "Please review the highlighted fields before continuing.";
      feedback.classList.add("is-error");
      return;
    }
    const formType = form.id === "employer-inquiry" || form.dataset.formType === "employer" ? "employer" : "candidate";
    const recipientEmail = formType === "candidate" ? CONTACT_CONFIG.candidateEmail : CONTACT_CONFIG.employerEmail;
    if (!recipientEmail) {
      feedback.textContent = "The verified Primax Talent Connectors contact email for this form is still pending confirmation. Please provide the final verified address before enabling mailto submissions.";
      feedback.classList.add("is-error");
      return;
    }
    const subject = formType === "candidate" ? "Candidate enquiry: Primax Talent Connectors" : "Employer enquiry: Primax Talent Connectors";
    const mailtoLink = buildMailtoLink(form, recipientEmail, subject);
    window.location.href = mailtoLink;
    feedback.textContent = "Your email app has been opened with the completed information. Because mailto cannot reliably attach uploaded files, please attach the CV manually if required before sending.";
    feedback.classList.add("is-success");
    form.reset();
  });
})();
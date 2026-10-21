(function () {
  "use strict";

  const navigationItems = [
    ["Home", "index.html", "home"],
    ["Live Roles", "live-roles.html", "roles"],
    ["How It Works", "how-it-works.html", "process"],
    ["Our Team", "our-team.html", "team"],
    ["For Employers", "for-employers.html", "employers"],
    ["Contact", "contact.html", "contact"],
    ["Search", "search.html", "search"]
  ];
  const CONTACT_CONFIG = {
    candidateEmail: "contact@primaxtalentconnectors.com",
    employerEmail: "partners@primaxtalentconnectors.com"
  };
  const page = document.body.dataset.page || "";
  const headerRoot = document.getElementById("site-header");
  const footerRoot = document.getElementById("site-footer");

  if (headerRoot) {
    headerRoot.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Primax Talent Connectors home">
            <img src="LOGO.jpg" alt="Primax Talent Connectors">
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
              <img src="LOGO.jpg" alt="Primax Talent Connectors">
            </a>
            <p>Connecting Exceptional Talent<br>to Exceptional Opportunities.</p>
          </div>
          <div class="footer-links"><h2>Explore</h2><a href="live-roles.html">Live Roles</a><a href="how-it-works.html">How It Works</a><a href="our-team.html">Our Team</a></div>
          <div class="footer-links"><h2>Connect</h2><a href="for-employers.html">For Employers</a><a href="contact.html">Contact</a><a href="contact.html#candidate-form">Get in touch</a></div>
          <div class="footer-links"><h2>Information</h2><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></div>
        </div>
        <div class="container footer-bottom"><p>© 2026 Primax Talent Connectors. All rights reserved.</p></div>
      </footer>`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  const siteSearchIndex = [
    {
      title: "Home",
      url: "index.html",
      description: "Primax Talent Connectors connects mid-senior, executive, and C-suite professionals with relevant career opportunities and hiring companies.",
      keywords: "talent recruitment search firm executive search career opportunities candidates employers connectors career move exclusive access team behind your search confidentiality free"
    },
    {
      title: "Live Roles",
      url: "live-roles.html",
      description: "Explore role listings across technology, product, finance, operations, people, commercial, and executive leadership.",
      keywords: "jobs vacancies roles opportunities director vice president VP CEO chief executive officer finance director product strategy technology operations supply chain people culture HR human resources commercial sales marketing hybrid remote onsite salary SaaS AI fintech private equity banking healthcare life sciences energy manufacturing logistics aviation automotive ecommerce retail real estate media consulting edtech insurance legal gaming construction"
    },
    {
      title: "How It Works",
      url: "how-it-works.html",
      description: "Learn how candidates join the network, how Primax looks for relevant opportunities, and how introductions to hiring companies work.",
      keywords: "candidate journey process confidential connect connector employer hiring company bridge not employer join network source opportunities direct introduction"
    },
    {
      title: "Our Team",
      url: "our-team.html",
      description: "Learn about the specialist practices that support candidate and employer connections at Primax Talent Connectors.",
      keywords: "team connector practice executive leadership technology product finance strategy operations supply chain people culture human resources commercial sales marketing"
    },
    {
      title: "For Employers",
      url: "for-employers.html",
      description: "Hiring companies can share a role brief and connect with experienced candidates through Primax Talent Connectors.",
      keywords: "employer company hiring recruit talent mandate leadership candidates submit role inquiry technology finance operations people culture commercial mid senior C suite"
    },
    {
      title: "Contact",
      url: "contact.html",
      description: "Join the candidate network or send a hiring inquiry to Primax Talent Connectors.",
      keywords: "contact email candidate network CV resume LinkedIn consent employer inquiry company role phone industries target level experience work preference"
    },
    {
      title: "Privacy",
      url: "privacy.html",
      description: "Read how the Primax Talent Connectors website handles information submitted through its forms.",
      keywords: "privacy personal information data form"
    },
    {
      title: "Terms",
      url: "terms.html",
      description: "Read information about using the Primax Talent Connectors website and its role listings.",
      keywords: "terms website listings role"
    }
  ];

  const siteSearchForm = document.getElementById("site-search-form");
  const siteSearchResults = document.getElementById("site-search-results");
  if (siteSearchForm && siteSearchResults) {
    const searchInput = siteSearchForm.elements.q;
    const searchQuery = new URLSearchParams(window.location.search).get("q") || "";
    searchInput.value = searchQuery;
    const searchHeading = document.getElementById("site-search-heading");
    const searchCount = document.getElementById("site-search-count");
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
    const terms = normalizedQuery.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);

    if (!terms.length) {
      searchHeading.textContent = "Search Primax Talent Connectors";
      searchCount.textContent = "Enter a word or phrase to search the website.";
    } else {
      const matches = siteSearchIndex.map(function (item) {
        const title = (item.title + " " + item.title.replace(/&/g, "and")).toLocaleLowerCase().replace(/[^a-z0-9\s]/g, " ");
        const keywords = item.keywords.toLocaleLowerCase().replace(/[^a-z0-9\s]/g, " ");
        const description = item.description.toLocaleLowerCase().replace(/[^a-z0-9\s]/g, " ");
        const searchable = title + " " + keywords + " " + description;
        const score = terms.reduce(function (total, term) {
          if (!searchable.includes(term)) return -1;
          return total + (title.includes(term) ? 5 : 0) + (keywords.includes(term) ? 2 : 0);
        }, 0);
        return { item: item, score: score };
      }).filter(function (result) {
        return result.score >= 0;
      }).sort(function (first, second) {
        return second.score - first.score;
      });

      searchHeading.textContent = "Search results for “" + searchQuery.trim() + "”";
      searchCount.textContent = matches.length + (matches.length === 1 ? " page found." : " pages found.");
      siteSearchResults.innerHTML = matches.length
        ? matches.map(function (result) {
          return `<li class="site-search-result"><h2><a href="${result.item.url}">${escapeHtml(result.item.title)}</a></h2><p>${escapeHtml(result.item.description)}</p></li>`;
        }).join("")
        : '<li class="site-search-empty"><h2>No matching pages</h2><p>Try a broader word, such as “roles”, “candidate”, “employer”, or “contact”.</p></li>';
    }
  }

  function roleCard(role) {
    const salary = role.salary ? `<span>${escapeHtml(role.salary)}</span>` : "";
    return `<article class="role-card">
      <div class="role-card-top"><span class="role-level">${escapeHtml(role.level)}</span></div>
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
    if (root.dataset.roleList === "featured") {
      root.innerHTML = roles.length
        ? roles.slice(0, 6).map(roleCard).join("")
        : '<p class="role-empty-featured">No open roles are listed right now. <a href="contact.html#candidate-form">Join our talent network</a> to hear about future roles.</p>';
    }
  });

  const roleDialog = document.createElement("dialog");
  roleDialog.className = "role-dialog";
  roleDialog.setAttribute("aria-label", "Role details and application interest");
  roleDialog.innerHTML = `<div class="role-dialog-head"><button class="dialog-close" type="button" aria-label="Close role details">×</button></div><div class="role-dialog-content"></div>`;
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
      <form class="role-application" data-local-form data-form-type="candidate" novalidate>
        <h3>Prepare an interest email</h3><p>Enter your details. Your email app will open; review and send the email yourself.</p>
        <div class="form-grid">
          <input type="hidden" name="roleTitle" value="${escapeHtml(role.title)}">
          <div class="field"><label for="role-app-name">Full name <span aria-hidden="true">*</span></label><input id="role-app-name" name="name" autocomplete="name" required></div>
          <div class="field"><label for="role-app-email">Email <span aria-hidden="true">*</span></label><input id="role-app-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="role-app-cv">CV (PDF or DOC, max 5 MB) <span aria-hidden="true">*</span></label><input id="role-app-cv" name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" data-file-limit="5242880" required><span class="field-hint" data-file-feedback>Accepted: PDF, DOC, DOCX. Maximum size: 5 MB.</span></div>
          <div class="field"><label for="role-app-linkedin">LinkedIn URL <span aria-hidden="true">*</span></label><input id="role-app-linkedin" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/..." required></div>
        </div>
        <button class="button button-green" type="submit">Prepare email</button><p class="form-feedback" role="status" aria-live="polite"></p>
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
    const resultsHeading = document.getElementById("results-heading");
    filterForm.hidden = roles.length === 0;
    resultsHeading.hidden = roles.length === 0;
    if (!roles.length) {
      resultsRoot.hidden = true;
      empty.hidden = false;
      empty.innerHTML = '<h2>No open roles right now</h2><p>Join our talent network to hear about future roles.</p><a class="button button-green" href="contact.html#candidate-form">Join the Talent Network</a>';
    }
    const updateRoles = function () {
      if (!roles.length) return;
      const query = filterForm.elements.search.value.trim().toLocaleLowerCase();
      const filters = filterFields.map(function (field) { return [field[1], document.getElementById(field[0]).value]; });
      const matches = roles.filter(function (role) {
        const searchable = [role.title, role.level, role.industry, role.function, role.workType, role.summary, role.description].join(" ").toLocaleLowerCase();
        return (!query || searchable.includes(query)) && filters.every(function (filter) {
          return !filter[1] || role[filter[0]] === filter[1];
        });
      });
      resultsRoot.innerHTML = matches.map(roleCard).join("");
      count.textContent = matches.length + (matches.length === 1 ? " open role" : " open roles");
      empty.hidden = matches.length !== 0;
      resultsRoot.hidden = matches.length === 0;
      if (matches.length === 0) {
        empty.innerHTML = '<h2>No matching roles</h2><p>Try another search or clear the filters.</p>';
      }
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
    if (feedback) feedback.textContent = file.name + " · " + (file.size / (1024 * 1024)).toFixed(2) + " MB. This file stays in your browser; attach it manually to your email.";
    return true;
  }

  function formatFormValue(form, field) {
    if (!field || !field.name || field.disabled) return null;
    if (field.type === "button" || field.type === "submit" || field.type === "reset" || field.type === "hidden") return null;
    const label = field.labels && field.labels.length ? field.labels[0].textContent.replace(/\*\s*$/, "").trim() : field.name;
    let value = "";
    if (field.type === "checkbox") {
      if (!field.checked) return null;
      value = "Yes";
    } else if (field.type === "file") {
      value = field.files && field.files.length ? field.files[0].name : "";
    } else if (field.multiple) {
      value = Array.from(field.selectedOptions).map(function (option) { return option.value; }).join(", ");
    } else {
      value = field.value.trim();
    }
    if (!value) return null;
    return label + ": " + value;
  }

  function buildMailtoLink(form, recipientEmail, subject) {
    const lines = [subject, "", "Submitted from the Primax Talent Connectors website:"];
    Array.from(form.elements).forEach(function (element) {
      const entry = formatFormValue(form, element);
      if (entry) lines.push(entry);
    });
    if (form.querySelector('input[type="file"][name="cv"]')) {
      lines.push("", "Note: The CV is not attached. Please attach it manually before sending this email.");
    }
    const body = lines.join("\n");
    return "mailto:" + recipientEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
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
    const formType = form.dataset.formType === "employer" ? "employer" : "candidate";
    const recipientEmail = formType === "candidate" ? CONTACT_CONFIG.candidateEmail : CONTACT_CONFIG.employerEmail;
    if (!recipientEmail) {
      feedback.textContent = "The verified Primax Talent Connectors contact email for this form is still pending confirmation. Please provide the final verified address before enabling mailto submissions.";
      feedback.classList.add("is-error");
      return;
    }
    const roleTitle = form.elements.roleTitle && form.elements.roleTitle.value.trim();
    const subject = formType === "candidate"
      ? (roleTitle ? "Role interest - " + roleTitle : "Candidate profile - Primax Talent Connectors")
      : "Employer enquiry - Primax Talent Connectors";
    const mailtoLink = buildMailtoLink(form, recipientEmail, subject);
    window.location.href = mailtoLink;
    feedback.textContent = "Your email app should open with your details ready. Nothing has been sent yet; review the email and press Send." +
      (formType === "candidate" ? " Attach your CV manually before sending." : "");
  });
})();
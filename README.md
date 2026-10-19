# Primax Career Connectors

A lightweight, static website built with HTML, CSS, and vanilla JavaScript. No package installation or build step is needed.

## Run locally

Open `index.html` in a browser. The page links, sample role directory, team filters, mobile menu, and client-side form checks work without a backend.

## Update the site

- **Pages and page content:** edit the matching root-level HTML file. The six public pages are `index.html`, `live-roles.html`, `how-it-works.html`, `our-team.html`, `for-employers.html`, and `contact.html`.
- **Navigation and shared footer:** edit the `navigationItems` array and shared header/footer markup in `js/site.js`.
- **Role examples:** edit `window.PRIMAX_ROLES` in `js/data.js`. These are demonstrations, not verified vacancies; replace them only with current, approved role information.
- **Team directory:** edit the practices and `window.PRIMAX_TEAM_PLACEHOLDERS` data in `js/data.js` when approved profile details are available. The current profiles are placeholders, not real employees.
- **Brand colors and typography:** edit the CSS custom properties at the top of `styles.css`. Sora and Inter are loaded from Google Fonts when available; system fallbacks are provided.
- **Brand imagery:** replace `LOGO.jpg` and `BANNER.jpg` with approved assets, keeping the same filenames or updating their HTML references.
- **Contact details:** update the approved addresses in `contact.html`, `js/site.js`, `privacy.html`, and `terms.html` together.

## Important limitations

The forms validate fields in the browser but do not submit or save information. Uploaded CVs are not transmitted. Connect a secure submission and file-storage service before accepting real applications, and update the privacy and terms pages after appropriate legal review.

The role cards are examples, not live job postings. This frontend has no job-management CMS or admin panel. Add a backend or approved job data source if persistent listings and editing are needed.

No production domain was supplied, so canonical URLs and a production sitemap are intentionally not included. The Privacy and Terms pages are draft informational placeholders, not legal advice.

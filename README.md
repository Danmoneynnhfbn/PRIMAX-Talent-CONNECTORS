# Primax Talent Connectors

A lightweight, static website built with HTML, CSS, and vanilla JavaScript. No package installation or build step is needed.

## Run locally

Open `index.html` in a browser. The pages, team filters, mobile menu, site search, and client-side form checks work without a backend.

## Update the site

- **Pages and page content:** edit the matching root-level HTML file. The six public pages are `index.html`, `live-roles.html`, `how-it-works.html`, `our-team.html`, `for-employers.html`, and `contact.html`.
- **Navigation and shared footer:** edit the `navigationItems` array and shared header/footer markup in `js/site.js`.
- **Site search:** edit `siteSearchIndex` in `js/site.js` to update searchable page titles, descriptions, and keywords. `search.html` provides the search form and results view; its results page is marked `noindex` so query-specific pages are not added as low-value search listings.
- **Role data:** edit `window.PRIMAX_ROLES` in `js/data.js` to update the role cards and detail content.
- **Team directory:** edit the practices and `window.PRIMAX_TEAM_PLACEHOLDERS` data in `js/data.js` when approved profile details are available. The current profiles are placeholders, not real employees.
- **Brand colors and typography:** edit the CSS custom properties at the top of `styles.css`. Sora and Inter are loaded from Google Fonts when available; system fallbacks are provided.
- **Brand image and favicon:** `LOGO.jpg` is used in the shared header, footer, homepage hero, and on every page as the favicon.
- **Contact details:** candidate enquiries use `contact@primaxtalentconnectors.com`; employer enquiries use `partners@primaxtalentconnectors.com`. Update `contact.html`, `js/site.js`, `privacy.html`, and `terms.html` together if they change.

## Important limitations

The candidate form requires a CV in PDF, DOC, or DOCX format up to 5 MB. The forms validate fields in the browser and open a prefilled email. The website does not send or save the form information; visitors must review and send the email themselves. `mailto:` cannot reliably attach the uploaded CV, so candidates must attach it manually. Connect a secure submission and file-storage service before accepting real applications, and update the privacy and terms pages after appropriate legal review.

This frontend has no job-management CMS or admin panel. Add a backend or approved job data source if persistent listings and editing are needed.

Canonical URLs use `https://primaxtalentconnectors.com`. The Privacy and Terms pages are draft informational placeholders, not legal advice.

The sitemap and `robots.txt` identify the canonical website pages for crawler discovery. The homepage includes Organization and WebSite structured data, including a search action. These technical signals help search engines understand the site but cannot guarantee indexing, ranking, or a particular position in search results. Keep the domain, page metadata, sitemap, and structured data aligned if the production URL changes.

The homepage figures (500+ talents connected and 72% exclusive roles) are stated in the supplied Primax content and should be kept accurate if that source information changes.

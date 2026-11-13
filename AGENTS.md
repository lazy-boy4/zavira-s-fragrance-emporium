# Project Architecture Rules

- Keep store settings in a framework-neutral, Zod-validated `SiteConfig`; browser storage is a temporary preview adapter, and the Next.js migration must replace it with authenticated server-side persistence so edits can be shared securely.
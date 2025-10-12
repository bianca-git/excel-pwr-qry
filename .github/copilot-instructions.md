# GitHub Copilot Instructions for excel-pwr-qry

## Project Overview

This repository hosts an interactive guide library for Excel Power Query. It's a static HTML website that provides step-by-step tutorials for common Power Query tasks, such as connecting to workbooks and combining PDFs.

## Technology Stack

- **Frontend**: Vanilla HTML, CSS, and JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN)
- **Fonts**: Google Fonts (Inter)
- **Deployment**: Static hosting (GitHub Pages compatible)

## Project Structure

```
/
├── index.html              # Main entry point with guide navigation
├── guides.js               # JavaScript for loading and displaying guides
├── guides.json             # Guide metadata and configuration
└── content/
    ├── connect-workbook.html   # Guide for connecting to workbooks
    └── combine-pdfs.html       # Guide for combining PDFs
```

## Code Style and Conventions

### HTML
- Use semantic HTML5 elements
- Maintain consistent indentation (4 spaces)
- Use descriptive IDs and classes following kebab-case convention
- Keep inline styles minimal; prefer Tailwind utility classes
- Ensure accessibility with proper ARIA labels where needed

### JavaScript
- Use modern ES6+ syntax (const/let, arrow functions, async/await)
- Follow camelCase for variables and functions
- Use meaningful variable names that describe their purpose
- Keep functions small and focused on a single responsibility
- Add error handling for async operations
- Include console.error for debugging but avoid console.log in production

### CSS
- Prefer Tailwind utility classes over custom CSS
- When custom CSS is needed, use the `<style>` block in `index.html`
- Follow BEM-like naming for custom classes (e.g., `step-card`, `tab-active`)
- Use semantic color names and maintain consistency with existing theme

### Content HTML Files
- Each guide should be a self-contained HTML fragment (no `<html>` or `<body>` tags)
- Use consistent section structure with clear headings
- Include interactive elements where appropriate (tabs, buttons)
- Add inline `<script>` tags for guide-specific JavaScript
- Maintain responsive design with Tailwind's responsive utilities

## Adding New Guides

When adding a new guide:

1. Create a new HTML file in the `content/` directory
2. Follow the structure of existing guides (`connect-workbook.html` or `combine-pdfs.html`)
3. Update `guides.json` with the new guide's metadata:
   ```json
   {
     "id": "guide-id",
     "title": "Guide Title",
     "description": "Brief description",
     "file": "content/guide-file.html"
   }
   ```
4. Ensure the guide is self-contained and includes all necessary JavaScript for interactivity

## Making Changes

### Updating Existing Guides
- Preserve the existing structure and interactive elements
- Maintain consistency with the visual style of other guides
- Test interactivity after making changes (tabs, buttons, etc.)

### Modifying Navigation or Layout
- Changes to `index.html` affect the overall layout
- Changes to `guides.js` affect how guides are loaded and displayed
- Be careful not to break the dynamic content loading system

### Styling Changes
- Global styles go in the `<style>` block of `index.html`
- Guide-specific styles can be inline in the content HTML files
- Maintain the existing color scheme and visual hierarchy

## Testing

Since this is a static site with no build process:

1. Open `index.html` in a modern web browser
2. Navigate through all guides using the sidebar
3. Test all interactive elements (tabs, buttons, collapsible sections)
4. Verify responsive behavior on different screen sizes
5. Check browser console for JavaScript errors
6. Ensure all content loads correctly

## Common Patterns

### Guide Navigation
The guide system uses hash-based routing. When creating links to specific guides:
```javascript
<a href="#guide-id">Link Text</a>
```

### Interactive Tabs
Many guides use a tab pattern:
```html
<button data-tab="tab-id" class="tab-button">Tab Label</button>
<div id="tab-id" class="tab-content">Tab content here</div>
```

With corresponding JavaScript to toggle visibility.

### Responsive Design
Use Tailwind's responsive prefixes consistently:
- `md:` for medium screens and up
- `lg:` for large screens and up
- `sm:` for small screens and up

## Important Notes

- No build process required - this is a pure static site
- No package.json or dependencies to manage
- All external resources (Tailwind, fonts) are loaded via CDN
- The site should work offline except for CDN resources
- Keep the site lightweight and fast-loading

## Accessibility

- Use semantic HTML elements
- Include alt text for any images
- Ensure sufficient color contrast
- Make interactive elements keyboard accessible
- Use ARIA labels for dynamic content

## Browser Compatibility

Target modern browsers with ES6+ support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

No IE11 support required.

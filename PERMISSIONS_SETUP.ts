/**
 * Strapi Permissions Setup
 * 
 * Führe dies in der Strapi Console aus: yarn strapi console
 */

// ============================================================================
// BERECHTIGUNGEN FÜR COMPANY ARTICLES
// ============================================================================

// 1. Authenticated Users - Company Articles
const userArticlePerms = {
  // Find all articles (public)
  'api::company-article.company-article.find': { enabled: true },
  
  // Find one article (public)
  'api::company-article.company-article.findOne': { enabled: true },
  
  // Create article (authenticated users)
  'api::company-article.company-article.create': { enabled: false }, // custom controller
  
  // Update article (author/admin only)
  'api::company-article.company-article.update': { enabled: false }, // custom controller
  
  // Delete article (author/admin only)
  'api::company-article.company-article.delete': { enabled: false }, // custom controller
};

// 2. Public Permissions - Company Articles
const publicArticlePerms = {
  'api::company-article.company-article.find': { enabled: true },
  'api::company-article.company-article.findOne': { enabled: true },
};

// ============================================================================
// BERECHTIGUNGEN FÜR PLUGIN VERSIONS
// ============================================================================

// 1. Authenticated Users - Plugin Versions
const userVersionPerms = {
  // Find (public)
  'api::plugin-version.plugin-version.find': { enabled: true },
  'api::plugin-version.plugin-version.findOne': { enabled: true },
  
  // Create/Update/Delete (admin only)
  'api::plugin-version.plugin-version.create': { enabled: false }, // custom controller
  'api::plugin-version.plugin-version.update': { enabled: false }, // custom controller
  'api::plugin-version.plugin-version.delete': { enabled: false }, // custom controller
};

// 2. Public Permissions - Plugin Versions
const publicVersionPerms = {
  'api::plugin-version.plugin-version.find': { enabled: true },
  'api::plugin-version.plugin-version.findOne': { enabled: true },
};

// ============================================================================
// SETUP INSTRUCTIONS
// ============================================================================

/*
1. Gehe zu Strapi Admin → Settings → Users & Permissions Plugin

2. Erstelle eine Rolle: "Article Writer"
   - Name: Article Writer
   - Description: Kann Artikel schreiben und eigene bearbeiten
   - Permissions:
     * api::company-article.company-article.find (Public)
     * api::company-article.company-article.findOne (Public)
     * api::company-article.company-article.create (Custom)
     * api::company-article.company-article.update (Custom)
     * api::company-article.company-article.delete (Custom)

3. Erstelle eine Rolle: "Plugin Manager"
   - Name: Plugin Manager
   - Description: Kann Plugin-Versionen verwalten
   - Permissions:
     * api::plugin-version.plugin-version.find (Public)
     * api::plugin-version.plugin-version.findOne (Public)
     * api::plugin-version.plugin-version.create (Admin-only)
     * api::plugin-version.plugin-version.update (Admin-only)
     * api::plugin-version.plugin-version.delete (Admin-only)

4. Benutzer mit bestimmten Rollen zuweisen:
   - Admin: Alle Permissions
   - Article Writer: Artikel-Permissions
   - Plugin Manager: Version-Permissions
   - Public: Nur Read-Permissions

5. JWT Token Secret konfigurieren in .env:
   JWT_SECRET=your-super-secure-secret-key-change-me
*/

export { };


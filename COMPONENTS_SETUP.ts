/**
 * STRAPI SETUP - Komponenten per Code erstellen
 * 
 * Führe diese Befehle in der Strapi-Konsole aus:
 * strapi console
 */

// ============================================================================
// KOMPONENTEN ERSTELLEN
// ============================================================================

// 1. Company - Tag Component
await strapi.components.createComponent('company', 'tag', {
  displayName: 'Tag',
  description: 'Tags for categorizing company articles',
  icon: 'hashtag',
  attributes: {
    name: { type: 'string', required: true },
    slug: { type: 'uid', targetField: 'name' }
  }
});

// 2. Company - SEO Component
await strapi.components.createComponent('company', 'seo', {
  displayName: 'SEO',
  description: 'SEO metadata for articles',
  icon: 'search',
  attributes: {
    metaTitle: { type: 'string' },
    metaDescription: { type: 'text', maxlength: 160 },
    keywords: { type: 'string' },
    ogImage: { type: 'media', multiple: false },
    ogTitle: { type: 'string' },
    ogDescription: { type: 'text' }
  }
});

// 3. Company - Text Block Component
await strapi.components.createComponent('company', 'text-block', {
  displayName: 'Text Block',
  description: 'Text content block',
  icon: 'align-left',
  attributes: {
    heading: { type: 'string' },
    content: { type: 'richtext' }
  }
});

// 4. Company - Image Block Component
await strapi.components.createComponent('company', 'image-block', {
  displayName: 'Image Block',
  description: 'Image with metadata',
  icon: 'image',
  attributes: {
    image: { type: 'media', multiple: false },
    alt: { type: 'string' },
    caption: { type: 'text' },
    width: { type: 'string' }
  }
});

// 5. Company - Video Block Component
await strapi.components.createComponent('company', 'video-block', {
  displayName: 'Video Block',
  description: 'Embedded video',
  icon: 'play-circle',
  attributes: {
    title: { type: 'string' },
    url: { type: 'string', required: true },
    provider: { type: 'enumeration', enum: ['youtube', 'vimeo'] },
    thumbnail: { type: 'media', multiple: false }
  }
});

// 6. Company - Quote Block Component
await strapi.components.createComponent('company', 'quote-block', {
  displayName: 'Quote Block',
  description: 'Quote or testimonial',
  icon: 'quote',
  attributes: {
    text: { type: 'text', required: true },
    author: { type: 'string' },
    role: { type: 'string' }
  }
});

// 7. Company - Code Block Component
await strapi.components.createComponent('company', 'code-block', {
  displayName: 'Code Block',
  description: 'Code example',
  icon: 'code-branch',
  attributes: {
    language: { type: 'string' },
    code: { type: 'text', required: true },
    title: { type: 'string' }
  }
});

// 8. Company - Link Component
await strapi.components.createComponent('company', 'link', {
  displayName: 'Link',
  description: 'Single link',
  icon: 'link',
  attributes: {
    label: { type: 'string', required: true },
    url: { type: 'string', required: true },
    icon: { type: 'string' },
    target: { type: 'enumeration', enum: ['_self', '_blank'], default: '_self' }
  }
});

// 9. Company - Link Block Component
await strapi.components.createComponent('company', 'link-block', {
  displayName: 'Link Block',
  description: 'Collection of links',
  icon: 'link',
  attributes: {
    title: { type: 'string' },
    links: { type: 'component', repeatable: true, component: 'company.link' }
  }
});

// ============================================================================
// PLUGIN KOMPONENTEN
// ============================================================================

// 10. Plugin - Changelog Item Component
await strapi.components.createComponent('plugin', 'changelog-item', {
  displayName: 'Changelog Item',
  description: 'Changelog entry',
  icon: 'history',
  attributes: {
    date: { type: 'datetime' },
    title: { type: 'string', required: true },
    description: { type: 'text' },
    type: { type: 'enumeration', enum: ['feature', 'bugfix', 'improvement', 'breaking'], default: 'feature' }
  }
});

// 11. Plugin - Feature Component
await strapi.components.createComponent('plugin', 'feature', {
  displayName: 'Feature',
  description: 'Feature description',
  icon: 'star',
  attributes: {
    name: { type: 'string', required: true },
    description: { type: 'text' },
    icon: { type: 'string' }
  }
});

// 12. Plugin - Bug Fix Component
await strapi.components.createComponent('plugin', 'bug-fix', {
  displayName: 'Bug Fix',
  description: 'Bug fix entry',
  icon: 'bug',
  attributes: {
    issue: { type: 'string', required: true },
    solution: { type: 'text' },
    severity: { type: 'enumeration', enum: ['critical', 'high', 'medium', 'low'], default: 'medium' }
  }
});

// 13. Plugin - Known Issue Component
await strapi.components.createComponent('plugin', 'known-issue', {
  displayName: 'Known Issue',
  description: 'Known issue tracking',
  icon: 'exclamation-triangle',
  attributes: {
    issue: { type: 'string', required: true },
    workaround: { type: 'text' },
    severity: { type: 'enumeration', enum: ['critical', 'high', 'medium', 'low'], default: 'medium' },
    status: { type: 'enumeration', enum: ['open', 'investigating', 'planned', 'wontfix'], default: 'open' }
  }
});

console.log('✓ Alle Komponenten erfolgreich erstellt!');


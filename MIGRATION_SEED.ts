/**
 * STRAPI MIGRATION - Artikel und Plugin-Versionen
 * 
 * Dieses Script erstellt Sample-Daten für die Entwicklung
 */

export const seed = async ({ strapi }) => {
  console.log('🌱 Starting Strapi Seeding...\n');

  try {
    // ========================================================================
    // 1. SAMPLE TAGS ERSTELLEN
    // ========================================================================
    console.log('📏 Creating Tags...');

    const tagsData = [
      { name: 'Tutorial', slug: 'tutorial' },
      { name: 'News', slug: 'news' },
      { name: 'Feature', slug: 'feature' },
      { name: 'Performance', slug: 'performance' },
      { name: 'Security', slug: 'security' },
      { name: 'Best Practices', slug: 'best-practices' },
    ];

    // Tags would be created through forms, not direct seed

    // ========================================================================
    // 2. SAMPLE ARTICLE ERSTELLEN
    // ========================================================================
    console.log('📝 Creating Sample Article...');

    const sampleArticle = {
      title: 'Willkommen zu Sprint Intelligence',
      slug: 'willkommen-sprint-intelligence',
      description: 'Eine Einführung in Sprint Intelligence und seine Möglichkeiten',
      content: '<p>Sprint Intelligence hilft teams dabei, ihren Sprint besser zu verwalten...</p>',
      publishedAt: new Date().toISOString(),
      views: 0,
      seo: {
        metaTitle: 'Willkommen zu Sprint Intelligence',
        metaDescription: 'Eine Einführung in Sprint Intelligence und seine Möglichkeiten',
        keywords: 'sprint, intelligence, jira, agile',
      },
      blocks: [
        {
          __component: 'company.text-block',
          heading: 'Was ist Sprint Intelligence?',
          content: 'Sprint Intelligence ist ein intelligentes Tool für Sprint-Management...',
        },
        {
          __component: 'company.quote-block',
          text: 'Sprint Intelligence macht Sprint-Management einfacher und effizienter',
          author: 'Team Dagrato Solutions',
          role: 'Product Development',
        },
      ],
    };

    // Article würde über API erstellt
    console.log('✓ Sample article template created');

    // ========================================================================
    // 3. SAMPLE PLUGIN VERSION ERSTELLEN
    // ========================================================================
    console.log('🔌 Creating Sample Plugin Version...');

    const sampleVersion = {
      pluginName: 'sprint-intelligence',
      version: '1.0.0',
      description: 'Erste stabile Version von Sprint Intelligence',
      releaseNotes: '<h2>Release Notes</h2><p>Dies ist die erste stabile Version...</p>',
      isLatest: true,
      isStable: true,
      releaseDate: new Date().toISOString(),
      endOfLife: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      downloadUrl: 'https://marketplace.atlassian.com/apps/1797708631/sprint-intelligence',
      documentationUrl: 'https://dagrato.solutions/docs',
      installationInstructions: '<h2>Installation</h2><p>1. Installieren Sie das Plugin vom Marketplace...</p>',
      requirements: {
        nodeVersion: '>=18.0.0',
        jiraVersion: '>=8.5.0',
      },
      compatibility: {
        jiraCloud: true,
        jiraServer: false,
        nodeVersion: '18.0.0+',
      },
      features: [
        {
          name: 'Sprint Reporting',
          description: 'Automatische Sprint-Reports mit KPIs',
          icon: '📊',
        },
        {
          name: 'Risk Detection',
          description: 'Frühzeitige Risiko-Erkennung',
          icon: '⚠️',
        },
        {
          name: 'Trend Analysis',
          description: 'Trend-Analyse über multiple Sprints',
          icon: '📈',
        },
      ],
      changelog: [
        {
          date: new Date().toISOString(),
          title: 'Initial Release',
          description: 'Erste stabile Version mit allen Features',
          type: 'feature',
        },
      ],
      bugFixes: [],
      knownIssues: [],
      fileSize: '2.5MB',
      downloads: 0,
    };

    // Version würde über API erstellt
    console.log('✓ Sample plugin version template created');

    // ========================================================================
    // 4. DATABASE EINTRÄGE
    // ========================================================================
    console.log('\n✅ Seeding template created\n');

    console.log('📌 NEXT STEPS:');
    console.log('1. Go to Strapi Admin: http://localhost:1337/admin');
    console.log('2. Navigate to Content Manager');
    console.log('3. Create Company Article entries');
    console.log('4. Create Plugin Version entries');
    console.log('5. Set up SEO and blocks as needed\n');

  } catch (error) {
    console.error('❌ Seeding Error:', error);
    throw error;
  }
};

export default { seed };


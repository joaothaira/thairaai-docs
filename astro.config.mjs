// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
		starlight({
			title: 'ThairaAI',
			description: 'AI-powered office assistant for documents, email, calendar, and productivity.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/joaothaira/ThairaAI' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'Google Integration',
					items: [
						{ label: 'Overview', slug: 'google/overview' },
						{ label: 'OAuth Setup', slug: 'google/oauth-setup' },
						{ label: 'Gmail', slug: 'google/gmail' },
						{ label: 'Calendar', slug: 'google/calendar' },
					],
				},
				{
					label: 'Features',
					items: [
						{ label: 'Built-in Agent', slug: 'features/built-in-agent' },
						{ label: 'Multi-Agent Mode', slug: 'features/multi-agent' },
						{ label: 'Remote Access (WebUI)', slug: 'features/webui' },
						{ label: 'Scheduled Tasks', slug: 'features/scheduled-tasks' },
						{ label: 'Document Generation', slug: 'features/document-generation' },
						{ label: 'Preview Panel', slug: 'features/preview-panel' },
					],
				},
				{
					label: 'AI Models',
					items: [
						{ label: 'Supported Platforms', slug: 'models/supported-platforms' },
						{ label: 'Configuration', slug: 'models/configuration' },
					],
				},
				{
					label: 'Contributing',
					items: [
						{ label: 'Development Setup', slug: 'contributing/development-setup' },
						{ label: 'Project Structure', slug: 'contributing/project-structure' },
					],
				},
			],
		}),
	],
});

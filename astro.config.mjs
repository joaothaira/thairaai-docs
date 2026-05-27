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
			defaultLocale: 'en',
			locales: {
				en: { label: 'English' },
				'pt-br': { label: 'Português (Brasil)', lang: 'pt-BR' },
			},
			sidebar: [
				{
					label: 'Getting Started',
					translations: { 'pt-BR': 'Primeiros Passos' },
					items: [
						{ label: 'Introduction', translations: { 'pt-BR': 'Introdução' }, slug: 'getting-started/introduction' },
						{ label: 'Installation', translations: { 'pt-BR': 'Instalação' }, slug: 'getting-started/installation' },
						{ label: 'Quick Start', translations: { 'pt-BR': 'Início Rápido' }, slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'Google Integration',
					translations: { 'pt-BR': 'Integração com Google' },
					items: [
						{ label: 'Overview', translations: { 'pt-BR': 'Visão Geral' }, slug: 'google/overview' },
						{ label: 'OAuth Setup', translations: { 'pt-BR': 'Configuração OAuth' }, slug: 'google/oauth-setup' },
						{ label: 'Gmail', slug: 'google/gmail' },
						{ label: 'Calendar', translations: { 'pt-BR': 'Agenda' }, slug: 'google/calendar' },
					],
				},
				{
					label: 'Features',
					translations: { 'pt-BR': 'Funcionalidades' },
					items: [
						{ label: 'Built-in Agent', translations: { 'pt-BR': 'Agente Integrado' }, slug: 'features/built-in-agent' },
						{ label: 'Multi-Agent Mode', translations: { 'pt-BR': 'Modo Multi-Agente' }, slug: 'features/multi-agent' },
						{ label: 'Remote Access (WebUI)', translations: { 'pt-BR': 'Acesso Remoto (WebUI)' }, slug: 'features/webui' },
						{ label: 'WhatsApp Channel', translations: { 'pt-BR': 'Canal WhatsApp' }, slug: 'features/whatsapp' },
						{ label: 'Gmail & Calendar Views', translations: { 'pt-BR': 'Gmail e Agenda' }, slug: 'features/google-views' },
						{ label: 'Scheduled Tasks', translations: { 'pt-BR': 'Tarefas Agendadas' }, slug: 'features/scheduled-tasks' },
						{ label: 'Document Generation', translations: { 'pt-BR': 'Geração de Documentos' }, slug: 'features/document-generation' },
						{ label: 'Preview Panel', translations: { 'pt-BR': 'Painel de Visualização' }, slug: 'features/preview-panel' },
					],
				},
				{
					label: 'AI Models',
					translations: { 'pt-BR': 'Modelos de IA' },
					items: [
						{ label: 'Supported Platforms', translations: { 'pt-BR': 'Plataformas Suportadas' }, slug: 'models/supported-platforms' },
						{ label: 'Configuration', translations: { 'pt-BR': 'Configuração' }, slug: 'models/configuration' },
					],
				},
				{
					label: 'Architecture',
					translations: { 'pt-BR': 'Arquitetura' },
					items: [
						{ label: 'Managed AI Gateway', translations: { 'pt-BR': 'Gateway de IA Gerenciado' }, slug: 'architecture/managed-gateway' },
						{ label: 'WhatsApp Channel', translations: { 'pt-BR': 'Canal WhatsApp' }, slug: 'architecture/whatsapp' },
						{ label: 'Gmail & Calendar Views', translations: { 'pt-BR': 'Visualizações Gmail e Agenda' }, slug: 'architecture/google-views' },
					],
				},
				{
					label: 'Contributing',
					translations: { 'pt-BR': 'Contribuindo' },
					items: [
						{ label: 'Development Setup', translations: { 'pt-BR': 'Configuração de Desenvolvimento' }, slug: 'contributing/development-setup' },
						{ label: 'Project Structure', translations: { 'pt-BR': 'Estrutura do Projeto' }, slug: 'contributing/project-structure' },
					],
				},
			],
		}),
	],
});

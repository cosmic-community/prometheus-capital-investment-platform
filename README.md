# Prometheus Capital Investment Platform

![App Preview](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=300&fit=crop&auto=format)

A comprehensive investment management platform combining a professional company website with an advanced AI-powered stock screener for internal investment analysis.

## Features

- **Professional Company Website**: Showcase team expertise, market insights, and investment philosophy
- **AI-Powered Stock Screener**: Internal tool with customizable filters and real-time analysis
- **Content Management**: Dynamic content integration for research, reports, and team profiles  
- **Performance Dashboards**: Interactive analytics and portfolio performance tracking
- **Research Integration**: AI-powered document analysis and investment thesis development
- **Responsive Design**: Optimized for desktop and mobile viewing
- **Real-Time Data**: Live market data integration with financial APIs

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68bb59d7285c02bfe718dcf4&clone_repository=68bb5da0285c02bfe718dd11)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Set up a website and application for my company Prometheus Capital. The company focuses on long term value investment in public and private companies. The application will be an internal public stock screener (for Prometheus' company use only) with customizable filters to identify public companies that meet specific investment criteria using real time public information screened by AI models."

### Code Generation Prompt

> "Set up a website and application for my company Prometheus Capital. The company focuses on long term value investment in public and private companies. The application will be an internal public stock screener (for Prometheus' company use only) with customizable filters to identify public companies that meet specific investment criteria using real time public information screened by AI models. Use the Cosmic AI SDK."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Content Management**: Cosmic CMS with AI integration
- **AI Analysis**: Cosmic AI SDK for stock screening and document analysis
- **TypeScript**: Full type safety and better developer experience
- **Charts**: Recharts for performance visualizations
- **Authentication**: Built-in session management for internal tools
- **Deployment**: Optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ and bun package manager
- Cosmic CMS account with your existing bucket
- Environment variables configured

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prometheus-capital
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Investment Research
```typescript
const research = await cosmic.objects
  .find({ type: 'investment-research' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### AI-Powered Stock Analysis
```typescript
const analysis = await cosmic.ai.generateText({
  prompt: `Analyze this company for long-term value investment potential: ${companyData}`,
  max_tokens: 1000
});
```

### Performance Report Generation
```typescript
const reports = await cosmic.objects
  .find({ 
    type: 'performance-reports',
    'metadata.report_type': 'quarterly' 
  })
  .props(['id', 'title', 'metadata']);
```

## Cosmic CMS Integration

This application integrates seamlessly with your existing Cosmic content structure:

- **Investment Research**: AI-enhanced research reports and analysis
- **Portfolio Companies**: Company profiles with real-time metrics
- **Team Members**: Professional profiles and expertise areas
- **Market Insights**: Thought leadership and market commentary
- **Performance Reports**: Quarterly and annual performance data

The AI stock screener uses Cosmic AI to analyze companies against your investment criteria, incorporating insights from your existing research and team expertise.

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy with automatic CI/CD

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify  
- Google Cloud Platform
- Self-hosted environments

Remember to configure environment variables for your chosen platform.
<!-- README_END -->
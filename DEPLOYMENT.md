# Vercel Deployment Guide

Complete guide to deploy your Nibras Ahmed frontend to Vercel.

## 🚀 Quick Deploy

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Project name: nibras-frontend
   - Framework: Next.js
   - Build command: npm run build
   - Output directory: .next
   - Development command: npm run dev

### Method 2: GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure settings
   - Deploy!

## ⚙️ Configuration

### Environment Variables

In Vercel Dashboard, add these environment variables:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME=Nibras Ahmed Digital Products
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_SECRET_KEY=sk_live_your_secret_key_here

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret

# Chapa (Ethiopian Payments)
NEXT_PUBLIC_CHAPA_PUBLIC_KEY=your_chapa_public_key
CHAPA_SECRET_KEY=your_chapa_secret_key

# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Contact
NEXT_PUBLIC_CONTACT_EMAIL=contact@nibrasahmed.com
```

### Custom Domain

1. **Add domain in Vercel Dashboard**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration steps

2. **Update DNS records**
   - Add CNAME record pointing to vercel.app
   - Or add A record with Vercel IP

3. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Usually takes 5-10 minutes

## 🔧 Build Configuration

### vercel.json

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'your-cdn.com'],
    unoptimized: false
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

## 📊 Performance Optimization

### Image Optimization

```javascript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Code Splitting

```javascript
// Dynamic imports for better performance
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})
```

### Bundle Analysis

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

## 🔍 SEO Configuration

### Meta Tags

```javascript
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Page Title - Nibras Ahmed</title>
        <meta name="description" content="Page description" />
        <meta property="og:title" content="Page Title" />
        <meta property="og:description" content="Page description" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://nibrasahmed.com/page" />
      </Head>
      {/* Page content */}
    </>
  )
}
```

### Sitemap Generation

```javascript
// pages/sitemap.xml.js
function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://nibrasahmed.com</loc>
     </url>
     <url>
       <loc>https://nibrasahmed.com/products</loc>
     </url>
     <url>
       <loc>https://nibrasahmed.com/about</loc>
     </url>
   </urlset>
 `
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap()

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default function SiteMap() {}
```

## 📈 Analytics Setup

### Google Analytics

```javascript
// lib/gtag.js
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
```

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```javascript
// pages/_app.js
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
```

## 🔒 Security Headers

### Security Configuration

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      }
    ]
  }
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Clear `.next` folder
   - Check for TypeScript errors
   - Verify environment variables

2. **Image Optimization Issues**
   - Add domains to `next.config.js`
   - Check image formats (WebP recommended)
   - Verify image paths

3. **API Route Issues**
   - Check CORS configuration
   - Verify API endpoints
   - Check environment variables

4. **Performance Issues**
   - Analyze bundle size
   - Optimize images
   - Use dynamic imports
   - Enable compression

### Debug Mode

```bash
# Enable debug mode
DEBUG=* npm run dev

# Vercel build logs
vercel logs
```

## 📊 Monitoring

### Performance Monitoring

- **Vercel Analytics**: Built-in performance metrics
- **Google PageSpeed**: Regular performance audits
- **Core Web Vitals**: Monitor loading, interactivity, visual stability

### Error Tracking

```bash
# Install Sentry
npm install @sentry/nextjs

# Configure in next.config.js
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: "your-org",
  project: "your-project",
})
```

## ✅ Deployment Checklist

- [ ] Environment variables configured
- [ ] Custom domain added (if applicable)
- [ ] SSL certificate active
- [ ] Analytics tracking setup
- [ ] SEO meta tags configured
- [ ] Performance optimized (90+ Lighthouse score)
- [ ] Error tracking configured
- [ ] Security headers enabled
- [ ] Sitemap generated
- [ ] Social media cards working

## 🎉 Success!

Your frontend is now live on Vercel! 

**Your site is available at:**
- Production: https://your-project.vercel.app
- Custom domain: https://your-domain.com

### Next Steps

1. **Monitor Performance**: Check Vercel Analytics
2. **SEO Audit**: Run Google PageSpeed Insights
3. **Test Functionality**: Verify all features work
4. **Share**: Promote your awesome site!

---

**Need help?** Contact support@nibrasahmed.com

**Created by Nibras Ahmed** - Professional Frontend Developer

# Explore Stoneham - Deployment & Operations Guide

**Step-by-step procedures for deployment, rollbacks, and emergency operations**

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Deployment Procedures](#deployment-procedures)
3. [Rollback Procedures](#rollback-procedures)
4. [Emergency Operations](#emergency-operations)
5. [Monitoring & Alerts](#monitoring--alerts)
6. [Security Management](#security-management)

---

## Initial Setup

### GitHub Account Setup
Follow these steps for the dedicated Explore Stoneham GitHub organization:

#### 1. Create Organization Account
- Go to github.com and create new organization
- Organization name: `exploreStoneham` (or similar)
- Plan: Free (sufficient for public repositories)
- Add team members with appropriate permissions

#### 2. Repository Transfer
```bash
# If transferring existing repository
# On old account: Settings → Transfer ownership
# Enter new organization name
# Confirm transfer

# Update local remote (run this on each developer machine)
git remote set-url origin https://github.com/ExploreStoneham/explore-stoneham.git
git remote -v  # Verify change
```

#### 3. Team Access Management
Set up team permissions:
- **Admins**: Full repository access
- **Maintainers**: Push access, can merge PRs
- **Contributors**: Can create PRs, no direct push

### Vercel Account Setup

#### 1. Create Dedicated Vercel Account
- Sign up at vercel.com using the organization email
- Choose "Hobby" plan (free tier)
- Connect to the new GitHub organization

#### 2. Import Project
```bash
# In Vercel dashboard
1. Click "New Project"
2. Import from GitHub: ExploreStoneham/explore-stoneham
3. Framework Preset: Vite
4. Root Directory: ./MagicPath
5. Build Command: npm run build
6. Output Directory: dist
```

#### 3. Environment Variables
Set in Vercel dashboard under Project Settings → Environment Variables:
```bash
VITE_GOOGLE_MAPS_API_KEY=your_production_api_key
```

#### 4. Custom Domain Configuration
- Go to Project Settings → Domains
- Add custom domain: `explorestoneham.com`
- Configure DNS records as shown in Vercel dashboard
- SSL certificate will be automatically provisioned

---

## Deployment Procedures

### Automatic Deployment (Standard)
**This is the default process for most changes:**

1. **Make Changes Locally**
   ```bash
   # Make your changes to the code
   git add .
   git commit -m "Update attraction information"
   git push origin main
   ```

2. **Automatic Build Process**
   - Vercel detects the push to `main` branch
   - Starts build process automatically
   - Build takes 2-3 minutes typically
   - Site updates automatically on success

3. **Verify Deployment**
   - Check Vercel dashboard for green checkmark
   - Visit explorestoneham.com to confirm changes
   - Test key functionality (events, search, navigation)

### Manual Deployment (If Needed)
**Use only when automatic deployment fails:**

1. **Via Vercel Dashboard**
   ```bash
   1. Go to Vercel dashboard
   2. Select explore-stoneham project
   3. Go to Deployments tab
   4. Click "Redeploy" on latest deployment
   ```

2. **Via Command Line** (Advanced)
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to account
   vercel login
   
   # Deploy from project directory
   cd MagicPath
   vercel --prod
   ```

### Pre-Deployment Checklist
Before pushing changes to main:

- [ ] **Test Locally**: `npm run dev` and test all features
- [ ] **Check Build**: `npm run build` completes without errors
- [ ] **Run Linter**: `npm run lint` passes without errors
- [ ] **Type Check**: `npm run type-check` passes
- [ ] **Test Mobile**: Check responsive design on mobile device
- [ ] **Review Content**: Verify all text, links, and information is correct

---

## Rollback Procedures

### Quick Rollback (Under 5 Minutes)
**Use when site is down or has major issues:**

#### Via Vercel Dashboard (Recommended)
1. **Access Vercel Dashboard**
   - Go to vercel.com and log in
   - Select "explore-stoneham" project

2. **Find Last Working Version**
   - Click "Deployments" tab
   - Look for the last deployment with green checkmark
   - Note the timestamp before the problem started

3. **Promote Previous Deployment**
   - Click the three dots (⋯) next to the working deployment
   - Select "Promote to Production"
   - Confirm the action
   - Site will revert within 1-2 minutes

#### Via GitHub (Alternative)
```bash
# Find the commit to revert to
git log --oneline -10

# Revert to specific commit (replace COMMIT_HASH)
git revert COMMIT_HASH
git push origin main

# Or reset to previous commit (more aggressive)
git reset --hard COMMIT_HASH
git push --force origin main
```

### Detailed Rollback Process

#### 1. Identify the Problem
- **When did it start?** Check deployment timestamps
- **What changed?** Review recent commits and deployments
- **What's broken?** Document specific issues for later fixing

#### 2. Choose Rollback Method
- **Minor content issues**: Fix forward with quick edit
- **Major functionality broken**: Rollback via Vercel
- **Site completely down**: Emergency rollback (see below)

#### 3. Execute Rollback
Follow Quick Rollback steps above

#### 4. Verify Restoration
- [ ] Site loads correctly
- [ ] Events are displaying
- [ ] Search functionality works
- [ ] Navigation works on mobile
- [ ] All major features functional

#### 5. Post-Rollback Actions
- **Notify team** about the rollback
- **Document the issue** for future prevention
- **Plan fix** for the original problem
- **Test fix thoroughly** before re-deploying

---

## Emergency Operations

### Site Completely Down

#### Immediate Response (0-5 minutes)
1. **Don't Panic** - Issues can be fixed quickly
2. **Check Vercel Status**
   - Visit status.vercel.com for platform issues
   - Check dashboard for deployment errors
3. **Execute Emergency Rollback**
   - Use Vercel dashboard method above
   - Promote last known working deployment
4. **Notify Stakeholders**
   - Send brief update to team
   - Post holding message on social media if needed

#### Diagnosis & Resolution (5-30 minutes)
```bash
# Check recent changes
git log --oneline -5

# Check for build errors in Vercel dashboard
# Common issues:
# - Environment variable problems  
# - Dependency conflicts
# - TypeScript errors
# - API endpoint failures
```

### API Service Failures

#### Google Calendar Integration Down
1. **Symptoms**: Events not loading, empty events section
2. **Quick Fix**: Events will show "Loading events..." message
3. **Resolution**:
   ```bash
   # Check API key in Vercel dashboard
   # Verify calendar source URLs are working
   # Check browser console for error messages
   ```

#### CORS Proxy Issues  
1. **Symptoms**: External calendar feeds not working
2. **Check**: `/api/proxy.ts` endpoint functionality
3. **Resolution**: Restart deployment or check allowed domains

### Performance Emergencies

#### Site Loading Very Slowly
1. **Check Vercel Analytics** for performance metrics
2. **Review Recent Changes** for large file additions
3. **Temporary Fix**: Enable caching headers
4. **Long-term**: Optimize images, code splitting

#### High Traffic Issues
1. **Vercel scales automatically** - usually not an issue
2. **Monitor dashboard** for any limits
3. **Consider upgrading** if on free tier limits

---

## Monitoring & Alerts

### Daily Health Checks
**Automated monitoring to set up:**

#### Website Uptime
- Use service like UptimeRobot or Pingdom
- Monitor explorestoneham.com every 5 minutes
- Alert via email/SMS if down for >10 minutes

#### Core Functionality
Create simple monitoring script:
```javascript
// Check key endpoints
const healthCheck = async () => {
  const checks = [
    'https://explorestoneham.com/',
    'https://explorestoneham.com/events',
    'https://explorestoneham.com/attractions',
    'https://explorestoneham.com/api/proxy'
  ];
  
  for (const url of checks) {
    const response = await fetch(url);
    if (!response.ok) {
      alert(`${url} is down: ${response.status}`);
    }
  }
};
```

### Performance Monitoring

#### Vercel Analytics
- Built-in performance monitoring
- Real user metrics
- Geographic performance data
- No setup required

#### Google Lighthouse
Run weekly performance audits:
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://explorestoneham.com --output=json --output-path=./audit-results.json

# Key metrics to monitor:
# - Performance score >90
# - First Contentful Paint <1.5s
# - Largest Contentful Paint <2.5s
```

### Content Monitoring

#### Calendar Integration
Set up weekly check:
- Verify events are loading
- Check for duplicate events
- Confirm event dates are current

#### Link Checking
Monthly verification:
- All attraction URLs work
- External links are valid
- Contact information is current

---

## Security Management

### API Key Management

#### Google API Key Security
**Current Setup**: HTTP referrer restrictions
```bash
# Allowed domains in Google Cloud Console:
# - explorestoneham.com/*
# - localhost:5173/* (for development)
# - vercel.app/* (for preview deployments)
```

**Key Rotation Schedule**:
- Review quarterly
- Regenerate annually or if compromised
- Update in both Vercel and Google Cloud Console

#### Environment Variable Security
```bash
# Best practices:
# 1. Never commit API keys to code
# 2. Use Vercel environment variables for production
# 3. Use .env files for local development (add to .gitignore)
# 4. Rotate keys regularly
```

### Access Control

#### GitHub Repository
- **Public Repository**: Code is open source
- **Team Access**: Control via GitHub teams
- **Branch Protection**: Require reviews for main branch (optional)

#### Vercel Project
- **Team Access**: Limit to necessary members only
- **Deployment Settings**: Restrict production deployments
- **Environment Variables**: Limit access to team leads

#### Domain Control
- **DNS Management**: Restrict access to domain registrar
- **SSL Certificates**: Automatically managed by Vercel
- **Subdomain Control**: Prevent unauthorized subdomain creation

### Backup & Recovery

#### Code Backup
- **Primary**: GitHub repository (automatically backed up)
- **Local**: Each developer maintains local copy
- **Archive**: Consider periodic exports for long-term storage

#### Data Backup
- **Events**: Automatically pulled from source calendars
- **Content**: Stored in code (version controlled)
- **Configuration**: Stored in Vercel (exportable)

#### Recovery Procedures
```bash
# Complete site recovery from scratch:
# 1. Clone repository from GitHub
# 2. Setup new Vercel project
# 3. Configure environment variables
# 4. Deploy to production
# Total time: ~30 minutes
```

---

## Maintenance Schedule

### Daily
- [ ] Check deployment status in Vercel dashboard
- [ ] Monitor error alerts (if set up)

### Weekly  
- [ ] Verify events are loading correctly
- [ ] Check site performance on mobile
- [ ] Review any user feedback

### Monthly
- [ ] Run Lighthouse performance audit
- [ ] Check all external links
- [ ] Update attraction information if needed
- [ ] Review analytics and usage patterns

### Quarterly
- [ ] Rotate API keys
- [ ] Update documentation
- [ ] Review team access permissions
- [ ] Plan feature updates

### Annually
- [ ] Full security audit
- [ ] Dependency updates
- [ ] Domain renewal
- [ ] Backup procedures test

---

## Contact Information

### Emergency Contacts
**Primary Technical Lead**: [Name] - [Email] - [Phone]
**Backup Technical Contact**: [Name] - [Email] - [Phone]  
**Stoneham CAN Project Manager**: [Name] - [Email] - [Phone]

### Service Providers
**Domain Registrar**: [Provider] - [Account Info] - [Support Contact]
**Vercel Support**: support@vercel.com (for platform issues)
**Google Cloud Support**: [Account] - [Support Level]

### Escalation Matrix
1. **Content Issues**: Team member can fix directly
2. **Technical Problems**: Contact technical lead
3. **Site Down**: Contact primary technical lead immediately
4. **Security Issues**: Contact technical lead + project manager
5. **Domain/DNS Issues**: Contact whoever manages the domain

---

*This guide provides detailed procedures for deployment and emergency operations. Keep this information secure and accessible to authorized team members only.*

**Last Updated**: [Date]  
**Version**: 1.0  
**Next Review**: [Date + 6 months]  
**Tested**: [Date] - [By Whom]
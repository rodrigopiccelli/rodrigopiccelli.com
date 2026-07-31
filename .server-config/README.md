# Nginx Configuration for Agent-Readiness

This directory contains Nginx server configurations that enable agent discovery, crawl rules, and content negotiation for both domain aliases.

## Setup Instructions

### Option 1: Manual Copy (Recommended)

On the Oracle server:

```bash
# Copy configurations to Nginx sites-enabled
sudo cp .server-config/rodrigopiccelli.com.conf /etc/nginx/sites-enabled/
sudo cp .server-config/rodrigopiccelli.com.br.conf /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Option 2: Automated Deployment

Add to your CI/CD pipeline:

```bash
#!/bin/bash
ssh oracle << 'EOF'
  cd /var/www/rodrigopiccelli.com
  git pull origin master
  sudo cp .server-config/*.conf /etc/nginx/sites-enabled/
  sudo nginx -t && sudo systemctl reload nginx
EOF
```

## Configuration Overview

Both `.com` and `.com.br` domain configurations include:

### Link Headers (RFC 8288)
```
Link: </.well-known/agent-skills/index.json>; rel="agent-skills",
      </.well-known/api-catalog>; rel="api-catalog",
      </.well-known/mcp/server-card.json>; rel="mcp-server-card",
      </robots.txt>; rel="robots",
      </sitemap.xml>; rel="sitemap"
```

### Content-Type Headers for Agent Resources
- `robots.txt` → `text/plain; charset=utf-8`
- `sitemap.xml` → `application/xml; charset=utf-8`
- `.well-known/agent-skills/index.json` → `application/json; charset=utf-8`
- `.well-known/api-catalog` → `application/linkset+json; charset=utf-8`
- `.well-known/mcp/server-card.json` → `application/json; charset=utf-8`
- `auth.md` → `text/markdown; charset=utf-8`
- `webmcp.js` → `application/javascript; charset=utf-8`

### Cache Headers
- Discovery resources (agent-skills, api-catalog, mcp-card): 24 hours
- Sitemap: 24 hours
- Robots.txt, Auth.md, WebMCP script: 7 days

## Verify Configuration

After deployment, verify with:

```bash
# Check Link headers
curl -I https://rodrigopiccelli.com/
curl -I https://rodrigopiccelli.com.br/

# Verify specific resources
curl -I https://rodrigopiccelli.com/robots.txt
curl -I https://rodrigopiccelli.com/.well-known/agent-skills/index.json
curl -I https://rodrigopiccelli.com.br/.well-known/api-catalog
```

## Markdown for Agents

The site supports content negotiation to serve Markdown versions of pages:

### How It Works

1. **HTML (default)**: Browsers receive `index.html`
2. **Markdown**: Agents sending `Accept: text/markdown` receive `index.md`

### Deployment

Both `index.html` and `index.md` must exist at web root:

```bash
/var/www/rodrigopiccelli.com/
  ├── index.html       # Browsers receive this
  └── index.md         # Agents receive this
```

### Maintenance

When updating the site content:

1. Update `index.html` in Git
2. Update `index.md` manually on server:
   ```bash
   # Edit or regenerate index.md
   scp index.md oracle:/var/www/rodrigopiccelli.com/
   ```

The `index.md` file should NOT be committed to Git (it's served content).

### Testing

```bash
# HTML response (default)
curl -I https://rodrigopiccelli.com/
# Output: Content-Type: text/html

# Markdown response (for agents)
curl -I -H "Accept: text/markdown" https://rodrigopiccelli.com/
# Output: Content-Type: text/markdown; charset=utf-8
```

### Cache Headers

- HTML (`index.html`): Browser cache
- Markdown (`index.md`): 1 hour (3600s)
- Other `.md` files: 1 hour

## Troubleshooting

### Nginx Syntax Errors
```bash
sudo nginx -t
```

### Configuration Not Applied
```bash
sudo systemctl restart nginx
# or
sudo systemctl reload nginx
```

### Headers Not Showing
- Ensure certificates are valid (SSL)
- Check file permissions on `/etc/nginx/sites-enabled/`
- Verify `always` directive is present in `add_header` directives

### Markdown Not Being Served
- Verify `index.md` exists: `ls -la /var/www/rodrigopiccelli.com/index.md`
- Test with curl: `curl -I -H "Accept: text/markdown" https://rodrigopiccelli.com/`
- Check Nginx error log: `sudo tail -f /var/log/nginx/error.log`

---

Last updated: 2026-07-31

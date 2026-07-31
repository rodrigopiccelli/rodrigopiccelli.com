# auth.md

## Overview

This is a public profile site without protected APIs or authentication requirements. All content is freely accessible to humans and AI agents.

## Access Level

**Public** - No authentication required

## Public Resources

- **GitHub**: https://github.com/rodrigopiccelli
- **LinkedIn**: https://linkedin.com/in/rodrigopiccelli
- **Instagram**: https://www.instagram.com/rodrigopiccelli/

## Agent Discovery Resources

- **Sitemap**: [/sitemap.xml](/sitemap.xml)
- **Robots Rules**: [/robots.txt](/robots.txt)
- **Agent Skills Index**: [/.well-known/agent-skills/index.json](/.well-known/agent-skills/index.json)
- **API Catalog**: [/.well-known/api-catalog](/.well-known/api-catalog)
- **MCP Server Card**: [/.well-known/mcp/server-card.json](/.well-known/mcp/server-card.json)

## Authentication

No authentication is required. All content is publicly available.

### If Protected APIs Were Added

If protected APIs are added in the future, this file would include:

```json
{
  "agent_auth": {
    "register_uri": "https://rodrigopiccelli.com/auth/register",
    "supported_identity_types": ["api_key", "bearer_token"],
    "credential_types": ["api_key"],
    "claim_endpoint": "https://rodrigopiccelli.com/.well-known/oauth-protected-resource",
    "revocation_endpoint": "https://rodrigopiccelli.com/auth/revoke"
  }
}
```

## Content Negotiation

This site supports content negotiation for agents:
- **Accept: text/html** → HTML responses (default)
- **Accept: text/markdown** → Markdown responses (when available)

## Accessibility

This profile is designed to be:
- ✅ Discoverable by AI agents
- ✅ Machine-readable via WebMCP
- ✅ Compliant with RFC 9309 (robots.txt)
- ✅ Compliant with RFC 8288 (Link headers)
- ✅ Compliant with RFC 9727 (API Catalog)

---

*Last updated: 2026-07-31*  
*Specification: [Auth.md](https://workos.com/auth-md)*

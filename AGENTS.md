# AGENTS Configuration

## n8n Configuration

This project is connected to n8n at `https://n8n.zxyw.site`

### Credentials
- API URL: `https://n8n.zxyw.site/api/v1`
- API Key: Configured in `opencode.json` env variables

### Available Skills

When working with n8n workflows, use these skills:

1. **n8n-workflow-patterns** - Architectural patterns for n8n workflows
2. **n8n-expression-syntax** - Expression syntax validation
3. **n8n-mcp-tools-expert** - MCP tools usage guide
4. **n8n-node-configuration** - Node configuration patterns
5. **n8n-validation-expert** - Validation error interpretation
6. **n8n-code-javascript** - JavaScript in Code nodes
7. **n8n-code-python** - Python in Code nodes

### Workflow Management

To manage n8n workflows:
- List workflows: GET /api/v1/workflows
- Create workflow: POST /api/v1/workflows
- Get workflow: GET /api/v1/workflows/{id}
- Update workflow: PUT /api/v1/workflows/{id}
- Activate: POST /api/v1/workflows/{id}/activate
- Deactivate: POST /api/v1/workflows/{id}/deactivate

### Available Workflows

Current active workflows in n8n:
- Asistente IA (Active)
- Google Maps Data Extraction (Active)
- chat ia telegram (Active)
- Sachet Contact - Completo (Active)
- Agente de IA Inmobilario (Active)
- Blog Post Writer Workflow (Active)

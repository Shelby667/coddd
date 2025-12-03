Enable Claude Haiku 4.5 — Rollout Plan

Goal
- Safely roll out the "Claude Haiku 4.5" model to clients using a feature-flagged, canary-first approach with safe fallback.

Assumptions
- You have vendor access (Anthropic or equivalent) and an API key with permission to call the model.
- Your backend service selects LLM models per-request.
- You have a feature-flagging system (LaunchDarkly, Unleash, Split) or a config/db-based flagging mechanism.

High-level steps
1. Verify vendor access & billing
2. Add new model alias and feature-flag key to config
3. Implement model-selection middleware with safe fallback
4. Canary rollout (1% → 5% → 25% → 100%)
5. Monitor telemetry and costs
6. Full rollout and documentation
7. Rollback plan and communication

Quick checklist
- [ ] Confirm API access & rates for Claude Haiku 4.5
- [ ] Add model alias to config (see example)
- [ ] Implement server model selection (example file: `examples/server_model_selector.js`)
- [ ] Add feature flag in LaunchDarkly: `enable_claude_haiku_4_5`
- [ ] Create smoke tests (see `scripts/smoke_test.ps1`)
- [ ] Enable for 1% of users, validate, expand rollout

Config example (JSON)

```json
{
  "llm": {
    "defaultModel": "claude-2.1",
    "newModelAlias": "claude-haiku-4.5",
    "useNewModelFlagKey": "enable_claude_haiku_4_5"
  }
}
```

Safety and fallback
- Always implement a fallback to the previous model for errors or rate limits.
- Do not log full prompt text in plain logs. Mask or hash identifiers instead.
- Run a small set of moderation/safety checks on new model outputs during canary.

Canary rollout guidance
- Phase 0 (Smoke): Internal QA + 0.1% of low-risk clients
- Phase 1 (Canary): 1% of users for 24–72 hours
- Phase 2: 5% for 48–72 hours
- Phase 3: 25% for 3–7 days
- Phase 4: 100% after validation

Monitoring & alerts
- Track: error rate (5xx), tail latency (p95/p99), token usage, vendor rate-limit responses, moderation flags or toxic rate.
- Cost alerts: create budget alerts near expected spend + 20%.

Rollback
- Flip the feature flag off (fast).
- If needed, set the default model back and restart the service.
- Notify stakeholders & support teams.

Support notes
- Keep a short troubleshooting doc for support with commands to flip the flag and run smoke tests.

Contact
- Add the vendor support contact and internal owner names here so the team knows who to call if vendor issues arise.

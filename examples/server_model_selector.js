// examples/server_model_selector.js
// Example Node.js model selection + express handler with safe fallback

const config = {
  llm: {
    defaultModel: process.env.DEFAULT_LLM || 'claude-2.1',
    newModelAlias: process.env.NEW_LLM || 'claude-haiku-4.5',
    useNewModelFlagKey: 'enable_claude_haiku_4_5'
  }
};

// featureFlagClient should implement a method isEnabled(flagKey, clientId) -> Promise<boolean>
// llmClient should implement request({model,prompt,options}) -> Promise<{...}> and throw on vendor errors

async function selectModelForRequest(clientId, featureFlagClient){
  if(!featureFlagClient) return config.llm.defaultModel;
  try{
    const enabled = await featureFlagClient.isEnabled(config.llm.useNewModelFlagKey, clientId);
    return enabled ? config.llm.newModelAlias : config.llm.defaultModel;
  }catch(err){
    // Fail-safe: if feature flag system is down, use default model
    console.warn('Feature-flag error, using default model', err.message);
    return config.llm.defaultModel;
  }
}

// Express route example
async function handleGenerate(req, res, {featureFlagClient, llmClient}){
  const clientId = req.headers['x-client-id'] || 'unknown_client';
  const prompt = req.body && req.body.prompt ? req.body.prompt : '';

  const selectedModel = await selectModelForRequest(clientId, featureFlagClient);

  const payload = {
    model: selectedModel,
    prompt,
    max_tokens: req.body.max_tokens || 512
  };

  try{
    const response = await llmClient.request(payload);
    return res.json(response);
  }catch(err){
    console.error(`LLM error for model ${selectedModel}:`, err.message);
    // If selected model was the new one, attempt safe fallback to default model once
    if(selectedModel !== config.llm.defaultModel){
      try{
        const fallback = { model: config.llm.defaultModel, prompt, max_tokens: payload.max_tokens };
        const fbResp = await llmClient.request(fallback);
        return res.json(fbResp);
      }catch(err2){
        console.error('Fallback model also failed:', err2.message);
        return res.status(502).json({ error: 'LLM provider error' });
      }
    }
    return res.status(502).json({ error: 'LLM provider error' });
  }
}

module.exports = { selectModelForRequest, handleGenerate, config };

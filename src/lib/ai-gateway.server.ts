import Anthropic from "@anthropic-ai/sdk";

let _client: Anthropic | undefined;

export function getAnthropicClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY in environment");
    _client = new Anthropic({ apiKey });
  }
  return _client;
}

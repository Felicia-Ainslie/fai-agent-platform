# FAI Agent Platform

Felicia Ainslie Insights (FAI) Platform is a from-scratch TypeScript project for building reusable, local-first AI agents that can run without paid APIs or hosted model providers.

## Table of Contents

- [FAI Agent Platform](#fai-agent-platform)
  - [Table of Contents](#table-of-contents)
  - [Goal](#goal)
  - [Why this project exists](#why-this-project-exists)
  - [Current Status](#current-status)
    - [Implemented](#implemented)
    - [In Development](#in-development)
    - [Planned](#planned)
  - [Architecture](#architecture)
  - [Running the Application](#running-the-application)
  - [Testing the Product Manager Agent](#testing-the-product-manager-agent)
  - [Tokenizer Demo](#tokenizer-demo)
  - [Progress Checklist](#progress-checklist)
    - [Phase 1 - Foundation](#phase-1---foundation)
    - [Phase 2 - Language Modeling](#phase-2---language-modeling)
    - [Phase 3 - Neural Networks](#phase-3---neural-networks)
    - [Phase 4 - Specialized Agents](#phase-4---specialized-agents)
    - [Phase 5 - Language Modeling Experiments](#phase-5---language-modeling-experiments)
  - [Roadmap](#roadmap)
  - [License](#license)

## Goal

Learn and build every major layer of an AI system from the ground up:

- Tokenization
- Training data pipelines
- N-gram models
- Neural language models
- Inference
- Agent architecture
- Domain-specific AI assistants

The long-term goal is to create reusable, cost-free local deployment agents that remain understandable, modifiable, and independent of OpenAI, Ollama, or other hosted providers.

---

## Why this project exists

This repository prioritizes:

- Learning over convenience
- Transparency over abstraction
- Local execution over cloud dependency
- Reusable architecture over one-off solutions
- Low operating costs

Every major component is intended to be understandable, replaceable, and easy to extend.

---

## Current Status

**Version:** Early Prototype

### Implemented

- Express API server
- Agent Framework
- Product Manager Agent endpoint: <code>POST /chat/product-manager</code>
- Input validation
- Custom and rule-based tokenizers
- Local model placeholder
- Reusable agent architecture

### In Development

- Vocabulary system
- Web interface d

### Planned

- BPE tokenizer
- N-gram prediction engine
- Trainable local language model
- Expanded agent collection
- Learned weights or embeddings
- Transformer
- Persistent memory
- Production authentication or authorization

---

## Architecture

```txt
src/
|__ agents/
|__ api/
|__ core/
|  |__ agent/
|  |__ model/
|  |__ tokenizer/
|__ security/
```

The current structure is intentionally simple:

- [src/index.ts](src/index.ts) boots the Express server and mounts the chat routes.
- [src/api/chat.ts](src/api/chat.ts) handles HTTP requests for agent interactions.
- [src/security/validateInput.ts](src/security/validateInput.ts) validates incoming chat payloads.
- [src/agents/product-manager/index.ts](src/agents/product-manager/index.ts) defines the current domain-specific agent.
- [src/core/agent/createAgent.ts](src/core/agent/createAgent.ts) provides a reusable agent wrapper.
- [src/core/model/tinyLocalModel.ts](src/core/model/tinyLocalModel.ts) acts as a local inference placeholder. It tokenizes input and returns a formatted response, but it does not learn or generate meaningfully yet.
- [src/core/tokenizer/ruleTokenizer.ts](src/core/tokenizer/ruleTokenizer.ts) converts text into predictable tokens for experimentation and future model work.

---

## Running the Application

Install dependencies:

```bash
npm install
```

Start the API:

```bash
npm run dev
```

Expected output:

```txt
FAI agent platform running on port 3001
```

---

## Testing the Product Manager Agent

Send a test request:

```bash
curl -X POST http://localhost:3001/chat/product-manager \
  -H "Content-Type: application/json" \
  -d '{"message":"POST /chat/product-manager works, right?"}'
```

---

## Tokenizer Demo

The tokenizer can be executed independently from the API.

Purpose:
- Verify rule-based tokenizer behavior
- Experiment with tokenizer rules
- Compare tokenizer versions
- Support regression testing while building later AI layers

Run:

```bash
npx tsx src/core/tokenizer/ruleTokenizer.demo.ts
```

Example output:

```txt
INPUT:
Hello, world!

TOKENS:
["hello", ",", "world", "!"]
```

---

## Progress Checklist

### Phase 1 - Foundation

- [x] Express API
- [x] Product Manager Agent
- [x] Input Validation
- [x] Custom Tokenizer
- [x] Local Placeholder Model

### Phase 2 - Language Modeling

- [x] Enhanced Tokenizer
- [ ] Vocabulary Builder
- [ ] N-Gram Prediction
- [ ] Model Evaluation

### Phase 3 - Neural Networks

- [ ] Trainable Neural Language Model
- [ ] Embeddings
- [ ] Attention Experiments
- [ ] Transformer Research

### Phase 4 - Specialized Agents

- [ ] Product Manager Agent v2
- [ ] Release Manager Agent
- [ ] Fishkeeping Agent
- [ ] Kid safe "Ask Mom" Agent

### Phase 5 - Language Modeling Experiments

- [ ] BPE Tokenizer
- [ ] WordPiece Tokenizer
- [ ] Unigram Tokenizer
- [ ] FAI Tokenizer

---

## Roadmap

The next milestones are focused on turning this prototype into a more capable local agent platform:

1. Build a stronger local inference layer using n-gram or neural methods.
2. Introduce a vocabulary system and token IDs for more realistic model inputs.
3. Expand the agent framework so new agents can be added with minimal duplication.
4. Add persistence and memory so agents can retain state across interactions.
5. Continue evolving the tokenizer stack toward BPE and other modern approaches.

---

## License

[MIT](https://github.com/Felicia-Ainslie/fai-agent-platform/blob/main/LICENSE)

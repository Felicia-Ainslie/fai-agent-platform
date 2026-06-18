# FAI Agent Platform

Felicia Ainslie Insights (FAI) Agent Platform is a from-scratch AI experimentation project written in TypeScript. 

---

## Goal

Learn and build every major layer of an AI system from the ground up:

- Tokenization
- Training data pipelines
- N-gram models
- Neural language models
- Inference
- Agent architecture
- Domain-specific AI assistants

The long-term goal is to create reusable AI agents without relying on OpenAI, Ollama, or other hosted AI providers.

---

## Current Status

**Version:** Early Prototype

### Implemented

- Express API server
- Agent Framework
- Product Manager Agent
- Input Valudation
- Custom & Rule based tokenizers
- Local model placeholder
- Reusable agent architecture

### Planned

- Vocabulary system
- BPE tokenizer
- N-gram prediction engine
- Trainable local language model
- Expanded Agent collection
- Embeddings
- Transformer
- Persistent memory
- Web interface

----

## Architecture

```txt
src/
|__ agents/
|__ api/
|__ core/
|  |__ agent/
|  |__ model/
|  |__ tokenizer/
|-- security/
```

---

## Philosophy

This project prioritizes:

- Learning over convenience
- Transparency over abstraction
- Local execution over cloud dependency
- Reusable architecture over one-off solutions
- Low operating costs

Every major component should be understandable, modifiable, and replaceable. 

---

## Running the Application

```bash
npm install
```
Start the API:

```bash
npm run dev
```

Expected: 

```txt
FAI agent platform running on port 3001
```

---

### Testing the Product Manager Agent

Send a test request:

```bash
curl -X POST http://localhost:3001/chat/product-manager \
  -H "Content-Type: application/json" \
  -d '{"message":"POST /chat/product-manager works, right?}'
```

Expected response structure:

```json
{
  "response": "Local FAI model response:

I tokenized your message into X tokens.

Tokens:
agent
config
role
...
post
/chat/product
-
manager
works
,
right
?

Next model step: replace this placeholder with a trained local text generator:
}
```

Notes:
- Token count may change as tokenizer rules evolve.
- System prompt tokens currently appear because the Product Manager agent prompt and user message are combined before tokenization.
- Seeing words such as:
  - agent
  - config
  - role
  - product
  - artifacts
 
  indicates the system prompt is being included correctly.

- Seeing:
  - post
  - /chat/product
  - manager
  - works
  - ?
 
  indicates the user message is being tokenized correctly.

---

### Tokenizer Demo

The tokenizer can be executed independently from the API.

Purpose:
- Verify rule based tokenizer behavior
- Experiment with tokenizer rules
- Compare tokenizer versions
- Regression testing while building later AI layers.

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

DECODED:
hello, world!
```

---

## Roadmap

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

## License 

[MIT](https://github.com/Felicia-Ainslie/fai-agent-platform/blob/main/LICENSE)

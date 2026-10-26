# FAI Agent Platform

Felicia Ainslie Insights (FAI) Platform is a from-scratch TypeScript project for building reusable, local-first AI agents that can run without paid APIs or hosted model providers.

**Table of Contents**
- [FAI Agent Platform](#fai-agent-platform)
  - [Goal](#goal)
  - [Why this project exists](#why-this-project-exists)
  - [Project Status](#project-status)
    - [Phase 1 - Foundation](#phase-1---foundation)
    - [Phase 2 - Language Modeling](#phase-2---language-modeling)
    - [Phase 3 - Neural Networks](#phase-3---neural-networks)
    - [Phase 4 - Specialized Agents](#phase-4---specialized-agents)
    - [Phase 5 - Language Modeling Experiments](#phase-5---language-modeling-experiments)
    - [Roadmap](#roadmap)
  - [Architecture](#architecture)
    - [Initialization versus request flow](#initialization-versus-request-flow)
  - [Running the Application](#running-the-application)
  - [Testing the Product Manager Agent](#testing-the-product-manager-agent)
  - [Tokenizer Demo](#tokenizer-demo)
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

## Project Status

**Version 0.1:** Early Prototype

The npm package metadata in
[package.json](package.json) currently declares `1.0.0`; that is separate from
these learning milestones and does not indicate production readiness.

This checklist serves as both the development roadmap and the current implementation status.

### Phase 1 - Foundation

Build the core framework required for every future AI component.


Express API
- [x] Agent framework
- [x] Product manager agent
- [x] <code>POST /chat/product-manager</code> endpoint
- [x] Input validation
- [x] Simple tokenizer (learning implementation)
- [x] Local placeholder language model
- [x] Reusable agent architecture
- [x] Basic Unit Tests

**Status:** Complete

### Phase 2 - Language Modeling

Expand the local model beyond simple rules into a statistical language model.

- [x] Enhanced tokenizer
- [ ] Vocabulary builder
- [ ] Token frequency analysis
- [ ] N-Gram prediction engine
- [ ] Model evaluation franework

**Current Focus:** Building a reusable vocabulary system.

### Phase 3 - Neural Networks

Transition from handcrafted rules into trainable machine learning models.

- [ ] Trainable neural language model
- [ ] Learned embeddings
- [ ] Attention experiments
- [ ] Transformer research

### Phase 4 - Specialized Agents

Expand the platform into reusable domain-specific AI agents.

- [ ] Product Manager Agent v2
- [ ] Fishkeeping Agent
- [ ] Kid safe "Ask Mom" Agent

### Phase 5 - Language Modeling Experiments

Research and compare multiple tokenization strategies.

- [ ] BPE Tokenizer
- [ ] WordPiece Tokenizer
- [ ] Unigram Tokenizer
- [ ] FAI Tokenizer (custom implementation)

### Roadmap

The next milestones are focused on turning this prototype into a more capable local agent platform:


**Version 0.1:** Early Prototype

This checklist serves as both the development roadmap and the current implementation status.

### Phase 1 - Foundation

Build the core framework required for every future AI component.

- [x] Express API
- [x] Agent framework
- [x] Product manager agent
- [x] <code>POST /chat/product-manager</code> endpoint
- [x] Input validation
- [x] Simple tokenizer (learning implementation)
- [x] Local placeholder language model
- [x] Reusable agent architecture
- [x] Basic Unit Tests

**Status:** Complete

### Phase 2 - Language Modeling

Expand the local model beyond simple rules into a statistical language model.

- [x] Enhanced tokenizer
- [ ] Vocabulary builder
- [ ] Token frequency analysis
- [ ] N-Gram prediction engine
- [ ] Model evaluation franework

**Current Focus:** Building a reusable vocabulary system.

### Phase 3 - Neural Networks

Transition from handcrafted rules into trainable machine learning models.

- [ ] Trainable neural language model
- [ ] Learned embeddings
- [ ] Attention experiments
- [ ] Transformer research

### Phase 4 - Specialized Agents

Expand the platform into reusable domain-specific AI agents.

- [ ] Product Manager Agent v2
- [ ] Fishkeeping Agent
- [ ] Kid safe "Ask Mom" Agent

### Phase 5 - Language Modeling Experiments

Research and compare multiple tokenization strategies.

- [ ] BPE Tokenizer
- [ ] WordPiece Tokenizer
- [ ] Unigram Tokenizer
- [ ] FAI Tokenizer (custom implementation)

### Roadmap

The next milestones are focused on turning this prototype into a more capable local agent platform:

1. Build a stronger local inference layer using n-gram or neural methods.
2. Introduce a reusable vocabulary system and token IDs to support more realistic model inputs.
3. Expand the agent framework so new agents can be added with minimal duplication.
4. Add persistence and memory so agents can retain state across interactions.
5. Continue evolving the tokenizer stack toward BPE and other modern approaches.
6. Build a trainable language model from scratch.
7. Develop specialized agents that share the same underlying inference engine.
8. Add authentication, configuration, and deployment features suitable for production environments.

---

## Architecture

The current structure is intentionally simple and is organized by responsibility rather than feature, making individual AI components easy to replace or extend as the platform evolves.

- [src/index.ts](src/index.ts) boots the Express server and mounts the chat routes.
- [src/api/chat.ts](src/api/chat.ts) handles HTTP requests for agent interactions.
- [src/security/validateInput.ts](src/security/validateInput.ts) validates incoming chat payloads.
- [src/agents/product-manager/index.ts](src/agents/product-manager/index.ts) defines the current domain-specific agent.
- [src/core/agent/createAgent.ts](src/core/agent/createAgent.ts) provides a reusable agent wrapper.
- [src/core/model/tinyLocalModel.ts](src/core/model/tinyLocalModel.ts) acts as a local inference placeholder. It tokenizes input and returns a formatted response, but it does not learn or generate meaningfully yet.
- [src/core/tokenizer/ruleTokenizer.ts](src/core/tokenizer/ruleTokenizer.ts) converts text into predictable tokens for experimentation and future model work.

Additional implementation details:

- `src/index.ts` configures CORS and JSON parsing and exposes `/health`.
- `src/api/chat.ts` validates each request and wraps the agent result in a JSON response.
- `src/agents/product-manager/index.ts` supplies the active agent name, role, and rules. It calls `createAgent(config)` once when the module loads, then reuses that agent for requests.
- `src/core/agent/createAgent.ts` constructs a `TinyLocalModel` and returns an agent with a `run(message)` method. Each run combines the configuration and user message into a framed prompt.
- `src/core/model/tinyLocalModel.ts` constructs a `RuleTokenizer`. Its `generate()` method tokenizes the framed prompt and reports those tokens; it is not a trained language model and does not follow the instructions semantically.
- `RuleTokenizer` is the current tokenizer. [SimpleTokenizer](src/core/tokenizer/simpleTokenizer.ts) remains available as the earlier implementation for comparison.

<br>

### Initialization versus request flow

The factory is called during module initialization, not after validation on every request:

```mermaid
flowchart TD

Version["Version 0.1"]

  subgraph Initialization["Module initialization (once per module instance)"]
    Config["Product Manager config: name, role, rules<br/>src/agents/product-manager/index.ts"] --> Agent["Agent Factory
<code>src/core/agent/createAgent.ts</code>"]
  end

  subgraph Requests["For each POST /chat/product-manager request"]
  Client["Client / Chat Initiated"] --> API["Express API
<code>src/api/chat.ts</code>"]

  API --> Validation["Input Validation
<code>src/security/validateInput.ts</code>"]
  Validation --> PM["Product Manager Agent
<code>src/agents/product-manager/</code>"]
  PM --> Run["Existing agent.run(message)<br/>Frame config + user message"]
  Run --> Model["Tiny Local Model
<code>src/core/model/tinyLocalModel.ts</code>"]
  Model --> Tokenizer["Rule Tokenizer
<code>src/core/tokenizer/ruleTokenizer.ts</code>"]
  Tokenizer --> Model
  Model -->|"Token report returned through agent and route as JSON: { response }"| Response["HTTP Response"]
  end

  Agent -. returns reusable agent .-> Run
  Agent -. creates once .-> Model
  Agent -. creates once .-> Tokenizer

style Version stroke:#58a6ff, stroke-width:3px
style API stroke:#58a6ff
style Validation stroke:#d29922
style Agent stroke:#3fb950
style PM stroke:#3fb950
style Model stroke:#f85149
style Tokenizer stroke:#a371f7
style Response stroke:#58a6ff


```

**Where to swap implementations:** the model is currently selected by its import and construction in `createAgent.ts`; the tokenizer is selected in `tinyLocalModel.ts`. Both tokenizers expose `encode()` and `decode()` for string tokens, but there is no shared interface or runtime selector yet. Keeping these responsibilities separate makes later experiments easier without claiming those future extension points already exist.

**What about `systemPrompt.ts`?** [src/agents/product-manager/systemPrompt.ts](src/agents/product-manager/systemPrompt.ts) exports a separate, fuller Product Manager role description and guidelines. Nothing currently imports that export. It is retained, but it is not the active prompt source and does not affect responses. The active instructions are the `name`, `role`, and `rules` in `product-manager/index.ts`, framed by `createAgent.ts`. Neither prompt source is changed here.

---

## Running the Application

Use Node.js 24.x. The locked test/build tooling is compatible with `^20.19.0 || ^22.12.0 || >=24.0.0`; compatibility with a dependency's engine range is not a claim that every version has been tested.

Install dependencies:

```bash
npm install
```

Alternatively, install the locked dependencies with `npm ci`.

Optional local configuration:

```bash
cp .env.example .env
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3001` | API listening port. |
| `ALLOWED_ORIGIN` | `http://localhost:3000` | Browser origin allowed by the CORS configuration. This is not authentication. |

Start the API:

```bash
npm run dev
```

Expected output:

With the default port, the server's startup message is:

```txt
FAI agent platform running on port 3001
```

The existing npm scripts are:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run `src/index.ts` with `tsx`. |
| `npm run build` | Compile TypeScript to `dist/` using `tsc`. |
| `npm start` | Run the compiled server (`npm run build` first). |
| `npm test` | Run Vitest in its default interactive/watch mode. |
| `npm run test:run` | Run the unit test suite once. |

There is no separate lint script. Before proposing changes, run:

```bash
npm run test:run
npm run build
npm run test:run
```

Check that the server is responsive:

```bash
curl http://localhost:3001/health
```

Expected JSON:

```json
{"status":"ok","service":"fai-agent-platform"}
```

Use your configured port in requests if you change `PORT`.

---

## Testing the Product Manager Agent

Send a test request:

The API needs to be running before sending this request.

```bash
curl -X POST http://localhost:3001/chat/product-manager \
  -H "Content-Type: application/json" \
  -d '{"message":"POST /chat/product-manager works, right?"}'
```

Expected response structure:

This example uses the current agent configuration and tokenizer. The line breaks inside the string are escaped to keep this valid JSON.

```json
{
  "response": "Local FAI model response:\n\nI tokenized your message into 76 tokens.\n\nTokens:\nagent | : | fai | product | manager | agent | role | : | product | management | assistant | for | structured | product | thinking | . | rules | : | - | create | clear | product | artifacts | . | - | use | assumptions | when | context | is | incomplete | . | - | prefer | structured | outputs | without | emojis | or | dashes | . | - | do | not | invent | company | - | specific | facts | . | - | seperate | problem | , | users | , | requirements | , | risks | , | and | success | metrics | . | user | message | : | post | /chat | /product | - | manager | works | , | right | ?\n\nNext model step: replace this placeholder with a trained local text generator"
}
```

Notes:
- Token count may change as tokenizer rules evolve.
- System prompt tokens currently appear because the Product Manager agent prompt and user message are combined before tokenization.
- Seeing words such as:
  - agent
  - rules
  - role
  - product
  - artifacts
 
  indicates the system prompt is being included correctly.

- Seeing:
  - post
  - /chat
  - /product
  - `-`
  - manager
  - works
  - ,
  - right
  - ?
 
  indicates the user message is being tokenized correctly.


Here, "system prompt" means the active agent configuration in `product-manager/index.ts`, framed by `createAgent.ts`, not the unused `systemPrompt.ts` export. The 76 tokens cover the **entire framed prompt**, not just the user's message: agent name, role, rules, framing labels, and message.

The existing `Seperate` spelling in the active rules is reflected as `seperate` in this example, not silently corrected in the prompt. The tokenizer does not keep the whole route as one token.

The count and response also change when the configuration or input changes. This is a deterministic token report, not a generated Product Manager answer.

---

## Tokenizer Demo

The tokenizer can be executed independently from the API.

Purpose:
- Verify rule-based tokenizer behavior
- Experiment with tokenizer rules
- Compare tokenizer versions
- Support regression testing while building later AI layers

The earlier `SimpleTokenizer` demo is preserved under its own name, and the `RuleTokenizer` demo uses the current implementation. They use the same five inputs to make the progression visible.

Run:

```bash
npx tsx src/core/tokenizer/simpleTokenizer.demo.ts
npx tsx src/core/tokenizer/ruleTokenizer.demo.ts
```

Alternatively, run the compiled demos after `npm run build`:

```bash
node dist/core/tokenizer/simpleTokenizer.demo.js
node dist/core/tokenizer/ruleTokenizer.demo.js
```

Both implementations lowercase input by default and split text using regular expressions; `SimpleTokenizer` is not merely a whitespace splitter. The demos print token arrays as JSON so the output can be compared directly.

Example output:

For `Hello, world!`, **SimpleTokenizer (v1)** prints:

```txt
INPUT:
Hello, world!
TOKENS:
["hello",",","world","!"]
DECODED:
hello , world !
```

For the same input, **RuleTokenizer (v2)** prints:

```txt
INPUT:
Hello, world!
TOKENS:
["hello",",","world","!"]
DECODED:
hello, world!
```

The shared samples also expose differences beyond punctuation spacing:

| Input | SimpleTokenizer tokens | RuleTokenizer tokens |
| --- | --- | --- |
| `POST /chat/product-manager works.` | `["post","/","chat","/","product","-","manager","works","."]` | `["post","/chat","/product","-","manager","works","."]` |
| `I can't wait.` | `["i","can","'","t","wait","."]` | `["i","can't","wait","."]` |

`SimpleTokenizer.decode()` joins all tokens with spaces. `RuleTokenizer.decode()` removes spaces before common punctuation, but still decodes the route sample as `post /chat /product - manager works.`. Neither decoder restores the original text exactly; lowercasing and formatting loss are current tradeoffs, not bugs fixed by these demos. Only `RuleTokenizer` supports opting out of lowercasing via `{ lowercase: false }`.

Use these demos for manual inspection and experimentation alongside the existing automated tests; printing a sample is not itself a regression assertion.

---

## License

[MIT](https://github.com/Felicia-Ainslie/fai-agent-platform/blob/main/LICENSE)



---

## Local learning lab: one input, independent demos

This is an additional way to test the Simple and Rule tokenizers, not a replacement for the existing demos, comments or learning phases. The two tokenizer rows and the agent wiring row call the actual TypeScript implementations directly in the browser. There is no custom demo server, adapter, external model call or HTTP API request.

From the repository root:

```bash
npm ci
npm run demo:dev
```

Open the loopback URL printed by Vite (normally **http://127.0.0.1:5173**) in a browser on the same computer. Leave the terminal running and use `Ctrl+C` to stop it. When using the cloud computer from a phone, open its browser, not the phone's own localhost. Vite is a standard development server, not public hosting. It reloads the page when the demo or imported tokenizer code changes.

1. Type one test input, or tap a sample.
2. Choose **Compare all demos** for both tokenizers and the agent wiring demo, or **Run this demo** for one row. There are no selection checkboxes.
3. Compare the exact input, string tokens/count and decoded text, or the actual agent token report. Scroll across the table on narrow screens.
4. Tap or keyboard-focus an **i** button for what the piece does, why it exists, what can change and its limits. Escape or Close dismisses it.
5. **Reset results** clears results without changing your input. Editing the input marks previous results until you rerun them.

The **Slashes and hyphens** sample is text to tokenize, not an API call. Tokenizer rows preserve empty input and whitespace for experimentation; input is limited to 4000 characters. Neither tokenizer trains a model or generates an answer. The third row, **Agent wiring demo: token report**, calls the existing validateChatInput() and runProductManagerAgent() functions. Validation trims the message and rejects blank input. The existing factory adds its name, role and rules, then TinyLocalModel returns its diagnostic token report unchanged. The full framed prompt is not exposed by the factory, so this UI does not reconstruct it or parse the report into a second token list. This demonstrates function flow, not HTTP transport or generated answers. Original agent and tokenizer source remains unchanged.

The lab has four files: `index.html` provides the page, `app.js` connects its controls directly to the imported tokenizer and agent functions, `styles.css` controls presentation, and `FA-logo.jpg` is the exact local website logo. The site palette is navy, cream and gold. Font names match Playfair Display and Montserrat, with local fallbacks rather than external font requests.

To run the original tests, compile the original project, and build a static version of the lab:

```bash
npm run test:run
npm run build
npm run demo:build
npm run demo:preview
```

`demo:build` first type-checks the existing TypeScript source, then writes browser-ready files into ignored `demo-dist/`. The UI's JavaScript is bundled, but is not fully TypeScript-checked. `demo:preview` serves that build locally, normally at **http://127.0.0.1:4173**. Rebuild after source changes before previewing again.

Vite is the one explicit development dependency added for this UI. The existing test tooling already uses that same version. No new framework or application server is involved. Test input is processed in the browser, not sent to a tokenizer endpoint or stored. The development connection used for reloading is separate from your test input. Keep dev and preview bound to `127.0.0.1`; do not expose or deploy these development servers. This change does not publish the lab or integrate it into the live website.

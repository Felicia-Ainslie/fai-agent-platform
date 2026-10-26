// Vite lets this browser page import my actual TypeScript modules directly.
// There is no second implementation or API call between the input and results.
import { SimpleTokenizer } from '../src/core/tokenizer/simpleTokenizer.ts';
import { RuleTokenizer } from '../src/core/tokenizer/ruleTokenizer.ts';
import { runProductManagerAgent } from '../src/agents/product-manager/index.ts';
import { validateChatInput } from '../src/security/validateInput.ts';
const stages = [
  { id: 'simple', title: 'SimpleTokenizer', phase: 'TOKENIZER · SIMPLE', limit: 'Splits words and punctuation. Lowercases text; contractions split. Decode adds spaces. No learned predictions.' },
  { id: 'rule', title: 'RuleTokenizer', phase: 'TOKENIZER · RULE', limit: 'Keeps contractions and slash-prefixed segments together. Default lowercase. Decode improves some punctuation spacing; still not lossless.' },
  { id: 'agent', title: 'Agent wiring demo: token report', phase: 'FUNCTION FLOW · NOT AN AI ANSWER', limit: 'Calls validation, the Product Manager agent, its factory and TinyLocalModel. Returns the actual token report. No trained generation or HTTP transport is demonstrated.' },
];
const help = {
  agent: ['Agent wiring demo: token report', 'Calls the existing validator, then runProductManagerAgent(), which uses the existing factory and TinyLocalModel.', 'Shows that the functions connect and the message reaches the diagnostic model.', 'Changing the real source changes this demo too. No prompt rules are copied into the UI.', 'This runs functions in the browser, not the HTTP API. The full prompt is not exposed by the factory, so the UI does not reconstruct it. The response is a token report, not a generated answer.'],
  stage: ['Independent stages', 'Each demo runs from the same input, not the output of the row above it.', 'Compare capabilities without losing earlier learning milestones.', 'Future implementations can be added as new rows without replacing these demos.', 'These are two tokenizer experiments and one function-wiring demonstration, not trained language models.'],
  input: ['Processed input', 'Tokenizer rows use the raw text. The wiring row validates and trims the message before the existing factory adds its name, role and rules.', 'Distinguish raw-text tokenization from the agent report, which includes its entire framed prompt.', 'Change your input or try a sample to see which rules affect the result.', 'The slashes and hyphens sample is plain text. It does not make an API request.'],
  tokens: ['Tokens and count', 'Tokenizer rows show their token array and length. The wiring row leaves tokens and count in the original report without parsing or recreating them.', 'See exactly where contractions, punctuation and routes split differently.', 'Swap tokenizer experiments independently, but train any future model with the same tokenizer and vocabulary it will use at runtime.', 'String tokens are not numeric IDs. Counts from these custom tokenizers are not provider billing estimates.'],
  output: ['Decoded text or token report', 'Tokenizer rows call decode(). The wiring row shows the exact diagnostic string returned by the existing agent.', 'See how each implementation turns its tokens back into text.', 'The decoding rules can change independently from the input and the comparison layout.', 'Decoding is not answer generation. Neither decoder perfectly restores the original text.'],
  limits: ['Capability evidence', 'Each row explains the behavior demonstrated and the missing capability.', 'A truthful demo is stronger evidence than an output that looks intelligent but is hardcoded.', 'Use the same test input across iterations and compare observable changes.', 'Passing these demos does not establish model quality, factual accuracy or production readiness.'],
  simple: ['SimpleTokenizer', 'Calls the existing encode() and decode() methods.', 'Shows the first word/punctuation splitting approach end to end.', 'Its regex controls splitting. Keep this iteration when trying a new tokenizer.', 'Always lowercases; splits contractions and route slashes; decode is lossy. Unicode behavior is limited.'],
  rule: ['RuleTokenizer', 'Calls the existing encode() and decode() with the default options.', 'Shows the added rules for contractions, route segments and punctuation spacing.', 'The existing constructor supports lowercase: false; this comparison intentionally uses the current default.', 'Not a learned tokenizer. Routes are not preserved as a single token; Unicode behavior remains limited.'],
};
const rows = document.querySelector('#rows');
const input = document.querySelector('#message');
const status = document.querySelector('#status');
const state = {};
let busy = false;
function element(tag, text, cls) {
  const node = document.createElement(tag);
  // Never interpret input or tokenizer output as HTML.
  if (text !== undefined) node.textContent = text;
  if (cls) node.className = cls;
  return node;
}
function info(key, label) {
  const button = element('button', 'i', 'info');
  button.type = 'button'; button.dataset.help = key; button.setAttribute('aria-label', label);
  return button;
}
for (const stage of stages) {
  const row = element('tr');
  const name = element('td');
  name.append(element('span', stage.phase, 'stage-number'), element('strong', stage.title, 'stage-name'), info(stage.id, `About ${stage.title}`));
  const controls = element('div', undefined, 'row-controls');
  const run = element('button', 'Run this demo', 'run-one'); run.type = 'button'; run.setAttribute('aria-label', `Run this demo: ${stage.title}`); run.addEventListener('click', () => runStages([stage.id]));
  controls.append(run); name.append(controls);
  const cells = ['input', 'tokens', 'output', 'limits'].map(() => element('td'));
  row.append(name, ...cells); rows.append(row);
  state[stage.id] = { cells, stage };
}
function resetRow(id) {
  const {cells, stage} = state[id];
  cells.forEach(cell => cell.replaceChildren());
  [0, 1, 2].forEach(i => cells[i].append(element('span', 'Not run yet', 'muted')));
  cells[3].append(element('span', stage.limit, 'muted'));
  delete state[id].lastInput;
}
function show(id, result) {
  const { cells, stage } = state[id];
  cells.forEach(cell => cell.replaceChildren());
  if (id === 'agent') {
    cells[0].append(element('span', 'Validated message', 'count'), element('pre', result.processedInput),
      element('p', 'Validated message plus agent name, role and rules. Reported tokens cover the full prompt, which this interface does not expose.', 'muted'),
      element('span', 'Original input', 'count'), element('pre', result.rawInput));
    cells[1].append(element('p', 'See the actual token report in the next column. Tokens and count are not separately parsed or reconstructed here.', 'muted'));
    cells[2].append(element('span', 'Actual token report, not an AI answer', 'count'), element('pre', result.response));
  } else {
    cells[0].append(element('span', 'Raw input → tokenizer', 'count'), element('pre', result.processedInput));
    cells[1].append(element('span', `${result.count} string tokens`, 'count'), element('pre', JSON.stringify(result.tokens, null, 2)));
    cells[2].append(element('span', 'Actual decode()', 'count'), element('pre', result.decoded));
  }
  cells[3].append(element('span', stage.limit, 'muted'));
  state[id].lastInput = result.rawInput;
}
function refreshStale() {
  for (const entry of Object.values(state)) {
    entry.cells[0].querySelector('.stale')?.remove();
    if (entry.lastInput !== undefined && entry.lastInput !== input.value) entry.cells[0].prepend(element('p', 'Previous input. Rerun to compare.', 'muted stale'));
  }
}
async function runStages(ids) {
  if (busy) return;
  busy = true;
  const message = input.value; // One snapshot for all rows; typing cannot mix results.
  document.querySelectorAll('button:not(.info):not(#close-help)').forEach(node => node.disabled = true);
  status.textContent = 'Running actual local modules…';
  let errors = 0;
  for (const id of ids) {
    try {
      if (message.length > 4000) throw new Error('Enter text up to 4000 characters.');
      let result;
      if (id === 'agent') {
        // Call the existing functions as they are. Do not copy prompt framing or
        // intercept the model. This report proves wiring, not answer generation.
        const validated = validateChatInput({ message });
        const response = await runProductManagerAgent(validated.message);
        result = { rawInput: message, processedInput: validated.message, response };
      } else {
        const tokenizer = id === 'simple' ? new SimpleTokenizer() : new RuleTokenizer();
        const tokens = tokenizer.encode(message);
        result = { rawInput: message, processedInput: message, tokens,
          count: tokens.length, decoded: tokenizer.decode(tokens) };
      }
      show(id, result);
    } catch (error) {
      errors++;
      resetRow(id);
      state[id].cells[2].replaceChildren(element('p', error.message, 'error'));
    }
  }
  document.querySelectorAll('button:not(.info):not(#close-help)').forEach(node => node.disabled = false);
  busy = false; refreshStale();
  status.textContent = `Finished ${ids.length} stage${ids.length === 1 ? '' : 's'}${errors ? `; ${errors} failed (see row)` : ''}. Nothing was saved.`;
}
document.querySelector('#run').addEventListener('click', () => runStages(stages.map(s => s.id)));
document.querySelector('#reset').addEventListener('click', () => { stages.forEach(s => resetRow(s.id)); status.textContent = 'Results cleared. Your input is unchanged.'; });
document.querySelectorAll('[data-sample]').forEach(button => button.addEventListener('click', () => { input.value = button.dataset.sample; refreshStale(); input.focus(); }));
input.addEventListener('input', refreshStale);
const dialog = document.querySelector('#help');
document.addEventListener('click', event => {
  const button = event.target.closest('[data-help]');
  if (!button) return;
  const [title, ...parts] = help[button.dataset.help];
  document.querySelector('#help-title').textContent = title;
  const body = document.querySelector('#help-body'); body.replaceChildren();
  ['What', 'Why', 'What can change', 'Limits'].forEach((heading, i) => body.append(element('strong', heading), element('p', parts[i])));
  dialog.setAttribute('aria-labelledby', 'help-title');
  dialog.showModal();
});
document.querySelector('#close-help').addEventListener('click', () => dialog.close());
stages.forEach(stage => resetRow(stage.id));

const pageText = definer.lookup.getVariable('page_text')
const context = {
	query: definer.lookup.query,
	language: definer.lookup.language,
	url: definer.lookup.getVariable('url') ?? null,
	pageTitle: definer.lookup.getVariable('page_title') ?? null,
	sentence: definer.lookup.getVariable('sentence') ?? null,
	paragraph: definer.lookup.getVariable('paragraph') ?? null,
	pageTextPreview:
		typeof pageText === 'string' ? pageText.slice(0, 500) : null,
}

definer.output.setHtml(`
	<section class="context-inspector">
		<h1>Lookup context</h1>
		<pre></pre>
	</section>
`)
definer.output.setCss(`
	.context-inspector { padding: 16px; }
	.context-inspector h1 { margin-top: 0; }
	.context-inspector pre {
		padding: 12px;
		overflow: auto;
		white-space: pre-wrap;
		border-radius: 8px;
		background: ${definer.theme.rgba('text', 0.06)};
	}
`)

document.querySelector('.context-inspector pre').textContent = JSON.stringify(
	context,
	null,
	2,
)

const title = definer.lookup.getVariable('page_title') || 'Untitled page'
const url = definer.lookup.getVariable('url') || 'URL unavailable'
const site = definer.lookup.getVariable('page_og_site_name')
const modified = definer.lookup.getVariable('page_last_modified')
const accessed = new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date())
const source = site ? `${title}. ${site}.` : `${title}.`
const detail = modified ? `Last modified ${modified}.` : `Accessed ${accessed}.`
const formats = {
	plain: `${source} ${detail} ${url}`,
	markdown: `[${title.replaceAll('[', '\\[').replaceAll(']', '\\]')}](${url})`,
}

definer.output.setHtml(`
	<section class="citation-builder">
		<div>
			<button type="button" data-format="plain">Plain text</button>
			<button type="button" data-format="markdown">Markdown</button>
		</div>
		<pre></pre>
	</section>
`)
definer.output.setCss(`
	.citation-builder { padding: 18px; }
	.citation-builder div { display: flex; gap: 8px; }
	.citation-builder button { padding: 7px 12px; cursor: pointer; }
	.citation-builder pre {
		padding: 12px; white-space: pre-wrap; user-select: text;
		border-radius: 8px; background: ${definer.theme.rgba('text', 0.06)};
	}
`)

const output = document.querySelector('.citation-builder pre')
const showFormat = (format) => {
	output.textContent = formats[format]
}

for (const button of document.querySelectorAll('.citation-builder button')) {
	button.addEventListener('click', () => showFormat(button.dataset.format))
}

showFormat('plain')

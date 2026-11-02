const saved = definer.result.getData()

definer.output.setHtml(`
	<section class="lookup-notes">
		<label for="lookup-note">Notes for this lookup</label>
		<textarea id="lookup-note" rows="6" placeholder="Add a mnemonic, example, or reminder…"></textarea>
		<div>
			<button type="button">Save note</button>
			<span role="status"></span>
		</div>
	</section>
`)
definer.output.setCss(`
	.lookup-notes { display: grid; gap: 10px; padding: 18px; }
	.lookup-notes label { font-weight: 600; }
	.lookup-notes textarea {
		width: 100%; padding: 10px; resize: vertical; color: inherit;
		border: 1px solid ${definer.theme.rgba('text', 0.2)};
		border-radius: 8px; background: ${definer.theme.rgba('text', 0.04)};
	}
	.lookup-notes div { display: flex; align-items: center; gap: 10px; }
	.lookup-notes button { padding: 7px 12px; cursor: pointer; }
	.lookup-notes [role="status"] { opacity: 0.7; }
`)

const note = document.querySelector('.lookup-notes textarea')
const status = document.querySelector('.lookup-notes [role="status"]')
note.value = typeof saved.note === 'string' ? saved.note : ''

document.querySelector('.lookup-notes button').addEventListener('click', () => {
	definer.result.patchData({
		note: note.value,
		updatedAt: new Date().toISOString(),
	})
	status.textContent = 'Saved with this lookup.'
})

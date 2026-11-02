const query = definer.lookup.query.trim()
const units = 'mm|cm|m|km|in|ft|yd|mi|g|kg|oz|lb|°?[cfk]'
const match = query.match(
	new RegExp(`^(-?(?:\\d+(?:\\.\\d+)?|\\.\\d+))\\s*(${units})\\s+(?:to|in)\\s*(${units})$`, 'i'),
)

definer.output.setHtml(`
	<section class="converter">
		<p class="converter__input"></p>
		<strong class="converter__result"></strong>
		<p class="converter__help">Try “10 km to mi”, “72 f to c”, or “5 lb to kg”.</p>
	</section>
`)
definer.output.setCss(`
	.converter { padding: 20px; }
	.converter__input, .converter__help { margin: 0; opacity: 0.65; }
	.converter__result { display: block; margin: 8px 0; font-size: 1.7em; }
`)

const input = document.querySelector<HTMLElement>('.converter__input')!
const result = document.querySelector<HTMLElement>('.converter__result')!
input.textContent = query

if (!match) {
	result.textContent = 'No supported conversion found.'
} else {
	const value = Number(match[1])
	const from = match[2].toLowerCase().replace('°', '')
	const to = match[3].toLowerCase().replace('°', '')
	const groups: Record<string, number>[] = [
		{ mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
		{ g: 0.001, kg: 1, oz: 0.028349523125, lb: 0.45359237 },
	]
	const group = groups.find((candidate) => from in candidate && to in candidate)
	let converted: number | undefined

	if (group) {
		converted = (value * group[from]) / group[to]
	} else if ('cfk'.includes(from) && 'cfk'.includes(to)) {
		const celsius = from === 'c' ? value : from === 'f' ? (value - 32) * 5 / 9 : value - 273.15
		converted = to === 'c' ? celsius : to === 'f' ? celsius * 9 / 5 + 32 : celsius + 273.15
	}

	result.textContent = Number.isFinite(converted)
		? `${Number(converted!.toFixed(6))} ${to === 'c' || to === 'f' ? `°${to.toUpperCase()}` : to}`
		: 'Those units cannot be converted to each other.'
}

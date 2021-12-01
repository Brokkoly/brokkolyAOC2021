import * as fs from 'fs';
import fetch from 'node-fetch';
export function readInput(path: string): string[] {
	let data: string[] = [];
	try {
		data = fs.readFileSync(path, 'utf-8').toString().replace(/\r\n/g, '\n').split('\n');
		console.log(data);
	}
	catch (err) {
		console.error(err);
	}
	return data;
}

export async function readInputFromURL(path: string): Promise<string[]> {
	const txt = fetch(path)
		.then(res => res.text())
		.then(txt => txt.replace(/\r\n/g, '\n').split('\n'));
	return txt;
}

export { };
//#region src/lib/github.ts
function cfg() {
	return {
		token: void 0,
		repo: void 0,
		branch: "main"
	};
}
function apiUrl(path) {
	return `https://api.github.com/repos/${cfg().repo}/contents/${path}`;
}
function ghHeaders() {
	return {
		Authorization: `Bearer ${cfg().token}`,
		Accept: "application/vnd.github+json",
		"Content-Type": "application/json",
		"X-GitHub-Api-Version": "2022-11-28"
	};
}
async function ghReadJson(path) {
	const res = await fetch(`${apiUrl(path)}?ref=${cfg().branch}`, { headers: ghHeaders() });
	if (!res.ok) throw new Error(`GitHub read failed [${res.status}]: ${await res.text()}`);
	const json = await res.json();
	const text = Buffer.from(json.content, "base64").toString("utf-8");
	return {
		data: JSON.parse(text),
		sha: json.sha
	};
}
async function ghWriteJson(path, data, sha, message) {
	const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
	const res = await fetch(apiUrl(path), {
		method: "PUT",
		headers: ghHeaders(),
		body: JSON.stringify({
			message: message ?? `[admin] update ${path}`,
			content,
			sha,
			branch: cfg().branch
		})
	});
	if (!res.ok) throw new Error(`GitHub write failed [${res.status}]: ${await res.text()}`);
}
async function ghUploadImage(filename, base64Content, existingSha) {
	const repoPath = `public/images/${filename}`;
	const body = {
		message: `[admin] upload image ${filename}`,
		content: base64Content,
		branch: cfg().branch
	};
	if (existingSha) body.sha = existingSha;
	const res = await fetch(apiUrl(repoPath), {
		method: "PUT",
		headers: ghHeaders(),
		body: JSON.stringify(body)
	});
	if (!res.ok) throw new Error(`GitHub upload failed [${res.status}]: ${await res.text()}`);
	return `/images/${filename}`;
}
async function ghGetSha(path) {
	const res = await fetch(`${apiUrl(path)}?ref=${cfg().branch}`, { headers: ghHeaders() });
	if (res.status === 404) return void 0;
	if (!res.ok) return void 0;
	return (await res.json()).sha;
}
//#endregion
export { ghWriteJson as i, ghReadJson as n, ghUploadImage as r, ghGetSha as t };

import type { AudioToTextResponse } from "../../interfaces";

export const audioToTextCase = async (text: string, audioFile: File) => {
	try {
		const formdata = new FormData();
		formdata.append("file", audioFile);
		formdata.append("prompt", text);

		const req = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
			method: "POST",
			body: formdata,
		});

		if (!req.ok) {
			throw new Error("No se pudo realizar la petición");
		}
		const data = (await req.json()) as AudioToTextResponse;
		console.log(data);
		if (!data) {
			return {
				ok: false,
				message: "No se pudo transcribir el audio",
			};
		}
		return {
			ok: true,
			data,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "No se pudo transcribir el audio",
		};
	}
};

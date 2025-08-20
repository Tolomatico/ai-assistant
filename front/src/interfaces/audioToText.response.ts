export interface AudioToTextResponse {
	languageCode: string;
	languageProbability: number;
	text: string;
	words: Word[];
}

export interface Word {
	text: string;
	start: number;
	end: number;
	type: string;
	speakerId: string;
	logprob: number;
}

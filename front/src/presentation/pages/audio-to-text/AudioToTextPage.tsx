import { useState } from "react";
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxFile } from "../../components";
import { audioToTextCase } from "../../../core/use-cases";

interface Message {
	text: string;
	isGtp: boolean;
}

export function AudioToTextPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const handlePost = async (text: string, audiofile: File) => {
		setIsLoading(true);

		setMessages((prev) => [
			...prev,
			{
				text: `${text} - Nombre del archivo: ${audiofile.name}`,
				isGtp: false,
			},
		]);

		const { ok, data } = await audioToTextCase(text, audiofile);

		if (!ok) {
			setMessages((prev) => [
				...prev,
				{
					text: "Hubo un error al procesar el audio",
					isGtp: true,
				},
			]);
		}
		if (data) {
			setMessages((prev) => [
				...prev,
				{
					text: data.text,
					isGtp: true,
				},
			]);
		}

		setIsLoading(false);
	};

	return (
		<div className="chat-container">
			<div className="chat-messages">
				<div className="grid grid-cols-12 gap-y-2">
					<GptMessage text="Envia un audio para convertirlo en texto" />

					{messages.map((message, index) =>
						message.isGtp ? (
							<GptMessage key={index} text={message.text} />
						) : (
							<MyMessage key={index} text={message.text} />
						)
					)}
					{isLoading && (
						<div className="col-start-1 col-end-12 fade-in">
							<TypingLoader className="fade-in" />
						</div>
					)}
				</div>
			</div>

			<div className="mt-4">
				<TextMessageBoxFile
					onSendMessage={handlePost}
					placeholder="Escribe lo que quieres que el chatbot te responda ..."
					disableCorrections={true}
					accept="audio/*"
				/>
			</div>
		</div>
	);
}

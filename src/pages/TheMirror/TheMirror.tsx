import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/global/Header';

const mockApiResponse = [
  {
    id: 1,
    type: 'text',
    content: 'Hey! How can I help you reflect today?',
    sender: 'bot'
  },
  {
    id: 2,
    type: 'text',
    content: "What's one thing you felt proud of this week?",
    sender: 'bot'
  },
  {
    id: 3,
    type: 'text',
    content: "I'm feeling a bit overwhelmed with work lately.",
    sender: 'user'
  },
  {
    id: 4,
    type: 'text',
    content: "That's okay — it's totally valid. Want me to suggest some grounding techniques?",
    sender: 'bot'
  },
  {
    id: 5,
    type: 'text',
    content: "Why don't you try meditation?",
    sender: 'bot'
  },
  {
    id: 6,
    type: 'text',
    content: 'Yes, that would be nice.',
    sender: 'user'
  },
  {
    id: 7,
    type: 'text',
    content:
      'Try the 4-7-8 breathing technique. It works wonders in stressful moments. Would you like a guided voice version?',
    sender: 'bot'
  }
];

const TheMirror = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [listening, setListening] = useState(false);

  const getChat = () => {
    setMessages(mockApiResponse);
  };

  useEffect(() => {
    // getChat();
  });

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: 'text', content: input, sender: 'user' }]);
    setInput('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setMessages([...messages, { type: 'image', content: imgUrl, sender: 'user' }]);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported!');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessages([...messages, { type: 'text', content: transcript, sender: 'user' }]);
    };

    recognition.start();
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-primary text-text">
        <Header title={'The Mirror'} back={'/home'} />
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 mx-10">
          {messages.length ? (
            messages?.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                } text-xs`}>
                <div
                  className={`max-w-xs rounded-xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-accessible-green text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}>
                  {msg.type === 'text' && msg.content}
                  {msg.type === 'image' && (
                    <img src={msg.content} alt="Uploaded" className="rounded-md m-w-25 h-auto" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-4xl font-bold uppercase text-accessible-green flex w-full justify-center h-full items-center">
              Hello User
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-2 border rounded-xl bg-primary flex items-center gap-2 m-10 ">
          <button
            onClick={handleVoiceInput}
            className="p-2 rounded-md hover:bg-accessible-green bg-card-content">
            🎙️
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-md hover:bg-accessible-green bg-card-content">
            🖼️
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />

          <input
            type="text"
            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accessible-green"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          <button
            onClick={handleSend}
            className="px-4 py-2 bg-accessible-green text-white rounded-md hover:drop-shadow-2xl">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default TheMirror;

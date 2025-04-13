import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/global/Header';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';
import ReactMarkdown from 'react-markdown';

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

interface Chat {
  you: string;
  mirror_you: string;
}

interface ChatHistory {
  chatId: string;
  title: string;
  date: string;
}

// const chatHistory: ChatHistory[] = [
//   {
//     username: 'user',
//     chatid: {
//       chat: [
//         {
//           you: 'Hey Mirror, I had a rough day.',
//           mirror_you: 'I’m here. Want to talk about it?'
//         },
//         {
//           you: 'Yes, work was overwhelming.',
//           mirror_you: 'That sounds tough. Did anything help you get through it?'
//         }
//       ],
//       title: 'Overwhelmed but survived',
//       metadata: { date: new Date('2025-04-10').toString() }
//     }
//   },
//   {
//     username: 'user',
//     chatid: {
//       chat: [
//         {
//           you: 'Guess what, I got promoted!',
//           mirror_you: 'That’s amazing! You totally earned it.'
//         },
//         {
//           you: 'Thanks! It feels surreal.',
//           mirror_you: 'Let that sink in, you’ve worked hard for it.'
//         }
//       ],
//       title: 'The Promotion Day',
//       metadata: { date: new Date('2025-04-07').toString() }
//     }
//   },
//   {
//     username: 'user',
//     chatid: {
//       chat: [
//         {
//           you: 'I feel lonely today.',
//           mirror_you: 'I’m with you. Want to reflect on why?'
//         },
//         {
//           you: 'Maybe I just need some rest.',
//           mirror_you: 'That’s completely okay. Be gentle with yourself.'
//         }
//       ],
//       title: 'A quiet evening alone',
//       metadata: { date: new Date('2025-03-28').toString() }
//     }
//   },
//   {
//     username: 'user',
//     chatid: {
//       chat: [
//         {
//           you: 'Had a fun road trip with friends!',
//           mirror_you: 'That’s awesome! Any special memories?'
//         },
//         {
//           you: 'We sang loudly to 90s hits!',
//           mirror_you: 'Those moments are priceless. Keep them close.'
//         }
//       ],
//       title: 'The road trip vibes',
//       metadata: { date: new Date('2025-03-15').toString() }
//     }
//   }
// ];

const TheMirror = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Chat[]>([]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [listening, setListening] = useState(false);

  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string>();
  const [newChatId, setNewChatId] = useState<string>();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { user, isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      getAllChats();
      console.log('User is authenticated');
    } else if (!isLoading && !isAuthenticated) {
      console.log('User is not authenticated');
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  const getChatsByID = async () => {
    try {
      const response = await axios.get(`/api/${user?.email}/${selectedChatId}`);
      if (response.status === 200) {
        setMessages(response?.data?.data?.chats);
      }
    } catch (error) {
      console.error('Error fetching chats by id', error);
    }
  };

  useEffect(() => {
    if (selectedChatId) {
      getChatsByID();
      setNewChatId(selectedChatId);
    }
  }, [selectedChatId]);

  const createNewSession = async () => {
    try {
      const response = await axios.get(`/api/${user?.email}/new-chat`);
      if (response.status === 200) {
        if (response?.data?.success) {
          setNewChatId(response?.data?.chatId);
        } else {
          createNewSession();
        }
      }
    } catch (error) {}
  };

  const getAllChats = async () => {
    try {
      const response = await axios.get(`/api/${user?.email}/all-chats`);
      if (response.status === 200) {
        if (response?.data?.success) {
          setChatHistory(response?.data?.data);
        } else {
          createNewSession();
        }
      }
    } catch (error) {
      console.error('Error fetching all chats', error);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { you: input, mirror_you: '' }]);
    setInput('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files?.[0];
    // if (file) {
    //   const imgUrl = URL.createObjectURL(file);
    //   setMessages([...messages, { type: 'image', content: imgUrl, sender: 'user' }]);
    // }
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
      setMessages([...messages, { you: transcript, mirror_you: '' }]);
    };
    recognition.start();
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-primary text-text">
        <div className="sticky top-0 bg-primary">
          <Header title={'The Mirror'} back={'/home'} />
        </div>
        <div className="flex w-full h-full">
          {/* History */}
          <div className="chatHistory w-[15%] border-r flex flex-col grow">
            <div className="text-xl py-4 px-2 font-bold bg-accessible-green flex items-center justify-center border-b">
              Chat History
            </div>
            {chatHistory &&
              chatHistory?.map((item) => (
                <div
                  className="p-2 text-sm flex flex-col border-b hover:bg-accessible-green hover:cursor-pointer"
                  onClick={() => setSelectedChatId(item.chatId)}>
                  <div className="font-medium overflow-hidden text-ellipsis whitespace-nowrap truncate">
                    <ReactMarkdown>{item.title}</ReactMarkdown>
                  </div>
                  <div className="text-xs font-thin">
                    {new Date(item.date).toString().slice(0, 15)}
                  </div>
                </div>
              ))}
          </div>
          <div className="chatContainer flex flex-col flex-grow justify-around w-full h-full overflow-y-hidden p-2">
            {/* Chat Messages */}
            <div className="chatArea flex-1 overflow-y-auto px-4 py-6 space-y-4 mx-8 max-h-[90%] thin-scrollbar">
              {messages.length ? (
                messages?.map((msg, index) => (
                  <>
                    <div key={index} className={`flex ${'justify-end'} text-xs`}>
                      <div
                        className={`max-w-2xl rounded-xl px-4 py-2 ${'bg-accessible-green text-white'}`}>
                        {msg.you}
                        <ReactMarkdown>{msg.you}</ReactMarkdown>
                        {/* {msg.type === 'image' && (
                          <img
                            src={msg.content}
                            alt="Uploaded"
                            className="rounded-md m-w-25 h-auto"
                          />
                        )} */}
                      </div>
                    </div>
                    <div key={index} className={`flex ${'justify-start'} text-xs`}>
                      <div
                        className={`max-w-2xl rounded-xl px-4 py-2 ${'bg-gray-200 text-gray-900'}`}>
                        {/* {msg.mirror_you} */}
                        <ReactMarkdown>{msg.mirror_you}</ReactMarkdown>

                        {/* {msg.type === 'image' && (
                          <img
                            src={msg.content}
                            alt="Uploaded"
                            className="rounded-md m-w-25 h-auto"
                          />
                        )} */}
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <div className="text-4xl font-bold uppercase text-accessible-green flex w-full justify-center h-full items-center">
                  Hello User
                </div>
              )}
              <div ref={bottomRef} /> {/* 👈 This is the scroll target */}
            </div>

            {/* Input Area */}
            <div className="chatInput sticky bottom-0 p-2 border rounded-xl bg-primary flex items-center gap-2 mx-8">
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
        </div>
      </div>
    </>
  );
};

export default TheMirror;

// pages/merlin.tsx
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Seo from '@/shared/layout-components/seo/seo';
import Pageheader from '@/shared/layout-components/page-header/pageheader';
import Image from 'next/image';
import ProductsOverviewTable from './components/ui-elements/ProductsOverviewTable';

const suggestedPrompts = [
  "Productos con mayor tasa de conversión en enero",
  "Muéstrame el desempeño de los recomendados",
  "Categorías con más conversiones"
];


const Merlin = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const hasMounted = useRef(false);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMounted.current) {
      const stored = localStorage.getItem('merlinMessages');
      if (stored) setMessages(JSON.parse(stored));
      hasMounted.current = true;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('merlinMessages', JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleDeleteProduct = (id: number) => {
    setRecommendedProducts(prev => prev.filter(product => product.id !== id));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/chat-productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input }),
      });

      const data = await response.json();
      const assistantMessage = { type: 'bot', text: data.content };

      setMessages((prev) => [...prev, assistantMessage]);
      if (data.products) setRecommendedProducts(data.products);
    } catch (error) {
      setMessages((prev) => [...prev, { type: 'bot', text: '⚠️ Error al comunicarse con Merlin.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => setInput(prompt);

  return (
    <Fragment>
      <Seo title="Merlin" />
      <Pageheader currentpage="MerlinCatalogos" activepage="Pages" mainpage="MerlinCatalogos" />

      <div className="grid grid-cols-12 gap-x-6 min-h-[600px]">
        <div className="xl:col-span-4 col-span-12 flex flex-col">
          <div className="box flex-1 flex flex-col">
            <div className="box-body p-6 flex flex-col flex-1">
              <h1 className="text-2xl font-bold mb-4 text-center">¿Con qué puedo ayudarte?</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    className="bg-gray-200 dark:bg-white/10 text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-4 mb-4 overflow-y-auto max-h-[300px] scrollbar-thin pr-2">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 ${msg.type === 'user' ? 'self-end flex-row-reverse' : ''}`}
                  >
                    <Image
                      src={msg.type === 'user'
                        ? '/user-avatar.png'
                        : 'https://storage.googleapis.com/lala4/store/files/fav-merlin-1-1721681703043.png'}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className={`rounded-lg px-4 py-2 text-sm max-w-[80%] ${msg.type === 'user'
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="self-start flex items-center gap-2 text-sm text-gray-500 dark:text-white/50">
                    <Image src="https://storage.googleapis.com/lala4/store/files/fav-merlin-1-1721681703043.png" alt="ai" width={32} height={32} className="rounded-full" />
                    <div className="italic animate-pulse">Merlin está escribiendo...</div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
              <form onSubmit={handleSubmit} className="mt-auto">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ingresa tu consulta en lenguaje natural"
                    className="flex-1 px-4 py-2 text-sm border rounded-lg dark:bg-white/10 dark:text-white"
                  />
                  <button type="submit" className="p-2 rounded-full bg-primary text-white">
                    <i className="ri-arrow-up-line"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="xl:col-span-8 col-span-12">
          <ProductsOverviewTable
            products={recommendedProducts}
            onDeleteProduct={handleDeleteProduct}
          />

        </div>
      </div>
    </Fragment>
  );
};

Merlin.layout = "Contentlayout";
export default Merlin;


{/** 
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Seo from '@/shared/layout-components/seo/seo';
import Pageheader from '@/shared/layout-components/page-header/pageheader';
import Image from 'next/image';
import ProductsOverviewTable from './components/ui-elements/ProductsOverviewTable';

const suggestedPrompts = [
  "Productos con mayor tasa de conversión en enero",
  "Muéstrame el desempeño de los recomendados",
  "Categorías con más conversiones"
];

const Merlin = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const hasMounted = useRef(false);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMounted.current) {
      const stored = localStorage.getItem('merlinMessages');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
      hasMounted.current = true;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('merlinMessages', JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const response = await fetch("/api/ask-merlin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();
    setMessages((prev) => [...prev, { type: "bot", text: data.reply }]);
    setLoading(false);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <Fragment>
      <Seo title="Merlin" />
      <Pageheader currentpage="MerlinCatalogos" activepage="Pages" mainpage="MerlinCatalogos" />

      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-span-4 col-span-12">
          <div className="box">
            <div className="box-body p-6 flex flex-col">
              <h1 className="text-2xl font-bold mb-4 text-center">¿Con qué puedo ayudarte?</h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    className="bg-gray-200 dark:bg-white/10 text-sm px-3 py-1 rounded-full hover:bg-primary hover:text-white transition"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-4 mb-4 overflow-y-auto max-h-[300px] scrollbar-thin pr-2">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 ${msg.type === 'user' ? 'self-end flex-row-reverse' : ''}`}
                  >
                    <Image
                      src={msg.type === 'user' ? '/user-avatar.png' : 'https://storage.googleapis.com/lala4/store/files/fav-merlin-1-1721681703043.png'}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div
                      className={`rounded-lg px-4 py-2 text-sm max-w-[80%] ${msg.type === 'user'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white'
                        }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="self-start flex items-center gap-2 text-sm text-gray-500 dark:text-white/50">
                    <Image src="https://storage.googleapis.com/lala4/store/files/fav-merlin-1-1721681703043.png" alt="ai" width={32} height={32} className="rounded-full" />
                    <div className="italic animate-pulse">Merlin está escribiendo...</div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={handleSubmit} className="mt-auto">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ingresa tu consulta en lenguaje natural"
                    className="flex-1 px-4 py-2 text-sm border rounded-lg dark:bg-white/10 dark:text-white"
                  />
                  <button type="submit" className="p-2 rounded-full bg-primary text-white">
                    <i className="ri-arrow-up-line"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="xl:col-span-8 col-span-12">
          <ProductsOverviewTable />
        </div>
      </div>
    </Fragment>
  );
};

Merlin.layout = "Contentlayout";

export default Merlin;
*/}
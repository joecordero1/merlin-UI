// pages/components/merlin.tsx

import React, { useState } from 'react';
import Seo from '@/shared/layout-components/seo/seo';
import Pageheader from '@/shared/layout-components/page-header/pageheader';

const Merlin = () => {
  const [messages, setMessages] = useState([
    {
      type: 'user',
      text: 'Productos con mayor tasa de conversión en enero'
    },
    {
      type: 'bot',
      text: `En enero se identificaron tres recomendaciones que destacaron por su alta tasa de conversión. Estos productos son:
"Super Combo 1", en la categoría Hogar obtuvo una tasa de conversión del 27%,
"Smart TV Silvania 40 pulgadas", en la categoría Electrónicos obtuvo una tasa de conversión 24%,
"Juego de mesa BASTA", en la categoría Familiar obtuvo una tasa de conversión del 19%`
    }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulación de respuesta (puedes reemplazar esto con la llamada real a la IA)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: `Todavía no tengo una respuesta real para: "${input}".` }
      ]);
    }, 1000);
    setInput('');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Seo title={"Merlin"} />
      <Pageheader currentpage="Merlin" activepage="Pages" mainpage="Merlin" />

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md min-h-[400px] flex flex-col">
        <h1 className="text-2xl font-bold mb-4 text-center">¿Con qué puedo ayudarte?</h1>

        <div className="flex flex-col gap-4 mb-4 overflow-y-auto max-h-[300px]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`rounded-lg px-4 py-2 text-sm max-w-[90%] ${
                msg.type === 'user'
                  ? 'self-end bg-blue-100 text-blue-900'
                  : 'self-start bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white'
              }`}
            >
              {msg.text}
            </div>
          ))}
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
  );
};

Merlin.layout = "Contentlayout";

export default Merlin;

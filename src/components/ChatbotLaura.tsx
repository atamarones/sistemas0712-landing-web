import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Función para generar session ID único
const generateSessionId = (): string => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);
  const browserFingerprint = navigator.userAgent.slice(0, 10).replace(/[^a-zA-Z0-9]/g, '');
  return `laura_${timestamp}_${randomNum}_${browserFingerprint}`;
};

const ChatbotLaura: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => {
    // Verificar si ya existe un session ID en localStorage
    const existingSessionId = localStorage.getItem('laura_session_id');
    if (existingSessionId) {
      return existingSessionId;
    }
    // Si no existe, generar uno nuevo y guardarlo
    const newSessionId = generateSessionId();
    localStorage.setItem('laura_session_id', newSessionId);
    return newSessionId;
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy Laura, tu Asistente Personal de IA de Sistemas0712. ¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    }).toUpperCase();
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Llamada al webhook de n8n
      const response = await fetch('https://aima-n8n.t2qzji.easypanel.host/webhook/chatbot-website-0712', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          sender_id: sessionId,
          session_id: sessionId,
          platform: 'website',
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          page_url: window.location.href
        })
      });

      let responseText = 'Disculpa, estoy teniendo problemas técnicos. Por favor, intenta de nuevo en unos momentos.';
      
      if (response.ok) {
        try {
          const data = await response.json();
          console.log('n8n Response:', data); // Debug log
          
          // Handle different response formats from n8n
          if (typeof data === 'string') {
            responseText = data;
          } else if (data.response) {
            responseText = data.response;
          } else if (data.message) {
            responseText = data.message;
          } else if (data.text) {
            responseText = data.text;
          } else if (data.ai_response) {
            responseText = data.ai_response;
          } else if (data.reply) {
            responseText = data.reply;
          } else if (data.answer) {
            responseText = data.answer;
          } else if (data.output) {
            responseText = data.output;
          } else if (Array.isArray(data) && data.length > 0) {
            // Handle array response
            const firstItem = data[0];
            responseText = firstItem.response || firstItem.message || firstItem.text || responseText;
          } else {
            // Log the actual response structure for debugging
            console.log('Unexpected response format:', data);
            responseText = JSON.stringify(data).length > 200 ? 
              'Recibí tu mensaje y lo estoy procesando.' : 
              JSON.stringify(data);
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          // Try to get response as text
          const textResponse = await response.text();
          responseText = textResponse || responseText;
        }
      } else {
        console.error('HTTP Error:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error details:', errorText);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling webhook:', error);
      
      let errorText = 'Lo siento, no puedo responder en este momento. Por favor, intenta más tarde o contacta con nuestro equipo.';
      
      // Provide more specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorText = 'No puedo conectarme al servidor en este momento. Verifica tu conexión a internet e intenta de nuevo.';
      } else if (error instanceof SyntaxError) {
        errorText = 'Hubo un problema procesando la respuesta. Por favor, intenta de nuevo.';
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50 group hover:scale-110"
          aria-label="Abrir chat con Laura"
        >
          <img 
            src="/robot_icon.jpg" 
            alt="Robot IA Laura" 
            className="w-6 h-6 filter brightness-0 invert"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <div className="absolute -top-12 right-0 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            ¡Chatea con Laura! 🤖
          </div>
        </button>
      )}

      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col border border-gray-200">
          {/* Header del chat */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <img 
                  src="/laura_ai_avatar.jpg" 
                  alt="Laura AI"
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling!.classList.remove('hidden');
                  }}
                />
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm hidden">
                  L
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Laura - IA Sistemas0712</h3>
                <p className="text-xs opacity-90">🤖 Asistente Personal de IA</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start space-x-2 max-w-[85%]">
                  {!message.isUser && (
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">L</span>
                    </div>
                  )}
                  <div>
                    <div
                      className={`px-3 py-2 rounded-lg text-sm ${
                        message.isUser
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                      }`}
                    >
                      {message.text}
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                  {message.isUser && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">U</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">L</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg rounded-bl-sm px-3 py-2 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex items-center space-x-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje a Laura..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                style={{ maxHeight: '60px', minHeight: '36px' }}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg p-2 transition-colors"
                aria-label="Enviar mensaje"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 flex items-center justify-center">
              <span>0/{inputText.length}</span>
              <span className="mx-2">•</span>
              <span>🔥 Powered by Sistemas0712 AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotLaura;

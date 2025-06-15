import React, { useState, useEffect } from 'react';
import ChatbotLaura from './components/ChatbotLaura';
import './App.css';

// Declaración de tipos para HubSpot
declare global {
  interface Window {
    hbspt: any;
  }
}

function App() {
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({ 0: true });

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Cargar script de HubSpot
  useEffect(() => {
    // Verificar si el script ya está cargado
    const existingScript = document.querySelector('script[src="https://js.hsforms.net/forms/embed/49761257.js"]');
    if (existingScript) {
      // Si ya existe, intentar crear el form directamente
      if (window.hbspt && window.hbspt.forms) {
        try {
          window.hbspt.forms.create({
            region: "na1",
            portalId: "49761257", 
            formId: "82d4dcc9-ad04-43b4-a294-1742cb53a088",
            target: "#hubspot-form-container",
            onFormReady: function() {
              console.log('HubSpot form loaded successfully');
            },
            onFormSubmit: function() {
              console.log('HubSpot form submitted');
            }
          });
        } catch (error) {
          console.error('Error creating HubSpot form:', error);
        }
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/49761257.js';
    script.async = true; // Use async instead of defer for faster loading
    
    script.onload = () => {
      console.log('HubSpot script loaded');
      // Wait a bit to ensure hbspt is fully available
      setTimeout(() => {
        if (window.hbspt && window.hbspt.forms) {
          try {
            window.hbspt.forms.create({
              region: "na1",
              portalId: "49761257",
              formId: "82d4dcc9-ad04-43b4-a294-1742cb53a088",
              target: "#hubspot-form-container",
              onFormReady: function() {
                console.log('HubSpot form created and ready');
              },
              onFormSubmit: function() {
                console.log('HubSpot form submitted successfully');
              },
              onFormSubmitted: function() {
                console.log('HubSpot form submission completed');
              }
            });
          } catch (error) {
            console.error('Error creating HubSpot form:', error);
          }
        } else {
          console.error('HubSpot forms API not available');
        }
      }, 500);
    };
    
    script.onerror = () => {
      console.error('Failed to load HubSpot script');
    };
    
    document.body.appendChild(script);

    return () => {
      // Cleanup: remover script al desmontar
      const scriptToRemove = document.querySelector('script[src="https://js.hsforms.net/forms/embed/49761257.js"]');
      if (scriptToRemove) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, []);

  // Eliminar widgets MiniMax
  useEffect(() => {
    const removeMiniMaxElements = () => {
      // Lista de selectores para elementos MiniMax
      const miniMaxSelectors = [
        '[data-testid*="minimax"]',
        '[class*="minimax"]', 
        '[id*="minimax"]',
        'iframe[src*="minimax"]',
        '[class*="MiniMax"]',
        '[id*="MiniMax"]',
        '.minimax-widget',
        '.minimax-agent'
      ];

      miniMaxSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          element.remove();
        });
      });

      // Buscar elementos que contengan texto "MiniMax" o "Created by"
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        const text = element.textContent || '';
        if (text.includes('Created by MiniMax') || 
            text.includes('MiniMax Agent') ||
            text.includes('Created by MiniMax Agent')) {
          element.remove();
        }
      });
    };

    // Ejecutar inmediatamente
    removeMiniMaxElements();

    // Ejecutar cada 2 segundos para elementos que aparezcan dinámicamente
    const interval = setInterval(removeMiniMaxElements, 2000);

    // Observer para detectar nuevos elementos
    const observer = new MutationObserver(removeMiniMaxElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img src="/logo-sistemas0712.png" alt="Sistemas0712" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-900">
                Sistemas0712 Marketing Digital + IA
              </span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <button onClick={() => scrollToSection('inicio')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Inicio
              </button>
              <button onClick={() => scrollToSection('metodologia-dual')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Metodología
              </button>
              <button onClick={() => scrollToSection('transformacion')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Transformación
              </button>
              <button onClick={() => scrollToSection('testimonios-dual')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Testimonios
              </button>
              <button onClick={() => scrollToSection('oferta-exclusiva')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Oferta
              </button>
              <button onClick={() => scrollToSection('contact-form')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Contacto
              </button>
            </nav>
            <button 
              onClick={() => scrollToSection('contact-form')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Consulta Gratuita
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium mb-6">
                🚀 La Nueva Era del Marketing Digital
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Duplica Tus Ventas con{' '}
                <span className="text-blue-600">Meta Ads</span> +{' '}
                <span className="text-green-500">Inteligencia Artificial</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                La única agencia que combina campañas de Meta optimizadas con agentes de IA que automatizan todo tu embudo de ventas
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">2x</div>
                  <div className="text-sm text-gray-600">Ventas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">400%</div>
                  <div className="text-sm text-gray-600">ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500">24/7</div>
                  <div className="text-sm text-gray-600">Sistema</div>
                </div>
              </div>
              
              <button 
                onClick={() => scrollToSection('contact-form')}
                className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Quiero Duplicar Mis Ventas
              </button>
            </div>
            <div className="flex justify-center">
              <img 
                src="/hero_ai_workflow.png" 
                alt="AI Workflow Sistema Dual"
                className="max-w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Metodología Dual */}
      <section id="metodologia-dual" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ⚡ LA METODOLOGÍA DUAL ⚡
            </h2>
            <p className="text-xl text-gray-600">
              El único sistema que combina Meta Ads profesionales con IA conversacional
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Meta Ads Service */}
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-900">Meta Ads Profesionales</h3>
                <p className="text-blue-700">Campañas optimizadas para máximo ROI</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Investigación de audiencias avanzada</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Creativos de alta conversión</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Optimización continua con IA</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Reportes detallados semanales</span>
                </li>
              </ul>
              
              <button 
                onClick={() => scrollToSection('contact-form')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Quiero Mis Meta Ads
              </button>
            </div>

            {/* IA Automatización Service */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🤖</span>
                </div>
                <h3 className="text-2xl font-bold text-green-900">IA Automatización</h3>
                <p className="text-green-700">Agentes inteligentes que nunca duermen</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Chatbot conversacional 24/7</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Calificación automática de leads</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Seguimiento inteligente por WhatsApp</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Integración CRM automática</span>
                </li>
              </ul>
              
              <button 
                onClick={() => scrollToSection('contact-form')}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Quiero Mi IA Personal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Transformación */}
      <section id="transformacion" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tu Transformación Completa
            </h2>
            <p className="text-xl text-gray-600">
              De la frustración al éxito con nuestro Sistema Dual
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Before */}
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <div className="text-center mb-6">
                <span className="text-6xl mb-4 block">😔</span>
                <h3 className="text-2xl font-bold text-red-900">ANTES: Problemas Constantes</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-700">Anuncios que no convierten</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-700">Leads que no responden</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-700">Seguimiento manual agotador</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-700">ROI negativo constante</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-700">Tiempo perdido en tareas repetitivas</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <div className="text-center mb-6">
                <span className="text-6xl mb-4 block">🚀</span>
                <h3 className="text-2xl font-bold text-green-900">DESPUÉS: Éxito Automatizado</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Anuncios optimizados con IA</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Leads cualificados automáticamente</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">IA que nunca para de vender</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">ROI del 400% garantizado</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">Sistema 100% automatizado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Exclusiva */}
      <section id="oferta-exclusiva" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🔥 OFERTA EXCLUSIVA 🔥
            </h2>
            <p className="text-xl text-gray-600">
              El Sistema Dual completo por tiempo limitado
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-8 border-2 border-blue-200">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Sistema Dual: Meta Ads + IA
              </h3>
              <p className="text-lg text-gray-600">
                Todo lo que necesitas para duplicar tus ventas
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-4">📊 Meta Ads Profesionales</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Setup completo de campañas</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">5 creativos de alta conversión</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Investigación de audiencias</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Landing page optimizada</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Reportes semanales detallados</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-green-900 mb-4">🤖 IA Automatización</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Chatbot IA conversacional</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Calificación automática de leads</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">WhatsApp Business automatizado</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Integración CRM completa</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Capacitación equipo comercial</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-100 rounded-2xl p-6 border border-yellow-300 mb-8">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-yellow-800 mb-2">
                  🎯 GARANTÍAS INCLUIDAS
                </h4>
                <ul className="text-left space-y-2 max-w-md mx-auto">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">ROI mínimo del 400% o devolvemos tu dinero</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">Soporte 24/7 durante 6 meses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">Resultados visibles en 30 días</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-red-600 font-bold text-lg mb-4">
                ⏰ Solo quedan 3 plazas este mes
              </div>
              <button 
                onClick={() => scrollToSection('contact-form')}
                className="bg-green-500 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-green-600 transition-colors shadow-lg"
              >
                Quiero Mi Sistema Dual YA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios-dual" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-xl text-gray-600">
              Resultados reales de empresas españolas
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Testimonio 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <h4 className="font-bold text-gray-900">Carlos Martínez</h4>
                <p className="text-gray-600">Director Comercial, TechSolutions Madrid</p>
              </div>
              <p className="text-gray-700 mb-6">
                "En 3 meses pasamos de 50 leads mensuales a 380. El sistema de IA califica automáticamente y nuestro equipo solo se centra en cerrar ventas. ROI del 520%."
              </p>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">+620%</div>
                <div className="text-sm text-gray-600">Aumento en leads cualificados</div>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <h4 className="font-bold text-gray-900">María González</h4>
                <p className="text-gray-600">CEO, Reformas Premium Barcelona</p>
              </div>
              <p className="text-gray-700 mb-6">
                "Increíble. El chatbot IA atiende clientes 24/7 y agenda citas automáticamente. Hemos triplicado nuestros presupuestos sin contratar más personal."
              </p>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">3x</div>
                <div className="text-sm text-gray-600">Presupuestos mensuales</div>
              </div>
            </div>

            {/* Testimonio 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
                <h4 className="font-bold text-gray-900">David Ruiz</h4>
                <p className="text-gray-600">Fundador, Clinica Dental Valencia</p>
              </div>
              <p className="text-gray-700 mb-6">
                "La combinación de Meta Ads + IA es brutal. Cada euro invertido nos devuelve 4,2€. El sistema se paga solo y genera beneficio puro."
              </p>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">420%</div>
                <div className="text-sm text-gray-600">ROI comprobado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados Proyectados */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Resultados Proyectados con el Sistema Dual
            </h2>
            <p className="text-xl text-gray-600">
              Lo que puedes esperar en los próximos 90 días
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">180%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Más Leads</div>
              <div className="text-sm text-gray-600">En los primeros 30 días</div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">320%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Conversiones</div>
              <div className="text-sm text-gray-600">A los 60 días</div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">75%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Tiempo Ahorrado</div>
              <div className="text-sm text-gray-600">En gestión de leads</div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">95%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Automatización</div>
              <div className="text-sm text-gray-600">Del proceso comercial</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                💰 Garantía de Devolución Total
              </h3>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Si en 90 días no ves un ROI mínimo del 400%, te devolvemos el 100% de tu inversión. 
                Estamos tan seguros de nuestro Sistema Dual que asumimos todo el riesgo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Resolvemos tus dudas sobre el Sistema Dual
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                question: "¿Cómo funciona exactamente el Sistema Dual?",
                answer: "El Sistema Dual combina nuestras campañas optimizadas de Meta Ads con agentes de IA conversacional. Mientras los anuncios atraen tráfico cualificado, la IA se encarga de calificar leads, responder preguntas y agendar citas 24/7, automatizando completamente tu embudo de ventas."
              },
              {
                question: "¿Cuánto tiempo tarda en verse resultados?",
                answer: "Los primeros resultados son visibles en 7-14 días con el tráfico de Meta Ads. La IA comienza a calificar leads desde el día 1. El ROI completo se materializa entre 30-60 días según el sector."
              },
              {
                question: "¿Qué garantías ofrecen?",
                answer: "Garantizamos un ROI mínimo del 400% en 90 días o devolvemos el 100% de tu inversión. Además, incluimos soporte 24/7 durante 6 meses y optimización continua de las campañas."
              },
              {
                question: "¿Funciona para cualquier tipo de negocio?",
                answer: "El Sistema Dual está optimizado para empresas B2B y B2C que vendan servicios o productos de valor medio-alto (>500€). Funciona especialmente bien en sectores como consultoría, reformas, salud, educación y tecnología."
              },
              {
                question: "¿Necesito conocimientos técnicos para usar el sistema?",
                answer: "No necesitas conocimientos técnicos. Nosotros configuramos todo el sistema y capacitamos a tu equipo. La IA funciona automáticamente y tú solo recibes leads cualificados listos para cerrar."
              },
              {
                question: "¿Cuál es la inversión mínima requerida?",
                answer: "La inversión mínima incluye el setup del Sistema Dual más presupuesto para Meta Ads. Contacta para una consulta gratuita y evaluaremos el presupuesto óptimo para tu negocio específico."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-2xl text-gray-500">
                    {faqOpen[index] ? '−' : '+'}
                  </span>
                </button>
                {faqOpen[index] && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                ¿Listo para Duplicar Tus Ventas?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Agenda tu consulta gratuita y descubre cómo el Sistema Dual puede transformar tu negocio
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Análisis gratuito de tu negocio</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Estrategia personalizada Meta Ads + IA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Proyección de ROI para tu sector</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Sin compromiso, solo valor</span>
                </div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <p className="text-red-700 font-semibold">
                  ⚠️ Solo atendemos 3 nuevos clientes por mes para garantizar resultados excepcionales
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Consulta Gratuita de 30 Minutos
              </h3>
              
              {/* Formulario HubSpot */}
              <div id="hubspot-form-container" className="hubspot-form-container">
                <div className="hs-form-frame" data-region="na1" data-form-id="82d4dcc9-ad04-43b4-a294-1742cb53a088" data-portal-id="49761257"></div>
              </div>
              
              <p className="text-sm text-gray-600 text-center mt-4">
                📞 Te llamamos en menos de 24 horas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo-sistemas0712.png" alt="Sistemas0712" className="h-8 w-auto" />
                <span className="text-lg font-bold">Sistemas0712</span>
              </div>
              <p className="text-gray-400">
                La única agencia que combina Meta Ads con Inteligencia Artificial para duplicar tus ventas.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Meta Ads Profesionales</li>
                <li>IA Automatización</li>
                <li>Sistema Dual Completo</li>
                <li>Consultoria Estratégica</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre Nosotros</li>
                <li>Casos de Éxito</li>
                <li>Blog</li>
                <li>Contacto</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@sistemas0712.com</p>
                <p>📱 +34 600 123 456</p>
                <p>📍 Madrid, España</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sistemas0712. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot Laura */}
      <ChatbotLaura />
    </div>
  );
}

export default App;

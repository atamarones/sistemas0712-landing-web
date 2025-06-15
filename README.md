# Sistemas0712 Landing Page

## 🚀 Landing Page Profesional para Marketing Digital + IA

Landing page completo con chatbot Laura integrado y formularios HubSpot para generar leads cualificados.

## ✨ Características

- **Chatbot Laura**: IA conversacional conectada a webhook personalizado
- **Formularios HubSpot**: Integración directa para captura de leads
- **Diseño Responsive**: Optimizado para móvil, tablet y desktop  
- **Navegación Suave**: Scroll automático entre secciones
- **FAQ Interactivo**: Sistema de acordeón expandible
- **Performance Optimizada**: Carga rápida y experiencia fluida

## 🛠️ Tecnologías

- **React 18.3** + TypeScript
- **Tailwind CSS** para estilos
- **Vite** como build tool
- **Lucide React** para iconos

## 🚀 Instalación y Uso Local

### Prerrequisitos
- Node.js 18+ instalado
- npm o pnpm

### 1. Clonar e Instalar
```bash
# Clonar el proyecto
git clone [tu-repositorio]
cd sistemas0712-landing-clone

# Instalar dependencias
npm install
# o
pnpm install
```

### 2. Desarrollo Local
```bash
# Iniciar servidor de desarrollo
npm run dev
# o
pnpm dev

# El sitio estará disponible en: http://localhost:5173
```

### 3. Build de Producción
```bash
# Generar build optimizado
npm run build
# o
pnpm build

# Preview del build
npm run preview
# o
pnpm preview
```

## ⚙️ Configuración

### Chatbot Laura
El chatbot está configurado para conectarse al webhook:
```
https://aima-n8n.t2qzji.easypanel.host/webhook/chatbot-website-0712
```

Para cambiar la URL del webhook, edita:
```typescript
// src/components/ChatbotLaura.tsx
const response = await fetch('TU_NUEVA_URL_WEBHOOK', {
  // ...configuración
});
```

### Formulario HubSpot
El formulario está configurado con:
- **Portal ID**: 49761257
- **Form ID**: 82d4dcc9-ad04-43b4-a294-1742cb53a088

Para cambiar la configuración, edita:
```html
<!-- En App.tsx -->
<div 
  className="hs-form-frame" 
  data-region="na1" 
  data-form-id="TU_FORM_ID" 
  data-portal-id="TU_PORTAL_ID"
></div>
```

## 📂 Estructura del Proyecto

```
src/
├── components/
│   └── ChatbotLaura.tsx     # Componente del chatbot
├── App.tsx                  # Componente principal
├── App.css                  # Estilos personalizados
├── main.tsx                 # Punto de entrada
└── vite-env.d.ts           # Tipos de TypeScript

public/
├── logo-sistemas0712.png    # Logo de la empresa
├── hero_ai_workflow.png     # Imagen principal
└── laura_ai_avatar.jpg      # Avatar del chatbot
```

## 🎨 Personalización

### Colores
Los colores principales están definidos en Tailwind:
- **Verde**: `#22C55E` (CTAs, elementos positivos)
- **Azul**: `#3B82F6` (navegación, tecnología)
- **Amarillo**: `#FDE047` (destacados)
- **Rojo**: `#EF4444` (urgencia)

### Contenido
Para modificar textos, edita directamente `App.tsx`:
- Títulos y subtítulos
- Testimonios
- Estadísticas
- CTAs y botones

### Estilos
- **Tailwind CSS**: Clases utilitarias en componentes
- **App.css**: Estilos personalizados y animaciones

## 🤖 Chatbot Laura

### Funcionalidades
- ✅ Interfaz conversacional moderna
- ✅ Integración con webhook N8N
- ✅ Respuestas dinámicas en tiempo real
- ✅ Indicador de escritura
- ✅ Historial de conversación
- ✅ Responsive y accesible

### Personalización del Chatbot
```typescript
// src/components/ChatbotLaura.tsx

// Cambiar mensaje inicial
const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    text: 'Tu mensaje personalizado aquí',
    isUser: false,
    timestamp: new Date()
  }
]);

// Cambiar configuración del webhook
const response = await fetch('TU_WEBHOOK_URL', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: inputText,
    sender_id: 'web_user',
    platform: 'website',
    // Agregar campos personalizados
    custom_field: 'valor'
  })
});
```

## 📊 SEO y Analytics

### Meta Tags Incluidos
- Title optimizado
- Description para redes sociales
- Open Graph tags
- Keywords relevantes

### Para Agregar Analytics
```html
<!-- En index.html, antes del </head> -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🚀 Deployment

### Netlify
```bash
# Build del proyecto
npm run build

# El directorio 'dist' contiene los archivos para deployment
```

### Vercel
```bash
# Conectar con Vercel CLI
vercel --prod
```

### Servidor Propio
```bash
# Build de producción
npm run build

# Servir archivos estáticos desde /dist
```

## 🔧 Comandos Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción  
npm run preview      # Preview del build
npm run lint         # Linting con ESLint
npm run type-check   # Verificación de TypeScript
```

## 📞 Soporte y Contacto

- **Email**: info@sistemas0712.com
- **Teléfono**: +34 600 123 456
- **Web**: [sistemas0712.com]

## 📄 Licencia

© 2024 Sistemas0712. Todos los derechos reservados.

---

**🚀 ¡Tu landing page está listo para generar leads y duplicar ventas!**

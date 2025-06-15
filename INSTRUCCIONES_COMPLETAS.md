# 📖 INSTRUCCIONES COMPLETAS - Sistemas0712 Landing Page

## 🚀 **CORRECCIONES IMPLEMENTADAS**

### ✅ **1. Chatbot - Respuestas Mejoradas**
- **Problema:** Respuestas genéricas a pesar de n8n funcionando
- **Solución:** Mejorado el parsing de respuestas para manejar múltiples formatos de n8n
- **Cambios:** Agregados logs de debugging y manejo robusto de diferentes tipos de respuesta

### ✅ **2. Formulario HubSpot - Integración Corregida**
- **Problema:** Datos no llegaban a HubSpot
- **Solución:** Mejorada la carga del script y agregados callbacks de debugging
- **Cambios:** Implementados eventos `onFormReady`, `onFormSubmit`, `onFormSubmitted`

### ✅ **3. Icono Robot en Chatbot**
- **Problema:** Icono genérico de chat
- **Solución:** Agregado icono de robot personalizado con efectos visuales
- **Cambios:** Reemplazado MessageCircle por imagen de robot con filtros CSS

### ✅ **4. Package Completo para Desarrollo**
- **Contenido:** Código fuente completo, configuraciones, assets, documentación
- **Optimización:** Excluidos archivos innecesarios para reducir tamaño

---

## 🌐 **ENLACES DE ACCESO**

### **Landing Page Actualizado:**
- **URL:** https://d9p8fdm5tb.space.minimax.io
- **Cambios aplicados:** Todas las 4 correcciones implementadas y verificadas

---

## 💻 **INSTALACIÓN Y CONFIGURACIÓN LOCAL**

### **📋 Requisitos Previos**
```bash
Node.js >= 18.0.0
npm >= 9.0.0 (o pnpm >= 8.0.0)
Git (opcional)
```

### **🔧 Paso a Paso - Ambiente Local**

#### **1. Descargar y Extraer**
```bash
# Descargar el ZIP del proyecto
# Extraer en tu directorio de trabajo
cd /ruta/a/tu/proyecto/sistemas0712-landing-clone
```

#### **2. Instalar Dependencias**
```bash
# Opción A: usando npm
npm install

# Opción B: usando pnpm (recomendado)
pnpm install
```

#### **3. Configurar Variables de Entorno (Opcional)**
```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env

# Editar .env con tus configuraciones
# VITE_HUBSPOT_PORTAL_ID=49761257
# VITE_HUBSPOT_FORM_ID=82d4dcc9-ad04-43b4-a294-1742cb53a088
# VITE_N8N_WEBHOOK_URL=https://aima-n8n.t2qzji.easypanel.host/webhook/chatbot-website-0712
```

#### **4. Ejecutar en Desarrollo**
```bash
# Modo desarrollo (hot reload)
npm run dev
# o
pnpm dev

# El sitio estará disponible en: http://localhost:5173
```

#### **5. Compilar para Producción**
```bash
# Generar build optimizado
npm run build
# o
pnpm build

# Los archivos estarán en ./dist/
```

#### **6. Vista Previa del Build**
```bash
# Previsualizar build local
npm run preview
# o
pnpm preview

# Vista previa en: http://localhost:4173
```

---

## 🌐 **DESPLIEGUE EN HOSTINGER**

### **📋 Preparación**
1. **Acceso a cPanel:** Necesitas acceso al panel de control de Hostinger
2. **Dominio configurado:** Tu dominio debe estar apuntando a Hostinger
3. **Build generado:** Debes tener los archivos de `./dist/` listos

### **🔧 Paso a Paso - Hostinger**

#### **1. Generar Build de Producción**
```bash
# En tu proyecto local
cd sistemas0712-landing-clone
npm run build
# o
pnpm build
```

#### **2. Preparar Archivos**
```bash
# Comprimir contenido de dist/ (opcional)
cd dist
zip -r ../hostinger-deploy.zip ./*
```

#### **3. Subir a Hostinger**
```
1. Acceder a cPanel de Hostinger
2. Ir a "Administrador de Archivos" o "File Manager"
3. Navegar a la carpeta "public_html" (o la carpeta de tu dominio)
4. Eliminar archivos existentes (index.html, etc.)
5. Subir TODOS los archivos de la carpeta dist/:
   - index.html
   - assets/ (carpeta completa)
   - *.jpg, *.png (imágenes)
   - use.txt (si existe)
```

#### **4. Configurar Permisos**
```
- Archivos: 644
- Carpetas: 755
- index.html: 644 (principal)
```

#### **5. Verificar Funcionamiento**
```
1. Acceder a tu dominio
2. Verificar que el sitio carga correctamente
3. Probar el formulario HubSpot
4. Probar el chatbot con n8n
5. Verificar imágenes y recursos
```

---

## 🛠 **CONFIGURACIONES ADICIONALES**

### **🔧 HubSpot Configuration**
```javascript
// En src/App.tsx, líneas 32-46
// Personalizar según tu cuenta HubSpot
window.hbspt.forms.create({
  region: "na1",                    // Tu región
  portalId: "49761257",             // Tu Portal ID
  formId: "82d4dcc9-ad04-43b4-a294-1742cb53a088", // Tu Form ID
  target: "#hubspot-form-container"  // Contenedor del form
});
```

**Configurar en HubSpot:**
1. Ir a Marketing > Forms
2. Configurar dominio permitido
3. Agregar tu dominio a las URLs permitidas
4. Verificar el Form ID y Portal ID

### **🤖 n8n Webhook Configuration**
```javascript
// En src/components/ChatbotLaura.tsx, líneas 77-89
// URL del webhook configurada
const webhookUrl = 'https://aima-n8n.t2qzji.easypanel.host/webhook/chatbot-website-0712';

// Datos enviados al webhook
{
  message: inputText,
  sender_id: sessionId,
  session_id: sessionId,
  platform: 'website',
  timestamp: new Date().toISOString(),
  user_agent: navigator.userAgent,
  page_url: window.location.href
}
```

**Configurar en n8n:**
1. Webhook debe leer el campo `session_id`
2. Responder con formato JSON: `{response: "texto"}`
3. Configurar CORS si es necesario

---

## 🚨 **TROUBLESHOOTING**

### **❌ Problemas Comunes**

#### **1. Formulario HubSpot no funciona**
```bash
# Verificar en consola del navegador:
# 1. ¿Se carga el script de HubSpot?
# 2. ¿Aparecen errores de CORS?
# 3. ¿El Form ID es correcto?

# Solución: Verificar en HubSpot que el dominio está permitido
```

#### **2. Chatbot no responde**
```bash
# Verificar en Network tab del navegador:
# 1. ¿Se envía la petición al webhook?
# 2. ¿Qué respuesta llega del webhook?
# 3. ¿Hay errores de CORS?

# Solución: Verificar que n8n está funcionando y responde correctamente
```

#### **3. Imágenes no cargan**
```bash
# En Hostinger:
# 1. Verificar que las imágenes se subieron
# 2. Verificar permisos de archivos (644)
# 3. Verificar rutas en el código

# Solución: Re-subir imágenes o corregir rutas
```

#### **4. Estilos rotos**
```bash
# 1. Verificar que la carpeta assets/ se subió completa
# 2. Verificar que el archivo CSS está presente
# 3. Verificar rutas relativas en index.html

# Solución: Re-subir la carpeta assets/ completa
```

---

## 📞 **SOPORTE Y MANTENIMIENTO**

### **🔍 Debug Mode**
```javascript
// Activar logs de debugging en consola
// Las respuestas de n8n aparecerán en console.log
// Los eventos de HubSpot también se registran
```

### **📊 Monitoring**
```bash
# Verificar funcionamiento periódico:
1. Formulario envía datos a HubSpot
2. Chatbot responde correctamente
3. Imágenes cargan sin problemas
4. Performance de la página
```

### **🔄 Actualizaciones**
```bash
# Para actualizar el sitio:
1. Hacer cambios en el código local
2. Ejecutar: npm run build
3. Subir nuevos archivos de dist/ a Hostinger
4. Verificar funcionamiento
```

---

## 📁 **ESTRUCTURA DEL PROYECTO**

```
sistemas0712-landing-clone/
├── public/                 # Archivos estáticos
│   ├── robot_icon.jpg     # Icono del chatbot
│   ├── logo-sistemas0712.png
│   └── ...
├── src/                   # Código fuente
│   ├── components/        # Componentes React
│   │   ├── ChatbotLaura.tsx  # Chatbot principal
│   │   └── ui/           # Componentes UI
│   ├── App.tsx           # Componente principal
│   ├── App.css           # Estilos globales
│   └── main.tsx          # Punto de entrada
├── dist/                 # Build de producción
├── package.json          # Dependencias
├── vite.config.ts       # Configuración Vite
└── README.md            # Documentación
```

---

## 🎯 **CHECKLIST FINAL**

### **✅ Verificación Post-Despliegue**
- [ ] Sitio web carga correctamente
- [ ] Formulario HubSpot visible y funcional
- [ ] Chatbot abre con icono de robot
- [ ] Chatbot envía y recibe mensajes
- [ ] Todas las imágenes cargan
- [ ] Estilos aplicados correctamente
- [ ] Responsive design funciona
- [ ] Console sin errores críticos

### **⚙️ Configuraciones Pendientes**
- [ ] Configurar dominio en HubSpot
- [ ] Verificar webhook n8n
- [ ] Configurar SSL si es necesario
- [ ] Configurar analytics (opcional)

---

**🏆 ¡Tu landing page está listo para generar conversiones!**

Para soporte técnico adicional, verificar los logs de consola del navegador y contactar al equipo de desarrollo.
# 🔌 CONFIGURACIÓN DE N8N - Sachet Strategy 360

Esta guía te permite conectar el formulario de contacto con **n8n**, **Google Sheets** y **Gmail** para recibir notificaciones por email y guardar los prospectos.

---

## 📋 REQUISITOS PREVIOS

1. ✅ Cuenta en [n8n.cloud](https://n8n.io) (o instalación propia)
2. ✅ Cuenta de Google (Gmail)
3. ✅ Acceso a Google Sheets

---

## 🚀 PASOS DE CONFIGURACIÓN

### Paso 1: Configurar Google Sheets

1. **Crea una nueva hoja de cálculo** en Google Sheets
2. **Nombra la primera pestaña** como "Contactos" 
3. **Agrega los encabezados** en la primera fila:
   - A1: `name` (Nombre)
   - B1: `email` (Email)
   - C1: `interest` (Interés)
   - D1: `fecha` (Fecha)
   - E1: `url` (URL)
4. **Copia el ID** de la URL del sheet:
   ```
   https://docs.google.com/spreadsheets/d/ESTE-ES-EL-ID/edit
   ```
   El ID es: `ESTE-ES-EL-ID`

### Paso 2: Configurar Gmail en n8n

1. Inicia sesión en n8n
2. Ve a **Settings** → **Credentials**
3. **Crea nueva credencial** → Busca "Google Gmail"
4. Inicia sesión con tu cuenta de Google
5. Guarda la credencial

### Paso 3: Configurar Google Sheets en n8n

1. En **Credentials**, crea nueva credencial
2. Busca "Google Sheets"
3. Inicia sesión con tu cuenta de Google
4. Guarda la credencial

### Paso 4: Importar el Workflow

1. En n8n, haz clic en **Import from File**
2. Selecciona el archivo `n8n-workflow.json`
3. **Edita los nodos** para configurar:
   
   **Google Sheets:**
   - Sheet ID: Pega el ID de tu Google Sheet
   - Table range: `A1` (deja vacío para detectar automáticamente)
   
   **Gmail (2 nodos):**
   - From Email: Tu email de Gmail
   - To Email (notificación a ti): Tu email
   - To Email (confirmación al cliente): `{{ $json.email }}`

4. **Activa el workflow** (toggle en la esquina superior derecha)
5. **Copia la URL del webhook** (clic en el nodo Webhook para ver la URL)

### Paso 5: Conectar la Web

1. Abre `script.js` en tu proyecto
2. Busca la línea:
   ```javascript
   const N8N_WEBHOOK_URL = 'https://tu-servidor-n8n.com/webhook/sachet-contacto';
   ```
3. **Reemplaza** la URL con tu webhook de n8n:
   ```javascript
   const N8N_WEBHOOK_URL = 'https://tu-usuario.n8n.cloud/webhook/sachet-contacto';
   ```

---

## 📊 ESTRUCTURA DE DATOS EN GOOGLE SHEETS

| name | email | interest | fecha | url |
|------|-------|----------|-------|-----|
| Juan Pérez | juan@email.com | kits | 2026-03-11T... | https://sachet360.com |
| María López | maria@email.com | consultoria | 2026-03-11T... | https://sachet360.com |

---

## 📧 EMAILS QUE SE ENVIARÁN

### Email a ti (notificación):
```
Asunto: Nueva solicitud de cotización - Sachet Strategy 360

Nombre: Juan Pérez
Email: juan@email.com
Interés: Kits Estratégicos
Fecha: 2026-03-11T15:30:00.000Z
```

### Email de confirmación al cliente:
```
Asunto: Gracias por contactarnos - Sachet Strategy 360

¡Gracias por contactarnos, Juan!

Hemos recibido tu solicitud de cotización. 
Nuestro equipo te contactará en menos de 24 horas.

Detalles enviados:
Interés: Kits Estratégicos

Atentamente,
Equipo Sachet Strategy 360
```

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### El formulario no envía
- Verifica que el workflow esté **activado** en n8n
- Copia la URL del webhook correctamente
- Revisa la consola del navegador (F12) para ver errores

### No llega el email
- Verifica las credenciales de Gmail en n8n
- Asegúrate de que el email del cliente sea válido
- Revisa la carpeta de spam

### No se guarda en Google Sheets
- Verifica que el Sheet ID sea correcto
- Asegúrate de tener permisos de edición
- Revisa que las credenciales estén activas

---

## 📁 ARCHIVOS INCLUIDOS

- `n8n-workflow.json` - Workflow para importar
- `script.js` - Actualizado con integración n8n
- `styles.css` - Actualizado con notificaciones

---

## 💾 NOTAS

- El formulario envía los datos: `name`, `email`, `interest`, `fecha`, `url`
- El campo `interest` puede ser: `kits`, `consultoria`, `campana`, `otro`
- El workflow guarda todo en Google Sheets y envía 2 emails (uno a ti, uno al cliente)

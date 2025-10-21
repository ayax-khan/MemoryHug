# Past + Present Studio

Create beautiful, emotional memories by merging your childhood and current photos into one stunning image.

![Past + Present Studio](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Dual Upload System**: Intuitive drag-and-drop interface for childhood and current photos
- **Real-time Preview**: See your photos instantly before generation
- **Multiple Styles**: Choose from Classic, Cinematic, Vintage, or Photoreal rendering
- **Advanced Controls**: Fine-tune blend amount, opacity, background treatment, and lighting
- **Before/After Comparison**: Interactive slider to compare original photos with merged result
- **Download & Share**: Save your memory or share it directly from the app
- **Fully Responsive**: Beautiful experience on mobile, tablet, and desktop
- **Accessible**: WCAG-compliant with keyboard navigation and screen reader support
- **Privacy-First**: Photos processed securely with clear privacy messaging

## 🎨 Design Highlights

- **Color Palette**: 
  - Primary: Teal/Cyan (#0ea5a4)
  - Accent: Warm Orange (#fb923c)
  - Background: Off-white (#f8fafc)
- **Typography**: Poppins for headings, Inter for body text
- **UI Elements**: Soft shadows, rounded corners, smooth animations
- **Mobile-First**: Responsive grid layout that adapts beautifully

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- FastAPI backend running (see Backend Setup below)

### Frontend Setup

1. **Clone or download** this repository

2. **Update API endpoint** in `app.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8000'; // Change to your backend URL
   ```

3. **Open in browser**:
   - Simply open `index.html` in your browser, or
   - Use a local server (recommended):
     ```bash
     # Python
     python -m http.server 8080
     
     # Node.js
     npx serve
     
     # PHP
     php -S localhost:8080
     ```

4. **Access the app**:
   ```
   http://localhost:8080
   ```

### Backend Setup

The frontend expects a FastAPI backend with the following endpoint:

**Endpoint**: `POST /api/generate`

**Form Data**:
- `childhood_photo`: File (PNG/JPG, max 10MB)
- `current_photo`: File (PNG/JPG, max 10MB)
- `style`: String (classic|cinematic|vintage|photoreal)
- `blend`: Integer (0-100)
- `opacity`: Integer (0-100)
- `background`: String (original|blur|replace)
- `light_match`: Boolean

**Response**: Image file (PNG/JPG)

**Error Response**:
```json
{
  "detail": "Error message"
}
```

## 📂 Project Structure

```
FuturePlusPresent/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with responsive design
├── app.js              # JavaScript functionality
├── README.md           # This file
└── package.json        # Project metadata (optional)
```

## 🎯 Usage Guide

### 1. Upload Photos

- **Childhood Photo**: Drag & drop or click to select your childhood photo
- **Current Photo**: Upload your recent photo
- **Supported formats**: PNG, JPG, JPEG (max 10MB each)
- **Best results**: Front-facing photos with good lighting

### 2. Configure Settings

- **Style**: Select rendering style (Classic, Cinematic, Vintage, Photoreal)
- **Advanced Options** (optional):
  - Blend Amount: Control how photos merge (0-100)
  - Opacity: Adjust transparency (0-100)
  - Background: Keep original, blur, or replace
  - Light Match: Automatically match lighting between photos

### 3. Generate

- Click **Generate Memory** button
- Wait 8-15 seconds while AI processes your images
- Progress indicator shows real-time status

### 4. View & Share

- **Tabs**: Switch between Merged, Before, and After views
- **Compare**: Use interactive slider to see before/after
- **Caption**: Add a custom message for sharing
- **Actions**:
  - **Download**: Save as PNG
  - **Share**: Share via native share or copy link
  - **Retry**: Generate again with different settings

## 🔧 Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #0ea5a4;
    --accent: #fb923c;
    --bg: #f8fafc;
    /* ... */
}
```

### API Endpoint

Update in `app.js`:

```javascript
const API_BASE_URL = 'https://your-backend.com';
```

### Fonts

Change fonts in `index.html` and `styles.css`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont" rel="stylesheet">
```

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Privacy & Security

- Photos are sent to backend only when generating
- No client-side storage of images (cleared on page unload)
- All processing happens server-side
- Users are informed about temporary storage
- Share feature requires explicit user permission

## ⚡ Performance

- Lightweight: ~50KB total (HTML + CSS + JS)
- No dependencies: Pure vanilla JavaScript
- Optimized images: Progressive loading
- Responsive: Adapts to any screen size
- Smooth animations: GPU-accelerated CSS

## 🐛 Troubleshooting

### Issue: Generate button stays disabled
**Solution**: Ensure both photos are uploaded and under 10MB

### Issue: API errors
**Solution**: Check backend is running and API_BASE_URL is correct

### Issue: Share not working
**Solution**: Share API requires HTTPS or localhost; fallback copies link

### Issue: Images not displaying
**Solution**: Check browser console for CORS errors; enable CORS on backend

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Credits

- Design: Inspired by modern photo editing apps
- Icons: Inline SVG icons for performance
- Fonts: Google Fonts (Inter, Poppins)

## 📧 Support

For issues or questions, please:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify backend is running correctly

## 🚧 Roadmap

- [ ] Image cropping/alignment tool
- [ ] Multiple photo pairs support
- [ ] Save history (with account)
- [ ] Social media direct posting
- [ ] PWA support with offline mode
- [ ] More style presets
- [ ] Batch processing

---

**Made with ❤️ for preserving memories**

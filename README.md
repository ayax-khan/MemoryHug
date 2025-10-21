# 🤗 MemoryHug

**AI-powered photo merging web app - Create beautiful memories by merging your past and present photos!**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://memoryhug.vercel.app)
[![Backend API](https://img.shields.io/badge/API-Hugging%20Face-yellow)](https://huggingface.co/spaces/zeroday-00/past-present-backend)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 🌟 Features

- 📸 **Dual Photo Upload** - Upload childhood and current photos
- 🎨 **AI-Powered Merging** - Intelligent photo blending with face detection
- 🎭 **Multiple Styles** - Classic, Cinematic, Vintage, Photoreal
- ⚙️ **Advanced Controls** - Blend amount, opacity, background effects
- 👀 **Before/After Comparison** - Interactive slider
- 📥 **Download & Share** - Save or share your memories
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- ♿ **Accessible** - WCAG compliant with keyboard navigation

## 🏗️ Project Structure

```
MemoryHug/
├── frontend-files/          # Frontend (HTML/CSS/JS)
│   ├── index.html          # Main page
│   ├── app.js              # JavaScript logic
│   ├── styles.css          # Styling
│   └── config.js           # Configuration
│
├── backend/                # Backend API (FastAPI)
│   ├── app.py              # Main FastAPI app
│   ├── config.py           # Configuration
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Docker configuration
│   ├── utils/              # Image processing utilities
│   └── models/             # AI model integration
│
└── README.md               # This file
```

## 🚀 Quick Start

### **Frontend (Local)**

```bash
# Clone repository
git clone https://github.com/ayax-khan/MemoryHug.git
cd MemoryHug/frontend-files

# Open in browser
# Simply open index.html in your browser
# OR use a local server:
python -m http.server 8080
# Visit: http://localhost:8080
```

### **Backend (Local)**

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python app.py
# API will run at: http://localhost:7860
```

### **Full Stack Local Development**

1. Start backend (port 7860)
2. Update frontend `config.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:7860';
   ```
3. Open frontend in browser

## 🌐 Live Deployment

### **Frontend**: Vercel
- Auto-deploys from `main` branch
- Live at: https://memoryhug.vercel.app

### **Backend**: Hugging Face Spaces
- Deployed as Docker container
- API at: https://zeroday-00-past-present-backend.hf.space

## 🛠️ Tech Stack

### **Frontend**
- HTML5, CSS3 (Modern)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, Poppins)

### **Backend**
- **Framework**: FastAPI (Python)
- **Image Processing**: Pillow, OpenCV
- **Face Detection**: Haar Cascade (CPU-friendly)
- **AI Model**: Stable Diffusion (optional, fallback blending default)
- **Deployment**: Docker on Hugging Face Spaces

## 📋 Requirements

### **Frontend**
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)

### **Backend**
- Python 3.10+
- Dependencies in `backend/requirements.txt`

## 🎨 How It Works

1. **Upload** - User uploads childhood and current photos
2. **Face Detection** - OpenCV detects faces in both images
3. **Feature Extraction** - Extract face embeddings
4. **AI Merging** - Generate merged image (AI model or fallback blend)
5. **Post-Processing** - Apply lighting match, effects, opacity
6. **Download** - User downloads or shares the result

## 🔧 Configuration

### **Frontend**
Edit `frontend-files/app.js`:
```javascript
const API_BASE_URL = 'YOUR_BACKEND_URL';
```

### **Backend**
Edit `backend/config.py`:
```python
TARGET_SIZE = (512, 512)  # Image processing size
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB limit
```

## 🐛 Troubleshooting

### Face Not Detected
- Use clear, front-facing photos
- Ensure good lighting
- Image should be at least 256x256 pixels

### CORS Errors
- Backend allows all origins by default
- For production, update CORS settings in `backend/app.py`

### Slow Processing
- Fallback blending: ~2-5 seconds (CPU)
- With AI model: ~5-15 seconds (GPU recommended)

## 📝 License

MIT License - Free for personal and commercial use

## 🙏 Acknowledgments

- Face detection: OpenCV Haar Cascades
- Fonts: Google Fonts (Inter, Poppins)
- Icons: Custom SVG icons

## 👨‍💻 Author

**Ayax Khan** - [GitHub](https://github.com/ayax-khan)

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues for solutions

---

**Made with ❤️ for preserving memories**

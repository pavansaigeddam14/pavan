# Pavansai - Mechanical Engineer 3D Portfolio

A stunning, interactive 3D portfolio website built with React, Three.js, and Vite for Pavansai, showcasing mechanical engineering expertise through immersive visual elements.

## 🎨 Features

- **Interactive 3D Scene**: Animated gears, pistons, and mechanical elements that respond to mouse movement
- **Modern UI/UX**: Sleek dark theme with cyan accent colors (#00d4ff)
- **Responsive Design**: Works on all screen sizes
- **Professional Navigation**: Smooth section transitions
- **Skills Display**: Floating badges showcasing key competencies
- **Stats Counter**: Highlights experience and achievements
- **Bloom Effects**: Post-processing for a polished, modern look
- **Auto-rotating Camera**: Dynamic 3D scene exploration

## 🚀 Technologies Used

- **React** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **React Three Postprocessing** - Post-processing effects
- **Vite** - Fast build tool and dev server

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run dev
```
The site will be available at `http://localhost:5173` (or next available port)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎯 Customization Guide

### Update Personal Information
Edit `src/App.jsx`:
- Change the name "PAVANSAI" in the hero section
- Modify the tagline "MECHANICAL ENGINEER"
- Update skills in the Skills Badge section
- Adjust stats (Years Experience, Projects Completed, Happy Clients)

### Color Scheme
The primary colors used are:
- Primary Cyan: `#00d4ff`
- Accent Red: `#ff6b6b`
- Background: `#0a0a0a`

To change colors, search and replace these hex codes in `src/App.jsx`.

### 3D Elements
The portfolio features:
- **Gears**: Representing mechanical precision
- **Pistons**: Symbolizing engine/mechanical systems
- **Blueprint Grid**: Technical drawing aesthetic
- **Stars**: Space/innovation theme

To modify 3D elements, edit the component functions in `src/App.jsx`:
- `Gear()` - Customize gear appearance
- `Piston()` - Modify piston animation
- `BlueprintGrid()` - Adjust grid size/density
- `Scene()` - Arrange 3D objects

### Adding More Sections
To add new sections (About, Projects, Contact):
1. Create new section components
2. Add navigation buttons
3. Implement scroll/hide logic
4. Consider using react-router for multi-page navigation

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration (auto-generated)
├── src/
│   ├── main.jsx        # React entry point
│   └── App.jsx         # Main application component
└── README.md           # This file
```

## 🌐 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm install -g gh-pages
npm run build
gh-pages -d dist
```

## 🎨 Design Philosophy

This portfolio embodies:
- **Precision**: Clean lines and geometric shapes reflecting engineering accuracy
- **Innovation**: Modern 3D graphics and animations
- **Professionalism**: Minimalist design with purposeful interactions
- **Mechanical Theme**: Gears, pistons, and technical elements throughout

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

*Note: WebGL support required for 3D features*

## 🔧 Troubleshooting

### 3D not rendering?
- Check browser console for errors
- Ensure WebGL is enabled
- Try a different browser

### Performance issues?
- Reduce star count in `<Stars>` component
- Lower bloom intensity
- Simplify geometry details

### Port already in use?
Vite automatically finds the next available port (5173, 5174, 5175, etc.)

## 📄 License

This project is open source and available under the ISC License.

## 👨‍💻 Author

**Pavansai** - Mechanical Engineer

---

**Built with ❤️ and ⚙️ for the engineering community**

<div align="center" style="border:1px solid #ccc; padding:16px; border-radius:8px;">
  <h2>🖼️ Image Processor - Image processing Website</h2>
  <p>
    Image Processor is an image processing application that converts, resizes,
      compresses images, creates PDFs, and adds watermarks.
  </p>
  <a href="https://somyimageprocessor.netlify.app/">➥ Live Demo</a>
</div>
<div>
  <br/>
  <div>
    <h3>Demo Screenshots</h3>
   <img 
    src="https://github.com/user-attachments/assets/bf4740fd-4ed8-4e43-aa60-7957b58071ad"
    alt="Image Processor Demo"
    width="750"
    style="border-radius:12px;"
  />
  </div>
  <br/>
  <div>
    <h3 style="border:1px solid #ccc; border-radius:8px;"> 🚀 Features</h3>
    <hr>
    <ul>
      <li>
 🖼️ Convert images to multiple formats
      </li>
      <li>
📏 Resize images easily
      </li>
      <li>
 🗜️ Compress images without quality loss 
      </li>
      <li>
 📄 Create PDF from images 
      </li>
      <li>
 💧 Add watermark to images 
      </li>
      <li>
        ✂️ Crop images with real-time preview
      </li>
      <li>
         🔄 Rotate images instantly
      </li>
      <li>
        ⚡ Real-time updates during image processing
      </li>
    </ul>
  </div>
  <br/>
    <h3>🛠️ Tech Stack</h3>
  <hr/>
  <div>
    <h3>🎨 Frontend</h3>
  <ul>
          <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="20" alt="React JS"/> React JS</li>
    <li>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="20" alt="Tailwind CSS"/> Tailwind CSS
          </li>
    <li>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg" width="20" alt="Redux toolkit"/> Redux Toolkit
          </li>
    <li>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg" width="20" alt="Axios" /> Axios
          </li>
  </ul>
     <h3>🚀 Backend</h3>
    <ul>
      <li>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" width="20" alt="Node JS" /> Node JS
          </li>
<li>
            <img src="https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo-thumbnail.png" width="20" /> Express JS
          </li>
      <li><img src="https://sharp.pixelplumbing.com/_astro/sharp-logo.CiVIswaO.svg" width="20" alt="Sharp"/> Sharp</li>
      <li><img src="https://www.archiverjs.com/img/logo.svg" width="20" alt="Archiever"/> Archiever</li>
      <li>⚡Server Side Events(SSE)</li>
    </ul>
  </div>
  <br/>
      <h3>📦 Installation & Run</h3>
  <hr/>
  <span>
   <h4>
     1️⃣ Clone the repository</h4>

 ```bash
git clone https://github.com/somy275/Image_Processor_Pro.git
cd Image_Processing
```
</span>
<span>
<h4>2️⃣ Install dependencies</h4>
<h5>Backend</h5>

```bash
cd backend
npm install
npm install nodemon --save-dev
```
<h5>Frontend</h5>

```bash
cd ../frontend
npm install
```
</span>
<span>
  <h4>3️⃣ Environment Variables (if required)</h4>
  <h5>Create a .env file in the backend folder:</h5>

  ```env
PORT=5000
```
</span>
<span>
  <h4>▶️ Run Frontend & Backend Together</h4>
  <h5>Step 1: Backend package.json</h5>
  <h6>Update backend/package.json:</h6>
  
  ```json
  {
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```
<h5>Step 2: Root package.json</h5>
<h6>Create or update root package.json:</h6>

```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd backend && npm run dev",
    "client": "cd frontend && npm run dev"
  },
  "devDependencies": {
    "concurrently": "^9.2.1"
  }
}
```
<h6>Install concurrently in root:</h6>

```bash
npm install concurrently --save-dev
```
<h5>Step 3: Run both servers</h5>
<h6>From the root directory:</h6>

```bash
npm run dev
```
</span>
<br/>
<div>
  <h3>📁 Folder Structure</h3>
  <hr/>
  
  ```bash
Image_Processing/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── features/
│   │   │   └── slices/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── UI/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .gitignore
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── .gitignore
├── package.json
└── package-lock.json

```
</div>
<br/>
<span>
  <h3>License</h3>
  <hr/>
  <h4>This project is free to use and does not contains any license.</h4>
</span>
<div/>


  
  


# Enterprise HR Workflow Designer

<img width="1920" height="1080" alt="Screenshot 2026-04-22 214930" src="https://github.com/user-attachments/assets/adfc56b5-b41a-4e52-9b4c-8b0c97b91fd5" />

A production-grade, drag-and-drop workflow designer built for HR automation pipelines. 

## 🏗 Architecture & Design Decisions

- **Framework**: React 18 + Vite for lightning-fast compilation and optimized production builds.
- **State Management**: `zustand` is used as a global, un-opinionated store. By coupling it directly with `reactflow` change handlers, we completely eliminate prop-drilling while keeping the React tree clean and reactive.
- **Node System**: The codebase implements a robust, scalable Node system. Adding a new node requires simply adding a definition in `types`, creating a renderer component wrapped in the HOC `NodeRenderer`, and adding its specific settings form.
- **API Mocking**: `msw` (Mock Service Worker) intercepts browser requests. This allows frontend development to proceed completely parallel to backend development, providing a highly realistic network testing environment.
- **Form Architecture**: Fully controlled forms directly tied to the Zustand store, ensuring the `serialize()` hook always generates real-time, accurate JSON representations of the canvas.

## 🚀 How to Run

1. Make sure you have installed the core dependencies:
   ```bash
   npm install reactflow zustand msw tailwindcss
   ```
2. For MSW initialization, run:
   ```bash
   npx msw init public/ --save
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 🛠 What Can Be Improved

1. **Canvas-Integrated Simulation**: Instead of just sidebar logs, nodes will glow and pulse on the canvas as the "execution" passes through them. This makes the simulator feel alive and much easier to debug.
2. **Auto-Persistence**: Your work will automatically save to your browser's local storage. If you accidentally refresh the page or close the tab, your entire layout and configuration will be exactly where you left it.
3. **Pro-Level Navigation**: Adding "Spacebar Panning" and "Select All" (Ctrl+A) shortcuts, which are standard in high-end design tools like Figma or Miro.
4. **Bulk Deletion**: The ability to select multiple nodes and delete them all at once.

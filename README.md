# Enterprise HR Workflow Designer

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

1. **Undo/Redo Stack**: Implement a history stack within the Zustand store to allow standard `Ctrl+Z` / `Cmd+Z` capabilities.
2. **Edge Validation**: Currently validation checks for completely disconnected nodes. It can be enhanced to strictly validate edge directions (e.g. End nodes cannot be sources, Start nodes cannot be targets).
3. **Canvas Minimap & Saving**: Integrate a cloud sync feature allowing users to persist the output of `serialize()` into a database, loading the layout coordinates via `position` object back into ReactFlow.

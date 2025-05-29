# Interactive Web Calculator

**A lightweight, responsive calculator built with vanilla JavaScript, HTML5, and CSS3.**

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Demo & Screenshots](#demo--screenshots)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Detailed File Overview](#detailed-file-overview)
7. [Installation & Setup](#installation--setup)
8. [Usage & Controls](#usage--controls)
9. [Customization & Theming](#customization--theming)
10. [Next Steps & Enhancements](#next-steps--enhancements)
11. [Contributing](#contributing)
12. [License](#license)

---

## Overview

This **Interactive Web Calculator** demonstrates core front-end development skills:

- **DOM Manipulation** using JavaScript
- **Event Handling** for clicks and keyboard input
- **Responsive Design** with CSS Flexbox and Grid
- **Clean Arithmetic Logic** (chaining operations, decimals, clear/reset)

Users can perform basic arithmetic (`+`, `-`, `×`, `÷`), see a live history of operations, and interact via mouse or keyboard. The layout and styling are inspired by Windows 11’s native calculator.

---

## Features

- **Responsive Layout**: Adjusts to different screen sizes, maintains button proportions.
- **Operator History**: Displays the current expression above the main display, clears on new entry.
- **Chained Calculations**: Continue multiple operations without resetting.
- **Precision Control**: Division results trimmed to 5 decimal places, integers shown without trailing zeros.
- **Keyboard Support**: Numeric keypad, `+ - * /`, and `Enter` map to on-screen buttons.
- **Hover & Focus Effects**: Subtle color and elevation changes on hover for improved UX.

---

## Demo & Screenshots

> *(Include GIF or screenshots in your repo / documentation site for visual reference)*

![Calculator Layout](./screenshots/layout.png)
![Hover & Active States](./screenshots/hover.png)

---

## Tech Stack

- **HTML5**: Semantic structure for display, history, operator, and number keys.  
- **CSS3**: Flexbox for vertical stacking, CSS Grid for key layout, transitions for hover effects.  
- **JavaScript (ES6+)**: Clean module-like pattern for state (`calculator` object), functions for input, operator, equals, reset, and formatting.

---

## Project Structure

```
interactive-calculator/
├── index.html       # Markup: history, display, operator & number sections
├── style.css        # Layout, theming, responsive rules, hover/focus states
├── script.js        # Calculator state management, event bindings, formatting
├── README.md        # Project documentation (this file)
```

---

## Detailed File Overview

### `index.html`
- **Containers**: `.calculator`, `.calculator-history`, `.calculator-screen`, `.calculator-body`  
- **Sections**: `.operators` for `/ * - + =`, `.numbers` for `7–9`, `4–6`, `1–3`, `0` spanning full width.
- **Accessibility**: `button` elements; `value` attributes used for both display and JS mapping.

### `style.css`
- **Layout**:
  - `.calculator` uses Flexbox (column) for header → screen → body.  
  - `.calculator-body` splits into two flex children: `.operators` (column) and `.numbers` (grid).
- **Sizing**: fixed pixel dimensions for crisp buttons, with `rem` or `%` possible for full scaling via root font-size.
- **Theming**: distinct color classes for operators (orange), equals (blue), and numbers (light gray).
- **Effects**: `transition` on background and `transform`; `:hover` rules for lift and color shift.

### `script.js`
- **State Object**: holds `displayValue`, `firstOperand`, flags for chaining and reset, current `operator`.  
- **Core Functions**:
  - `updateDisplay()`, `updateHistory()` — sync UI from state.  
  - `inputDigit()`, `handleOperator()`, `handleEqual()`, `resetCalculator()` — update state logic.  
  - `calculate()` — perform raw arithmetic, with division-by-zero guard.
- **Event Binding**:
  - Click listeners on all buttons, routed by CSS classes.  
  - Global `keydown` listener mapping keyboard to button `click()` calls.

---

## Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Emin3mUI/Web-Interactive-Calculator.git
   cd Web-Interactive-Calculator
   ```
2. **Serve locally** (optional)
   - You can open `index.html` directly, or run a simple HTTP server:
     ```bash
     npx serve .
     ```
3. **Open in browser**: navigate to `http://localhost:3000` (or file path) to use the calculator.

---

## Usage & Controls

- **Mouse/Tap**: Click buttons on screen.  
- **Keyboard**: Type numbers `0–9`, `+ - * /`, and press `Enter` for equals.  
- **New Calculation**: After pressing `=`, entering a digit automatically resets history and starts fresh.  

---

## Customization & Theming

- **Scale All**: wrap `.calculator` in a container and use CSS `transform: scale(1.x)` or adjust `zoom`.  
- **Color Scheme**: override CSS variables or replace color values in `style.css` for dark/light mode.
- **Button Size**: switch fixed pixels to `rem` units tied to `html { font-size: ... }` for dynamic scaling.
- **Additional Functions**: add percent, square root, memory keys — extend HTML + JS functions accordingly.

---

## Next Steps & Enhancements

- **Advanced Operations**: `%`, `√`, `x²`, `1/x`.  
- **Memory Registers**: `MC`, `MR`, `M+`, `M-`, `MS`.  
- **History Panel**: persistent log of past calculations.  
- **Accessibility**: ARIA roles, focus outlines, high-contrast themes.  
- **Deployment**: host on GitHub Pages, Netlify, or Vercel for easy sharing.

---

## Contributing

1. **Fork the repo**  2. **Create a feature branch**  3. **Commit your changes**  4. **Open a Pull Request**  

Please include clear descriptions and ensure code follows the existing style.

---

## License

This project is licensed under the **APACHE License**. See APACHE for details.

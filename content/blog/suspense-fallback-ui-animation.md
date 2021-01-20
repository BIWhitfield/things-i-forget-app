---
path: suspense-fallback-animation/index.md
date: 2021-01-20T17:38:37.572Z
title: Suspense Fallback UI Animation
description: Animate a simple svg components' width and height while components
  are lazy loaded
---
#What we get
Basic control of the width and height of the SVG. A setInterval function that count's up and down between a min and max value. Some faff with refs so we don't lose the current values as we re-render. There is probably a much better way to do this.

##SVG Component to animate:

```jsx
import React from "react";

const Home = ({ width, height, opacity }) => {
  return (
  <svg viewBox="0 0 6 6" height={height } width={width }>
    <polygon
      className="b"
      fill="#90a8f7b2"
      fillOpacity={0.83}
      points="6 2 3 0 6 2"
    ></polygon>
    <polygon
      className="e"
      fill="#f1edf1a2"
      fillOpacity={0.33}
      points="0 2 6 4 3 0"
    ></polygon>
    <polygon
      className="f"
      fill="rgb(0, 0, 0)"
      fillOpacity={0.16}
      points="0 2 6 2 3 0"
    ></polygon>
    <polygon
      className="b"
      fill="#90a8f7b2"
      fillOpacity={0.83}
      points="0 2 0 2 6 2"
    ></polygon>
    <polygon
      className="e"
      fill="#f1edf1a2"
      fillOpacity={0.33}
      points="3 6 6 4 6 2"
    ></polygon>
    <polygon
      className="f"
      fill="rgb(0, 0, 0)"
      fillOpacity={0.16}
      points="3 6 3 0 0 4"
    ></polygon>
    <polygon
      className="a"
      fill="rgb(235, 217, 0)"
      fillOpacity={1}
      points="0 2 0 4 0 2"
    ></polygon>
    <polygon
      className="d"
      fill="rgb(149, 126, 165)"
      fillOpacity={0.5}
      points="0 4 3 6 0 4"
    ></polygon>
    <polygon
      className="a"
      fill="rgb(235, 217, 0)"
      fillOpacity={0.1}
      points="0 2 0 2 6 4"
    ></polygon>
    <polygon
      className="d"
      fill="rgb(149, 126, 165)"
      fillOpacity={0.5}
      points="6 4 0 4 0 2"
    ></polygon>
    <polygon
      className="d"
      fill="rgb(149, 126, 165)"
      fillOpacity={0.5}
      points="6 4 6 2 3 0"
    ></polygon>
    <polygon
      className="e"
      fill="#f1edf1a2"
      fillOpacity={0.33}
      points="3 6 6 4 0 2"
    ></polygon>
  </svg>
)};

export default Home;

```

##SuspenseFallback.jsx...

```jsx
import React from "react";

import Home from "../../svg/Home";

import "./suspenseFallback.css";

const SuspenseFallback = () => {
  const step = React.useRef(+1);
  const now = React.useRef(42);
  let min = 42;
  let max = 47;
  const [count, setCount] = React.useState(min);

  React.useEffect(() => {
    const timer = setInterval(function () {
      if (now.current >= max) {
        step.current = -1;
      }
      if (now.current <= min) {
        step.current = +1;
      }
    now.current += step.current;
    setCount(now.current)
    }, 100);
    return () => clearInterval(timer);
  }, [now, max, min]);

  return (
    <div className="suspense-root">
      <Home width={count} height={count} />
    </div>
  );
};

export default SuspenseFallback;

```


##CSS for suspense fallback:

```css
.suspense-root {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
```


##Use in App...

```jsx
import { lazy, Suspense } from "react";

import SuspenseFallback from "./components/common/suspensefallback/SuspenseFallback";

import "./App.css";

const IAmLazyLoaded = lazy(() => import("./components/IAmLazyLoaded"));
const IAmLazyLoadedToo = lazy(() => import("./components/IAmLazyLoadedToo"));


function App() {

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <div className="App">
        <IAmLazyLoaded />
        <IAmLazyLoadedToo />   
      </div>
    </Suspense>
  );
}

export default App;

```
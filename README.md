# what is this?

Malleable fader Carousel, pass children inside as shown in example below, set the delay prop (`default to 8000ms`) to set timeout delay, use the divStyle prop to shape carousel, as of version 1.1.0 there are 2 mode options that can be passed through the `mode` prop, `"fade"` or `"slide"`, default to fade, slide option shown in example.

# Installation

`npm i fade-carousel`

Then...

```
import Carousel from 'fade-carousel';

return (
    <div className="App">
      <Carousel>
        //your custom children elements in here
      </Carousel>
    </div>
  );

```

## Options

3 props with defaults, defaults for wide full screen carousel

| Prop     | Input                 | Default                             |
| -------- | --------------------- | ----------------------------------- |
| divStyle | Style Object          | `{ height: '800px', width: '100%'}` |
| delay    | integer, milliseconds | `8000`                              |
| mode     | string                | `fade`                              |

## Notes on child positioning

The children elements within Carousel are inside a `display: flex` container div, so to center the children for overflowing or underflowing use `alignSelf: center` and `justifySelf: center` or position children how ever you see fit based on your use-case using flex-box item self postitioning.

## Example

```
import React from 'react';
import Carousel from 'fade-carousel'
import './App.css';

function App() {

 const urls= ['image1.jpg', 'image2.jpg', 'image3.jpg'];

 const divStyle = {
    height: "600px",
    width: "100%",
    backgroundColor: '#f2f2f2'
  }
  const imageStyle = {
    height: '100%',
    width: 'auto',
    justifySelf: 'center'
  }
  const hello = () => {
    console.log("hello");
  };

  return (
    <div className="App">
      <Carousel divStyle={divStyle} delay={6000} mode={"slide"} >
        {urls.map((url, index) => (
          <div key={index} style={imageStyle}>
            <img
              src={url}
              style={{ width: "100%", height: "auto" }}
              alt="asdada"
              onClick={hello}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
```

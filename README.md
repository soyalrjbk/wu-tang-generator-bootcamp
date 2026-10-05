# 🎤 &nbsp; Wu-Tang Name Generator

A full-stack name generator that turns your answers to five quick questions — your favorite anime, video game, color, sport and food — into a Wu-Tang-style alias like **"Relentless Saiyan"** or **"Crimson Spartan."** Each pick maps to a word, and the server randomly combines two of them into your new name.

[![Screenshot-2026-10-05-at-1-04-16-AM.png](https://i.postimg.cc/8Pc8MSTG/Screenshot-2026-10-05-at-1-04-16-AM.png)](https://postimg.cc/7bFQrjCt)

## How It's Made:

**Tech used:** 

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 

Node modules: http, fs, url, querystring, and the figlet package

The front end is a simple form of five dropdown menus. When you click **Generate Name**, client-side JavaScript reads each selection and sends them to the server with `fetch()` as query parameters (`/api?anime=...&game=...&color=...&sport=...&food=...`).

The back end is a Node.js server built with the core `http`, `fs`, `url` and `querystring` modules — no Express. It handles routing by hand:

- `/` serves `index.html`
- `/css/style.css`, `/js/main.js` and `/images/background.jpg` serve the static assets with the right `Content-Type` headers
- `/api` holds the name-generating logic and returns JSON
- Any other route returns an ASCII-art **"404!!"** page made with the `figlet` npm package

Inside `/api`, an object maps every possible answer to a Wu-Tang-sounding word (Naruto → "Ninja", Dragon Ball Z → "Saiyan", MMA → "Relentless", Pizza → "Slam", and so on). The server collects the five words matching your answers, picks two at random with `Math.random()`, and sends back `{ "name": "Word Word" }`. The client then drops the result into the page with `textContent`.

## Optimizations

There's room to grow here, and these are the next improvements I'd make:

- **Prevent duplicate words.** Both words are picked independently, so a name like "Ninja Ninja" is possible. Removing the first pick from the array before choosing the second would guarantee two different words.
- **Validate the request.** The `/api` route only checks for the `anime` parameter, so missing or unexpected values would produce `undefined` in the name. Checking all five, and returning a response when the check fails, would make the API more reliable.
- **Handle file errors.** The `fs.readFile` callbacks ignore `err`; returning a 500 response on failure would keep the server from sending empty pages.
- **Refactor the routing.** Each static file has its own `if` block. A single helper that serves files from a lookup of paths and content types — or moving to Express — would cut the repetition.
- **Replace `url.parse()`** with the modern `URL` API, since `url.parse()` is deprecated.

## Lessons Learned:

Building this taught me how a web server works under the hood. Without a framework doing the work for me, I had to handle every route myself — including serving CSS, JavaScript and images with the correct `Content-Type` headers. Seeing a stylesheet fail to load until the server actually knew how to send it made the request/response cycle click.

I also got hands-on practice with the full loop between client and server: collecting user input in the DOM, sending it as query parameters with `fetch()`, parsing those parameters on the server, and returning JSON for the front end to display. Using an object as a lookup table instead of a long chain of `if/else` statements kept the name logic short and easy to extend.

## Installation:

1. Clone the repo: `git clone https://github.com/soyalrjbk/wu-tang-generator-bootcamp.git`
2. Switch to the project branch: `git checkout answer`
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. Open `http://localhost:8000` in your browser

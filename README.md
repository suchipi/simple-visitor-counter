# Simple Visitor Counter Service

## Dependencies

- Node.js (tested with Node.js v20.11.1)

## Installation

```sh
cp .env.example .env
# edit .env as desired
npm install
npm repl
# use the repl to create a counter, ie: db.insert({ name: "my-counter", count: 0 })
# then close the repl with Ctrl+D
npm start
```

## Usage

After creating a counter in the db using the repl (as explained in the [Installation](#installation) section), put this code somewhere in the body of your page:

```html
<script src="http://your-website.example.com/counter/my-counter"></script>
```

(Replace `http://your-website.example.com/` with wherever you host the service.)

The script will replace itself with a text node containing the counter. It's up to you to style it however you desire.

## License

MIT

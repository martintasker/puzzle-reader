# puzzle-reader -- convert from human-convenient markdown into computer-convenient structure

This is a component of the engine used in the [Word Play](http://wordplay.databatix.com) site.

Starting with a source file something like this:

```md
# rubric

<p className="intro">
  Fill in the missing words with the names of food or drink to complete the classic Christmas story. Beware of shocking puns!!
</p>
<p className="hint">
  Allow about 45 minutes. Think Christmassy food, British chocolate brands, Biblical food, and all kinds of ordinary food, ingredients, sauces and drink.
</p>
<p className="copyright">
  By Martin and family, Christmas 2014.
</p>

# puzzle

So Joseph did not **dessert** her.

## section

Far off in Rome, **Caesar, dressing** as he got up one morning, decided to count his people.
He wrote to Quirinius, the governor of Syria: “You’ll do a new census for me: **Yule log** all the population.
Then I’ll know how much my people have **bread** since the last census.”

In Israel, they decided to have each **mango** to his home town to register for the census.
So Joseph went with Mary to Bethlehem, just as her due **date** was approaching.
```

It first converts it into a pure JavaScript object something like this:

```json
{
  "rubric": "<p classname=\"intro\"> ... </p>",
  "puzzle": {
    "puns": ["dessert", "Caesar, dressing", ...],
    "text": [
      {"p": ["So Joseph did not ", {"pun": 0}, " her."]},
      "br",
      {"p": ["Far off in Rome, ", {"pun": 1}, " as he got up one morning, decided ..."]},
      {"p": ["In Israel ...", ...]}
    ]
  }
}
```

Note certain assumptions in this process:

* the text is converted into HTML using a markdown converter; the rubric is then indicated by `<h1>rubric</h1>`, and the puzzle similarly
* within the rubric, HTML is used as-is from the markdown conversion output
* within the puzzle, `<p>...</p>` sections translate into `{p:}` objects with content, while `<h2>section</h2>` sections translate into `"br"` strings
* within the puzzle, `<strong>...</strong>` sections are interpreted as puns; two-word and comma-spaced puns are allowed but nothing more sophisticated than that;
  you shouldn't have two consecutive but different puns; and you can't use bold highlighting as a means of text formatting
* in fact you shouldn't use any other form of markup -- no block markup (lists, quotes, etc), and no inline markup (italics, hyperlinks, etc)

The `rubric` can then be used directly.

The `puzzle` will need to be converted downstream, on the one hand into a suitable state object in which
completion state of individual puns, and the puzzle as a whole, is maintained; and on the other hand into
renderable JSX with the following characteristics:

* the whole thing is a `<div>`
* at top level, the `<div>` is a sequence of `<p>` and `<br/>` elements
* the pure-text children in each paragraph are as-is spans, ensuring that any leading or trailing blanks are included
* the puns are translated into an appropriate `<Pun>` component with the right content

import marked from 'marked';
import React from 'react';

class reader {
  constructor(mdString) {
    this.mdString = mdString;
    const htmlString = marked(mdString);
    const h1Sections = this._geth1Sections(htmlString);
    this.rubric = h1Sections.rubric.join('');
    const puzzleSections = this._getPuzzleSections(h1Sections.puzzle);
    const {puns, cleanParas} = this._extractPuns(puzzleSections);
    this.puzzle = {puns, text: cleanParas};
  };

  _geth1Sections(htmlString) {
    const lines = htmlString.split('\n');
    const output = {rubric: [], puzzle: []};
    var outLabel = "";
    lines.forEach(function(line) {
      if (!line) {
        return;
      }
      var h1Label = ((line) => {
        const rx = /<h1 id=\"(.*)?\".*<\/h1>/
        const matches = line.match(rx);
        if (!matches) {
          return "";
        }
        return matches[1];
      })(line);
      if (h1Label) {
        outLabel = h1Label;
        output[outLabel] = output[outLabel] || [];
        return;
      }
      if (outLabel) {
        output[outLabel].push(line);
      }
    });
    return output;
  }

  _getPuzzleSections(puzzleHTML) {
    const html = puzzleHTML.join(' ');
    const sections = html.split(/<h2.*?section<\/h2>/);
    const paraSections = sections.map(section => section.split(/<\/?p>/).filter(line => line!=="" && line!==" "));
    var res = [];
    for (var i = 0; i<sections.length; ++i) {
      if (i>0) {
        res.push("br");
      }
      paraSections[i].forEach(function(para) {
        res.push({p: para});
      });
    }
    return res;
  }

  _extractPuns(paras) {
    const puns = [];
    const cleanParas = paras.map(function(para) {
      if (typeof para === 'string') {
        return para;
      }
      const rx = /<strong>(.*?)<\/strong>/g;
      const text = para.p;
      const matches = text.match(rx);
      if (!matches) {
        return {p: [text]};
      }
      var res = [];
      const spans = text.split(/<strong>.*?<\/strong>/);
      for (var i=0; i<spans.length; i++) {
        if (i > 0) {
          puns.push((tag => tag.match(/<strong>(.*)<\/strong>/)[1])(matches[i-1]));
          res.push({pun: puns.length - 1});
        }
        if (!!spans[i]) {
          res.push(spans[i]);
        }
      }
      return {p: res};
    });
    return {puns, cleanParas};
  }

  getRubric() {
    return this.rubric;
  }

  getPuzzle() {
    return this.puzzle;
  }
}

const render = (puzzle, punElement, elementOverrides) => {

  const elementDefaults = {div: 'div', br: 'br', p: 'p', span: 'span'};
  const elements = Object.assign(elementDefaults, elementOverrides);

  return React.createElement(elements.div, null, puzzle.text.map(mapLine));

  function mapLine(line, i) {
    if (typeof line === 'string') {
      return React.createElement(elements.br, {key: i});
    }
    var text = line.p;
    if (!text) {
      return null;
    }
    return React.createElement(elements.p, {key: i}, text.map(mapSpan));
  }

  function mapSpan(span, i) {
    if (typeof span === 'string') {
      return React.createElement(elements.span, {key: i}, [span]);
    }
    return React.createElement(punElement, {key: i, pun: puzzle.puns[span.pun], index: span.pun});
  }
}

export default {reader, render};

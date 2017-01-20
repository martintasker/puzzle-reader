import PuzzleReader from './puzzle-reader';

// test data
const DATA = `
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

## section

The rest, you know!

**Drink** to that!
`;

const RUBRIC_MATCH = `
<p className="intro">
  Fill in the missing words with the names of food or drink to complete the classic Christmas story. Beware of shocking puns!!
</p>
<p className="hint">
  Allow about 45 minutes. Think Christmassy food, British chocolate brands, Biblical food, and all kinds of ordinary food, ingredients, sauces and drink.
</p>
<p className="copyright">
  By Martin and family, Christmas 2014.
</p>
`

describe('PuzzleReader.reader', function() {

  // test instance
  var that;

  beforeEach(function() {
    that = new PuzzleReader.reader(DATA);
  });

  describe('initialization', function() {
    it('has public interface', function() {
      expect(typeof that.getRubric).toEqual('function');
      expect(typeof that.getPuzzle).toEqual('function');
    });
    it('has properties', function() {
      expect(typeof that.mdString).toEqual('string');
      expect(typeof that.rubric).toEqual('string');
      expect(typeof that.puzzle).toEqual('object');
      expect(Object.keys(that).length).toEqual(3);
    });
  });

  describe('getRubric()', function() {
    it('has the API', function() {
      expect(typeof that.getRubric).toEqual('function');
    });
    it('actually works', function() {
      const answer = RUBRIC_MATCH.split('\n').join('');
      expect(that.getRubric()).toEqual(answer);
    });
    
  });

  describe('getPuzzle()', function() {
    it('has the API', function() {
      expect(typeof that.getPuzzle).toEqual('function');
    });
    it('actually works', function() {
      const puzzle = that.getPuzzle();
      expect(typeof puzzle).toEqual('object');
      expect(typeof puzzle.text).toEqual('object');
      expect(puzzle.text.length).toEqual(7);
      expect(puzzle.text[0].p.length).toEqual(3);
      expect(typeof puzzle.text[1]).toEqual('string');
      expect(puzzle.text[2].p.length).toEqual(7);
      expect(puzzle.text[3].p.length).toEqual(5);
      expect(typeof puzzle.text[4]).toEqual('string');
      expect(puzzle.text[5].p.length).toEqual(1);
      expect(puzzle.text[6].p.length).toEqual(2);
      expect(typeof puzzle.puns).toEqual('object');
      expect(puzzle.puns.length).toEqual(7);
    });
  });
});

describe('PuzzleReader.render', function() {
  // test instance
  var that;

  beforeEach(function() {
    that = new PuzzleReader.reader(DATA);
  });

  it('converts successfully', function() {
    const Pun = (props => props.pun);
    const c = PuzzleReader.render(that.getPuzzle(), Pun);
    expect(c.type).toEqual('div');
    expect(c.props.children.length).toEqual(7);
    expect(c.props.children[0].type).toEqual('p');
    expect(c.props.children[1].type).toEqual('br');
    expect(c.props.children[2].type).toEqual('p');
    expect(c.props.children[2].props.children[0].type).toEqual('span');
    expect(c.props.children[2].props.children[0].props.children[0]).toEqual('Far off in Rome, ');
    expect(c.props.children[2].props.children[1].type).toEqual(Pun);
    expect(c.props.children[2].props.children[1].props.pun).toEqual('Caesar, dressing');
  });
});

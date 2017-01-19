import PuzzleReader from './puzzle-reader';

describe('PuzzleReader', function() {

  // test data
  var DATA = `
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
  `;

  // test instance
  var that;

  beforeEach(function() {
    that = new PuzzleReader(DATA);
  });

  describe('initialization', function() {
    it('has public interface', function() {
      expect(typeof that.getRubric).toEqual('function');
      expect(typeof that.getPuzzle).toEqual('function');
    });
    it('has properties', function() {
      expect(typeof that.mdString).toEqual('string');
      expect(typeof that.mdString).toEqual('string');
      expect(Object.keys(that).length).toEqual(2);
    });
  });

  describe('getRubric()', function() {
    it('has the API', function() {
      expect(typeof that.getRubric).toEqual('function');
    });
  });

  describe('getPuzzle()', function() {
    it('has the API', function() {
      expect(typeof that.getPuzzle).toEqual('function');
    });
  });
});

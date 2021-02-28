var expect = chai.expect;
//below takes a name of our unit test and the name of the function that facilitates the test
describe('MyFunctions', function() {
    describe('#doSomething', function(){
        it ('should concatenate the two parameters', function() {
            var x = doSomething('Hello', 5);
            expect (x).to.equal('Hello5');
        });
        it('should throw an error if first paramater is not a string', function() {
            expect(function() {
                doSomething(5, 5);
            }).to.throw(Error);
        }); 
    });
});
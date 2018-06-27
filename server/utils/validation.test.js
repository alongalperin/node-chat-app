const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString testing', () => {
    it('should reject non-string values', () =>{
        let result = isRealString(123456);
            
        expect(result).toBe(false);
    });

    it('should reject empty string', () =>{
        let result = isRealString('       ');
            
        expect(result).toBe(false);
    });

    it('should allow string', () =>{
        let result = isRealString('   a    ');
            
        expect(result).toBe(true);
    });
});

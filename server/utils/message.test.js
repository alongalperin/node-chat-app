let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () =>{
        let from = "alon@example";
        let text = "test text";
        let message = generateMessage(from, text);
            
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message).toInclude({from, text});
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = "alon@example";
        let lat = "1";
        let long = "2";
        let message = generateLocationMessage(from, lat,long);

        expect(message.from).toBe(from);
        expect(message.createdAt).toBeA('number');        
        expect(message.url).toBe("https://www.google.com/maps?q=1,2");
    });
});
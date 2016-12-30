import * as assert from 'power-assert';
import {Person} from '../src/Person';

describe('PersonTest', () => {
    it('コンストラクタのテスト', () => {
        const person:Person = new Person(10, 'hiroyky');
        assert.equal(person.id, 10);
        assert.equal(person.name, 'hiroyky');
    });
});
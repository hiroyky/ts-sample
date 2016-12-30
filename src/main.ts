import {Person} from './Person';
import * as $ from 'jquery';

var person: Person = new Person(1, "yoko");
$(() => {
    $('body').html('彼は' + person.name + 'です。');
});
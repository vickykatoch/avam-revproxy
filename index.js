'use strict';
const instruments = [{
    market : 'ESPEED',
    id: '2_YEAR.ESPEED',
    alias : '2_YEAR',
    destination: 'algo1'
},{
    market : 'ESPEED',
    id: '3_YEAR.ESPEED',
    alias : '3_YEAR',
    destination: 'algo1'
},{
    market : 'BTEC',
    id: '5_YEAR.BTEC',
    alias : '5_YEAR',
    destination: 'algo2'
},{
    market : 'BTEC',
    id: '7_YEAR.BTEC',
    alias : '7_YEAR',
    destination: 'algo2'
}];


function filterFunc (ins) {
    return ins.alias === '2_YEAR';
};
function stringifyFunc(fn) {
    JSON.stringify(fn,(key,value)=> {
        debugger;
        if(value instanceof Function) {
            value.toString();
        }
        console.log(arguments.length);
        console.log(key);
    });
}
function Test(mkt, id) {
    const filter = (ins)=> ins.id === id;
    console.log(stringifyFunc(filter));
    let filterString = filter.toString();
    console.log(arguments.length);
    filterString =filterString.replace('id',JSON.stringify(id));
    // filterString += JSON.stringify(mkt);
    
    console.log(filterString);
    const filteredIns = instruments.filter(filter);
    console.log(filteredIns);
}

Test('BTEC','3_YEAR.ESPEED');
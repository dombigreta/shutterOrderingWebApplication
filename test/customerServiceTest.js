const mocha = require('mocha');
const assert = require('chai').assert;
const sinon = require('sinon');



const CustomerService = require('../app/services/customerService');
const CustomerId = '5ccf084196f89468f458cfbf';

const mockedDb = {
    viewOwnOrders:function(customerId,callback){
        callback(['elso order', 'masodik order']);
    },
    getShutterTypes:function(callback){
        callback(['shutter one', 'shutter two']);
    }
}

var service;

mocha.describe('Customer service works as expected with real db', () =>{

    before(() => {
        service = new CustomerService(mockedDb);
    })
    it('The viewOwnOrders works as expected with mocked db',() => {
 
        service.viewOwnOrders(CustomerId,(data) => {
            assert.isNotNull(data, 'data coming back is not null');
            assert.isArray(data, 'data coming back is indeed an array');
            assert.isAtLeast(data.length,1);
        })
    })

    it('Get shutter types works as expected with mocked db', () => {
        service.getShutterTypes((data) => {
            assert.isNotNull(data, 'data coming back is not null');
            assert.isArray(data, 'data coming back is indeed an array');
            assert.isAtLeast(data.length,1);
        });
    })
})

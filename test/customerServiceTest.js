const mocha = require('mocha');
const assert = require('chai').assert;


const CustomerService = require('../app/services/customerService');
const CustomerId = '5ccf084196f89468f458cfbf';

const mockedDb = {
    viewOwnOrders:function(customerId,callback){
        callback([{
            _id: '5cd408ea629a211e6637116c',
            customerId: '5ccf084196f89468f458cfbf',
            dueDateOfAssembling: '2019-05-31T00:00:00.000Z',
            dateOfSubmittingOrder: '2019-04-20T00:00:00.000Z',
            isInProgress: false,
            isDone: false,
            isPayed: false,
            price: 12240,
            currency: 'HUF',
            windows: [
              {
                height: 100,
                width: 300,
                shutter: '5cd40e54e61b4462dfbf361c'
              },
              {
                height: 200,
                width: 400,
                shutter: '5cd40e64e78471307617d1bb'
              },
              {
                height: 700,
                width: 500,
                shutter: '5cd40e6a70a76d64fa5eccdb'
              }
            ],
            workerId: null,
            parts: []
          }]);
    },
    getShutterTypes:function(callback){
        callback([{
                    _id: '5cd40e64e78471307617d1bb',
                    name: 'Conservatory Shutter',
                    basePrice: 30000,
                    currency: 'HUF'
                    }, 
                    {
                    _id: '5cd40e6a70a76d64fa5eccdb',
                    name: 'Bay Window Shutter',
                    basePrice: 20000,
                    currency: 'HUF'}]);
    }
}

var service;

mocha.describe('Customer service works as expected with mocked db', () =>{

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
            assert.isAtMost(data.length,2)
        });
    })
})

const mocha = require('mocha');
const assert = require('chai').assert;

const ManagerService = require('../app/services/managerService');
const OrderId = '5cd408ea629a211e6637116c';

const mockedDb = {
    getWorkersDataForInstallation:function(callback){
        callback([{
                    _id: '5cd67c69e83d2bde68bbdc12',
                    firstName: 'Gyula',
                    lastName: 'Munkas',
                    email: 'gyulo123@gmail.com',
                    city: 'Miskolc',
                    address: 'Alkoto u. 3.'
                }])
    },

    getOrderById:function(OrderId,callback){
        callback(
            {
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
              }
        )
    }

}


mocha.describe('Manager service works as expected with mocked db', () => {
    before(() => {
        service = new ManagerService(mockedDb);
    })

    it('The getOrderById works as expected with mocked db', () => {
        service.getOrderById(OrderId,(data) => {
            assert.isNotNull(data, 'data is not null');
            assert.isNotArray(data, 'data is not an array');
            assert.isObject(data, 'data is an object');
        })
    })

    it('The getWorkersDataForInstallation works as expected on mocked db', () => {
        service.getWorkersDataForInstallation((data) => {
                assert.isNotNull(data, 'data is not null');
                assert.isArray(data, 'data is an array');
                assert.isAtLeast(data.length, 1);
        })
    })
});
import EventEmitter from 'events';

class CustomerStore extends EventEmitter{
    _ownOrders = [];
    _shutterTypes = [];
    _customerId = '5ccf084196f89468f458cfbf';
    _customerData = undefined;
    
    emitChange(){
        this.emit('change');
    }

    addChangeListener(callback){
        this.addListener('change', callback);
    }

    removeChangeListener(callback){
        this.removeListener('change',callback);
    }
}

export default new CustomerStore();
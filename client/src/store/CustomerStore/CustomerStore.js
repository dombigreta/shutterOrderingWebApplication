import EventEmitter from 'events';

class CustomerStore extends EventEmitter{
    _ownOrders = [];
    _shutterTypes = [];
    
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
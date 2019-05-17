import EventEmitter from 'events';

class ManagerStore extends EventEmitter{
    _orders = [];
    _workers = [];
    _shutterData = [];
    _editingOrder = null;
    _customerData = null;
    _statistics = null;
    _message = '';
    _isInvoicecreated = false;
    
    emitChange(){
        this.emit('change');
    }

    addChangeListener(callback){
        this.addListener('change',callback);
    }

    removeChangeListener(callback){
        this.removeListener('change',callback);
    }
}

export default new ManagerStore();
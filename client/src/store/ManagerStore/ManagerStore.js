import EventEmitter from 'events';

class ManagerStore extends EventEmitter{
    _orders = [];
    
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
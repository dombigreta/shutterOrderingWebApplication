import EventEmitter from 'events';

class WorkerStore extends EventEmitter{
    _orders = [];
    _parts = [];
    __editingOrder = null;
    _workerId = '5cd67c69e83d2bde68bbdc12'

    emitChange(){
        this.emit('change');
    }

    addChangeListener(callback){
        this.addListener('change', callback);
    }

    removeChangeListener(callback){
        this.removeListener('change', callback);
    }
}

export default new WorkerStore();
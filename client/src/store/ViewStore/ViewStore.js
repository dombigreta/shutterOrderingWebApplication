import EventEmitter from 'events';


class ViewStore extends EventEmitter{
    _currentView = '';


    emitChange(){
        this.emit('change');
    }
     addChangeListener(callbak){
        this.addListener('change', callbak);
    }

    removeChangeListener(callback){
        this.removeListener('change', callback);
    }
}

export default new ViewStore();
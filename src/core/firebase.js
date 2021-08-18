import config from 'Core/config';

(function(){
    // Initialize Firebase
    var links = [];
    var _config = {
        apiKey: "AIzaSyDlZEjsb0gkqV4DVGtjq2l8gLfjY73L0KU",
        authDomain: "tray-ab5b8.firebaseapp.com",
        databaseURL: "https://tray-ab5b8.firebaseio.com",
        projectId: "tray-ab5b8",
        storageBucket: "tray-ab5b8.appspot.com",
        messagingSenderId: "1046652624432"
    };

    firebase.initializeApp(_config);

    function brandAuaha() {
        var link = document.createElement('a');
        var img = new Image();
        img.setAttribute('style', 'width:150px;');

        link.appendChild(img);
        link.setAttribute('target', '_blank');
        link.setAttribute('style', 'display:inline-block;padding:10px;');
        
        firebase.database().ref('/configs').on('value', function(snapshot) {
            var _config = snapshot.val();

            link.setAttribute('title', _config.title);
            link.setAttribute('href', _config.link);
            img.src = _config.logo;
            img.setAttribute('alt', _config.title);

        });
        
        if(document.querySelector('#auaha-brand')){
            document.querySelector('#auaha-brand').appendChild(link);
        }
    }

    
    function removeStyle() {
        Array.from(document.querySelectorAll('link')).forEach(function(link){
            links.push(link);
            link.remove();
        });
    }

    function addStyle() {
        links.forEach(function(item){
            document.querySelector('head').appendChild(item);
        });
    }

    function statusAuaha(id) {
        firebase.database().ref('/stores/' + id)
            .on('value', function(snapshot) {
                var data = snapshot.val();
                if(!data.actived) removeStyle();
                else if(links.length > 0) addStyle();
            });
    }

    function storeAuaha(id) {
        brandAuaha();
        statusAuaha(id);
    }

    var storeId = config.seller.name;
    storeAuaha(storeId);

    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(var i = this.length - 1; i >= 0; i--) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }
})();

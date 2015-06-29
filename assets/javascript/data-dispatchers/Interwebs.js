/* @flow */
import type * as URI from "./URI";

var Q = require('q');

function requestOkText(url) {
    var request = new XMLHttpRequest();
    var deferred = Q.defer();

    request.open("GET", url, true);
    request.setRequestHeader('Authorization', 'Client-ID a72c8b35aa95758');
    request.onload = onload;
    request.onerror = onerror;
    request.onprogress = onprogress;
    request.send();

    function onload() {
        if (request.status === 200) {
            deferred.resolve(JSON.parse(request.responseText));
        } else {
            deferred.reject(new Error("Status code was " + request.status));
        }
    }

    function onerror() {
        deferred.reject(new Error("Can't XHR " + JSON.stringify(url)));
    }

    function onprogress(event) {
        deferred.notify(event.loaded / event.total);
    }

    return deferred.promise;
}

class InterwebsBuilder {
  _uri: ?URI;
  _requestType: ?string;

  _setSource(uri: URI): InterwebsBuilder {
    this._uri = uri;
    return this;
  }

  get(uri: URI): InterwebsBuilder {
    this._requestType = 'GET';
    this._setSource(uri);
    return requestOkText(uri.toString());
  }
}

module.exports = InterwebsBuilder;

"use strict";

/**
 * Cache
 * @param options
 * @constructor
 */
function Cache(options) {
    this.id = Cache._CacheId++;
    this._options = options ? options : {};
    this._Cache = this._options.data ? this._options.data : {};
    if(options.onCreate)
        options.onCreate(this);
}

/**
 *
 * @param key
 * @param callback
 * @returns {*}
 */
Cache.prototype.get = function(key, callback) {
    if(!key) return this._Cache;
    if(!this._Cache[key]) return;
    if(this._options.onGet) callback = this.options.onGet;
    if(callback) callback(this, key);
    return this._Cache[key];
};

/**
 *
 * @param key
 * @param value
 * @param callback
 */
Cache.prototype.set = function(key, value, callback) {
    if(!value) this._Cache = key;
    else  this._Cache[key] = value;
    if(this._options.onSet) callback = this._options.onSet;
    if(callback) callback(this, key);
};

/**
 *
 * @param key
 * @param callback
 */
Cache.prototype.del = function(key, callback) {
    if(!key) {
        delete this._Cache;
        this._Cache = {};
    }
    else delete this._Cache[key];
    if(this._options.onDel) callback = this.options.onDel;
    if(callback) callback(this, key);
};

/**
 *
 * @param key
 * @returns {*}
 */
Cache.prototype.stringify = function(key) {
    var tostrobj = key ? this._Cache[key] : this._Cache;
    return LZString.compressToBase64(JSON.stringify(tostrobj));
};

/**
 *
 * @param key
 * @param val
 * @returns {*}
 */
Cache.prototype.parse = function(key, val) {
    var valObj = JSON.parse(LZString.decompressFromBase64(val ? val : key));
    if(val) this._Cache[key] = valObj;
    else this._Cache = valObj;
    return valObj;
};

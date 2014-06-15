/**
 * This code has been instrumented using Recognizer
 * https://github.com/equiet/recognizer
 */

var __recognizer784633498 = (function () {
    'use strict';

    var global = this;

    function Tracer() {
        this._calls = [];
        this._args = [];
        this.global = global;

        this._probeValues = {};
    }
    Tracer.prototype = {
        logEntry: function (location, args) {
            this._calls.push({
                index: this._calls.length,
                position: location,
                // args: Array.prototype.slice.call(args),
                argsCount: args.length,
                time: Date.now()
            });
            this._args.push(_.cloneDeep(args));
        },

        getCalls: function (since) {
            var calls = this._calls.filter(function(call) {
                return (since) ? call.time > since : true;
            });
            return stringify(calls);
        },

        getCallCount: function () {
            return this._calls.length;
        },

        logProbe: function (location, result) {
            this._probeValues[location.toString()] = _.cloneDeep(result);
            return result;
        },

        updateProbeValues: function () {
            var self = this;

            var probeIds = Object.keys(this._probeValues);
            var output = probeIds.map(function(probeId) {
               return {
                   id: probeId,
                   type: self.getType(self._probeValues[probeId])
               };
            });

            return stringify(output);
        },

        getType: function (value) {
            var type = typeof value;

            if (type === 'number' && isNaN(value)) {
                type = 'NaN';
            }
            if (type === null) {
                type = 'null';
            }

            return type;
        },

        test: function () {
            console.log('[recognizer tracer] test function run successfully');
        },

        connect: function () {
            return this;
        }
    };


    /**
     * JSON stringify with circular references
     * Copyright (c) Isaac Z. Schlueter ("Author")
     * The BSD License
     */
    function getSerialize(a,b){var c=[],d=[];return b=b||function(a,b){return"[Circular "+getPath(b,c,d)+"]"},function(e,f){var g=f;return"object"==typeof f&&f&&(-1!==c.indexOf(f)?g=b(e,f):(c.push(f),d.push(e))),a&&(g=a(e,g)),g}}
    function getPath(a,b,c){var d=b.indexOf(a),e=[c[d]];for(d--;d>=0;d--)b[d][e[0]]===a&&(a=b[d],e.unshift(c[d]));return"~"+e.join(".")}
    function stringify(a,b,c,d){return JSON.stringify(a,getSerialize(b,d),c)}stringify.getSerialize=getSerialize;


    /**
     * @license
     * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
     * Build: `lodash modern -o ./dist/lodash.js`
     */
    ;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
    }}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
    }function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n,t,e){if(!n||!V[typeof n])return n;
        t=t&&typeof e=="undefined"?t:tt(t,e,3);for(var r=-1,u=V[typeof n]&&Fe(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function g(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:tt(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function _(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Fe(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
        return o}function U(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=tt(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Fe(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function H(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function J(n){return n&&typeof n=="object"&&!Te(n)&&me.call(n,"__wrapped__")?n:new Q(n)
    }function Q(n,t){this.__chain__=!!t,this.__wrapped__=n}function X(n){function t(){if(r){var n=p(r);be.apply(n,arguments)}if(this instanceof t){var o=nt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return $e(t,n),t}function Z(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Ae[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
    }if(i=Te(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):U({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:h)(n,function(n,i){o[i]=Z(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function nt(n){return wt(n)?ke(n):{}}function tt(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(De.funcNames&&(r=!n.name),r=r||!De.funcDecomp,!r)){var u=ge.call(n);
        De.funcNames||(r=!O.test(u)),r||(r=E.test(u),$e(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function et(n){function t(){var n=f?i:this;if(u){var h=p(u);be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,et([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=nt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
    }var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return $e(t,n),t}function rt(e,r){var u=-1,i=st(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ut(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&(Te(i)||yt(i))){t||(i=ut(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
    }function ot(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return ot(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
        if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(f=!u,u||(u=a()),o||(o=a()),p=u.length;p--;)if(u[p]==n)return o[p]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(p=n.length,v=t.length,(i=v==p)||r)for(;v--;)if(c=p,s=t[v],r)for(;c--&&!(i=ot(n[c],s,e,r,u,o)););else if(!(i=ot(n[v],s,e,r,u,o)))break}else g(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&ot(n[a],t,e,r,u,o)):void 0}),i&&!r&&g(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0
    });return u.pop(),o.pop(),f&&(l(u),l(o)),i}function it(n,t,e,r,u){(Te(t)?St:h)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=Te(t))||Pe(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?Te(l)?l:[]:Pe(l)?l:{}),r.push(t),u.push(l),c||it(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function at(n,t){return n+he(Re()*(t-n+1))}function ft(e,r,u){var i=-1,f=st(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
        for(v&&(h=o(h),f=t);++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function lt(n){return function(t,e,r){var u={};e=J.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else h(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function ct(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
        var c=n&&n.__bindData__;return c&&true!==c?(c=p(c),c[2]&&(c[2]=p(c[2])),c[3]&&(c[3]=p(c[3])),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&we.apply(c[3]||(c[3]=[]),r),c[1]|=t,ct.apply(null,c)):(1==t||17===t?X:et)([n,t,e,r,u,o])}function pt(n){return Be[n]}function st(){var t=(t=J.indexOf)===Wt?n:t;return t}function vt(n){return typeof n=="function"&&pe.test(n)}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(g(n,function(n,t){e=t
    }),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return We[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false}function mt(n,t,e){var r=Fe(n),u=r.length;for(t=tt(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return g(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Fe(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])
    }function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false}function xt(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=st(),o=n?n.length:0,i=false;return e=(0>e?Ie(0,o+e):e)||0,Te(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):h(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=J.createCallback(t,e,3),e=-1;
        var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else h(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else h(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=J.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return h(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];
        if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else h(n,t);return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Fe(n),r=u.length;h(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=J.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);
    else o=[],h(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=J.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else h(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
    });return e}function $t(n,t,e,r){var u=3>arguments.length;return t=J.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=at(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else h(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;
        for(t=J.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Se(Ie(0,r),u))}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ie(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=J.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ie(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?J.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;
        return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=J.createCallback(e,r,3)),ft(n,t,e)}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Ve(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Ve(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||Te(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?ct(n,17,p(arguments,2),null,t):ct(n,1,null,null,t)
    }function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Ue()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null)))}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ie(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ie(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Ue(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;
        m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);t&&(e||u.length)||(null==e&&(e=t),o=Q,t=n,n=J,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;
        i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=vt(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=ae.unshift,je=function(){try{var n={},t=vt(t=re.defineProperty)&&t,e=t(n,n,n)&&t
    }catch(r){}return e}(),ke=vt(ke=re.create)&&ke,xe=vt(xe=Xt.isArray)&&xe,Ce=e.isFinite,Oe=e.isNaN,Ne=vt(Ne=re.keys)&&Ne,Ie=te.max,Se=te.min,Ee=e.parseInt,Re=te.random,Ae={};Ae[$]=Xt,Ae[T]=Yt,Ae[F]=Zt,Ae[B]=ne,Ae[q]=re,Ae[W]=ee,Ae[z]=ue,Ae[P]=oe,Q.prototype=J.prototype;var De=J.support={};De.funcDecomp=!vt(e.a)&&E.test(s),De.funcNames=typeof ne.name=="string",J.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:J}},ke||(nt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
        var r=new n;n.prototype=null}return r||e.Object()}}());var $e=je?function(n,t){M.value=t,je(n,"__bindData__",M)}:Ht,Te=xe||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Fe=Ne?function(n){return wt(n)?Ne(n):[]}:H,Be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},We=_t(Be),qe=ue("("+Fe(We).join("|")+")","g"),ze=ue("["+Fe(Be).join("")+"]","g"),Pe=ye?function(n){if(!n||ce.call(n)!=q)return false;var t=n.valueOf,e=vt(t)&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)
    }:ht,Ke=lt(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Le=lt(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)}),Me=lt(function(n,t,e){n[e]=t}),Ve=Rt,Ue=vt(Ue=Zt.now)&&Ue||function(){return(new Zt).getTime()},Ge=8==Ee(d+"08")?Ee:function(n,t){return Ee(kt(n)?n.replace(I,""):n,t||0)};return J.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},J.assign=U,J.at=function(n){for(var t=arguments,e=-1,r=ut(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];
        return u},J.bind=Mt,J.bindAll=function(n){for(var t=1<arguments.length?ut(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=ct(n[u],1,null,null,n)}return n},J.bindKey=function(n,t){return 2<arguments.length?ct(t,19,p(arguments,2),null,n):ct(t,3,null,null,n)},J.chain=function(n){return n=new Q(n),n.__chain__=true,n},J.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},J.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;
        return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},J.constant=function(n){return function(){return n}},J.countBy=Ke,J.create=function(n,t){var e=nt(n);return t?U(e,t):e},J.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return tt(n,t,e);if("object"!=r)return Jt(n);var u=Fe(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=ot(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)
    }},J.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,ct(n,4,null,null,null,t)},J.debounce=Vt,J.defaults=_,J.defer=function(n){if(!dt(n))throw new ie;var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},J.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},J.difference=function(n){return rt(n,ut(arguments,true,true,1))},J.filter=Nt,J.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ut(n,t)
    },J.forEach=St,J.forEachRight=Et,J.forIn=g,J.forInRight=function(n,t,e){var r=[];g(n,function(n,t){r.push(t,n)});var u=r.length;for(t=tt(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},J.forOwn=h,J.forOwnRight=mt,J.functions=bt,J.groupBy=Le,J.indexBy=Me,J.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Se(Ie(0,u-r),u))},J.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=st(),p=f===n,s=a();++r<u;){var v=arguments[r];
        (Te(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},J.invert=_t,J.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},J.keys=Fe,J.map=Rt,J.mapValues=function(n,t,e){var r={};
        return t=J.createCallback(t,e,3),h(n,function(n,e,u){r[e]=t(n,e,u)}),r},J.max=At,J.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},J.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=tt(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)it(n,t[u],r,o,i);
        return l(o),l(i),n},J.min=function(n,t,e){var u=1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},J.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];g(n,function(n,t){u.push(t)});for(var u=rt(u,ut(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)||(r[e]=n)
    });return r},J.once=function(n){var t,e;if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},J.pairs=function(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},J.partial=function(n){return ct(n,16,p(arguments,1))},J.partialRight=function(n){return ct(n,32,null,p(arguments,1))},J.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ut(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])
    }else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},J.pluck=Ve,J.property=Jt,J.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},J.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ie(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},J.reject=function(n,t,e){return t=J.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)
    })},J.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=J.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);return o},J.rest=qt,J.shuffle=Tt,J.sortBy=function(n,t,e){var r=-1,o=Te(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=J.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},J.tap=function(n,t){return t(n),n
    },J.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)},J.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=tt(t,e,1);++r<n;)u[r]=t(r);return u},J.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},J.transform=function(n,t,e,r){var u=Te(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=nt(o&&o.prototype)}return t&&(t=J.createCallback(t,r,4),(u?St:h)(n,function(n,r,u){return t(e,n,r,u)
    })),e},J.union=function(){return ft(ut(arguments,true,true))},J.uniq=Pt,J.values=xt,J.where=Nt,J.without=function(n){return rt(n,p(arguments,1))},J.wrap=function(n,t){return ct(t,16,[n])},J.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(Te(e)||yt(e))var r=r?ft(rt(r,e).concat(rt(e,r))):e}return r||[]},J.zip=Kt,J.zipObject=Lt,J.collect=Rt,J.drop=qt,J.each=St,J.eachRight=Et,J.extend=U,J.methods=bt,J.object=Lt,J.select=Nt,J.tail=qt,J.unique=Pt,J.unzip=Kt,Gt(J),J.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),Z(n,t,typeof e=="function"&&tt(e,r,1))
    },J.cloneDeep=function(n,t,e){return Z(n,true,typeof t=="function"&&tt(t,e,1))},J.contains=Ct,J.escape=function(n){return null==n?"":oe(n).replace(ze,pt)},J.every=Ot,J.find=It,J.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=J.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},J.findKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),h(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.findLast=function(n,t,e){var r;return t=J.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0
    }),r},J.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=J.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},J.findLastKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.has=function(n,t){return n?me.call(n,t):false},J.identity=Ut,J.indexOf=Wt,J.isArguments=yt,J.isArray=Te,J.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},J.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false
    },J.isElement=function(n){return n&&1===n.nodeType||false},J.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(h(n,function(){return t=false}),t)},J.isEqual=function(n,t,e,r){return ot(n,t,typeof e=="function"&&tt(e,r,2))},J.isFinite=function(n){return Ce(n)&&!Oe(parseFloat(n))},J.isFunction=dt,J.isNaN=function(n){return jt(n)&&n!=+n},J.isNull=function(n){return null===n},J.isNumber=jt,J.isObject=wt,J.isPlainObject=Pe,J.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
    },J.isString=kt,J.isUndefined=function(n){return typeof n=="undefined"},J.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ie(0,r+e):Se(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},J.mixin=Gt,J.noConflict=function(){return e._=le,this},J.noop=Ht,J.now=Ue,J.parseInt=Ge,J.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Re(),Se(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):at(n,t)
    },J.reduce=Dt,J.reduceRight=$t,J.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},J.runInContext=s,J.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Fe(n).length},J.some=Ft,J.sortedIndex=zt,J.template=function(n,t,e){var r=J.templateSettings;n=oe(n||""),e=_({},e,r);var u,o=_({},e.imports,r.imports),r=Fe(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
    }),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},J.unescape=function(n){return null==n?"":oe(n).replace(qe,gt)},J.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
    },J.all=Ot,J.any=Ft,J.detect=It,J.findWhere=It,J.foldl=Dt,J.foldr=$t,J.include=Ct,J.inject=Dt,Gt(function(){var n={};return h(J,function(t,e){J.prototype[e]||(n[e]=t)}),n}(),false),J.first=Bt,J.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ie(0,u-r))},J.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[at(0,n.length-1)]:v:(n=Tt(n),n.length=Se(Ie(0,t),n.length),n)
    },J.take=Bt,J.head=Bt,h(J,function(n,t){var e="sample"!==t;J.prototype[t]||(J.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new Q(o,u):o})}),J.VERSION="2.4.1",J.prototype.chain=function(){return this.__chain__=true,this},J.prototype.toString=function(){return oe(this.__wrapped__)},J.prototype.value=Qt,J.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];J.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
        return n?new Q(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];J.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];J.prototype[n]=function(){return new Q(t.apply(this.__wrapped__,arguments),this.__chain__)}}),J}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
        K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
        var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);


    return new Tracer();

}());


/**
 * Instrumented code
 */

'use strict';
var pause = true;
var firstWord = BOOKEND;
var currentWord = BOOKEND;
var debugWords = function (word, visibility) {
    __recognizer784633498.logEntry([
        7,
        17,
        7,
        25
    ], arguments);
    currentWord = __recognizer784633498.logProbe([
        8,
        18,
        8,
        22
    ], word);
    if (__recognizer784633498.logProbe([
            9,
            7,
            9,
            17
        ], visibility) && __recognizer784633498.logProbe([
            9,
            26,
            9,
            30
        ], __recognizer784633498.logProbe([
            9,
            21,
            9,
            25
        ], word).word))
        (function () {
            var obj = __recognizer784633498.logProbe([
                    10,
                    8,
                    10,
                    15
                ], console), fn = __recognizer784633498.logProbe([
                    10,
                    16,
                    10,
                    19
                ], obj.log);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer784633498.logProbe([
            10,
            25,
            10,
            29
        ], __recognizer784633498.logProbe([
            10,
            20,
            10,
            24
        ], word).word)) + ' ');
    return true;
};
var updateWordsOnPage = function (word, visibility) {
    __recognizer784633498.logEntry([
        14,
        24,
        14,
        32
    ], arguments);
    currentWord = __recognizer784633498.logProbe([
        15,
        18,
        15,
        22
    ], word);
    var out = __recognizer784633498.logProbe([
            16,
            14,
            16,
            24
        ], visibility) ? __recognizer784633498.logProbe([
            16,
            32,
            16,
            36
        ], __recognizer784633498.logProbe([
            16,
            27,
            16,
            31
        ], word).word) : '';
    out = __recognizer784633498.logProbe([
        17,
        10,
        17,
        13
    ], out) === '{{NEWLINE}}' ? '' : __recognizer784633498.logProbe([
        17,
        39,
        17,
        42
    ], out);
    (function () {
        var obj = __recognizer784633498.logProbe([
                18,
                4,
                18,
                31
            ], __recognizer784633498.logProbe([
                18,
                4,
                18,
                5
            ], $)('#blinkreader div.blink')), fn = __recognizer784633498.logProbe([
                18,
                32,
                18,
                36
            ], obj.html);
        return fn.apply(obj, arguments);
    }.bind(this)(__recognizer784633498.logProbe([
        18,
        37,
        18,
        40
    ], out)));
    __recognizer784633498.logProbe([
        19,
        4,
        19,
        22
    ], __recognizer784633498.logProbe([
        19,
        4,
        19,
        16
    ], recreateText)(__recognizer784633498.logProbe([
        19,
        17,
        19,
        21
    ], word)));
    var ret = __recognizer784633498.logProbe([
            20,
            14,
            20,
            24
        ], visibility) ? !__recognizer784633498.logProbe([
            20,
            28,
            20,
            33
        ], pause) : true;
    if (!__recognizer784633498.logProbe([
            21,
            13,
            21,
            20
        ], __recognizer784633498.logProbe([
            21,
            8,
            21,
            12
        ], word).bookend) && __recognizer784633498.logProbe([
            21,
            38,
            21,
            45
        ], __recognizer784633498.logProbe([
            21,
            29,
            21,
            37
        ], __recognizer784633498.logProbe([
            21,
            24,
            21,
            28
        ], word).nextWord).bookend) && __recognizer784633498.logProbe([
            21,
            49,
            21,
            59
        ], visibility)) {
        ret = false;
        if (__recognizer784633498.logProbe([
                23,
                11,
                23,
                20
            ], firstWord))
            __recognizer784633498.logProbe([
                24,
                12,
                28,
                19
            ], __recognizer784633498.logProbe([
                24,
                12,
                24,
                22
            ], setTimeout)(function () {
                __recognizer784633498.logEntry([
                    24,
                    23,
                    24,
                    31
                ], arguments);
                pause = true;
                currentWord = __recognizer784633498.logProbe([
                    26,
                    30,
                    26,
                    39
                ], firstWord);
                (function () {
                    var obj = __recognizer784633498.logProbe([
                            27,
                            16,
                            27,
                            27
                        ], currentWord), fn = __recognizer784633498.logProbe([
                            27,
                            28,
                            27,
                            32
                        ], obj.play);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer784633498.logProbe([
                    27,
                    33,
                    27,
                    50
                ], updateWordsOnPage)));
            }, 500));
    }
    return __recognizer784633498.logProbe([
        30,
        11,
        30,
        14
    ], ret);
};
var recreateText = function (theWord) {
    __recognizer784633498.logEntry([
        33,
        19,
        33,
        27
    ], arguments);
    var outputText = '';
    var outputP = '<p>';
    (function () {
        var obj = __recognizer784633498.logProbe([
                36,
                4,
                36,
                32
            ], __recognizer784633498.logProbe([
                36,
                4,
                36,
                5
            ], $)('#blinkreader div.reader')), fn = __recognizer784633498.logProbe([
                36,
                33,
                36,
                37
            ], obj.html);
        return fn.apply(obj, arguments);
    }.bind(this)(''));
    (function () {
        var obj = __recognizer784633498.logProbe([
                37,
                4,
                37,
                11
            ], theWord), fn = __recognizer784633498.logProbe([
                37,
                12,
                37,
                16
            ], obj.play);
        return fn.apply(obj, arguments);
    }.bind(this)(0, function (word, visibility) {
        __recognizer784633498.logEntry([
            38,
            8,
            38,
            16
        ], arguments);
        if (__recognizer784633498.logProbe([
                39,
                15,
                39,
                25
            ], visibility) && __recognizer784633498.logProbe([
                39,
                29,
                39,
                33
            ], word) && __recognizer784633498.logProbe([
                39,
                42,
                39,
                46
            ], __recognizer784633498.logProbe([
                39,
                37,
                39,
                41
            ], word).word)) {
            if (__recognizer784633498.logProbe([
                    40,
                    24,
                    40,
                    28
                ], __recognizer784633498.logProbe([
                    40,
                    19,
                    40,
                    23
                ], word).word) === '{{NEWLINE}}' || __recognizer784633498.logProbe([
                    41,
                    37,
                    41,
                    44
                ], __recognizer784633498.logProbe([
                    41,
                    28,
                    41,
                    36
                ], __recognizer784633498.logProbe([
                    41,
                    23,
                    41,
                    27
                ], word).nextWord).bookend)) {
                outputP += '</p>';
                outputText += __recognizer784633498.logProbe([
                    43,
                    34,
                    43,
                    41
                ], outputP);
                (function () {
                    var obj = function () {
                            var obj = function () {
                                    var obj = __recognizer784633498.logProbe([
                                            44,
                                            20,
                                            44,
                                            48
                                        ], __recognizer784633498.logProbe([
                                            44,
                                            20,
                                            44,
                                            21
                                        ], $)('#blinkreader div.reader')), fn = __recognizer784633498.logProbe([
                                            45,
                                            25,
                                            45,
                                            31
                                        ], obj.append);
                                    return fn.apply(obj, arguments);
                                }.bind(this)(__recognizer784633498.logProbe([
                                    45,
                                    32,
                                    45,
                                    42
                                ], __recognizer784633498.logProbe([
                                    45,
                                    32,
                                    45,
                                    33
                                ], $)(__recognizer784633498.logProbe([
                                    45,
                                    34,
                                    45,
                                    41
                                ], outputP)))), fn = __recognizer784633498.logProbe([
                                    46,
                                    25,
                                    46,
                                    28
                                ], obj.css);
                            return fn.apply(obj, arguments);
                        }.bind(this)('left', 0), fn = __recognizer784633498.logProbe([
                            47,
                            25,
                            47,
                            28
                        ], obj.css);
                    return fn.apply(obj, arguments);
                }.bind(this)('top', 0));
                outputP = '<p>';
            } else {
                var n = '<span style="float:left" id="word' + __recognizer784633498.logProbe([
                        51,
                        31,
                        51,
                        36
                    ], __recognizer784633498.logProbe([
                        51,
                        26,
                        51,
                        30
                    ], word).index) + '">' + __recognizer784633498.logProbe([
                        52,
                        31,
                        52,
                        35
                    ], __recognizer784633498.logProbe([
                        52,
                        26,
                        52,
                        30
                    ], word).word) + '&nbsp;</span>';
                outputP += __recognizer784633498.logProbe([
                    54,
                    36,
                    54,
                    40
                ], __recognizer784633498.logProbe([
                    54,
                    31,
                    54,
                    35
                ], word).word) + ' ';
            }
        }
        return true;
    }));
};
var updateLinksView = function (callback) {
    __recognizer784633498.logEntry([
        61,
        22,
        61,
        30
    ], arguments);
    var l = function () {
            var obj = __recognizer784633498.logProbe([
                    62,
                    12,
                    62,
                    29
                ], localStorageCache), fn = __recognizer784633498.logProbe([
                    62,
                    30,
                    62,
                    33
                ], obj.get);
            return fn.apply(obj, arguments);
        }.bind(this)('links');
    (function () {
        var obj = __recognizer784633498.logProbe([
                63,
                4,
                63,
                19
            ], __recognizer784633498.logProbe([
                63,
                4,
                63,
                5
            ], $)('.linksview')), fn = __recognizer784633498.logProbe([
                63,
                20,
                63,
                24
            ], obj.html);
        return fn.apply(obj, arguments);
    }.bind(this)(''));
    for (var li in __recognizer784633498.logProbe([
            64,
            18,
            64,
            19
        ], l)) {
        li = __recognizer784633498.logProbe([
            65,
            15,
            65,
            17
        ], __recognizer784633498.logProbe([
            65,
            13,
            65,
            14
        ], l)[li]);
        var newel = __recognizer784633498.logProbe([
                66,
                20,
                66,
                71
            ], __recognizer784633498.logProbe([
                66,
                20,
                66,
                21
            ], $)('<div class="link">' + __recognizer784633498.logProbe([
                66,
                54,
                66,
                59
            ], __recognizer784633498.logProbe([
                66,
                48,
                66,
                53
            ], __recognizer784633498.logProbe([
                66,
                45,
                66,
                47
            ], li).title).title) + '</div>'));
        (function () {
            var obj = __recognizer784633498.logProbe([
                    67,
                    8,
                    67,
                    13
                ], newel), fn = __recognizer784633498.logProbe([
                    67,
                    14,
                    67,
                    18
                ], obj.data);
            return fn.apply(obj, arguments);
        }.bind(this)(function () {
            var obj = __recognizer784633498.logProbe([
                    67,
                    22,
                    67,
                    25
                ], __recognizer784633498.logProbe([
                    67,
                    19,
                    67,
                    21
                ], li).url), fn = __recognizer784633498.logProbe([
                    67,
                    26,
                    67,
                    34
                ], obj.hashCode);
            return fn.apply(obj, arguments);
        }.bind(this)()));
        (function () {
            var obj = __recognizer784633498.logProbe([
                    68,
                    8,
                    68,
                    23
                ], __recognizer784633498.logProbe([
                    68,
                    8,
                    68,
                    9
                ], $)('.linksview')), fn = __recognizer784633498.logProbe([
                    68,
                    24,
                    68,
                    30
                ], obj.append);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer784633498.logProbe([
            68,
            31,
            68,
            36
        ], newel)));
    }
    (function () {
        var obj = __recognizer784633498.logProbe([
                70,
                4,
                70,
                14
            ], __recognizer784633498.logProbe([
                70,
                4,
                70,
                5
            ], $)('.link')), fn = __recognizer784633498.logProbe([
                70,
                15,
                70,
                20
            ], obj.click);
        return fn.apply(obj, arguments);
    }.bind(this)(function () {
        __recognizer784633498.logEntry([
            70,
            21,
            70,
            29
        ], arguments);
        var links = function () {
                var obj = __recognizer784633498.logProbe([
                        71,
                        20,
                        71,
                        37
                    ], localStorageCache), fn = __recognizer784633498.logProbe([
                        71,
                        38,
                        71,
                        41
                    ], obj.get);
                return fn.apply(obj, arguments);
            }.bind(this)('links');
        var data = function () {
                var obj = __recognizer784633498.logProbe([
                        72,
                        19,
                        72,
                        26
                    ], __recognizer784633498.logProbe([
                        72,
                        19,
                        72,
                        20
                    ], $)(__recognizer784633498.logProbe([
                        72,
                        21,
                        72,
                        25
                    ], this))), fn = __recognizer784633498.logProbe([
                        72,
                        27,
                        72,
                        31
                    ], obj.data);
                return fn.apply(obj, arguments);
            }.bind(this)();
        var link = __recognizer784633498.logProbe([
                73,
                25,
                73,
                29
            ], __recognizer784633498.logProbe([
                73,
                19,
                73,
                24
            ], links)[data]);
        __recognizer784633498.logProbe([
            75,
            8,
            75,
            38
        ], __recognizer784633498.logProbe([
            75,
            8,
            75,
            22
        ], cueAndPlayText)(__recognizer784633498.logProbe([
            75,
            33,
            75,
            37
        ], __recognizer784633498.logProbe([
            75,
            28,
            75,
            32
        ], __recognizer784633498.logProbe([
            75,
            23,
            75,
            27
        ], link).text).text)));
    }));
    if (__recognizer784633498.logProbe([
            77,
            7,
            77,
            15
        ], callback))
        __recognizer784633498.logProbe([
            77,
            17,
            77,
            34
        ], __recognizer784633498.logProbe([
            77,
            17,
            77,
            25
        ], callback)(null, __recognizer784633498.logProbe([
            77,
            32,
            77,
            33
        ], l)));
};
var localStorageCache = new (__recognizer784633498.logProbe([
        80,
        28,
        80,
        33
    ], Cache))({
        base: 'cache',
        data: { links: {} },
        onCreate: function (cache) {
            __recognizer784633498.logEntry([
                85,
                15,
                85,
                23
            ], arguments);
            var cacheKey = __recognizer784633498.logProbe([
                    86,
                    28,
                    86,
                    32
                ], __recognizer784633498.logProbe([
                    86,
                    23,
                    86,
                    27
                ], this).base);
            var cacheValue = function () {
                    var obj = __recognizer784633498.logProbe([
                            87,
                            25,
                            87,
                            37
                        ], localStorage), fn = __recognizer784633498.logProbe([
                            87,
                            38,
                            87,
                            45
                        ], obj.getItem);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer784633498.logProbe([
                    87,
                    46,
                    87,
                    54
                ], cacheKey));
            (function () {
                var obj = __recognizer784633498.logProbe([
                        88,
                        8,
                        88,
                        15
                    ], console), fn = __recognizer784633498.logProbe([
                        88,
                        16,
                        88,
                        19
                    ], obj.log);
                return fn.apply(obj, arguments);
            }.bind(this)('read ' + __recognizer784633498.logProbe([
                88,
                30,
                88,
                40
            ], cacheValue) ? __recognizer784633498.logProbe([
                88,
                54,
                88,
                60
            ], __recognizer784633498.logProbe([
                88,
                43,
                88,
                53
            ], cacheValue).length) : 0 + ' chars from cache.'));
            if (__recognizer784633498.logProbe([
                    89,
                    11,
                    89,
                    21
                ], cacheValue))
                (function () {
                    var obj = __recognizer784633498.logProbe([
                            89,
                            23,
                            89,
                            28
                        ], cache), fn = __recognizer784633498.logProbe([
                            89,
                            29,
                            89,
                            34
                        ], obj.parse);
                    return fn.apply(obj, arguments);
                }.bind(this)(__recognizer784633498.logProbe([
                    89,
                    35,
                    89,
                    45
                ], cacheValue)));
            else
                cacheValue = __recognizer784633498.logProbe([
                    90,
                    31,
                    90,
                    35
                ], __recognizer784633498.logProbe([
                    90,
                    26,
                    90,
                    30
                ], this).data);
        },
        onSet: function (cache, key) {
            __recognizer784633498.logEntry([
                92,
                12,
                92,
                20
            ], arguments);
            var cacheKey = __recognizer784633498.logProbe([
                    93,
                    38,
                    93,
                    42
                ], __recognizer784633498.logProbe([
                    93,
                    29,
                    93,
                    37
                ], __recognizer784633498.logProbe([
                    93,
                    23,
                    93,
                    28
                ], cache)._options).base) ? __recognizer784633498.logProbe([
                    93,
                    60,
                    93,
                    64
                ], __recognizer784633498.logProbe([
                    93,
                    51,
                    93,
                    59
                ], __recognizer784633498.logProbe([
                    93,
                    45,
                    93,
                    50
                ], cache)._options).base) : 'cache';
            var cacheValue = function () {
                    var obj = __recognizer784633498.logProbe([
                            94,
                            25,
                            94,
                            30
                        ], cache), fn = __recognizer784633498.logProbe([
                            94,
                            31,
                            94,
                            40
                        ], obj.stringify);
                    return fn.apply(obj, arguments);
                }.bind(this)();
            (function () {
                var obj = __recognizer784633498.logProbe([
                        95,
                        8,
                        95,
                        20
                    ], localStorage), fn = __recognizer784633498.logProbe([
                        95,
                        21,
                        95,
                        28
                    ], obj.setItem);
                return fn.apply(obj, arguments);
            }.bind(this)(__recognizer784633498.logProbe([
                95,
                29,
                95,
                37
            ], cacheKey), __recognizer784633498.logProbe([
                95,
                39,
                95,
                49
            ], cacheValue)));
            (function () {
                var obj = __recognizer784633498.logProbe([
                        96,
                        8,
                        96,
                        15
                    ], console), fn = __recognizer784633498.logProbe([
                        96,
                        16,
                        96,
                        19
                    ], obj.log);
                return fn.apply(obj, arguments);
            }.bind(this)('wrote ' + __recognizer784633498.logProbe([
                96,
                42,
                96,
                48
            ], __recognizer784633498.logProbe([
                96,
                31,
                96,
                41
            ], cacheValue).length) + ' chars to cache.'));
        }
    });
var cueAndPlayText = function (text) {
    __recognizer784633498.logEntry([
        100,
        21,
        100,
        29
    ], arguments);
    var outtext = function () {
            var obj = __recognizer784633498.logProbe([
                    101,
                    18,
                    101,
                    22
                ], text), fn = __recognizer784633498.logProbe([
                    101,
                    23,
                    101,
                    30
                ], obj.replace);
            return fn.apply(obj, arguments);
        }.bind(this)(/\n/g, ' {{NEWLINE}} ');
    currentWord = firstWord = function () {
        var obj = __recognizer784633498.logProbe([
                102,
                30,
                102,
                40
            ], VisualText), fn = __recognizer784633498.logProbe([
                102,
                41,
                102,
                46
            ], obj.split);
        return fn.apply(obj, arguments);
    }.bind(this)(__recognizer784633498.logProbe([
        102,
        47,
        102,
        54
    ], outtext));
    __recognizer784633498.logProbe([
        103,
        4,
        103,
        29
    ], __recognizer784633498.logProbe([
        103,
        4,
        103,
        16
    ], recreateText)(__recognizer784633498.logProbe([
        103,
        17,
        103,
        28
    ], currentWord)));
    __recognizer784633498.logProbe([
        104,
        4,
        104,
        21
    ], __recognizer784633498.logProbe([
        104,
        4,
        104,
        19
    ], updateLinksView)());
    (function () {
        var obj = __recognizer784633498.logProbe([
                105,
                4,
                105,
                15
            ], currentWord), fn = __recognizer784633498.logProbe([
                105,
                16,
                105,
                20
            ], obj.play);
        return fn.apply(obj, arguments);
    }.bind(this)(__recognizer784633498.logProbe([
        105,
        21,
        105,
        38
    ], updateWordsOnPage)));
};
var addLinkToCache = function (link) {
    __recognizer784633498.logEntry([
        108,
        21,
        108,
        29
    ], arguments);
    var l = function () {
            var obj = __recognizer784633498.logProbe([
                    109,
                    12,
                    109,
                    29
                ], localStorageCache), fn = __recognizer784633498.logProbe([
                    109,
                    30,
                    109,
                    33
                ], obj.get);
            return fn.apply(obj, arguments);
        }.bind(this)('links');
    l[link.url.hashCode()] = __recognizer784633498.logProbe([
        110,
        29,
        110,
        33
    ], link);
    (function () {
        var obj = __recognizer784633498.logProbe([
                111,
                4,
                111,
                21
            ], localStorageCache), fn = __recognizer784633498.logProbe([
                111,
                22,
                111,
                25
            ], obj.set);
        return fn.apply(obj, arguments);
    }.bind(this)('links', __recognizer784633498.logProbe([
        111,
        35,
        111,
        36
    ], l)));
};
var iterateThroughLinks = function () {
    __recognizer784633498.logEntry([
        114,
        26,
        114,
        34
    ], arguments);
    var l = function () {
            var obj = __recognizer784633498.logProbe([
                    115,
                    12,
                    115,
                    29
                ], localStorageCache), fn = __recognizer784633498.logProbe([
                    115,
                    30,
                    115,
                    33
                ], obj.get);
            return fn.apply(obj, arguments);
        }.bind(this)('links');
    for (var li in __recognizer784633498.logProbe([
            116,
            18,
            116,
            19
        ], l)) {
        li = __recognizer784633498.logProbe([
            117,
            15,
            117,
            17
        ], __recognizer784633498.logProbe([
            117,
            13,
            117,
            14
        ], l)[li]);
        (function () {
            var obj = __recognizer784633498.logProbe([
                    118,
                    8,
                    118,
                    15
                ], console), fn = __recognizer784633498.logProbe([
                    118,
                    16,
                    118,
                    19
                ], obj.log);
            return fn.apply(obj, arguments);
        }.bind(this)(function () {
            var obj = __recognizer784633498.logProbe([
                    118,
                    20,
                    118,
                    24
                ], JSON), fn = __recognizer784633498.logProbe([
                    118,
                    25,
                    118,
                    34
                ], obj.stringify);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer784633498.logProbe([
            118,
            38,
            118,
            46
        ], __recognizer784633498.logProbe([
            118,
            35,
            118,
            37
        ], li).combined), null, 4)));
    }
};
(function () {
    var obj = __recognizer784633498.logProbe([
            122,
            0,
            122,
            12
        ], __recognizer784633498.logProbe([
            122,
            0,
            122,
            1
        ], $)('#slower')), fn = __recognizer784633498.logProbe([
            122,
            13,
            122,
            18
        ], obj.click);
    return fn.apply(obj, arguments);
}.bind(this)(function () {
    __recognizer784633498.logEntry([
        122,
        19,
        122,
        27
    ], arguments);
}));
(function () {
    var obj = __recognizer784633498.logProbe([
            125,
            0,
            125,
            12
        ], __recognizer784633498.logProbe([
            125,
            0,
            125,
            1
        ], $)('#faster')), fn = __recognizer784633498.logProbe([
            125,
            13,
            125,
            18
        ], obj.click);
    return fn.apply(obj, arguments);
}.bind(this)(function () {
    __recognizer784633498.logEntry([
        125,
        19,
        125,
        27
    ], arguments);
}));
(function () {
    var obj = __recognizer784633498.logProbe([
            128,
            0,
            128,
            19
        ], __recognizer784633498.logProbe([
            128,
            0,
            128,
            1
        ], $)('#playpause-btn')), fn = __recognizer784633498.logProbe([
            128,
            20,
            128,
            25
        ], obj.click);
    return fn.apply(obj, arguments);
}.bind(this)(function () {
    __recognizer784633498.logEntry([
        128,
        26,
        128,
        34
    ], arguments);
    if (!__recognizer784633498.logProbe([
            129,
            8,
            129,
            13
        ], pause)) {
        pause = true;
        (function () {
            var obj = function () {
                    var obj = __recognizer784633498.logProbe([
                            131,
                            8,
                            131,
                            38
                        ], __recognizer784633498.logProbe([
                            131,
                            8,
                            131,
                            9
                        ], $)('#playpause-btn .glyphicon')), fn = __recognizer784633498.logProbe([
                            132,
                            13,
                            132,
                            24
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('glyphicon-play'), fn = __recognizer784633498.logProbe([
                    133,
                    13,
                    133,
                    21
                ], obj.addClass);
            return fn.apply(obj, arguments);
        }.bind(this)('glyphicon-pause'));
    } else {
        pause = false;
        (function () {
            var obj = __recognizer784633498.logProbe([
                    137,
                    8,
                    137,
                    19
                ], currentWord), fn = __recognizer784633498.logProbe([
                    137,
                    20,
                    137,
                    24
                ], obj.play);
            return fn.apply(obj, arguments);
        }.bind(this)(__recognizer784633498.logProbe([
            137,
            25,
            137,
            42
        ], updateWordsOnPage)));
        (function () {
            var obj = function () {
                    var obj = __recognizer784633498.logProbe([
                            138,
                            8,
                            138,
                            38
                        ], __recognizer784633498.logProbe([
                            138,
                            8,
                            138,
                            9
                        ], $)('#playpause-btn .glyphicon')), fn = __recognizer784633498.logProbe([
                            139,
                            13,
                            139,
                            24
                        ], obj.removeClass);
                    return fn.apply(obj, arguments);
                }.bind(this)('glyphicon-pause'), fn = __recognizer784633498.logProbe([
                    140,
                    13,
                    140,
                    21
                ], obj.addClass);
            return fn.apply(obj, arguments);
        }.bind(this)('glyphicon-play'));
    }
}));
(function () {
    var obj = __recognizer784633498.logProbe([
            144,
            0,
            144,
            15
        ], __recognizer784633498.logProbe([
            144,
            0,
            144,
            1
        ], $)('#go-button')), fn = __recognizer784633498.logProbe([
            144,
            16,
            144,
            21
        ], obj.click);
    return fn.apply(obj, arguments);
}.bind(this)(function () {
    __recognizer784633498.logEntry([
        144,
        22,
        144,
        30
    ], arguments);
    var address = function () {
            var obj = __recognizer784633498.logProbe([
                    145,
                    18,
                    145,
                    32
                ], __recognizer784633498.logProbe([
                    145,
                    18,
                    145,
                    19
                ], $)('#location')), fn = __recognizer784633498.logProbe([
                    145,
                    33,
                    145,
                    36
                ], obj.val);
            return fn.apply(obj, arguments);
        }.bind(this)();
    (function () {
        var obj = __recognizer784633498.logProbe([
                146,
                4,
                146,
                5
            ], $), fn = __recognizer784633498.logProbe([
                146,
                6,
                146,
                9
            ], obj.get);
        return fn.apply(obj, arguments);
    }.bind(this)('http://192.168.1.108:8080/alchemy/content?' + __recognizer784633498.logProbe([
        146,
        57,
        146,
        64
    ], address), function (data) {
        __recognizer784633498.logEntry([
            146,
            66,
            146,
            74
        ], arguments);
        __recognizer784633498.logProbe([
            147,
            8,
            147,
            28
        ], __recognizer784633498.logProbe([
            147,
            8,
            147,
            22
        ], addLinkToCache)(__recognizer784633498.logProbe([
            147,
            23,
            147,
            27
        ], data)));
        __recognizer784633498.logProbe([
            148,
            8,
            148,
            38
        ], __recognizer784633498.logProbe([
            148,
            8,
            148,
            22
        ], cueAndPlayText)(__recognizer784633498.logProbe([
            148,
            33,
            148,
            37
        ], __recognizer784633498.logProbe([
            148,
            28,
            148,
            32
        ], __recognizer784633498.logProbe([
            148,
            23,
            148,
            27
        ], data).text).text)));
    }));
}));
(function () {
    var obj = __recognizer784633498.logProbe([
            152,
            0,
            152,
            11
        ], __recognizer784633498.logProbe([
            152,
            0,
            152,
            1
        ], $)(__recognizer784633498.logProbe([
            152,
            2,
            152,
            10
        ], document))), fn = __recognizer784633498.logProbe([
            152,
            12,
            152,
            17
        ], obj.ready);
    return fn.apply(obj, arguments);
}.bind(this)(function () {
    __recognizer784633498.logEntry([
        152,
        18,
        152,
        26
    ], arguments);
    new (__recognizer784633498.logProbe([
        153,
        8,
        153,
        16
    ], hashgrid))({ numberOfGrids: 1 });
    (function () {
        var obj = __recognizer784633498.logProbe([
                155,
                4,
                155,
                21
            ], __recognizer784633498.logProbe([
                155,
                4,
                155,
                5
            ], $)('#blinkreader')), fn = __recognizer784633498.logProbe([
                155,
                22,
                155,
                28
            ], obj.dialog);
        return fn.apply(obj, arguments);
    }.bind(this)({
        width: 500,
        height: 300
    }));
    (function () {
        var obj = __recognizer784633498.logProbe([
                160,
                4,
                160,
                19
            ], __recognizer784633498.logProbe([
                160,
                4,
                160,
                5
            ], $)('.linksview')), fn = __recognizer784633498.logProbe([
                160,
                20,
                160,
                26
            ], obj.dialog);
        return fn.apply(obj, arguments);
    }.bind(this)({
        width: 300,
        height: 500
    }));
    (function () {
        var obj = __recognizer784633498.logProbe([
                165,
                4,
                165,
                28
            ], __recognizer784633498.logProbe([
                165,
                4,
                165,
                5
            ], $)('#blinkreader .blink')), fn = __recognizer784633498.logProbe([
                165,
                29,
                165,
                36
            ], obj.fitText);
        return fn.apply(obj, arguments);
    }.bind(this)());
    (function () {
        var obj = __recognizer784633498.logProbe([
                167,
                4,
                167,
                29
            ], __recognizer784633498.logProbe([
                167,
                4,
                167,
                5
            ], $)('#blinkreader .reader')), fn = __recognizer784633498.logProbe([
                167,
                30,
                167,
                32
            ], obj.on);
        return fn.apply(obj, arguments);
    }.bind(this)('resize', function (event, ui) {
        __recognizer784633498.logEntry([
            167,
            44,
            167,
            52
        ], arguments);
        (function () {
            var obj = __recognizer784633498.logProbe([
                    168,
                    8,
                    168,
                    32
                ], __recognizer784633498.logProbe([
                    168,
                    8,
                    168,
                    9
                ], $)('#blinkreader .blink')), fn = __recognizer784633498.logProbe([
                    168,
                    33,
                    168,
                    36
                ], obj.css);
            return fn.apply(obj, arguments);
        }.bind(this)('line-height', function () {
            var obj = __recognizer784633498.logProbe([
                    168,
                    52,
                    168,
                    77
                ], __recognizer784633498.logProbe([
                    168,
                    52,
                    168,
                    53
                ], $)('#blinkreader .reader')), fn = __recognizer784633498.logProbe([
                    168,
                    78,
                    168,
                    81
                ], obj.css);
            return fn.apply(obj, arguments);
        }.bind(this)('height')));
        (function () {
            var obj = __recognizer784633498.logProbe([
                    169,
                    7,
                    169,
                    14
                ], console), fn = __recognizer784633498.logProbe([
                    169,
                    15,
                    169,
                    18
                ], obj.log);
            return fn.apply(obj, arguments);
        }.bind(this)(function () {
            var obj = __recognizer784633498.logProbe([
                    169,
                    19,
                    169,
                    44
                ], __recognizer784633498.logProbe([
                    169,
                    19,
                    169,
                    20
                ], $)('#blinkreader .reader')), fn = __recognizer784633498.logProbe([
                    169,
                    45,
                    169,
                    48
                ], obj.css);
            return fn.apply(obj, arguments);
        }.bind(this)('height')));
    }));
    (function () {
        var obj = __recognizer784633498.logProbe([
                171,
                4,
                171,
                28
            ], __recognizer784633498.logProbe([
                171,
                4,
                171,
                5
            ], $)('#blinkreader .blink')), fn = __recognizer784633498.logProbe([
                171,
                29,
                171,
                32
            ], obj.css);
        return fn.apply(obj, arguments);
    }.bind(this)('line-height', function () {
        var obj = __recognizer784633498.logProbe([
                171,
                48,
                171,
                73
            ], __recognizer784633498.logProbe([
                171,
                48,
                171,
                49
            ], $)('#blinkreader .reader')), fn = __recognizer784633498.logProbe([
                171,
                74,
                171,
                77
            ], obj.css);
        return fn.apply(obj, arguments);
    }.bind(this)('height')));
    __recognizer784633498.logProbe([
        173,
        4,
        173,
        21
    ], __recognizer784633498.logProbe([
        173,
        4,
        173,
        19
    ], updateLinksView)());
}));
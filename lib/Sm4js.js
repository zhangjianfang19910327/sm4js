/*
  by zjf(npm:xishangrucai) 
 To contact me:13691460209@163.com 
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('base64-js')) :
  typeof define === 'function' && define.amd ? define(['base64-js'], factory) :
  (global = global || self, global.Sm4js = factory(global.base64js));
}(this, (function (base64js) { 'use strict';

  base64js = base64js && base64js.hasOwnProperty('default') ? base64js['default'] : base64js;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Proxy =
  /*#__PURE__*/
  function () {
    function Proxy(config) {
      _classCallCheck(this, Proxy);
    }

    _createClass(Proxy, [{
      key: "zero",
      value: function zero(n) {
        var a;

        if (n > 0) {
          a = "0";

          for (var j = 1; j < n; j++) {
            a += a;
          }

          return a;
        }

        return '';
      }
    }, {
      key: "stringToArray",
      value: function stringToArray(string) {
        // debugger;
        var arr = [];
        var length = string.length;

        for (var i = 0; i < length; i++) {
          var code = string.charCodeAt(i);

          if (19968 < code && code < 40869) {
            var bin = code.toString(2);
            var bin1 = '1110';
            var bin2 = '10';
            var bin3 = '10';
            var binlen = bin.length;

            if (binlen <= 6) {
              bin3 = bin3 + this.zero(6 - binlen) + bin;
              bin2 = bin2 + this.zero(6);
              bin1 = bin1 + this.zero(4);
            } else if (binlen > 6 && binlen <= 12) {
              bin3 = bin3 + bin.slice(-6);
              bin2 = bin2 + this.zero(12 - binlen) + bin.substr(0, binlen - 6);
              bin1 = bin1 + this.zero(4);
            } else {
              bin3 = bin3 + bin.slice(-6);
              bin2 = bin2 + bin.substr(binlen - 12, 6);
              bin1 = bin1 + this.zero(16 - binlen) + bin.substr(0, binlen - 12);
            }

            arr.push(parseInt(bin1, 2), parseInt(bin2, 2), parseInt(bin3, 2));
          } else {
            arr.push(code);
          }
        }

        return arr;
      }
    }, {
      key: "stringToArrayBufferInUtf8",
      value: function stringToArrayBufferInUtf8(str) {
        // if not browser env, then require node.js's util. otherwise just use window's
        // const TextEncoder = (typeof window === 'undefined') ? require('util').TextEncoder : window.TextEncoder
        // always utf-8
        return this.stringToArray(str);
      }
    }, {
      key: "utf8ArrayBufferToString",
      value: function utf8ArrayBufferToString(strBuffer) {
        // if not browser env, then require node.js's util. otherwise just use window's
        // const TextDecoder = (typeof window === 'undefined') ? require('util').TextDecoder : window.TextDecoder
        // var decoder = new TextDecoder('utf-8')
        var string = "";
        var length = strBuffer.length;

        for (var i = 0; i < length;) {
          var chart;
          var bin11 = parseInt(strBuffer[i]).toString(2);

          if (bin11.substr(0, 1) == 1 && bin11.length == 8) {
            var bin1 = parseInt(strBuffer[i]).toString(2).substr(4);
            var bin2 = parseInt(strBuffer[i + 1]).toString(2).substr(2);
            var bin3 = parseInt(strBuffer[i + 2]).toString(2).substr(2);
            var bin = parseInt(bin1 + bin2 + bin3, 2);
            chart = String.fromCharCode(bin);
            i = i + 3;
          } else {
            chart = String.fromCharCode(parseInt(bin11, 2));
            i++;
          }

          string += chart;
        }

        return string;
      }
    }, {
      key: "arrayBufferToBase64",
      value: function arrayBufferToBase64(strBuffer) {
        return base64js.fromByteArray(strBuffer);
      }
    }, {
      key: "base64ToArrayBuffer",
      value: function base64ToArrayBuffer(base64) {
        return base64js.toByteArray(base64);
      }
    }]);

    return Proxy;
  }();

  if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
      value: function value(_value) {
        // Steps 1-2.
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }

        var O = Object(this); // Steps 3-5.

        var len = O.length >>> 0; // Steps 6-7.

        var start = arguments[1];
        var relativeStart = start >> 0; // Step 8.

        var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len); // Steps 9-10.

        var end = arguments[2];
        var relativeEnd = end === undefined ? len : end >> 0; // Step 11.

        var _final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len); // Step 12.


        while (k < _final) {
          O[k] = _value;
          k++;
        } // Step 13.


        return O;
      }
    });
  }

  var UINT8_BLOCK = 16;
  var Sbox = new Uint8Array([0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7, 0x16, 0xb6, 0x14, 0xc2, 0x28, 0xfb, 0x2c, 0x05, 0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3, 0xaa, 0x44, 0x13, 0x26, 0x49, 0x86, 0x06, 0x99, 0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98, 0x7a, 0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62, 0xe4, 0xb3, 0x1c, 0xa9, 0xc9, 0x08, 0xe8, 0x95, 0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6, 0x47, 0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba, 0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85, 0x4f, 0xa8, 0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b, 0xf8, 0xeb, 0x0f, 0x4b, 0x70, 0x56, 0x9d, 0x35, 0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2, 0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87, 0xd4, 0x00, 0x46, 0x57, 0x9f, 0xd3, 0x27, 0x52, 0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e, 0xea, 0xbf, 0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5, 0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15, 0xa1, 0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55, 0xad, 0x93, 0x32, 0x30, 0xf5, 0x8c, 0xb1, 0xe3, 0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60, 0xc0, 0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f, 0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd, 0x8e, 0x2f, 0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51, 0x8d, 0x1b, 0xaf, 0x92, 0xbb, 0xdd, 0xbc, 0x7f, 0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8, 0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd, 0x2d, 0x74, 0xd0, 0x12, 0xb8, 0xe5, 0xb4, 0xb0, 0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e, 0x65, 0xb9, 0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84, 0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d, 0x20, 0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48]);

  Uint8Array.prototype.fill = function () {
    Array.prototype.fill.apply(this, arguments);
  };

  if (!Uint8Array.prototype.slice) {
    Uint8Array.prototype.slice = function (arg) {
      return new Uint8Array(this).subarray(arg);
    };
  }
  //     Array.prototype.slice.apply(this,arguments)
  // }

  var CK = new Uint32Array([0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269, 0x70777e85, 0x8c939aa1, 0xa8afb6bd, 0xc4cbd2d9, 0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249, 0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9, 0xc0c7ced5, 0xdce3eaf1, 0xf8ff060d, 0x141b2229, 0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299, 0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209, 0x10171e25, 0x2c333a41, 0x484f565d, 0x646b7279]);
  var FK = new Uint32Array([0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc]);

  var Sm4js =
  /*#__PURE__*/
  function () {
    function Sm4js(config) {
      _classCallCheck(this, Sm4js);

      this.Crypt = new Proxy();
      var keyBuffer = this.Crypt.stringToArrayBufferInUtf8(config.key);

      if (keyBuffer.length !== 16) {
        throw new Error('key should be a 16 bytes string');
      }
      /**
       * key should be 16 bytes string
       * @member {Uint8Array} key
       */


      this.key = keyBuffer;
      /**
       * iv also should be 16 bytes string
       * @member {Uint8Array} iv
       */

      var ivBuffer = new Uint8Array(0);

      if (config.iv !== undefined && config.iv !== null) {
        // need iv
        ivBuffer = this.Crypt.stringToArrayBufferInUtf8(config.iv);

        if (ivBuffer.length !== 16) {
          throw new Error('iv should be a 16 bytes string');
        }
      }

      this.iv = ivBuffer;
      /**
       * sm4's encrypt mode
       * @member {Enum} mode
       */

      this.mode = 'cbc';

      if (['cbc', 'ecb'].indexOf(config.mode) >= 0) {
        // set encrypt mode. default is cbc
        this.mode = config.mode;
      }
      /**
       * sm4's cipher data type
       * @member {Enum} outType
       */


      this.cipherType = 'base64';

      if (['base64', 'text'].indexOf(config.outType) >= 0) {
        // set encrypt mode. default is cbc
        this.cipherType = config.outType;
      }
      /**
       * sm4's encrypt round key array
       * @member {Uint32Array} encryptRoundKeys
       */


      this.encryptRoundKeys = new Uint32Array(32); // spawn 32 round keys

      this.spawnEncryptRoundKeys();
      /**
       * sm4's decrypt round key array
       * @member {Uint32Array} encryptRoundKeys
       */

      Uint32Array.prototype.reverse = function () {
        Array.prototype.reverse.apply(this, arguments);
      };

      this.decryptRoundKeys = new Uint32Array(this.encryptRoundKeys);
      this.decryptRoundKeys.reverse();
    }

    _createClass(Sm4js, [{
      key: "doBlockCrypt",
      value: function doBlockCrypt(blockData, roundKeys) {
        var xBlock = new Uint32Array(36);
        xBlock.set(blockData, 0); // loop to process 32 rounds this.Crypt

        for (var i = 0; i < 32; i++) {
          xBlock[i + 4] = xBlock[i] ^ this.tTransform1(xBlock[i + 1] ^ xBlock[i + 2] ^ xBlock[i + 3] ^ roundKeys[i]);
        }

        var yBlock = new Uint32Array(4); // reverse last 4 xBlock member

        yBlock[0] = xBlock[35];
        yBlock[1] = xBlock[34];
        yBlock[2] = xBlock[33];
        yBlock[3] = xBlock[32];
        return yBlock;
      }
    }, {
      key: "spawnEncryptRoundKeys",
      value: function spawnEncryptRoundKeys() {
        // extract mk in key
        var mk = new Uint32Array(4);
        mk[0] = this.key[0] << 24 | this.key[1] << 16 | this.key[2] << 8 | this.key[3];
        mk[1] = this.key[4] << 24 | this.key[5] << 16 | this.key[6] << 8 | this.key[7];
        mk[2] = this.key[8] << 24 | this.key[9] << 16 | this.key[10] << 8 | this.key[11];
        mk[3] = this.key[12] << 24 | this.key[13] << 16 | this.key[14] << 8 | this.key[15]; // calculate the K array

        var k = new Uint32Array(36);
        k[0] = mk[0] ^ FK[0];
        k[1] = mk[1] ^ FK[1];
        k[2] = mk[2] ^ FK[2];
        k[3] = mk[3] ^ FK[3]; // loop to spawn 32 round keys

        for (var i = 0; i < 32; i++) {
          k[i + 4] = k[i] ^ this.tTransform2(k[i + 1] ^ k[i + 2] ^ k[i + 3] ^ CK[i]);
          this.encryptRoundKeys[i] = k[i + 4];
        }
      }
    }, {
      key: "rotateLeft",
      value: function rotateLeft(x, y) {
        return x << y | x >>> 32 - y;
      }
    }, {
      key: "linearTransform1",
      value: function linearTransform1(b) {
        return b ^ this.rotateLeft(b, 2) ^ this.rotateLeft(b, 10) ^ this.rotateLeft(b, 18) ^ this.rotateLeft(b, 24);
      }
    }, {
      key: "linearTransform2",
      value: function linearTransform2(b) {
        return b ^ this.rotateLeft(b, 13) ^ this.rotateLeft(b, 23);
      }
    }, {
      key: "tauTransform",
      value: function tauTransform(a) {
        return Sbox[a >>> 24 & 0xff] << 24 | Sbox[a >>> 16 & 0xff] << 16 | Sbox[a >>> 8 & 0xff] << 8 | Sbox[a & 0xff];
      }
    }, {
      key: "tTransform1",
      value: function tTransform1(z) {
        var b = this.tauTransform(z);
        var c = this.linearTransform1(b);
        return c;
      }
    }, {
      key: "tTransform2",
      value: function tTransform2(z) {
        var b = this.tauTransform(z);
        var c = this.linearTransform2(b);
        return c;
      }
    }, {
      key: "padding",
      value: function padding(originalBuffer) {
        if (originalBuffer === null) {
          return null;
        }

        var paddingLength = UINT8_BLOCK - originalBuffer.length % UINT8_BLOCK;
        var paddedBuffer = new Uint8Array(originalBuffer.length + paddingLength);
        paddedBuffer.set(originalBuffer, 0);
        paddedBuffer.fill(paddingLength, originalBuffer.length);
        return paddedBuffer;
      }
    }, {
      key: "dePadding",
      value: function dePadding(paddedBuffer) {
        if (paddedBuffer === null) {
          return null;
        }

        var paddingLength = paddedBuffer[paddedBuffer.length - 1];
        var originalBuffer = paddedBuffer.slice(0, paddedBuffer.length - paddingLength);
        return originalBuffer;
      }
    }, {
      key: "uint8ToUint32Block",
      value: function uint8ToUint32Block(uint8Array, baseIndex) {
        if (typeof baseIndex == 'undefined') {
          baseIndex = 0;
        }

        var block = new Uint32Array(4); // make Uint8Array to Uint32Array block

        block[0] = uint8Array[baseIndex] << 24 | uint8Array[baseIndex + 1] << 16 | uint8Array[baseIndex + 2] << 8 | uint8Array[baseIndex + 3];
        block[1] = uint8Array[baseIndex + 4] << 24 | uint8Array[baseIndex + 5] << 16 | uint8Array[baseIndex + 6] << 8 | uint8Array[baseIndex + 7];
        block[2] = uint8Array[baseIndex + 8] << 24 | uint8Array[baseIndex + 9] << 16 | uint8Array[baseIndex + 10] << 8 | uint8Array[baseIndex + 11];
        block[3] = uint8Array[baseIndex + 12] << 24 | uint8Array[baseIndex + 13] << 16 | uint8Array[baseIndex + 14] << 8 | uint8Array[baseIndex + 15];
        return block;
      }
    }, {
      key: "encrypt",
      value: function encrypt(plaintext) {
        var plainByteArray = this.Crypt.stringToArrayBufferInUtf8(plaintext);
        var padded = this.padding(plainByteArray);
        var blockTimes = padded.length / UINT8_BLOCK;
        var outArray = new Uint8Array(padded.length);

        if (this.mode === 'cbc') {
          // CBC mode
          if (this.iv === null || this.iv.length !== 16) {
            throw new Error('iv error');
          } // init chain with iv (transform to uint32 block)


          var chainBlock = this.uint8ToUint32Block(this.iv);

          for (var i = 0; i < blockTimes; i++) {
            // extract the 16 bytes block data for this round to encrypt
            var roundIndex = i * UINT8_BLOCK;
            var block = this.uint8ToUint32Block(padded, roundIndex); // xor the chain block

            chainBlock[0] = chainBlock[0] ^ block[0];
            chainBlock[1] = chainBlock[1] ^ block[1];
            chainBlock[2] = chainBlock[2] ^ block[2];
            chainBlock[3] = chainBlock[3] ^ block[3]; // use chain block to this.Crypt

            var cipherBlock = this.doBlockCrypt(chainBlock, this.encryptRoundKeys); // make the cipher block be part of next chain block

            chainBlock = cipherBlock;

            for (var l = 0; l < UINT8_BLOCK; l++) {
              outArray[roundIndex + l] = cipherBlock[parseInt(l / 4)] >> (3 - l) % 4 * 8 & 0xff;
            }
          }
        } else {
          // this will be ECB mode
          for (var i = 0; i < blockTimes; i++) {
            // extract the 16 bytes block data for this round to encrypt
            var roundIndex = i * UINT8_BLOCK;
            var block = this.uint8ToUint32Block(padded, roundIndex);
            var cipherBlock = this.doBlockCrypt(block, this.encryptRoundKeys);

            for (var l = 0; l < UINT8_BLOCK; l++) {
              outArray[roundIndex + l] = cipherBlock[parseInt(l / 4)] >> (3 - l) % 4 * 8 & 0xff;
            }
          }
        } // cipher array to string


        if (this.cipherType === 'base64') {
          return this.Crypt.arrayBufferToBase64(outArray);
        } else {
          // text
          return this.Crypt.utf8ArrayBufferToString(outArray);
        }
      }
    }, {
      key: "decrypt",
      value: function decrypt(ciphertext) {
        // get cipher byte array
        var cipherByteArray = new Uint8Array();

        if (this.cipherType === 'base64') {
          // cipher is base64 string
          cipherByteArray = this.Crypt.base64ToArrayBuffer(ciphertext);
        } else {
          // cipher is text
          cipherByteArray = this.Crypt.stringToArrayBufferInUtf8(ciphertext);
        }

        var blockTimes = cipherByteArray.length / UINT8_BLOCK;
        var outArray = new Uint8Array(cipherByteArray.length); // decrypt the ciphertext by block

        if (this.mode === 'cbc') {
          // todo CBC mode
          if (this.iv === null || this.iv.length !== 16) {
            throw new Error('iv error');
          } // init chain with iv (transform to uint32 block)


          var chainBlock = this.uint8ToUint32Block(this.iv);

          for (var i = 0; i < blockTimes; i++) {
            // extract the 16 bytes block data for this round to encrypt
            var roundIndex = i * UINT8_BLOCK; // make Uint8Array to Uint32Array block

            var block = this.uint8ToUint32Block(cipherByteArray, roundIndex); // reverse the round keys to decrypt

            var plainBlockBeforeXor = this.doBlockCrypt(block, this.decryptRoundKeys); // xor the chain block

            var plainBlock = new Uint32Array(4);
            plainBlock[0] = chainBlock[0] ^ plainBlockBeforeXor[0];
            plainBlock[1] = chainBlock[1] ^ plainBlockBeforeXor[1];
            plainBlock[2] = chainBlock[2] ^ plainBlockBeforeXor[2];
            plainBlock[3] = chainBlock[3] ^ plainBlockBeforeXor[3]; // make the cipher block be part of next chain block

            chainBlock = block;

            for (var l = 0; l < UINT8_BLOCK; l++) {
              outArray[roundIndex + l] = plainBlock[parseInt(l / 4)] >> (3 - l) % 4 * 8 & 0xff;
            }
          }
        } else {
          // ECB mode
          for (var i = 0; i < blockTimes; i++) {
            // extract the 16 bytes block data for this round to encrypt
            var roundIndex = i * UINT8_BLOCK; // make Uint8Array to Uint32Array block

            var block = this.uint8ToUint32Block(cipherByteArray, roundIndex); // reverse the round keys to decrypt;

            var plainBlock = this.doBlockCrypt(block, this.decryptRoundKeys);

            for (var l = 0; l < UINT8_BLOCK; l++) {
              outArray[roundIndex + l] = plainBlock[parseInt(l / 4)] >> (3 - l) % 4 * 8 & 0xff;
            }
          }
        } // depadding the decrypted data


        var depaddedPlaintext = this.dePadding(outArray); // transform data to utf8 string

        return this.Crypt.utf8ArrayBufferToString(depaddedPlaintext);
      }
    }]);

    return Sm4js;
  }();

  return Sm4js;

})));

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const httpSignature = require("http-signature");
const jssha = require("jssha");
const backoff = require("backoff");
const util_1 = require("./util");
class Client {
    constructor(config) {
        this.util = {
            waitForInstanceState: (instanceId, state) => {
                return new Promise((resolve, reject) => {
                    let lastSeen;
                    const exponential = backoff.exponential({
                        initialDelay: 500,
                        maxDelay: 2000
                    });
                    exponential.failAfter(50);
                    exponential.on('ready', () => __awaiter(this, void 0, void 0, function* () {
                        const instance = yield this.Core.GetInstance(instanceId);
                        lastSeen = instance.lifecycleState;
                        if (instance.lifecycleState !== state) {
                            return exponential.backoff();
                        }
                        exponential.reset();
                        resolve(instance);
                    }));
                    exponential.on('fail', () => {
                        reject(`instance not in desired state: "${state}", last seen state: "${lastSeen}"`);
                    });
                    exponential.backoff();
                });
            }
        };
        this.Core = {
            GetInstance: (id) => {
                return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/instances/${id}`);
            },
            ListInstances: (compartmentId, params) => {
                let path = `/20160918/instances?compartmentId=${compartmentId}`;
                if (typeof params !== 'undefined') {
                    path += '&' + util_1.stringifyParams(params);
                }
                return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, path);
            },
            InstanceAction: (id, action) => {
                return this.doRequest('POST', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/instances/${id}?action=${action}`);
            },
            ListVnicAttachments: (compartmentId, instanceId) => {
                return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/vnicAttachments?compartmentId=${compartmentId}&instanceId=${instanceId || ''}`);
            },
            GetVnic: (vnicId) => {
                return this.doRequest('GET', `iaas.${this.config.zone}.oraclecloud.com`, `/20160918/vnics/${vnicId}`);
            }
        };
        this.IAM = {
            ListCompartments: () => {
                return this.doRequest('GET', `identity.${this.config.zone}.oraclecloud.com`, `/20160918/compartments?compartmentId=${this.config.tenantID}&compartmentIdInSubtree=true&accessLevel=ACCESSIBLE`);
            }
        };
        this.config = config;
        this.keyId = [
            this.config.tenantID,
            this.config.userID,
            this.config.fingerprint
        ].join('/');
    }
    doRequest(method, host, path) {
        let data = '';
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const options = {
                host,
                method,
                path,
            };
            const request = https.request(options, res => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    const response = JSON.parse(body);
                    if (res.statusCode !== 200) {
                        return reject(response);
                    }
                    resolve(response);
                });
                res.on('error', err => {
                    reject(err);
                });
            });
            let headersToSign = ['host', 'date', '(request-target)'];
            if (['POST', 'PUT'].includes(method.toUpperCase())) {
                data = data || '';
                const shaObj = new jssha('SHA-256', 'TEXT');
                shaObj.update(data);
                request.setHeader('Content-Type', 'application/json');
                request.setHeader('Content-Length', data.length);
                request.setHeader('x-content-sha256', shaObj.getHash('B64'));
                headersToSign = headersToSign.concat([
                    'content-type',
                    'content-length',
                    'x-content-sha256'
                ]);
            }
            httpSignature.sign(request, {
                key: this.config.key,
                keyId: this.keyId,
                headers: headersToSign
            });
            request.end();
        }));
    }
}
exports.Client = Client;
;
//# sourceMappingURL=index.js.map
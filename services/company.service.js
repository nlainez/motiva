"use strict";
const reqExec = require("request");
const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "Companies",
	mixins: [DbMixin("Companies")],
	settings: {
		fields: [
			"identifier",
			"name"
		]
	},
	hooks: {
		before: {
			/**
			 * Register a before hook for the `create` action.
			 * It sets a default value for the quantity field.
			 *
			 * @param {Context} ctx
			 */
			create(ctx) {
				ctx.params.type = "companies";
			}
		}
	},
	actions: {
		getContacts: {
			rest: "GET /get-companies",
			params : {
				// type: "string"
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				let auth = {
					Company: "Motiva_cs1",
					publicKey: "ZEcz5amlwywuMr7s",
					privateKey: "fXF29v4HSknvkdJG",
					url: "https://sandbox-na.myconnectwise.net/"
					// url: "http://na.myconnectwise.net/v4_6_release/apis/3.0/"
				};
				let username = "walter@motiva.net";
    			let password = "kJyzdVjeKKkBs9x";
    			// let url = "http://www.example.com";
				let authInfo = "Basic " + new Buffer(auth.Company + ":" + auth.publicKey).toString("base64");

				let options = {
					method: "GET",
					url: auth.url + auth.Company + "/companies",
					headers: {
                        "Content-Type": "application/json",
                        "Authorization" : authInfo,
                        "clientId": "713d39bf-dc95-4fe7-9655-022fd837c2f3"
                    },
					//   headers: {
					// 	'Authorization': 'Bearer ' + auth.publicKey
					//   },
				};

				let resposeResult = await reqExec(options, (error, response, body) => {
					if(error) {
						return error;
					} else {
						// console.log(body);
						// const json = this.transformDocuments(ctx, {}, body);
						console.log(response);
					}
				});

				return resposeResult;
				// let ctxExec = ctx; 
				// return ctxExec;
			}
		}
	},
	methods: {}
};

"use strict";
const reqExec = require("request");

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "Contacts",
	mixins: [DbMixin("Contacts")],
	settings: {
		fields: [
			"firstName",
			"lastName"
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
				ctx.params.type = "contacts";
			}
		}
	},
	actions: {
		getContacts: {
			rest: "GET /get-contacts",
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
				let authInfo = "Basic " + new Buffer(username + ":" + password).toString("base64");

				let options = {
					method: "GET",
					url: auth.url + auth.Company + "/contacts",
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
						return response;
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

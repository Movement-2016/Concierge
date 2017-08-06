/* global AWS */

import path from 'jspath';
import config from '../../config';

const MAX_RESULTS = 1024;

class UserDataset {

  /*
    RECORD

  {
     "Count": number,
     "DatasetDeletedAfterRequestedSyncCount": boolean,
     "DatasetExists": boolean,
     "DatasetSyncCount": number,
     "LastModifiedBy": "string",
     "MergedDatasetNames": [ "string" ],
     "NextToken": "string",
     "Records": [ 
        { 
           "DeviceLastModifiedDate": number,
           "Key": "string",
           "LastModifiedBy": "string",
           "LastModifiedDate": number,
           "SyncCount": number,
           "Value": "string"
        }
     ],
     "SyncSessionToken": "string"
  }

  */
  constructor() {
    this.reset();
  }

  reset() {
    this._api = null; 
    this._records = [];
    this._dict = {};
    this._identityId = null;
  }

  get api() {
    if( !this._api ) {
      this._api = new AWS.CognitoSync();
    }
    return this._api;
  }

  get identityId() {
    if( !this._identityId ) {
      this._identityId = AWS.config.credentials.identityId;
    }
    return this._identityId;
  }

  get identityPoolId() {
    return config.IDENTITY_POOL_ID;
  }

  get syncSessionToken() {
    return this._records[0].SyncSessionToken;
  }

  get datasetName() {
    return config.SYNC_DATASET;
  }

  get records() {
    return this._dict;
  }

  list() {
    let nextToken = null;
    const records = [];
    let dict = {};

    return new Promise( (resolve, reject) => {
      const request = (token, cb) => {
          this.api.listRecords({
              DatasetName: this.datasetName,
              IdentityId: this.identityId,
              IdentityPoolId: this.identityPoolId,
              LastSyncCount: 0, // lastSyncCount,
              MaxResults: MAX_RESULTS,
              NextToken: token
          }, cb);
      };

      const response = (err, data) => {

          if (err) { 
            return reject(err); 
          }

          dict = data.Records.reduce( ((obj,record) => (obj[record.Key] = record.Value, obj)), dict );
          records.push( data ); 

          nextToken = data.NextToken;

          if (nextToken) {
              request(nextToken, response);
          } else {
            this._records = records;
            this._dict = dict;
            resolve(dict);
          }

      };

      request(null, response);

    });
  }

  update(hash) {

    const records = Object.keys(hash).map( k => ({ 
      Key: k,
      Value: hash[k],
      Op: 'replace',
      SyncCount: path( '.*{.Key=="'+k+'"}.SyncCount', this._records )[0] || 0
    }));

    return new Promise( (resolve,reject) => {
      this.api.updateRecords({
          DatasetName: this.datasetName,
          IdentityId: this.identityId,
          IdentityPoolId: this.identityPoolId,
          SyncSessionToken: this.syncSessionToken,
          RecordPatches: records
        }, (err, data) => {
          if( err ) {
            reject(err);
          } else {
            resolve( { hash, data } );
          }
        });        
    });
  }

  describe() {
    return new Promise( (resolve, reject) => {
    this.api.describeDataset({
            DatasetName: this.datasetName,
            IdentityId: this.identityId,
            IdentityPoolId: this.identityPoolId
        }, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
        });
    });
  }
}

module.exports = typeof AWS !== 'undefined' && new UserDataset();
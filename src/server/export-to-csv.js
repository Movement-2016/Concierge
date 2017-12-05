/* eslint-disable no-console */
global.IS_SERVER_REQUEST = true;
global.jQuery = function() {};

const path = require( 'jspath');
const fs = require('fs');
var stringify = require('csv-stringify');
var service = require('../shared/services/m-service');

const recKeys = arr => Object.keys(arr[0]).join(',') + `\n`;

const tocsv = input => new Promise( (resolve,reject) => stringify(input,(err,data) => (err && reject(err)) || resolve(recKeys(input)+data) ) );

const fpath = fname => `${process.env.CSV_OUTDIR}${fname}.csv`;

const write = (name,text) => (fs.writeFileSync( fpath(name), text ), console.log('writing ', name));

const lookup = (table,id) => path( `.{.id==${id}}.slug`, table )[0];

const group = ({id,body,title,slug,website,c4_donate_link,c3_donate_link,pac_donate_link,image,state,tags}, db) => {
  const tagSlugs = tags && tags.map( id => lookup( db.tags, id ) ).join(',') || '';
  const stateSlug = state && lookup( db.states, state ) || '';
  return {id,body,title,slug,website,c4_donate_link,c3_donate_link,pac_donate_link,image,state:stateSlug,tags:tagSlugs};
};

const cnvt = {
  groups: (data,db) => data.map( g => group(g,db) ),
  tagCategories: data => data.map( ({tag,name,slug}) => ({slug,name,isTag:tag})),
  tags: (data,db) => data.map( ({name,slug,category,count}) => ({slug,name,count,category:lookup(db.tagCategories,category)}) ),
  states: (data,db) => data.map( ({name,slug,description,parent,count}) => ({slug,name,parent:lookup(db.colors,parent),description,count})),
  colors: data => data.map( ({name,slug,description,count,order}) => ({slug,name,description,count,order})),
};

const tables = Object.keys(cnvt);

const pages = () => ['home', 'about', 'team', 'jobs', 'contact'].map( name => service.getPage(name) );

const posts = db => ['donateTiles', 'news', 'testimonials', 'advisors' ].map( name => tocsv(db.query(name)).then( text => write(name,text) ) );

const pagesToCSV = pages => tocsv( pages.map( ({slug,...f}) => ({slug,...f}) ) );

service
  .db
  .then( db => (posts(db), db) )
  .then( db => tables.forEach( name => tocsv( cnvt[name](db[name],db) ).then( text => write( name, text ) ) ) )
  .then( () => Promise.all( pages() ).then( pagesToCSV ).then( text => write('pages', text) ) )
  .catch( err => console.log(err, err.stack) );

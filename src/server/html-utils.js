


const titleSetter = (title,html) => title 
                                        ? html.replace( /<title>([^<]+)<\/title>/, '<title>$1 - ' + title + '</title>')
                                        : html;

  
const metaSetter = (meta, html) => {
    if( meta ) {
      const kv   = (key,m) => ` ${key}="${m[key]}"`;
      const pobj = obj => Object.keys(obj).reduce( (s,k) => (s + kv(k,obj)), '' );
      const tags = meta.reduce( (str,m) => (str + '<meta' + pobj(m) + ' />' + "\n"), '');
      html = html.replace( /<meta name="description" [^/]+\/>/,  tags );
    }
    return html;
};

module.exports = {
  titleSetter,
  metaSetter
};
 module.exports = {
    entry: './lib/index.js',
    output: {
         path: './dist',
         filename: 'bonestagram.bundle.js',
         libraryTarget: 'var',
         library: 'bonestagram'
    }
 };
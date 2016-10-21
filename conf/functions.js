var crypto = require('crypto');

module.exports = {

    parseScripts: function(name)
    {
         var scriptsTpl = '',
                devScripts = global.config.devScripts[name],

                scriptsUrl = devScripts['scripts'],
                packPath = devScripts['packPath'],
                packFileName = devScripts['packFileName'],

                envPath = global.config.developEnv ? '/src/' : '/dist/';

        if (envPath == '/src/')
        {
            scriptsUrl.forEach(function(value, key) {

                scriptsTpl += '<script src="'+ envPath + value +'"></script>\n\r';

            });

            return scriptsTpl;
            
        }
        else
        {
            return '<script src="'+ packPath + '/' + packFileName +'?v='+ global.config.version +'"></script>';
        }
        
    },

    encryption: function(data, key)
    {
        var iv = "";
        var clearEncoding = 'utf8';
        var cipherEncoding = 'base64';
        var cipherChunks = [];
        var cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
        cipher.setAutoPadding(true);

        cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
        cipherChunks.push(cipher.final(cipherEncoding));

        return cipherChunks.join('');
    },
    
    decryption: function(data, key)
    {
        var iv = "";
        var clearEncoding = 'utf8';
        var cipherEncoding = 'base64';
        var cipherChunks = [];
        var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
        decipher.setAutoPadding(true);

        cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
        cipherChunks.push(decipher.final(clearEncoding));

        return cipherChunks.join('');
    },

    /**
     * [404 page debug vs !debug]
     * @param  {[type]}   res  
     * @param  {Function} next 
     * @return {[type]}
     */
    pageNotFoundHandler: function(res, next)
    {
        if (global.config.debug)
        {
              var err = new Error('Not Found');
              err.status = 404;
              next(err);
        }
        else
        {
            res.render('404');
        }
    },

    getCurrentUser: function()
    {
        var arrCount = [];
        for( var i = 0; i < global.config.chatRooms.length; i++)
        {
            arrCount.push(0);
        }
        //console.log(global.config.chatUserList);

        for (var i = 0; i < global.config.chatUserList.length; i++)
        {
            for( var j = 0; j < global.config.chatRooms.length; j++)
            {
                if (global.config.chatUserList[i].roomID == j)
                {
                    arrCount[j] ++;
                }
            }
            
        }
        return arrCount;
    }
}
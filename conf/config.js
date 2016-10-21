module.exports = {

	debug: true, //is debug
    developEnv: true, // if false, it will cause pack and minify js and css, please make sure excute gulpfile.js before make the value false.
    version: 0.1,
	authKey: 'hellojiajuan0017',
    title: 'family chat',
    subTitle: 'a chatroom example with amaze UI / expressJS /socket.io',
    meta: {
        desc: '',
        keyword: ''
    },

    menuSelected: '',

    codeDefine: {
    	success : { code: '1', message: '操作成功'},
		errorDatabase : { code: 'e0000', message: '数据库非法操作'},
		errorSystem : { code: 'e0001', message: '系统繁忙'},
		limitSystem : { code: 'e0002', message: '访问受限，用户权限不够'},
		errorEmpty : { code: 'e0003', message: '*为必填项'},
		errorUpload : { code: 'e0004', message: '上传失败，请检查文件名和文件大小是否符合限制条件'},
		errorLogin  : { code: 'e0005', message: '登录名或密码错误'},
        errorRegister : { code: 'e0006', message: '存在该注册手机号'},
        errorUsers: { code: 'e0006', message: '旧密码不正确'},
    },

    devScripts: {
        'public': {scripts: 
           ['js/plugins/jquery.cookie.min.js',
            'js/plugins/jquery.form.js',
            'js/plugins/jquery.validate.min.js',
            'js/plugins/validate.extend.js',
            'js/main.js'], 

            'packPath': '/dist/js',
            'packFileName': 'bundle.js'
        },

        'login': {scripts: 
           ['js/login.js'],

            'packPath': '/dist/js',
            'packFileName': 'login.js'
        },
            

        'chat': {scripts: 
           ['js/chat.js'],

            'packPath': '/dist/js',
            'packFileName': 'chat.js'
        },

        'users': {scripts: 
           ['js/users.js'],

            'packPath': '/dist/js',
            'packFileName': 'users.js'
        }
    },

    chatRooms: [

    {name: 'administrator room', desc: 'need a password: 111111', password: '111111' },
    {name: 'family chat test 1', desc: 'balabala', theme: 'success', },
    {name: 'family chat test 2', desc: 'balabala', limited: 2, theme: 'warning' },
    {name: 'family chat test 3', limited: 10, 'theme': 'danger' }

    ],
    chatUserList: []
    
    
}